from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from sqlalchemy import event
from config import db, bcrypt
from flask_bcrypt import check_password_hash
# from datetime import datetime



class ItemsCart(db.Model, SerializerMixin):
    __tablename__ = 'itemscarts'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.String)
    image = db.Column(db.String)
    quantity = db.Column(db.Integer)
    grocery_id = db.Column(db.Integer, db.ForeignKey('groceries.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    grocery = db.relationship('Grocery', back_populates='itemscarts')
    user = db.relationship('User', back_populates='itemscarts')
    deli = association_proxy('grocery', 'deli')

    serialize_rules = ('-grocery.itemscarts', '-user.itemscarts')


    @app.route('/itemscarts/<int:user_id>', methods=['GET'])
    def get_items_cart(user_id):
        cart_items = ItemsCart.query.filter_by(user_id=user_id).all()
        return [item.to_dict() for item in cart_items], 200

    @app.route('/itemscarts', methods=['POST'])
    def add_to_cart():
        data = request.get_json()

        new_item = ItemsCart(
            name=data['name'],
            description=data['description'],
            quantity=data['quantity'],
            grocery_id=data['grocery_id'],
            user_id=data['user_id']
        )
        db.session.add(new_item)
        db.session.commit()
        return new_item.to_dict(), 201

    @app.route('/itemscarts/<int:item_id>', methods=['PATCH'])
    def update_cart_item(item_id):
        data = request.get_json()
        item = ItemsCart.query.get_or_404(item_id)
        item.quantity = data.get('quantity', item.quantity)
        db.session.commit()
        return item.to_dict(), 200

    @app.route('/itemscarts/<int:item_id>', methods=['DELETE'])
    def delete_cart_item(item_id):
        item = ItemsCart.query.get_or_404(item_id)
        db.session.delete(item)
        db.session.commit()
        return {}, 204



class Grocery(db.Model, SerializerMixin):
    __tablename__ = 'groceries'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.String)
    image = db.Column(db.String)
    quantity = db.Column(db.Integer)
    deli_id = db.Column(db.Integer, db.ForeignKey('delis.id'), nullable=True)

    itemscarts = db.relationship('ItemsCart', back_populates='grocery', cascade='all, delete-orphan')
    deli = db.relationship('Deli', back_populates='groceries')
    # user = association_proxy('itemscarts', 'user')
    # Fix (if needed): It’s okay as long as you're aware it creates a synthetic relationship
    #  to all users who've added this grocery to a cart. If that’s intentional, keep it.

    serialize_rules = ('-itemscarts', '-deli')

    def __repr__(self):
        return f"<Grocery item {self.name}, category: {self.description} and {self.quantity}>"




class Deli(db.Model, SerializerMixin):
    __tablename__ = 'delis'

    id = db.Column(db.Integer, primary_key=True)
    bread_type = db.Column(db.String, nullable=False)
    cheese_type = db.Column(db.String, nullable=False)
    meat_type = db.Column(db.String, nullable=False)
    # extras = db.Column(db.String)  # maybe comma-separated for now
    quantity = db.Column(db.Integer, default=1)

    groceries = db.relationship('Grocery', back_populates='deli', cascade='all, delete-orphan')

    serialize_rules = ('-groceries',)

    def __repr__(self):
        return f"<Deli {self.bread_type} with {self.meat_type} and {self.cheese_type}>"




class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    email = db.Column(db.String)
    _password_hash = db.Column(db.String, nullable=False)

    itemscarts = db.relationship('ItemsCart', back_populates='user', cascade='all, delete-orphan')
    groceries = association_proxy('itemscarts', 'grocery')

    serialize_rules = ('-groceries', '-_password_hash', '-itemscarts.user')

from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from sqlalchemy import event
from config import db, bcrypt
from flask_bcrypt import check_password_hash
from datetime import datetime



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



class Grocery(db.Model, SerializerMixin):
    __tablename__ = 'groceries'

    valid_descriptions = [
        "Bread", "Cheese", "Condiment", "Dairy", "Eggs", "Fruit", "Household",
        "Meat", "Pizza", "Vegetable", "Deli Item", "Other"
    ]

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    image = db.Column(db.String)
    quantity = db.Column(db.Integer, default=1)
    deli_id = db.Column(db.Integer, db.ForeignKey('delis.id'), nullable=True)

    itemscarts = db.relationship('ItemsCart', back_populates='grocery', cascade='all, delete-orphan')
    deli = db.relationship('Deli', back_populates='groceries')
    # user = association_proxy('itemscarts', 'user')
    # Fix (if needed): It’s okay as long as you're aware it creates a synthetic relationship
    #  to all users who've added this grocery to a cart. If that’s intentional, keep it.

    serialize_rules = ('-itemscarts', '-deli')


    @validates('description')
    def validate_description(self, key, value):
        if value not in self.valid_descriptions:
            raise ValueError(f"Invalid category '{value}'. Must be one of: {', '.join(self.valid_descriptions)}")
        return value

    @validates('deli_id')
    def validate_deli_id(self, key, value):
        if self.description == "Deli Item" and value is None:
            raise ValueError("Deli items must have a deli_id.")
        return value


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
    username = db.Column(db.String, unique=True, nullable=False)
    email = db.Column(db.String, unique=True)
    _password_hash = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    itemscarts = db.relationship('ItemsCart', back_populates='user', cascade='all, delete-orphan')
    groceries = association_proxy('itemscarts', 'grocery')


    @property
    def password_hash(self):
        return self._password_hash

    @password_hash.setter
    def password_hash(self, password):
        self._password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    @validates('email')
    def validate_email(self, key, value):
        if value and '@' not in value:
            raise ValueError('Invalid email address.')
        return value

    def authenticate(self, password):
        return check_password_hash(self._password_hash, password)

    # serialize_rules = ('-groceries', '-_password_hash', '-itemscarts.user')
    serialize_rules = ('-groceries', '-_password_hash', '-itemscarts.user', '-created_at', '-updated_at')

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



class Grocery(db.Model, SerializerMixin):
    __tablename__ = 'groceries'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.String)
    image = db.Column(db.String)
    quantity = db.Column(db.Integer)
    deli_id = db.Column(db.Integer, db.ForeignKey('delis.id'), nullable=False)

    itemscarts = db.relationship('ItemsCart', back_populates='grocery', cascade='all, delete-orphan')
    deli = db.relationship('Deli', back_populates='grocery')
    # user = association_proxy('itemscarts', 'user')
    # Fix (if needed): It’s okay as long as you're aware it creates a synthetic relationship
    #  to all users who've added this grocery to a cart. If that’s intentional, keep it.

    serialize_rules = ('-itemscarts', '-delis')




class Deli(db.Model, SerializerMixin):
    __tablename__ = 'delis'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.String)
    quantity = db.Column(db.Integer)

    grocery = db.relationship('Grocery', back_populates='delis', cascade='all, delete-orphan')
    
    serialize_rules = ('-grocery.delis',)



class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    email = db.Column(db.String)
    _password_hash = db.Column(db.String, nullable=False)

    itemscarts = db.relationship('ItemsCart', back_populates='user', cascade='all, delete-orphan')
    groceries = association_proxy('itemscarts',groceries)

    serialize_rules = ('-groceries', '-_password_hash', '-itemscarts.user')

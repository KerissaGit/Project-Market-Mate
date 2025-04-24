#!/usr/bin/env python3

# Imports from config
from config import app, db, api
from flask import make_response, session
from flask_restful import Resource
from sqlalchemy.exc import NoResultFound

# Models
from models import User, ItemsCart, Grocery, Deli


# API Resources
class Index(Resource):
    def get(self):
        return '<h1>Market Mate Project Server<h1>'


class Users(Resource):
    def get(self):
        users = db.session.execute(db.select(User)).scalars().all()
        users_list = [user.to_dict() for user in users]
        return make_response({"users": users_list}, 200)


class ItemsCarts(Resource):
    def get(self):
        itemscarts = db.session.execute(db.select(ItemsCart)).scalars().all()
        return make_response([itemscart.to_dict() for itemscart in itemscarts], 200)


class Groceries(Resource):
    def get(self):
        groceries = db.session.execute(db.select(Grocery)).scalars().all()
        return make_response([grocery.to_dict() for grocery in groceries], 200)


class Delis(Resource):
    def get(self):
        delis = db.session.execute(db.select(Deli)).scalars().all()
        return make_response([deli.to_dict() for deli in delis], 200)


# Register resources
api.add_resource(Index, '/')
api.add_resource(Users, '/users')
api.add_resource(ItemsCarts, '/itemcarts')
api.add_resource(Groceries, '/groceries')
api.add_resource(Delis, '/delis')


# Run app
if __name__ == '__main__':
    app.run(port=5555, debug=True)

#!/usr/bin/env python3

# Standard library imports
from flask import request, jsonify, make_response, session
from flask_restful import Resource
from sqlalchemy.exc import NoResultFound
from flask_cors import flask_cors
# from datetime import datetime

# Local imports
from config import app, db, api, bcrypt
from models import User, ItemsCart, Grocery, Deli



class Index(Resource):
    def get(self):
        return '<h1>Market Mate Project Server<h1>'


class Users(Resource):
    def get(self):
        users = db.session.execute(db.select(User)).scalars().all()
        users_list = [user.to_dict() for user in users]
        print("Session after login:", dict(session))

        return make_response({"users": users_list}, 200)


class ItemsCarts(Resource):
    def get(self):
        itemscarts = db.session.execute(db.select(ItemsCart)).scalars().all()
        return make_response([itemscart.to_dict() for itemscart in itemscarts], 200)


# Creating this to prep for use later
# Might be used for Grocery OR ItemsCart
# class ItemsById(Resource):
#     def get(self, id):
#         try:
#             'Created class to be used for later'
#             return make_response( .to_dict(), 200)
#         except NoResultFound:
#             return make_response({"error": "Item not found."}, 404)



class Groceries(Resource):
    def get(self):
        groceries = db.session.execute(db.select(Grocery)).scalars().all()
        return make_response([grocery.to_dict() for grocery in groceries], 200)



class Deli(Resource):
    def get(self):
        delis = db.session.execute(db.select(Deli).scalars().all()
        return make_response([deli.to_dict() for deli in delis], 200)


        


# Routing
api.add_resource(Index, '/')
api.add_resource(Users, '/users')
api.add_resource(ItemsCarts, '/itemcarts')
# api.add_resource(ItemsById, '/itemcarts/<int:id>')
api.add_resource(Groceries, '/groceries')
api.add_resource(Delis, '/delis')




# Came with project template
# @app.route('/')
# def index():
#     return '<h1>Project Server</h1>'


if __name__ == '__main__':
    app.run(port=5555, debug=True)


#!/usr/bin/env python3

# Imports from config
from config import app, db, api
from flask import make_response, session, jsonify
from flask_restful import Resource
from sqlalchemy.exc import NoResultFound
from flask_cors import CORS
# Models
from models import User, ItemsCart, Grocery, Deli

CORS(app)


# API Resources
class Index(Resource):
    def get(self):
        return jsonify({"message": "Market Mate Project Server is running"}), 200



class Users(Resource):
    def get(self):
        users = db.session.execute(db.select(User)).scalars().all()
        users_list = [user.to_dict() for user in users]
        return make_response({"users": users_list}, 200)




class ItemsCarts(Resource):
    def get(self):
        itemscarts = db.session.execute(db.select(ItemsCart)).scalars().all()
        return make_response([itemscart.to_dict() for itemscart in itemscarts], 200)

    def post(self):
        data = request.get_json()
        try:
            new_item = ItemsCart(
                name=data['name'],
                description=data['description'],
                image=data.get('image'),
                quantity=data.get('quantity', 1),
                grocery_id=data['grocery_id'],
                user_id=data['user_id']
            )
            db.session.add(new_item)
            db.session.commit()
            return make_response(new_item.to_dict(), 201)
        except Exception as e:
            return make_response({"error": str(e)}, 400)


class SingleCartItem(Resource):
    def patch(self, item_id):
        item = ItemsCart.query.get_or_404(item_id)
        data = request.get_json()

        item.quantity = data.get('quantity', item.quantity)
        db.session.commit()

        return make_response(item.to_dict(), 200)

    def delete(self, item_id):
        item = ItemsCart.query.get_or_404(item_id)
        db.session.delete(item)
        db.session.commit()
        return make_response({}, 204)



class Groceries(Resource):
    def get(self):
        groceries = db.session.execute(db.select(Grocery)).scalars().all()
        return make_response([grocery.to_dict() for grocery in groceries], 200)

    def post(self):
        data = request.get_json()
        try:
            grocery = Grocery(
                name=data['name'],
                description=data['description'],
                quantity=data.get('quantity', 1),
                image=data.get('image'),
                deli_id=data.get('deli_id')
            )
            db.session.add(grocery)
            db.session.commit()
            return make_response(grocery.to_dict(), 201)
        except ValueError as ve:
            return make_response({"error": str(ve)}, 422)
        except Exception as e:
            return make_response({"error": str(e)}, 400)



class SingleGrocery(Resource):
    def delete(self, grocery_id):
        grocery = Grocery.query.get_or_404(grocery_id)
        db.session.delete(grocery)
        db.session.commit()
        return make_response({}, 204)



class Delis(Resource):
    def get(self):
        delis = db.session.execute(db.select(Deli)).scalars().all()
        return make_response([deli.to_dict() for deli in delis], 200)



# App routes
@app.route('/itemscart/user/<int:user_id>')
def get_user_cart(user_id):
    cart_items = ItemsCart.query.filter_by(user_id=user_id).all()
    return make_response([item.to_dict() for item in cart_items], 200)



# Register resources
api.add_resource(Index, '/')
api.add_resource(Users, '/users')
api.add_resource(ItemsCarts, '/itemscart')
api.add_resource(SingleCartItem, '/itemscart/<int:item_id>')
api.add_resource(Groceries, '/groceries')
api.add_resource(SingleGrocery, '/groceries/<int:grocery_id>')
api.add_resource(Delis, '/deli')


# Run app
if __name__ == '__main__':
    app.run(port=5555, debug=True)

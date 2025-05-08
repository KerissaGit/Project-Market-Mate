#!/usr/bin/env python3

# Imports from config
from config import app, db, api
from flask import make_response, session, jsonify, request
from flask_restful import Resource
from sqlalchemy.exc import NoResultFound
from flask_cors import CORS
# Models
from models import User, ItemsCart, Grocery, Deli, db

CORS(app, supports_credentials=True)


# API Resources
class Index(Resource):
    def get(self):
        return jsonify({"message": "Market Mate Project Server is running"}), 200



class Users(Resource):
    def get(self):
        users = db.session.execute(db.select(User)).scalars().all()
        users_list = [user.to_dict() for user in users]
        return make_response({"users": users_list}, 200)
        # db.session.add(user)
        # db.session.commit()


class UsersById(Resource):
    def get(self, id):
        try:
            user = db.session.execute(db.select(User).filter_by(id=id)).scalar_one()
            return make_response(user.to_dict(), 200)
        except NoResultFound:
            return make_response({"error": "User not found"}, 404)




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


class UserCart(Resource):
    def get(self, user_id):
        cart_items = ItemsCart.query.filter_by(user_id=user_id).all()
        return make_response([item.to_dict() for item in cart_items], 200)


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

    def post(self):
        user_id = session.get('user_id')  # Must be set from session cookie
        if not user_id:
            return make_response({"error": "User not logged in"}, 401)

        data = request.get_json()

        try:
            # Create Deli
            deli = Deli(
                bread_type=data['bread_type'],
                cheese_type=data['cheese_type'],
                meat_type=data['meat_type'],
                quantity=data.get('quantity', 1)
            )
            db.session.add(deli)
            db.session.commit()

            # Create Grocery
            grocery_name = f"{deli.meat_type} and {deli.cheese_type} on {deli.bread_type} Sandwich/Wrap"
            grocery = Grocery(
                name=grocery_name,
                # description=f"Custom deli item: {grocery_name}",
                description="Deli Item",
                quantity=deli.quantity,
                deli_id=deli.id
            )
            db.session.add(grocery)
            db.session.commit()

            # Add to Cart
            item = ItemsCart(
                name=grocery.name,
                description=grocery.description,
                quantity=grocery.quantity,
                grocery_id=grocery.id,
                user_id=user_id
            )
            db.session.add(item)
            db.session.commit()

            return make_response(grocery.to_dict(), 201)
        except Exception as e:
            db.session.rollback()
            return make_response({"error": str(e)}, 400)


class SingleDeli(Resource):
    def get(self, deli_id):
        deli = Deli.query.get_or_404(deli_id)
        return make_response(deli.to_dict(), 200)

    def delete(self, deli_id):
        deli = Deli.query.get_or_404(deli_id)
        db.session.delete(deli)
        db.session.commit()
        return make_response({}, 204)


class CurrentUser(Resource):
    def get(self):
        user_id = session.get('user_id')
        if not user_id:
            return make_response({'error': 'Unauthorized'}, 401)
        user = User.query.get(user_id)
        if not user:
            return make_response({'error': 'User not found.'}, 404)
        return make_response(user.to_dict(), 200)


class Signup(Resource):
    def post(self):
        data = request.get_json()
        try:
            existing_user = User.query.filter_by(username=data['username']).first()
            if existing_user:
                return make_response({'error': 'Username already taken.'}, 400)

            user = User(
                username=data['username']
            )
            user.password_hash = data['password']  # assumes `password_hash` is a property in your model
            db.session.add(user)
            db.session.commit()

            session['user_id'] = user.id
            return make_response(user.to_dict(), 201)
        except Exception as e:
            return make_response({'error': str(e)}, 400)


class Login(Resource):
    def post(self):
        params = request.get_json()
        user = User.query.filter_by(username=params.get('username')).first()
        if not user:
            return make_response({'error': 'User not found.'}, 404)
        if user.authenticate(params.get('password')):
            session['user_id'] = user.id
            return make_response(user.to_dict(), 200)
        else:
            return make_response({'error': 'Invalid username or password'}, 401)


class Logout(Resource):
    def delete(self):
        session.pop('user_id', None)
        return make_response({}, 204)


# App routes
@app.route('/itemscart/user/<int:user_id>')
def get_user_cart(user_id):
    cart_items = ItemsCart.query.filter_by(user_id=user_id).all()
    return make_response([item.to_dict() for item in cart_items], 200)




# Register resources
api.add_resource(Index, '/')
api.add_resource(Users, '/users')
api.add_resource(UsersById, '/users/<int:id>')
api.add_resource(CurrentUser, '/me')
api.add_resource(Signup, '/signup')
api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')
api.add_resource(ItemsCarts, '/itemscart')
api.add_resource(UserCart, '/itemscart/user/<int:user_id>')
api.add_resource(SingleCartItem, '/itemscart/<int:item_id>')
api.add_resource(Groceries, '/groceries')
api.add_resource(SingleGrocery, '/groceries/<int:grocery_id>')
api.add_resource(Delis, '/deli')
api.add_resource(SingleDeli, '/deli/<int:deli_id>')



# Run app
if __name__ == '__main__':
    app.run(port=5555, debug=True)

#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
import random

# Remote library imports
from faker import Faker

# Local imports
from app import app
from config import db
from models import db, User, Grocery, Deli, ItemsCart


with app.app_context():
    print("🌱 Seeding database...")

    db.drop_all()
    db.create_all()

fake = Faker()


# Creating hard coded groceries to test
def create_groceries():
    groceries = [
        # Breads
        Grocery(name="Whole wheat loaf", description="Bread", quantity=1),
        Grocery(name="Sourdough loaf", description="Bread", quantity=1),
        Grocery(name="White bread", description="Bread", quantity=1),

        # Eggs and Milk
        Grocery(name="12 large eggs", description="Eggs", quantity=1),
        Grocery(name="1 gallon of 2% Milk", description="Milk", quantity=1),
        Grocery(name="1 gallon Almond Milk", description="Milk", quantity=1),

        # Household
        Grocery(name="6-pack", description="Household", quantity=1),
        Grocery(name="2 rolls", description="Household", quantity=1),
        Grocery(name="Dish Soap", description="Household", quantity=1),

        # Cheeses
        Grocery(name="Sliced Cheddar", description="Cheese", quantity=1),
        Grocery(name="Sliced Swiss", description="Cheese", quantity=1),
        Grocery(name="Sliced Provolone", description="Cheese", quantity=1),

        # Meats
        Grocery(name="1 lb ground Turkey", description="Meat", quantity=1),
        Grocery(name="1 lb ground Beef", description="Meat", quantity=1),
        Grocery(name="Chicken Breasts", description="Meat", quantity=1),

        # Frozen
        Grocery(name="4 Cheese Pizza", description="Frozen Pizza", quantity=1),
        Grocery(name="Pepperoni Pizza", description="Frozen Pizza", quantity=1),
        Grocery(name="Supreme Pizza", description="Frozen Pizza", quantity=1),

        # Fruits
        Grocery(name="Bananas", description="Fruit", quantity=1),
        Grocery(name="Apples", description="Fruit", quantity=1),
        Grocery(name="Strawberries", description="Fruit", quantity=1),
        Grocery(name="Blueberries", description="Fruit", quantity=1),

        # Vegetables
        Grocery(name="Carrots", description="Vegetable", quantity=1),
        Grocery(name="Broccoli", description="Vegetable", quantity=1),
        Grocery(name="Spinach", description="Vegetable", quantity=1),
        Grocery(name="Bell Peppers", description="Vegetable", quantity=1),

        # Condiments
        Grocery(name="Ketchup", description="Condiment", quantity=1),
        Grocery(name="Mustard", description="Condiment", quantity=1),
        Grocery(name="Mayonnaise", description="Condiment", quantity=1),
        Grocery(name="BBQ Sauce", description="Condiment", quantity=1),
        Grocery(name="Ranch Dressing", description="Condiment", quantity=1),
    ]

    db.session.add_all(groceries)
    db.session.commit()
    return groceries





def create_users():
    users = []
    for _ in range(5):
        user = User(
            username=fake.user_name(),
            email=fake.email()
        )
        user.password_hash = "password123"
        users.append(user)
    return users


# Needs to be updated and modified
# def create_items_cart(groceries, deli):
#     itemcarts = []
#     for _ in range(15):
#         name = fake.name()

#         itemscart = ItemsCart(
#             grocery_id=randint(1, len(groceries))
#             deli_id=randint(1, len(delis))
#         )
#         itemcarts.append(itemscart)

#     return itemscarts






if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!

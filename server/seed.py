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


# Creating hard coded groceries to test
def create_groceries():
    groceries = [
        Grocery(
            name="Bread"
            description="Wheat"
            quantity=1
        ),
        Grocery(
            name="Cheese"
            description="Mozzarella"
            quantity=2
        ),
        Grocery(
            name="Meat"
            description="Turkey"
            quantity=1
        ),
    ]
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

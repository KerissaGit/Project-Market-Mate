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




if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!

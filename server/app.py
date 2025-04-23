#!/usr/bin/env python3

# Standard library imports
from flask import request, jsonify, make_response, session
from flask_restful import Resource
from sqlalchemy.exc import NoResultFound
from flask_cors import flask_cors
# from datetime import datetime

# Local imports
from config import app, db, api, bcrypt
from models import 
# Add your model imports


# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'


if __name__ == '__main__':
    app.run(port=5555, debug=True)


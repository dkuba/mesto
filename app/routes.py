from flask import render_template, jsonify, request
from app import app

from flask_login import current_user, login_user
from app.models import User


@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')


@app.route('/api/current_user', methods=['GET'])
def get_current_user():
    current_user_response = {'is_authenticated': 0,
                             'name': '',
                             'user_id': 0}
    if current_user.is_authenticated:
        current_user_response['is_authenticated'] = 1
        current_user_response['name'] = current_user.username
        current_user_response['user_id'] = current_user.id

    return jsonify(current_user_response)

@app.route('/api/login', methods=['POST'])
def login():
    print(request)
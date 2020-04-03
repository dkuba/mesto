from flask import render_template, jsonify, request, json
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
                             'user_id': 0,
                             'avatar_url': ''}
    if current_user.is_authenticated:
        current_user_response['is_authenticated'] = 1
        current_user_response['name'] = current_user.username
        current_user_response['user_id'] = current_user.id
        current_user_response['avatar_url'] = current_user.avatar_url

    return jsonify(current_user_response)


@app.route('/api/login', methods=['POST'])
def login():
    print(request)


@app.route('/api/register', methods=['POST'])
def register_new_user():
    print(request)


@app.route('/api/check_username', methods=['POST'])
def is_username_exist():
    response = {'is_username_exist': False}
    print('проверка имени пользователя', request.get_json()['username'])
    return jsonify(response)
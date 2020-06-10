import time

from flask import render_template, jsonify, request, json, abort
from app import app, db

from flask_login import current_user, login_user, logout_user
from app.models import User


@app.route('/')
@app.route('/index')
@app.route('/null')
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
    login_data = json.loads(request.get_data(as_text=True))
    user = User.query.filter_by(username=login_data['user_name']).first()
    if user is None or not user.check_password(login_data['password']):
        return json.dumps(bool(False))
    login_user(user, remember=login_data['remember'])
    return json.dumps(bool(True))


@app.route('/api/check_username', methods=['POST'])
def is_username_exist():
    username_requested = request.get_data(as_text=True)
    result = User.query.filter(User.username == username_requested).all()
    return json.dumps(bool(result))


@app.route('/api/new_user_registration', methods=['POST'])
def new_user_registration():
    user_form = json.loads(json.dumps(request.form))
    print('new_user_data:', user_form)
    try:
        new_user = User(username=user_form['signup_username'], email=user_form['signup_email'])
        new_user.set_password(user_form['password_first'])
        db.session.add(new_user)
        db.session.commit()
    except:
        return json.dumps(bool(False))
    return json.dumps(bool(True))


@app.route('/api/logout', methods=['GET'])
def logout():
    try:
        logout_user()
        return json.dumps(bool(True))
    except:
        abort(500)


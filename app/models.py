from datetime import datetime
from app import db
from app import login
from werkzeug.security import generate_password_hash, check_password_hash

from flask_login import UserMixin


class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True)
    password_hash = db.Column(db.String(128))
    avatar_url = db.Column(db.String(2048))
    images = db.relationship('Image', backref='owner', lazy='dynamic')

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def __repr__(self):
        return '<User {}>'.format(self.username)


class Image(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(140))
    url = db.Column(db.String(2048))
    like_flag = db.Column(db.Boolean, default=False)
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    def __repr__(self):
        return '<Image {}>'.format(self.name)


@login.user_loader
def load_user(id):
    return User.query.get(int(id))

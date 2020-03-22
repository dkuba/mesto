import os

class Config(object):
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'you-will-never-guess'
    os.environ["FLASK_DEBUG"] = 'True'

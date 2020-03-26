import os
from dotenv import load_dotenv
flask_env_path = os.path.join(os.path.dirname(__file__), '.flask_env')
load_dotenv(flask_env_path)

basedir = os.path.abspath(os.path.dirname(__file__))


class Config(object):
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'you-will-never-guess'
    SQLALCHEMY_DATABASE_URI = (os.environ.get('DATABASE_URL')
                               or 'sqlite:///' + os.path.join(basedir, 'app.db')) + '?check_same_thread=False'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SEND_FILE_MAX_AGE_DEFAULT = 0

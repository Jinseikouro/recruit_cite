import os
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask import Flask

model = Flask(__name__)

# 以下DB接続
db_user = os.getenv('DB_USER', 'default_user')
db_password = os.getenv('DB_PASSWORD', 'default_password')
db_host = 'mysql'
db_port = '3306'
db_name = 'recruit'
charset = 'utf8'

model.config['SQLALCHEMY_DATABASE_URI'] = f'mysql+pymysql://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}?charset={charset}'
model.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# マイグレーション
db = SQLAlchemy(model)
migrate = Migrate(model, db)

# 以下DB仕様


class Company(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), unique=True, nullable=False)
    description = db.Column(db.String(300), nullable=False)
    requirement = db.Column(db.String(120), nullable=False)
    address = db.Column(db.String(120), unique=False,
                        nullable=False)


class Advertisement(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(30), unique=False, nullable=False)


class Photo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    photo = db.Column(db.LargeBinary, nullable=False)
    company_id = db.Column(db.Integer, nullable=True)
    advertisement_id = db.Column(db.Integer, nullable=True)
    photo_type = db.Column(db.String(10), nullable=False)


__all__ = ['db', 'Company', 'Advertisement', 'Photo', 'model']

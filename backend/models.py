import os
from sqlalchemy import Column, String, Integer, create_engine
from flask_sqlalchemy import SQLAlchemy
import json

database_name = "touristopia"
database_path = "postgres://{}/{}".format('localhost:5432', database_name)

db = SQLAlchemy()

'''
setup_db(app)
    binds a flask application and a SQLAlchemy service
'''
def setup_db(app, database_path=database_path):
    app.config["SQLALCHEMY_DATABASE_URI"] = database_path
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    db.app = app
    db.init_app(app)
    db.create_all()

'''
destination

'''
class Destination(db.Model):
  __tablename__ = 'destination'

  id = Column(Integer, primary_key=True)
  location = db.Column(db.String(120))
  city = db.Column(db.String(120))
  heading = db.Column(db.String(120))
  image_link = db.Column(db.String(500))
  background_link = db.Column(db.String(500))
  first_paragraph = db.Column(db.String)
  second_paragraph = db.Column(db.String)

  def __init__(self, location, city, heading, image_link, background_link, first_paragraph, second_paragraph):
    self.location = location
    self.city = city
    self.heading = heading
    self.image_link = image_link
    self.background_link = background_link
    self.first_paragraph = first_paragraph
    self.second_paragraph = second_paragraph

  def insert(self):
    db.session.add(self)
    db.session.commit()
  
  def update(self):
    db.session.commit()

  def delete(self):
    db.session.delete(self)
    db.session.commit()

  def format(self):
    return {
      'id': self.id,
      'location': self.location,
      'city': self.city,
      'heading': self.heading,
      'image_link': self.image_link,
      'background_link': self.background_link,
      'first_paragraph': self.first_paragraph,
      'second_paragraph': self.second_paragraph
    }

'''
location

'''
class Location(db.Model):  
  __tablename__ = 'location'

  id = Column(Integer, primary_key=True)
  address = Column(String)

  def __init__(self, address):
    self.address = address

  def format(self):
    return {
      'id': self.id,
      'location': self.address
    }
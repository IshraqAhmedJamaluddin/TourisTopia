import os
from flask import Flask, request, abort, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import random

from models import setup_db, Destination, Location

monument_per_page = 10

def pagination(request, selection):
  page = request.args.get('page', 1, type=int)
  start = (page - 1) * monument_per_page
  end = start + monument_per_page

  destinations = [destination.format() for destination in selection]
  current_destinations = destinations[start:end]

  return current_destinations

def create_app(test_config=None):
  # create and configure the app
  app = Flask(__name__)
  setup_db(app)
  
  #CORS 
  CORS(app, resources={r"/api/*": {"origins": "*"}})
 
  #CORS Headers
  @app.after_request
  def after_request(response):
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type, Authorization,true')
    response.headers.add('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS')
    return response
  
  @app.route('/locations', methods=['GET'])
  def retrieve_locations():
    destinations = []
    try:
      dest = Location.query.with_entities(Location.address).order_by(Location.id).all()
      for destination in dest:
        for innerlist in destination:
          destinations.append(innerlist)
      return jsonify({
        'destinations': destinations,
      })
    except:
      abort(405)

  @app.route('/destinations/search', methods=['POST'])
  def search_destinations():
    body = request.get_json()
    title = body.get('title', None)
    try:
      search = '%{}%'.format(title)
      selection = Destination.query.order_by(Destination.id).filter(Destination.location.ilike(search)).all()
      destinations = [destination.format() for destination in selection]
      
      return jsonify(destinations)
    except:
      abort(422)

  @app.errorhandler(400)
  def bad_request(error):
    return jsonify({
      'success': False,
      'error': 400,
      'message': 'bad request'
    }), 400

  @app.errorhandler(404)
  def not_found(error):
    return jsonify({
      'success': False,
      'error': 404,
      'message': 'resourse not found'
    }), 404

  @app.errorhandler(405)
  def method_not_allowed(error):
    return jsonify({
      'success': False,
      'error': 405,
      'message': 'method not allowed'
    }), 405

  @app.errorhandler(422)
  def unprocessable(error):
    return jsonify({
      'success': False,
      'error': 422,
      'message': 'unprocessable'
    }), 422

  @app.errorhandler(500)
  def internal_server_error(error):
    return jsonify({
      'success': False,
      'error': 500,
      'message': 'internal server errors'
    }), 500

  return app
"""
@app.route('/', methods=['GET'])
  def retrieve_questions():
    categories = {}
    current_category = []
    try:
      questions = Question.query.order_by(Question.category).all()
      current_questions = paginate_questions(request, questions)

      selection = Question.query.with_entities(Question.category).order_by(Question.category).all()
      for category in selection:
          for innerlist in category:
            current_category.append(innerlist)

      cat = Category.query.order_by(Category.id).all()
      for category in cat:
            categories[category.id] = category.type
      return jsonify({
        'success': True,
        'questions': current_questions,
        'total_questions': len(Question.query.all()),
        'categories': categories,
        'current_category': current_category
      })
    except:
      abort(405)

  @app.route('/destinations/<int:id>', methods=['DELETE'])
  def delete_question(id):
    try:
      question = Question.query.get(id)
      question.delete()
      return jsonify({
        'success': True,
      })
    except:
      abort(422)


  @app.route('/destinations', methods=['POST'])
  def create_question():
    try: 
      body = request.get_json()

      new_question = body.get('question', None)
      new_answer = body.get('answer', None)
      new_category = int(body.get('category', None))
      new_difficulty = int(body.get('difficulty', None))

      question = Question(question=new_question, answer=new_answer, category=new_category, difficulty=new_difficulty)
      question.insert()

      return jsonify({
      'success': True
    })
    except:
      abort(405)

"""
"""
  @app.route('/locations', methods=['GET'])
  def retrieve_locations():
    locations = {}
    try:
      selection = Category.query.order_by(Category.id).all()
      for category in selection:
            categories[category.id] = category.type
      return jsonify({
        'success': True,
        'categories': categories,
      })
    except:
      abort(405)
 """
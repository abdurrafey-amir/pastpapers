from app import app, db
from flask import jsonify, request
from models import Board, Subject, Topic, Question



@app.route('/api/boards')
def get_boards():
    boards = Board.query.all()
    return jsonify([{'id': b.id, 'name': b.name} for b in boards])

@app.route('/api/subjects/<int:board_id>')
def get_subjects(board_id):
    subjects = Subject.query.filter_by(board_id=board_id).all()
    return jsonify([{'id': s.id, 'name': s.name} for s in subjects])

@app.route('/api/topics/<int:subject_id>')
def get_topics(subject_id):
    topics = Topic.query.filter_by(subject_id=subject_id).all()
    return jsonify([{'id': t.id, 'name': t.name} for t in topics])

@app.route('/api/questions/<int:topic_id>')
def get_questions(topic_id):
    questions = Question.query.filter_by(topic_id=topic_id).all()
    return jsonify([
        {
            'id': q.id,
            'year': q.year,
            'paper': q.paper,
            'number': q.number,
            'image_url': q.image_url,
            'marking_scheme_url': q.marking_scheme_url
        } for q in questions
    ])

@app.route('/api/questions/filter', methods=['POST'])
def filter_questions():
    data = request.get_json()

    topic_ids = data.get('topic_ids', [])
    years = data.get('years', [])

    query = Question.query

    if topic_ids:
        query = query.filter(Question.topic_id.in_(topic_ids))

    if years:
        query = query.filter(Question.year.in_(years))

    questions = query.all()

    return jsonify([
        {
            'id': q.id,
            'year': q.year,
            'paper': q.paper,
            'number': q.number,
            'image_url': q.image_url,
            'marking_scheme_url': q.marking_scheme_url,
            'topic_id': q.topic_id
        } for q in questions
    ])
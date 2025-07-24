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
    years_param = request.args.get('year')
    paper = request.args.get('paper', type=int)

    query = Question.query.filter_by(topic_id=topic_id)

    if paper is not None:
        query = query.filter_by(paper=paper)

    if years_param:
        try:
            year_list = [int(y) for y in years_param.split(',')]
            query = query.filter(Question.year.in_(year_list))
        except ValueError:
            return jsonify({'error:': 'Invalid year format'}), 400
        
    questions = query.all()
    
    return jsonify([
        {
            'id': q.id,
            'year': q.year,
            'paper': q.paper,
            'number': q.number,
            'image_link': q.image_url,
            'marking_scheme_link': q.marking_scheme_url
        } for q in questions
    ]) 
from app import app, db
from flask import jsonify
from models import Subject, Topic, Question


@app.route('/api/subjects')
def get_subjects():
    subjects = Subject.query.all()
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
            'text': q.text,
            'image_link': q.image_link,
            'marking_scheme_link': q.marking_scheme_link
        } for q in questions
    ]) 
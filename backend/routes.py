from app import app, db
from flask import jsonify, request
from models import Board, Subject, Topic, Question
import io
import requests
from PIL import Image
from flask import send_file



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

@app.route('/api/papers/<int:subject_id>')
def get_papers(subject_id):
    papers = (
        db.session.query(Question.paper)
        .join(Topic)
        .filter(Topic.subject_id == subject_id)
        .distinct()
        .order_by(Question.paper)
        .all()
    )
    return jsonify([p[0] for p in papers])

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
    paper = data.get('paper')

    query = Question.query

    if topic_ids:
        query = query.filter(Question.topic_id.in_(topic_ids))

    if years:
        query = query.filter(Question.year.in_(years))

    if paper:
        try:
            query = query.filter(Question.paper == int(paper))
        except ValueError:
            pass

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

# pdf generation
@app.route('/api/generate_pdf', methods=['POST'])
def generate_pdf():
    data = request.get_json()
    
    topic_ids = data.get('topic_ids', [])
    paper = data.get('paper')
    years = data.get('years', [])

    query = Question.query

    if topic_ids:
        query = query.filter(Question.topic_id.in_(topic_ids))
    if paper:
        query = query.filter(Question.paper == str(paper))
    if years:
        query = query.filter(Question.year.in_(years))

    questions = query.order_by(Question.year, Question.paper, Question.number).all()

    if not questions:
        return jsonify({'error': 'No questions found'}), 404
    
    print("Questions found:", len(questions))
    for q in questions:
        print("Q:", q.id, q.image_url)
    
    images = []
    for q in questions:
        try:
            img_response = requests.get(q.image_url, stream=True)
            img = Image.open(img_response.raw).convert('RGB')
            images.append(img)
        except Exception as e:
            print(f'Failed to fetch image: {q.image_url} - {e}')

    if not images:
        return jsonify({'error': 'No valid images found'}), 400
    
    pdf_buffer = io.BytesIO()
    images[0].save(pdf_buffer, save_all=True, append_images=images[1:], format='PDF')
    pdf_buffer.seek(0)
    

    return send_file(pdf_buffer, mimetype='application/pdf', download_name='questions.pdf')

@app.route('/api/generate_markscheme', methods=['POST'])
def generate_markscheme():
    data = request.get_json()
    
    topic_ids = data.get('topic_ids', [])
    paper = data.get('paper')
    years = data.get('years', [])

    query = Question.query

    if topic_ids:
        query = query.filter(Question.topic_id.in_(topic_ids))
    if paper:
        query = query.filter(Question.paper == str(paper))
    if years:
        query = query.filter(Question.year.in_(years))

    questions = query.order_by(Question.year, Question.paper, Question.number).all()

    if not questions:
        return jsonify({'error': 'No questions found'}), 404
    
    images = []
    for q in questions:
        try:
            img_response = requests.get(q.marking_scheme_url, stream=True)
            img = Image.open(img_response.raw).convert('RGB')
            images.append(img)
        except Exception as e:
            print(f'Failed to fetch image: {q.marking_scheme_url} - {e}')

    if not images:
        return jsonify({'error': 'No valid images found'}), 400
    
    pdf_buffer = io.BytesIO()
    images[0].save(pdf_buffer, save_all=True, append_images=images[1:], format='PDF')
    pdf_buffer.seek(0)

    return send_file(pdf_buffer, mimetype='application/pdf', download_name='markscheme.pdf')
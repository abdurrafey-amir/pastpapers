from app import app, db
from models import Board, Subject, Topic, Question


def get_or_create(model, defaults=None, **kwargs):
    """Get an existing record or create one if it doesn't exist."""
    instance = model.query.filter_by(**kwargs).first()
    
    if instance:
        return instance
    else:
        params = dict(**kwargs)
        if defaults:
            params.update(defaults)
        instance = model(**params)
        db.session.add(instance)
        db.session.commit()
        return instance
    
with app.app_context():
    # Board -> Subject -> Topic -> Question
    board = get_or_create(Board, name='CIE')
    subject = get_or_create(Subject, name='Physics', board_id=board.id)
    topic = get_or_create(Topic, name='Forces', subject_id=subject.id)

    qyear = '2021'
    qpaper = '1'
    qnumber = '3'
    q_url = 'https://example.com/q3.png'
    qm_url = 'https://example.com/q3_ms.pdf'

    # check if question exists already
    question = Question.query.filter_by(
        year=qyear,
        paper=qpaper,
        number=qnumber,
        topic_id=topic.id
    ).first()

    if not question:
        question = Question(
            year=qyear,
            paper=qpaper,
            number=qnumber,
            topic_id=topic.id,
            image_url=q_url,
            marking_scheme_url=qm_url
        )
        db.session.add(question)
        db.session.commit()

    print('test data added with duplication checks.')
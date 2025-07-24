from app import app, db
from models import Board, Subject, Topic, Question


with app.app_context():

    b1 = Board(name='CIE')
    db.session.add(b1)
    db.session.commit()

    s1 = Subject(name='Physics', board_id=b1.id)
    db.session.add(s1)
    db.session.commit()

    t1 = Topic(name='Forces', subject_id=s1.id)
    db.session.add(t1)
    db.session.commit()

    q1 = Question(
        year='2021',
        paper='1',
        number='3',
        topic_id=t1.id,
        image_url='https://example.com/q3.png',
        marking_scheme_url='https://example.com/q3_ms.pdf'
    )
    db.session.add(q1)
    db.session.commit()

    print('Data added')
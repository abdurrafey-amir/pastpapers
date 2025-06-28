from app import app, db
from models import Subject, Topic, Question


with app.app_context():

    s1 = Subject(name='Physics')
    db.session.add(s1)
    db.session.commit()

    t1 = Topic(name='Forces', subject_id=s1.id)
    db.session.add(t1)
    db.session.commit()

    q1 = Question(
        year='2021',
        paper='1',
        number='Q3',
        text="State Newton's third law.",
        topic_id=t1.id,
        image_link='https://example.com/q3.png',
        marking_scheme_link='https://example.com/q3_ms.pdf'
    )
    db.session.add(q1)
    db.session.commit()

    print('Data added')
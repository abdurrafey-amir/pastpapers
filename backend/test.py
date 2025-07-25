from app import app, db
from models import Board, Subject, Topic, Question


# with app.app_context():

#     b1 = Board(name='CIE')
#     db.session.add(b1)
#     db.session.commit()

#     s1 = Subject(name='Physics', board_id=b1.id)
#     db.session.add(s1)
#     db.session.commit()

#     t1 = Topic(name='Forces', subject_id=s1.id)
#     db.session.add(t1)
#     db.session.commit()

#     q1 = Question(
#         year='2021',
#         paper='1',
#         number='3',
#         topic_id=t1.id,
#         image_url='https://example.com/q3.png',
#         marking_scheme_url='https://example.com/q3_ms.pdf'
#     )
#     db.session.add(q1)
#     db.session.commit()

#     print('Data added')


with app.app_context():

    bname = 'CIE'
    sname = 'Physics'
    tname = 'Forces'

    # checking if board exists already
    board = Board.query.filter_by(name=bname).first()

    if not board:
        board = Board(name=bname)
        db.session.add(board)
        db.session.commit()

    # checking if subject exists already
    subject = Subject.query.filter_by(name=sname, board_id=board.id).first()

    if not subject:
        subject = Subject(name=sname, board_id=board.id)
        db.session.add(subject)
        db.session.commit()

    # checking if topic exists already
    topic = Topic.query.filter_by(name=tname, subject_id=subject.id).first()

    if not topic:
        topic = Topic(name=tname, subject_id=subject.id)
        db.session.add(topic)
        db.session.commit()

    qyear = '2021'
    qpaper = '1'
    qnumber = '3'
    q_url = 'https://example.com/q3.png'
    qm_url = 'https://example.com/q3_ms.pdf'

    # checking if questions exists already
    question = Question.query.filter_by(year=qyear, paper=qpaper, number=qnumber, topic_id=topic.id).first()

    if not question:
        question = Question(year=qyear, paper=qpaper, number=qnumber, topic_id=topic.id, image_url=q_url, marking_scheme_url=qm_url)
        db.session.add(question)
        db.session.commit()

    print('Data added')
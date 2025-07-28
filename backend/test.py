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
    
# with app.app_context():

#     question_data = [
#         ('CIE', 'Physics', 'Forces', '2021', '1', '3', 'https://example.com/q3.png', 'https://example.com/q3_ms.pdf'),
#         ('CIE', 'Physics', 'Waves', '2022', '2', '5', 'https://example.com/q5.png', 'https://example.com/q5_ms.pdf'),
#         ('CIE', 'Chemistry', 'Atoms', '2023', '1', '2', 'https://example.com/atoms_q2.png', 'https://example.com/atoms_q2_ms.pdf'),
#         ('CIE', 'Chemistry', 'Reactions', '2022', '1', '6', 'https://example.com/reactions_q6.png', 'https://example.com/reactions_q6_ms.pdf'),
#         ('AQA', 'Math', 'Algebra', '2021', '1', '1', 'https://example.com/algebra_q1.png', 'https://example.com/algebra_q1_ms.pdf'),
#         ('AQA', 'Math', 'Trigonometry', '2022', '2', '4', 'https://example.com/trig_q4.png', 'https://example.com/trig_q4_ms.pdf'),
#         ('AQA', 'Biology', 'Cells', '2023', '1', '3', 'https://example.com/cells_q3.png', 'https://example.com/cells_q3_ms.pdf'),
#         ('AQA', 'Biology', 'Genetics', '2024', '1', '2', 'https://example.com/genetics_q2.png', 'https://example.com/genetics_q2_ms.pdf'),
#     ]


#     # Board -> Subject -> Topic -> Question
#     board = get_or_create(Board, name='CIE')
#     subject = get_or_create(Subject, name='Physics', board_id=board.id)
#     topic = get_or_create(Topic, name='Forces', subject_id=subject.id)

#     qyear = '2021'
#     qpaper = '1'
#     qnumber = '3'
#     q_url = 'https://example.com/q3.png'
#     qm_url = 'https://example.com/q3_ms.pdf'

#     # check if question exists already
#     question = Question.query.filter_by(
#         year=qyear,
#         paper=qpaper,
#         number=qnumber,
#         topic_id=topic.id
#     ).first()

#     if not question:
#         question = Question(
#             year=qyear,
#             paper=qpaper,
#             number=qnumber,
#             topic_id=topic.id,
#             image_url=q_url,
#             marking_scheme_url=qm_url
#         )
#         db.session.add(question)
#         db.session.commit()

#     print('test data added with duplication checks.')



with app.app_context():
    
    question_data = [
        ('CIE', 'Physics', 'Forces', '2021', '1', '3', 'https://example.com/q3.png', 'https://example.com/q3_ms.pdf'),
        ('CIE', 'Physics', 'Waves', '2022', '2', '5', 'https://example.com/q5.png', 'https://example.com/q5_ms.pdf'),
        ('CIE', 'Chemistry', 'Atoms', '2023', '1', '2', 'https://example.com/atoms_q2.png', 'https://example.com/atoms_q2_ms.pdf'),
        ('CIE', 'Chemistry', 'Reactions', '2022', '1', '6', 'https://example.com/reactions_q6.png', 'https://example.com/reactions_q6_ms.pdf'),
        ('AQA', 'Math', 'Algebra', '2021', '1', '1', 'https://example.com/algebra_q1.png', 'https://example.com/algebra_q1_ms.pdf'),
        ('AQA', 'Math', 'Trigonometry', '2022', '2', '4', 'https://example.com/trig_q4.png', 'https://example.com/trig_q4_ms.pdf'),
        ('AQA', 'Biology', 'Cells', '2023', '1', '3', 'https://example.com/cells_q3.png', 'https://example.com/cells_q3_ms.pdf'),
        ('AQA', 'Biology', 'Genetics', '2024', '1', '2', 'https://example.com/genetics_q2.png', 'https://example.com/genetics_q2_ms.pdf'),
        ('CIE', 'Physics', 'Forces', '2020', '2', '3', 'https://cdn.gcdn.space/Guests%2Fd8b64039_q3.png', 'https://cdn.gcdn.space/Guests%2Fb5cc434b_ms3.png'),
        ('CIE', 'Physics', 'Forces', '2019', '4', '3', 'https://cdn.gcdn.space/Guests%2F7ce5c9a3_image.png', 'https://cdn.gcdn.space/Guests%2Ff252a76f_ms3a.png'),
    ]

    for bname, sname, tname, year, paper, number, q_url, qm_url in question_data:
        board = get_or_create(Board, name=bname)
        subject = get_or_create(Subject, name=sname, board_id=board.id)
        topic = get_or_create(Topic, name=tname, subject_id=subject.id)

        question = Question.query.filter_by(year=year, paper=paper, number=number, topic_id=topic.id).first()

        if not question:
            question = Question(year=year, paper=paper, number=number, topic_id=topic.id, image_url=q_url, marking_scheme_url=qm_url)
            db.session.add(question)
            db.session.commit()


    print('test data added with duplication checks.')
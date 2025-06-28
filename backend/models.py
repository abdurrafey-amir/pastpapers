from app import db


class Subject(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))

class Topic(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    subject_id = db.Column(db.Integer, db.ForeignKey('subject.id'))

class Question(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    year = db.Column(db.String(10))
    paper = db.Column(db.String(10))
    number = db.Column(db.String(10))
    text = db.Column(db.Text)
    topic_id = db.Column(db.Integer, db.ForeignKey('topic.id'))
    image_link = db.Column(db.String(255))
    marking_scheme_link = db.Column(db.String(255))

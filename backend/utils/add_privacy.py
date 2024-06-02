from db_connect import get_db
from sqlalchemy.orm import Session
from constants import privacy_policy
from db_model.privacy_gp import Privacy


def addPrivacyPolicy(db: Session = next(get_db())):
    if db.query(Privacy).all():
        return 
    for policy in privacy_policy:
        db.add(Privacy(**policy))
        db.commit()
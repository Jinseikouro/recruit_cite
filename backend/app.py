from flask_swagger_ui import get_swaggerui_blueprint
from flask import Flask, request, jsonify
from flask_cors import CORS
from model import db, Company, Advertisement, Photo, model
from sqlalchemy import or_
import base64

app = Flask(__name__)
CORS(app)

# app.configにdatabase.configを引きつがせる
app.config.update(model.config)
# DBを初期化
db.init_app(app)


def to_dict_company(company):
    return {
        "id": company.id,
        "name": company.name,
        "description": company.description,
        "requirement": company.requirement,
        "address": company.address
    }


def to_dict_advertisement(advertisement):
    return {
        "id": advertisement.id,
        "title": advertisement.title,
        "photo": None,  # 空のリストとして初期化
        "photo_type": None
    }


def to_dict_comPhoto(comPhoto):
    company, photo, photo_type = comPhoto

    phto_info = {"photo": base64.b64encode(photo).decode(
        'utf-8'), "photo_type": photo_type}
    return {
        "id": company.id,
        "name": company.name,
        "description": company.description,
        "requirement": company.requirement,
        "address": company.address,
        "photo_info": phto_info
    }


@app.route('/hello')
def hello():
    return 'Hello!'


@app.route('/advertisement', methods=['GET'])
def advertisement():
    all_ad = Advertisement.query.all()
    all_ad = [to_dict_advertisement(ad) for ad in all_ad]

    # idが一致する写真をとってくる
    photos = Photo.query.filter(
        Photo.advertisement_id.in_(ad['id'] for ad in all_ad)
    ).all()

    # ad_idをキーとして、バリューに空の二重辞書を作る
    photos_dict = {ad_id: {"photo": [], "photo_type": None}
                   for ad_id in (ad['id'] for ad in all_ad)}

    # advertisement_idがphotos_dictにあった場合、エンコードして詰める。
    # photo_typeも詰める
    for photo in photos:
        if photo.advertisement_id in photos_dict:
            photos_dict[photo.advertisement_id]["photo"] = (
                base64.b64encode(photo.photo).decode('utf-8'))
            photos_dict[photo.advertisement_id]["photo_type"] = photo.photo_type

    # 参照型なので、foreach文でも変更が反映される
    for ad in all_ad:
        if ad["id"] in photos_dict:
            ad["photo"] = photos_dict[ad["id"]]["photo"]
            ad["photo_type"] = photos_dict[ad["id"]]["photo_type"]

    return jsonify(all_ad)

# app.route('/compy/<id>', methods=['GET'])
# urlの命名は、dbのテーブルに由来することが多い


@app.route('/company', methods=['POST'])
def search():
    word = request.json
    word = word['word']

    # LEFT JOINを使用して会社情報と写真情報を一度に取得する
    all_com = db.session.query(
        Company,
        Photo.photo,
        Photo.photo_type
    ).select_from(Company).outerjoin(Photo, Company.id == Photo.company_id).filter(
        or_(
            Company.name.like(f'%{word}%'),
            Company.description.like(f'%{word}%'),
            Company.requirement.like(f'%{word}%'),
            Company.address.like(f'%{word}%')
        )
    ).all()

    all_com = [to_dict_comPhoto(com) for com in all_com]

    return jsonify(all_com)


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)

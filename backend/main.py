from flask import Flask
from flask import jsonify
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['Access-Control-Allow-Origin'] = '*';

# Обработчик ошибки 404 (Нет такой страницы/запроса)
@app.errorhandler(404)
@cross_origin()
def error404(e):
    message = {'message':'Error 404'}
    print("Build")
    return jsonify(message)


# Запросы на работу с проектом
# На данный момент просто заглушки без логики

@app.route("/build")
@cross_origin()
def build():
    message = {'message':'Is build!'}
    print("Build")
    return jsonify(message)
    
 
@app.route("/run")
@cross_origin()
def run():
    message = {'message':'Is runing!'}
    print("Runing...")
    return jsonify(message)


if __name__ == '__main__':
    app.run(debug=True)

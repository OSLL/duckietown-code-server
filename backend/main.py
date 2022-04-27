
from flask import Flask, request
from flask_cors import CORS, cross_origin
from flask import jsonify


app = Flask(__name__)
cors = CORS(app)
app.config['Access-Control-Allow-Origin'] = '*';


@app.route("/build", methods=['GET'])
@cross_origin()
def build():
    hostName = request.args.get('hostName')
    message = {'message':'Solution was build solution!'}
    return jsonify(message)


@app.route("/run", methods=['GET'])
@cross_origin()
def run():
    hostName = request.args.get('hostName')
    message = {'message':'Run solution!'}
    return jsonify(message)

@app.route("/stop", methods=['GET'])
@cross_origin()
def stop():
    hostName = request.args.get('hostName')
    message = {'message':'Stop solution!'}
    return jsonify(message)



if __name__ == '__main__':
    app.run(debug=True, port=5001)

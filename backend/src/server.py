from flask import Flask, request
from flask_cors import CORS, cross_origin
from solution.test_run import run_template_ros_core
from solution.test_build import build_template_ros_core
from solution.test_stop import stop_template_ros_core
from flask import jsonify

app = Flask(__name__)
cors = CORS(app)
app.config['Access-Control-Allow-Origin'] = '*'


@app.route("/build", methods=['GET'])
#@cross_origin()
def build():
    hostname: str = request.args.get("hostname")
    build_template_ros_core(hostname)
    message = {'message': 'Solution was build solution!'}
    return jsonify(message)


@app.route("/run", methods=['GET'])
#@cross_origin()
def run():
    hostname: str = request.args.get("hostname")
    run_template_ros_core(hostname)
    message = {'message': 'Run solution!'}
    return jsonify(message)


@app.route("/stop", methods=['GET'])
#@cross_origin()
def stop():
    hostname = request.args.get("hostname")
    stop_template_ros_core(hostname)
    message = {'message': 'Stop solution!'}
    return jsonify(message)


if __name__ == '__main__':
    app.run(debug=True, port=5001)

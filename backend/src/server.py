from concurrent.futures import ThreadPoolExecutor

from flask import Flask, request
from flask import jsonify
from flask_cors import CORS
from flask_sock import Sock

from solution.test_build import build_template_ros_core
from solution.test_run import run_template_ros_core
from solution.test_stop import stop_template_ros_core

app = Flask(__name__)
cors = CORS(app)
app.config['Access-Control-Allow-Origin'] = '*'
sock = Sock(app)
notifications = []
executor = ThreadPoolExecutor(3)


@sock.route('/notifications')
def notify(ws):
    while True:
        for val in notifications:
            ws.send(val)
            notifications.remove(val)


@app.route("/build", methods=['GET'])
# @cross_origin()
def build():
    hostname: str = request.args.get("hostname")
    executor.submit(do_build, hostname)
    message = {'message': 'Started solution build!'}
    return jsonify(message)


def do_build(hostname):
    build_template_ros_core(hostname)
    notifications.append("ended")


@app.route("/run", methods=['GET'])
# @cross_origin()
def run():
    hostname: str = request.args.get("hostname")
    executor.submit(do_run, hostname)
    message = {'message': 'Run solution!'}
    return jsonify(message)


def do_run(hostname):
    run_template_ros_core(hostname)
    notifications.append("ended")


@app.route("/stop", methods=['GET'])
# @cross_origin()
def stop():
    hostname = request.args.get("hostname")
    executor.submit(do_stop, hostname)
    message = {'message': 'Stop solution!'}
    return jsonify(message)


def do_stop(hostname):
    stop_template_ros_core(hostname)
    notifications.append("ended")


if __name__ == '__main__':
    app.run(debug=True, port=5001)

from flask import Flask, request
from pathlib import Path
from solution.test_run import run_template_ros_core
from solution.test_build import build_template_ros_core

app = Flask(__name__)


@app.route("/build", methods=['GET'])
def build():
    hostname: str = request.args.get("hostname")
    directory: str = request.args.get("dir")
    log: str = request.args.get("log")
    build_template_ros_core(hostname, Path(directory), Path(log))


@app.route("/run", methods=['GET'])
def run():
    hostname: str = request.args.get("hostname")
    directory: str = request.args.get("dir")
    log: str = request.args.get("log")
    run_template_ros_core(hostname, Path(directory), Path(log))


if __name__ == '__main__':
    app.run(debug=True, port=5001)

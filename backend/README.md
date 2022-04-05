# duckietown-code-server
____
## Run flask API
1. Run `pip install virtualenv`
2. Run `virtualenv flask` in `flask-api` directory.
3. Run `flask/bin/pip install flask`
4. Run `chmod a+x app.py`
5. Run `./app.py` to run app.
6. You can test app using `curl`. For example: `curl -i http://localhost:5000/todo/api/v1.0/tasks`
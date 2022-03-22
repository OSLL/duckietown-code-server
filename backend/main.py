from flask import Flask

app = Flask(__name__)

# Для отрисовки ответа по центру
def visual(message):
    return ("<div style=\"display:flex;justify-content: center;\"><h1> {} </h1></div>").format(message)

# Обработчик ошибки 404 (Нет такой страницы/запроса)
@app.errorhandler(404)
def error404(e):
    return visual("Error 404")


# Запросы на работу с проектом
# На данный момент просто заглушки без логики

@app.route("/build")
def build():
    return visual("Is built!")

@app.route("/run")
def run():
    return visual("Is runing!")

@app.route("/clone_repo")
def clone_repo():
    return visual("Is cloning repo!")



if __name__ == '__main__':
    app.run(debug=True)

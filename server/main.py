from flask import Flask

app = Flask(__name__)


@app.get("/")
def index():
    return "HOLA"


if __name__ == "__main__":
    app.run(debug=True, port=7000)

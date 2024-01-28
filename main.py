from flask import Flask, render_template, send_from_directory


app = Flask(__name__)


@app.get("/")
def index():
    return render_template("index.html")


@app.get("/update")
def update():
    return render_template("update.html")


@app.get("/create")
def create():
    return render_template("create.html")


@app.get("/tourVoteSongs")
def tour_vote_songs():
    return render_template("tourVoteSongs.html")


@app.route("/<path:path>", methods=["GET"])
def static_files(path):
    return send_from_directory("public", path)


@app.errorhandler(404)
def page_not_found(_):
    return render_template("404errorPage.html")


if __name__ == "__main__":
    app.run(debug=True, port=7000)

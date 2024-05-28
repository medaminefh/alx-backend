#!/usr/bin/env python3

""" Flask app """

from flask import Flask, render_template, request
from flask_babel import Babel

app = Flask(__name__)
babel = Babel(app)


class Config():
    """ Config """
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"


app.config.from_object(Config)
babel.init_app(app)


@babel.localeselector
def get_locale():
    """ get locale """
    return request.accept_languages.best_match(['de', 'fr', 'en'])


@app.route('/')
def index():
    """ index """
    return render_template("2-index.html")


if __name__ == "__main__":
    app.run()

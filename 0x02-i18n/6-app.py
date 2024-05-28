#!/usr/bin/env python3

""" Flask app """

from flask import Flask, render_template, request, g
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
users = {
    1: {"name": "Balou", "locale": "fr", "timezone": "Europe/Paris"},
    2: {"name": "Beyonce", "locale": "en", "timezone": "US/Central"},
    3: {"name": "Spock", "locale": "kg", "timezone": "Vulcan"},
    4: {"name": "Teletubby", "locale": None, "timezone": "Europe/London"},
}


@babel.localeselector
def get_locale():
    """ get locale """
    locale = request.args.get('locale', None)
    if locale and locale in app.config['LANGUAGES']:
        return locale
    user = g.user
    if user and user.get('locale') in app.config['LANGUAGES']:
        return user.get('locale')
    header_Locale = request.headers.get('locale', None)
    if header_Locale and header_Locale in app.config['LANGUAGES']:
        return header_Locale
    return request.accept_languages.best_match(app.config['LANGUAGES'])


def get_user():
    """ get user """
    user_id = request.args.get('login_as')
    if user_id:
        return users.get(int(user_id))
    return None


@app.before_request
def before_request():
    """ before request """
    g.user = get_user()


@app.route('/')
def index():
    """ index """
    return render_template("6-index.html")


if __name__ == "__main__":
    app.run()

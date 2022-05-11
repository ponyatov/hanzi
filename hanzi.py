#!/usr/bin/env python3

import config
import os, sys
import flask, flask_sock

app = flask.Flask(__name__)
app.config['SECRET_KEY'] = config.SECRET

sock = flask_sock.Sock(app)

@sock.route('/sock')
def sock(ws):
    while True:
        ws.send(ws.receive())

@app.route('/')
def index(): return flask.render_template('index.html')

@app.route('/hanzi/<path:path>')
def hanzi(path):
    hwd = 'https://cdn.jsdelivr.net/npm/hanzi-writer-data'
    def send(path): return flask.send_from_directory('static/hanzi', path)
    try:
        return send(path)
    except:
        os.system(f'wget -c -O static/hanzi/{path} {hwd}/{path}')
        return send(path)

if __name__ == '__main__':
    for i in sys.argv: print(i)
    app.run(debug=True, host=config.HOST, port=config.PORT,
            extra_files=['static/js.js', 'static/css.css', 'templates/index.html'])

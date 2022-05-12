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

voc = {
    '零': 0, '一': 1, '二': 2, '三': 3, '四': 4,
    '五': 5, '六': 6, '七': 7, '八': 8, '九': 9,
    '十': 10,
}

@app.route('/voc.js')
def vocjs(): return f'const voc = {voc};'

mistake = {}

@app.route('/mistake.js')
def mistakejs(): return f'mistake = {mistake};'

@app.route('/mis/<char>/<int:count>', methods=['PUT'])
def mis(char, count):
    mistake[char] = count; return ''

correct = {}

@app.route('/correct.js')
def correctjs(): return f'correct = {correct};'

@app.route('/corr/<char>/<int:count>', methods=['PUT'])
def corr(char, count):
    correct[char] = count; return ''

complete = {}

@app.route('/complete.js')
def completejs(): return f'complete = {complete};'

@app.route('/compl/<char>/<int:count>', methods=['PUT'])
def compl(char, count):
    complete[char] = count; return ''

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

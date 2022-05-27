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

digits = {
    '零': 0, '一': 1, '二': 2, '三': 3, '四': 4,
    '五': 5, '六': 6, '七': 7, '八': 8, '九': 9,
    '十': 10,
}

less1 = {
    '攵': 'ударять', '大': 'большой', '女': 'женщина',
    '人': 'человек', '几': 'столик',
    '力': 'сила', '又': 'правая рука', '又': 'вдобавок',
}

less2 = {
    '好': 'добрый',
}

less3 = {
    '水': 'вода', '氵': 'вода', '冰': 'лёд', '冫': 'лёд',
    '小': 'маленький', '刀': 'нож', '刂': 'нож', '兔': 'заяц',
    '欠': 'недоставать', '欠': 'задолжать',
    '火': 'огонь', '灬': 'огонь', '土': 'земля',
    '士': 'воин', '士': 'учёный',
    '厶': 'личный', '工': 'работа',
    '走': 'идти',
    '走': 'уходить',
    '止': 'остановиться',
    '金': 'металл', '钅': 'металл', '钢': 'сталь',
    '山': 'гора', '阝': 'холм', '队': 'команда', '阜': 'холм',
    '禾': 'злак', '木': 'дерево', '茶': 'чай', '米': 'рис',
    '谷': 'крупа',
    '术': 'метод', '厂': 'завод', '厂': 'обрыв',
    '广': 'обширный', '斤': 'топор', '口': 'рот',
}

less33 = {
    '找': 'искать', '去': 'удалять',
    '办': 'управлять',
    '公': 'господин',
    '室': 'комната',
    '左': 'левый', '右': 'правый',
    '法': 'правило', '则': 'раздел', '页': 'страница',
    '加': 'добавлять', '欣': 'радостный',
    '斧': 'секира',
}

less4 = {
    '乙': 'второй', '马': 'лошадь',
    '风': 'информация', '风': 'ветер',
    '廴': 'длинный шаг',
    '尸': 'труп', '户': 'двор',
    '问': 'спрашивать',
    '谢': 'благодарить',
    '草': 'сено',
    '心': 'сердце',
    '医': 'медицина',
}

colors = {
    '红': 'красный', '绿': 'зелёный', '蓝': 'синий',
    '白': 'белый', '黑': 'чёрный', '黃': 'жёлтый',
    '青': 'сине-зеленый',
}

less5 = {
    '父': 'отец', '爸': 'папа', '母': 'мать', '妈': 'мама',
    '每': 'каждый',
    '虫': 'насекомое', '巴': 'автобус', '门': 'ворота',
    '田': 'поле', '电': 'электричество', '脑': 'мозг',
    '男': 'мужчина',
    '月': 'месяц', '日': 'солнце', '曰': 'говорить',
    '目': 'глаз',
    '生': 'жизнь', '几': 'сколько?',
    '文': 'письменность', '辶': 'быстро идти',
    '讠': 'речь',
    '隹': 'короткохвостая птица',
    '老': 'старый', '师': 'учитель',
    '谁': 'кто',
}

less6 = {
    '拜': 'приветствовать',
    '中': 'середина',
    '玉': 'яшма', '王': 'король',
    '国': 'страна', '主': 'владелец', '囗': 'ограда',
    '没': 'нет', '殳': 'наконечник', '弓': 'лук',
    '矢': 'стрела',
    '车': 'машина',
    '牛': 'корова', '羊': 'баран', '豕': 'свинья',
    '彑': 'голова свиньи', '互': 'взаимно',
    '犬': 'собака',
    '扌': 'рука', '打': 'бить',
    '贝': 'ракушка',
    '勹': 'обматывать', '句': 'фраза', '勺': 'ложка',
    '巾': 'полотенце',
    '饣': 'еда', '饼': 'блин',
    '饭': 'варёный рис', '粥': 'жидкая каша',
    '稀': 'жидкий',
    '古': 'древний',
    '夕': 'вечер',
    '寸': 'вершок',
    '夂': 'идти',
    '舌': 'язык',
    '示': 'уведомлять', '礻': 'показывать',
    '衤': 'одежда', '衫': 'рубашка', '裤': 'штаны',
}


# voc = digits | less1 | less2 | less3 | less33 | less4 | colors
# voc = voc | less5 | less6
voc = less6

import pinyin
for (key, val) in voc.items():
    ru = val
    pin = pinyin.get(key)
    voc[key] = {
        'ru': ru,
        'pinyin': pin,
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

@app.route('/cache.manifest')
def cache_manifest():
    ret = flask.make_response(render_template('cache.manifest'), 200)
    ret.headers["Content-Type"] = "text/cache-manifest"
    return ret

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
    app.run(
        debug=True, host=config.HOST, port=config.PORT,
        extra_files=[
            'static/js.js', 'static/css.css',
            'templates/index.html'
        ])

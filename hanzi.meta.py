from metaL import *

p = Project() | Py() | Web() | Flask() | Ex() | ExWeb()

p.TITLE = '汉字幔字'
p.SUBTITLE = 'training app for hanzi speed reading /prototype/'

p.reqs // 'pinyin'
p.sync()

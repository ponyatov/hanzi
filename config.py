import os

try: HOST = os.getenv('IP')
except: HOST = "127.0.0.1"

try: PORT = os.getenv('PORT')
except: PORT = 12345

SECRET = b':\x0f\x0e\x15z:\xffW\x9c\x88\xe6\xe4\xbdMV\xfb\x06#\\S\x85\xb8\x98(i\xa1\x14\x14zO\xed\xb1QB'

# var
MODULE = $(notdir $(CURDIR))
module = $(shell echo $(MODULE) | tr A-Z a-z)
OS     = $(shell uname -o|tr / _)
NOW    = $(shell date +%d%m%y)
REL    = $(shell git rev-parse --short=4 HEAD)
BRANCH = $(shell git rev-parse --abbrev-ref HEAD)
PEPS   = E26,E302,E305,E401,E402,E701,E702
CDNJS  = https://cdnjs.cloudflare.com/ajax/libs
JSDLVR = https://cdn.jsdelivr.net/npm

# version
JQUERY_VER  = 3.6.0
BS_DARK_VER = 1.1.3
BS_VER      = 5.1.3
HANZI_VER   = 3.2

# tool
CURL   = curl -L -o
CF     = clang-format
PY     = $(shell which python3)
PIP    = $(shell which pip3)
PEP    = $(shell which autopep8)

# src
P += $(MODULE).py config.py
P += metaL.gen rc
S += $(P)
J += static/js.js
S += $(J)

# all
.PHONY: all
all:
	$(MAKE) format

GEN = py flask web js hanzi
.PHONY: gen
gen:
	./metaL.gen $(GEN) && $(MAKE) format

.PHONY: web
web: $(PY) $(MODULE).py
	$^ $@

# format
.PHONY: format
format: tmp/format_py tmp/format_js

tmp/format_py: $(P)
	$(PEP) --ignore=$(PEPS) -i $? && touch $@
tmp/format_js: $(J)
	$(CF) -style=google -i $? && touch $@

# doc
doxy: doxy.gen
	rm -rf docs ; doxygen $< 1>/dev/null

doc:

# install
install: $(OS)_install doc gz
	$(MAKE) update
update: $(OS)_update doc gz
	$(PIP) install --user -U pip autopep8 pytest
	$(PIP) install --user -U -r requirements.txt

GNU_Linux_install:
GNU_Linux_update:
	sudo apt update
	sudo apt install -yu `cat apt.dev apt.txt`

gz: \
	static/cdn/hanzi-writer.js \
	static/cdn/bootstrap-night.min.css \
	static/cdn/bootstrap.bundle.min.js \
	static/cdn/bootstrap.bundle.min.js.map \
	static/cdn/jquery.min.js

static/cdn/hanzi-writer.js:
	$(CURL) $@ $(JSDLVR)/hanzi-writer@$(HANZI_VER)/dist/hanzi-writer.js

static/cdn/jquery.min.js:
	$(CURL) $@ $(CDNJS)/jquery/$(JQUERY_VER)/jquery.min.js
static/cdn/bootstrap-night.min.css:
	$(CURL) $@ $(JSDLVR)/bootstrap-dark-5@$(BS_DARK_VER)/dist/css/bootstrap-night.min.css
static/cdn/bootstrap.bundle.min.js:
	$(CURL) $@ $(JSDLVR)/bootstrap@$(BS_VER)/dist/js/bootstrap.bundle.min.js
static/cdn/bootstrap.bundle.min.js.map:
	$(CURL) $@ $(JSDLVR)/bootstrap@$(BS_VER)/dist/js/bootstrap.bundle.min.js.map

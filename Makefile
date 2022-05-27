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

# dir
CWD   = $(CURDIR)
TMP   = $(CWD)/tmp

# tool
CURL   = curl -L -o
CF     = clang-format
PY     = $(shell which python3)
PIP    = $(shell which pip3)
PEP    = $(shell which autopep8)
IEX    = iex
MIX    = mix

# src
P += $(MODULE).py config/__init__.py
P += metaL.py $(MODULE).meta.py
S += $(P) rc
J += static/js.js static/elixir.js
S += $(J)
X += mix.exs
X += $(shell find lib    -type f -regex .+.ex$$)
X += $(shell find test   -type f -regex .+.ex$$)
X += $(shell find config -type f -regex .+.ex$$)
S += $(X) $(E)

# all
.PHONY: all
all:
	$(MIX)  compile
	$(MAKE) format

.PHONY: flask
flask: $(PY) $(MODULE).py
	$^ $@

.PHONY: watch
watch:
	$(IEX) -S $(MIX)

.PHONY: gen
gen: $(PY) $(MODULE).meta.py
	$^ && $(MAKE) format

# format
.PHONY: format
format: tmp/format_py tmp/format_js tmp/format_ex

tmp/format_py: $(P)
	$(PEP) --ignore=$(PEPS) -i $? && touch $@

tmp/format_js: $(J)
	$(CF) -style=google -i $? && touch $@

tmp/format_ex: $(X)
	$(MIX) format && touch $@

# doc

.PHONY: doxy
doxy: doxy.gen
	rm -rf docs ; doxygen $< 1>/dev/null

.PHONY: doc
doc:
	mkdir -p doc/bib
	rsync -rv ~/mdoc/hanzi/*         doc/hanzi/
	rsync -rv ~/mdoc/Erlang/*        doc/Erlang/
	rsync -rv ~/mdoc/Elixir/*        doc/Elixir/
	rsync -rv ~/mdoc/bib/Erlang/*    doc/bib/Erlang/

# install
.PHONY: install update updev
install: $(OS)_install doc gz
	$(MAKE) update
	$(MIX)  local.hex
update: $(OS)_update doc gz
	$(PIP) install --user -U pip autopep8 xxhash
	$(PIP) install --user -U -r requirements.txt
	$(MIX) deps.get
updev: update
	sudo apt install -yu `cat apt.dev`

GNU_Linux_install:
GNU_Linux_update:
	sudo apt update
	sudo apt install -yu `cat apt.txt`

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

# merge
MERGE  = Makefile README.md .clang-format doxy.gen $(S)
MERGE += .vscode bin doc config lib inc src tmp test
MERGE += apt.dev apt.txt requirements.txt
MERGE += static templates

dev:
	git push -v
	git checkout $@
	git pull -v
	git checkout shadow -- $(MERGE)
	$(MAKE) doc && git add doc

shadow:
	git push -v
	git checkout $@
	git pull -v

release:
	git tag $(NOW)-$(REL)
	git push -v --tags
	$(MAKE) shadow

ZIP = tmp/$(MODULE)_$(NOW)_$(REL)_$(BRANCH).zip
zip:
	git archive --format zip --output $(ZIP) HEAD

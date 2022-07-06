SRC = src
AUX = auxiliary
BUILD = build

STYLE = $(AUX)/style.css
PREAMBLE = $(AUX)/preamble.html
POSTAMBLE = $(AUX)/postamble.html
HIGHLIGHT = $(SRC)/highlight.theme

MD := $(wildcard $(SRC)/*.md)
HTML := $(addprefix $(BUILD)/,$(notdir $(MD:.md=.html)))

ifneq ($(shell git rev-parse -q --verify origin/$(BUILD); echo $$?),1)
	UPDATE = checkout
else
	UPDATE = init
endif

.PHONY: all branch checkout init
all: $(PREAMBLE) $(POSTAMBLE) $(HTML)
branch: $(UPDATE)
init: $(BUILD)
checkout:
	git fetch origin $(BUILD):$(BUILD)
	git clone . $(BUILD)
	cd $(BUILD); git checkout origin/$(BUILD)

# create dir if needed
$(BUILD):
	mkdir $(BUILD)

$(HTML): $(BUILD)/%.html: $(SRC)/%.md
	pandoc -f markdown+markdown_in_html_blocks -t html5 --highlight-style $(HIGHLIGHT) -A $(POSTAMBLE) -H $(PREAMBLE) -s --katex -o $@ $?
# 	pandoc -c style.css

$(POSTAMBLE): $(SRC)/script.js
	echo "<script>" | cat - $? > $@
	echo "</script>" >> $@

$(PREAMBLE): $(SRC)/style.sass
	npm run sass -- $? $(STYLE)
	echo "<style>" | cat - $(STYLE) > $@
	echo "</style>" >> $@

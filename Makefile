src = src
build = build

preamble = $(src)/preamble.html
highlight = $(src)/highlight.theme

MD := $(wildcard $(src)/*.md)
HTML := $(addprefix $(build)/,$(notdir $(MD:.md=.html)))
pandoc := pandoc -f markdown+markdown_in_html_blocks -t html5 --highlight-style $(highlight) -s --katex --toc

ifneq ($(shell git rev-parse -q --verify origin/$(build); echo $$?),1)
	UPDATE = checkout
else
	UPDATE = init
endif

.PHONY: all branch checkout init
all: $(build)/script.js $(build)/style.css $(HTML)
branch: $(UPDATE)
init: $(build)
checkout:
	git fetch origin $(build):$(build)
	git clone . $(build)
	cd $(build); git checkout origin/$(build)

# create dir if needed
$(build):
	mkdir $(build)

$(HTML): $(build)/%.html: $(src)/%.md
	$(pandoc) -H $(preamble) -o $@ $?
# 	pandoc -c style.css

$(build)/script.js: $(src)/script.js
	cp $? $@

$(build)/style.css: $(src)/styles/style.sass
	npm run sass -- $? $@

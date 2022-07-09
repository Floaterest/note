src = src
build = build

preamble = $(src)/preamble.html
highlight = $(src)/highlight.theme

markdown := $(wildcard $(src)/*.md)
html := $(addprefix $(build)/,$(notdir $(markdown:.md=.html)))
fonts := $(addprefix $(build)/,$(notdir $(wildcard $(src)/*.woff2)))
pandoc := pandoc -f markdown+markdown_in_html_blocks -t html5 --highlight-style $(highlight) -s --katex --toc

.PHONY: all 

all: $(build)/style.css $(build)/script.js $(fonts) $(html)

$(fonts): $(build)/%.woff2: $(src)/%.woff2
	cp $? $@

$(html): $(build)/%.html: $(src)/%.md
	$(pandoc) -H $(preamble) -o $@ $?
# 	pandoc -c style.css

$(build)/script.js: $(src)/script.js
	cp $? $@

$(build)/style.css: $(src)/styles/style.sass
	npm run sass -- $? $@

src := src
build := build
notes := notes

preamble = $(src)/preamble.html
highlight = $(src)/highlight.theme

markdown := $(wildcard $(notes)/*.md)
html := $(addprefix $(build)/,$(notdir $(markdown:.md=.html)))
fonts := $(addprefix $(build)/,$(notdir $(wildcard $(src)/fonts/*.woff2)))
pandoc := pandoc -f markdown+markdown_in_html_blocks -t html5 --highlight-style $(highlight) -s --katex --toc

.PHONY: all 

all: $(build)/style.css $(build)/script.js $(fonts) $(html)

# copy fonts
$(fonts): $(build)/%.woff2: $(src)/fonts/%.woff2
	cp $? $@

# build each html
$(html): $(build)/%.html: $(notes)/%.md
	$(pandoc) -H $(preamble) -o $@ $?
# 	pandoc -c style.css

# copy script
$(build)/script.js: $(src)/script.js
	cp $? $@

# build style
$(build)/style.css: $(src)/styles/style.sass
	npm run sass -- $? $@

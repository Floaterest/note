.PHONY: svg

dist := dist
pdf = $(wildcard *.pdf)
svg = $(addprefix $(dist)/,$(pdf:.pdf=.svg))

# assume pdf2svg is installed
pdf2svg: $(svg)

$(svg): $(dist)/%.svg: %.pdf
	pdf2svg $? $@

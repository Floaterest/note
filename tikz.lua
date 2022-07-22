local system = require 'pandoc.system'

local tikz_doc_template = [[
\documentclass{standalone}
\usepackage{xcolor}
\usepackage{tikz}
\usetikzlibrary{automata,positioning,arrows.meta,3d}
\tikzset{initial text=,on grid,auto,thick}
\tikzset{->/.style={arrows={-{Straight Barb[length=4pt]}}}}
\begin{document}
\nopagecolor
%s
\end{document}
]]

local function tikz2image(src, out)
    system.with_temporary_directory('tikz2image', function (tmpdir)
        system.with_working_directory(tmpdir, function()
            local f = assert(io.open('tikz.tex', 'w'))
            f:write(tikz_doc_template:format(src))
            f:close()
            os.execute('pdflatex tikz.tex')
            os.execute('pdf2svg tikz.pdf ' .. out)
            -- set width and height to 100%
            -- os.execute([[perl -p -i -e 's/((?<=width=")|(?<=height="))\d+\.\d+pt/100%/g' ]] .. out)
            -- replace xmlns with .tikz
            -- os.execute([[perl -p -i -e 's/(?<=<svg )(\s?xmlns\S+){2}/class="tikz"/' ]] .. out)
            -- os.execute([[perl -p -i -e 's/<svg/<svg class="tikz"/' ]] .. out)
        end)
    end)
end

local function file_exists(name)
    local f = io.open(name, 'r')
    if f ~= nil then
        io.close(f)
        return true
    else
        return false
    end
end

local function starts_with(start, str)
    return str:sub(1, #start) == start
end

function Math(el)
    if starts_with('\\begin{tikzpicture}', el.text) then
        local fbasename = pandoc.sha1(el.text) .. '.svg'
        local fname = system.get_working_directory() .. '/build/' .. fbasename
        if not file_exists(fname) then
            tikz2image(el.text, fname)
        end
        -- local f = assert(io.open(fname, 'r'))
        -- local content = f:read('*all')
        -- f:close()
        return pandoc.RawInline('html', '<img width="100%" height="100%" class="tikz" src=./' .. fbasename .. ">")
        -- return pandoc.RawInline('html', content)
    else
        return el
    end
end

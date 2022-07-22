// hide/show table of contents
$('html').click(() => $('#TOC').toggleClass('show'));
$('body').click(e => e.stopPropagation());

function cmp(ha, hb){
    // compare header tags, h1 > h2
    if(ha == hb) return 0;
    // h1 > h2 => 1    h2 < h1 => -1
    return (+ha[1] < +hb[1]) * 2 - 1;
}

function toggle({ target }){
    const hidden = ' hidden';
    const { tagName, nextElementSibling } = target;
    const hide = !target.classList.contains('collapsed');
    target.classList.toggle('collapsed');
    const stack = [nextElementSibling];
    // not using classList.add/remove to support multiple 'hidden's for nested hidden headers
    const tog = e => hide
        ? e.className += hidden
        : e.className = e.className.replace(hidden, '');
    while(stack.length){
        const element = stack.pop();
        const tag = element.tagName;
        if(/h\d/i.test(tag) && cmp(tagName, tag) <= 0) continue;

        tog(element);
        stack.push(element.nextElementSibling);
    }
}

// hide contents under a header
$('h1:not(.title),h2,h3').click(toggle);

// no colgroup
$('colgroup').remove();

// add pitch accent
$('span[class^=a]').each((_, e) => {
    const acc = +e.className.substr(1);
    const text = e.innerText;
    if (acc !== 1) {
        $('<span>').text(text[0]).addClass('low right').insertBefore(e);
    }

    // $('<span>').text(text.substring(acc !== 1, acc || undefined)).addClass([
    //     'high', acc && 'right'
    // ]).insertBefore(e);

    $('<span>').text(
        text.substring(acc !== 1, acc ? acc - 1 : undefined)
    ).addClass('high').insertBefore(e);
    
    if(acc){
        $('<span>').text(text[acc - 1]).addClass('high p right').insertBefore(e);
    }

    if (acc && acc != text.length) {
        $('<span>').addClass('low').text(text.substring(acc)).insertBefore(e);
    }
    e.remove();
});


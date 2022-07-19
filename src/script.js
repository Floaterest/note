// open details that are not examples
$('details:not(.example)').attr('open', true);

// hide/show table of contents
$('h1,h2,h3').click(() => $('#TOC').toggleClass('show'));

// add pitch accent
$('span[class^=a]').each((_, e) => {
    const acc = +e.className.substr(1);
    const text = e.innerText;
    if (acc !== 1) {
        $('<span>').text(text[0]).addClass('low right').insertBefore(e);
    }

    $('<span>').text(text.substring(acc !== 1, acc || undefined)).addClass([
        'high', acc && 'right'
    ]).insertBefore(e);

    if (acc && acc != text.length) {
        $('<span>').addClass('low').text(text.substring(acc)).insertBefore(e);
    }
    e.remove();
});

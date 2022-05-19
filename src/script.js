const headers = ['h1', 'h2', 'h3'];
const hidden = ' hidden';
const toc = document.querySelector('#TOC');
const isheader = tag => /h\d/.test(tag);

function cmp(a,b){ // assume h1 > h2
	// same header level
	if(a === b) return 0;
	// h1 > h2 => 1    h2 < h1 => -1
	return (+a[1] < +b[1]) * 2 - 1;
}

function toggle(tag, element, hide){
	if(!element) return;

	const t = element.tagName.toLowerCase();
	if(isheader(t) && cmp(tag, t) <= 0) return;

	if(hide){
		element.className += hidden;
	}else{
		element.className = element.className.replace(hidden, '');
	}
	toggle(tag, element.nextElementSibling, hide);
}

// open all details
document.querySelectorAll('details:not(.example)').forEach(e => e.open = true);

// hide/show table of contents
headers.forEach(
	tag => document.querySelectorAll(tag + ':not(.title)').forEach(
		element => element.onclick = () => toc.classList.toggle('show')
	)
);
// click on title to toggle all h1
document.querySelector('h1.title').onclick = () => document.querySelectorAll('h1:not(.title)').forEach(h1 => h1.click());


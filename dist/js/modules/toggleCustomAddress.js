function toggleCustomAddress(element, state = 'hide') {
	state === 'show' ? 'block' : 'none'
	element.style.display = toggle
	// document.querySelector('select').setAttribute('data-radius', 'top')
}

export default toggleCustomAddress
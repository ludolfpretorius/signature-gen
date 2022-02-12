function toggleRemoteAddress(showOrHideString) {
	const element = document.querySelector('#inputs #remote-address')
	if (!element) {
		return;
	}
	
	const action = showOrHideString === 'show' ? 'add' : 'remove'
	element.classList[action]('show')
	if (showOrHideString === 'hide') {
		element.value = ''
	}
}

export default toggleRemoteAddress
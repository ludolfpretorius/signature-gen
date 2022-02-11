function toggleClass(element, className) {
	const elementsWithClass = document.querySelectorAll('.' + className)
	if (elementsWithClass.length) {
		elementsWithClass.forEach(a => {
			if (a !== element) a.classList.remove(className)
		})
	}
	element.classList.toggle(className)
}	

function toggleLoader(showOrHideString) {
	const loader = document.querySelector('#loader')
	const action = showOrHideString === 'show' ? 'add' : 'remove'
	loader.classList[action]('show')
}

function togglePopup(showOrHideString) {
	const popup = document.querySelector('#popup')
	const action = showOrHideString === 'show' ? 'add' : 'remove'
	
	popup.classList[action]('show')
	document.body.classList[action]('no-scroll')
}

function togglePopupLoader(showOrHideString) {
	const action = showOrHideString === 'show' ? 'add' : 'remove'
	const popupLoader = popup.querySelector('#popup #popup-loader')
	popupLoader.classList[action]('show')
}

export {
	toggleClass,
	toggleLoader,
	togglePopup,
	togglePopupLoader
}
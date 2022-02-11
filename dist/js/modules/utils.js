function toggleClass(element, className) {
	const elementsWithClass = document.querySelectorAll('.' + className)
	if (elementsWithClass.length) {
		elementsWithClass.forEach(a => {
			if (a !== element) a.classList.remove(className)
		})
	}
	element.classList.toggle(className)
}	

function toggleLoader() {
	const loader = document.querySelector('#loader')
	loader.classList.toggle('show')
}

function togglePopup(element) {
	const popup = document.querySelector('#popup')
	const popupLoader = popup.querySelector('#popup-loader')
	popup.classList.toggle('show')
	popupLoader.classList.toggle('hide')
	document.body.classList.toggle('no-scroll')
}

export {
	toggleClass,
	toggleLoader,
	togglePopup
}
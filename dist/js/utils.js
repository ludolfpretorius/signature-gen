Object.prototype.el = function(el, where = document) {
    const elems = where.querySelectorAll(el)
    return elems.length > 1 ? [...elems] : elems[0]
}

function copyEl(element) {
	const selection = window.getSelection()       
	const range = document.createRange()
	range.selectNodeContents(element)
	selection.removeAllRanges()
	selection.addRange(range)
	document.execCommand('copy')
}

function toggleClass(element, theClass, eventTarget) {
	if (Array.isArray(element)) {
		element.map(a => {
			a.classList.contains(theClass) ? a.classList.remove(theClass) : ''
		})
		eventTarget !== undefined ? eventTarget.classList.add(theClass) : ''
	} else {
		element.classList.contains(theClass) ? element.classList.remove(theClass) : element.classList.add(theClass)
	}
}

export {copyEl, toggleClass}
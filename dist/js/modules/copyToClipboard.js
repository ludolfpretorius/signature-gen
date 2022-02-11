function copyElem(element) {
	const selection = window.getSelection()       
	const range = document.createRange()
	range.selectNodeContents(element)
	selection.removeAllRanges()
	selection.addRange(range)
	document.execCommand('copy')
}

function notification(element) {
	const currentText = element.innerText
	element.classList.add('copied')
	element.innerHTML = '<span style="line-height:12px">📋</span> Copied to clipboard!'
	const removeNotification = setTimeout(() => {
		element.classList.remove('copied')
		element.innerText = currentText
		clearTimeout(removeNotification)
	}, 3000)
}

export {
	copyElem,
	notification
}
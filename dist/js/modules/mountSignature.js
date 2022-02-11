function mountSignature(signature) {
	fetch(`./dist/files/signature-${signature}.html`)
		.then(resp => resp.text())
		.then(data => {
			const popupContentDiv = document.querySelector('#popup-content')
			popupContentDiv.innerHTML = data
			// data[data.signature].sf ? genCode() : ''
		})
		.catch(e => {
			alert('Oops! An error occured. Please try again.\r\n' + e)
			window.location.reload()
		})
}

function mountCode() {
	const target = document.querySelector('#popContent')
	const code = document.createElement('code')
	const minHtml = target.innerHTML.replace(/\r|\n|\r\n|\t|\s\s|(["])[\s]([a-z])/g, '$1$2')
	code.innerText = minHtml
	target.appendChild(code)
	const p = document.createElement('p')
	p.innerHTML = minHtml.length < 1333 ? minHtml.length + ' Characters 👍' : '⚠️ ' + minHtml.length + ' Characters - SF has a limit of 1333 &nbsp;⚠️' + '<br><a href="#" style="font-size:12px" onclick="alert(`Try removing some of the optional details.\r\nOtherwise, shorten the current details.`)">What should I do?</a>'
	target.appendChild(p)
}

export {
	mountSignature,
	mountCode
}
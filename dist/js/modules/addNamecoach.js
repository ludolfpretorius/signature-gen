function addNamecoach(element) {
	if (user.namecoach) {
		const pronounWrap = document.querySelector('#pronounWrap')
		const elem = ``
		element.insertAdjacentHTML('afterend', elem)
		if (pronounWrap) pronounWrap.setAttribute('style', 'vertical-align: top; font-size: 12px;')
	}
}

export default addNamecoach
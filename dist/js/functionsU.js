// OBJECTS
const data = {
	signature: 'two',
	two: {
		btn: document.querySelector('#twoBtn'),
		sf: false,
		info: {}
	},
	gs: {
		btn: document.querySelector('#gsBtn'),
		sf: true,
		info: {}
	},
	tri: {
		btn: document.querySelector('#triBtn'),
		sf: false,
		info: {}
	}
}

//UTILS
function copyElem(element) {
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

function show(el) {
	el.style.display = 'block'
	setTimeout(() => {
		el.classList.add('show')
		el.style.marginTop = '0px'
	}, 0)
}

function hide(el) {
	const height = el.getBoundingClientRect().height //el.offsetHeight
	el.classList.remove('show')
	el.style.marginTop = '-' + height + 'px'
	setTimeout(() => {
		el.style.display = 'none'
		el.querySelectorAll('input').forEach(a => a.value = '')
	}, 1000)
}

function validate(inputVal, validateVal) {
	if (inputVal.includes(validateVal)) {
		return true
	}
	return false
}

// APP FUNCTIONS
function genInputs() {
	const loader = document.querySelector('#loader2')
	loader.classList.contains('hide') ? loader.classList.remove('hide') : ''
	const target = document.querySelector('#inputs')
	target.innerHTML = ''
	fetch(`./dist/files/${data.signature + 'Input'}.html`)
		.then(res => res.text())
		.then(res => {
			loader.classList.add('hide')
			target.insertAdjacentHTML('beforeend', res)
		})
		.then(initHelpTextFunctionality)
		.catch(e => {
			alert('Oops! An error occured. Please try again.\r\n' + e)
			window.location.reload()
		})
}

function checkIfSalesforce(el) {
	toggleClass(el, 'sf-active')
	if (el.classList.contains('sf-active')) {
		data[data.signature].sf = true
		el.innerText = `It's SalesForce compatible!`
	} else {
		data[data.signature].sf = false
		el.innerText = `Make it SalesForce compatible`
	}
}

function checkIfCustom() {
	const more = document.querySelector('.input-wrap .more', document.querySelector('#inputs'))
	const els = [...document.querySelector('.input-wrap').children]
	const custom = els.filter(a => a.value === 'custom')
	custom.length ? data[data.signature].customInput = true : data[data.signature].customInput = false
	if (data[data.signature].customInput) {
		show(more)
		document.querySelector('select').setAttribute('data-radius', 'top')
	} else {
		more ? hide(more) : ''
		document.querySelector('select') ? document.querySelector('select').setAttribute('data-radius', 'all') : ''
	}
}

function storeValue(input) {
	checkIfCustom()
	if (input.classList.contains('custom')) {
		data[data.signature].info.custom = data[data.signature].info.custom ? data[data.signature].info.custom : {}
		data[data.signature].info.custom[input.id] = input.value
	} else {
		data[data.signature].info[input.id] = input.value
	}
	if (input.classList.contains('change') && input.value.length) {
		data[data.signature].change = input.getAttribute('data-sig')
	} else if (input.classList.contains('change') && !input.value.length) {
		delete data[data.signature].change
	}
	const optionals = document.querySelectorAll('.optional')
	optionals.forEach(a => {
		if (optionals.length && a.value === '') {
			data[data.signature].info[a.id] = ''
		}
	})
}

function togglePop() {
	const pop = document.querySelector('#popWrap')
	toggleClass(pop, 'show')
	toggleClass(document.querySelector('body'), 'no-scroll')
	pop.classList.contains('show') ? document.querySelector('#cancel').innerText = 'Cancel' : ''
}

function injectDeets() {
	const sig = document.querySelector('#popContent table')
	const copyBtn = document.querySelector('#copySig')
	const optional = document.querySelectorAll('.optional')
	data[data.signature].sf ? copyBtn.innerText = 'Copy HTML' : copyBtn.innerText = 'Copy signature'
	if (data[data.signature].info.custom) {
		let main;
		const other = [];
		Object.keys(data[data.signature].info.custom).map(a => other.push(a))
		if (data.signature === 'two') {
			data[data.signature].info[other[0].split('-')[0]] = data[data.signature].info.custom[other[0]]	
		} else if (data.signature === 'gs') {
			data[data.signature].info[other[0].split('-')[0]] = `<b>ZA:</b> ${data[data.signature].info.custom[other[0]]} | <b>UK:</b> ${data[data.signature].info.custom[other[1]]} | <b>US:</b> ${data[data.signature].info.custom[other[2]]}`
		} else if (data.signature === 'tri') {
			
		}
		delete data[data.signature].info.custom
	}
	const entries = Object.keys(data[data.signature].info)
	entries.map(a => {
		if (!data[data.signature].info[a].length) {
			document.querySelector(`#${a}Pipe`) ? document.querySelector(`#${a}Pipe`).remove() : ''
			document.querySelector(`#${a}Title`) ? document.querySelector(`#${a}Title`).remove() : ''
			document.querySelector(`#${a}Show`) ? document.querySelector(`#${a}Show`).remove() : ''
		}
		if (document.querySelector(`#${a}Show`)) {
			document.querySelector(`#${a}Show`).innerHTML = data[data.signature].info[a]
		}
	})
}

function showHelpText(elem) {
	const pop = elem.querySelector('.popup')
	pop.classList.add('show')
}

function hideHelpText(elem) {
	const pop = elem.querySelector('.popup')
	pop.classList.remove('show')
}

function initHelpTextFunctionality() {
	const helpTextBtn = document.querySelector('.help-text-btn')
	const popupLink = document.querySelector('.popup-link')
	if (helpTextBtn) {
		helpTextBtn.addEventListener('mouseover', (event) => {
	    	showHelpText(event.currentTarget)
	    })
	    helpTextBtn.addEventListener('mouseleave', (event) => {
	    	hideHelpText(event.currentTarget)
	    })
	    popupLink.addEventListener('click', (event) => {
	    	window.open('https://2u.onelogin.com/client/apps/select/804247454', '_blank')
	    })
	}

}

function addNameCoach(surnameElem) {
	const nameCoachLink = data[data.signature].info.nameCoach
	const containsPronoun = data[data.signature].change
	const parentElem = surnameElem.parentElement
	if (nameCoachLink) {
		const el = `&nbsp;<a href="${nameCoachLink}" target="_blank" style="vertical-align:text-bottom"><img src="https://bit.ly/3DkPwCS" style="width:13px"></a>`
		surnameElem.insertAdjacentHTML('afterend', el)
		const pronounWrap = document.querySelector('#pronounWrap')
		if (pronounWrap) pronounWrap.setAttribute('style', 'vertical-align: top; font-size: 12px;')
	}
}

function genCode() {
	const target = document.querySelector('#popContent')
	const code = document.createElement('code')
	const minHtml = target.innerHTML.replace(/\r|\n|\r\n|\t|\s\s|(["])[\s]([a-z])/g, '$1$2')
	code.innerText = minHtml
	target.appendChild(code)
	const p = document.createElement('p')
	p.innerHTML = minHtml.length < 1333 ? minHtml.length + ' Characters 👍' : '⚠️ ' + minHtml.length + ' Characters - SF has a limit of 1333 &nbsp;⚠️' + '<br><a href="#" style="font-size:12px" onclick="alert(`Try removing some of the optional details.\r\nOtherwise, shorten the current details.`)">What should I do?</a>'
	target.appendChild(p)
}

function genSignature() {
	const loader = document.querySelector('#loader')
	loader.classList.contains('hide') ? loader.classList.remove('hide') : ''
	const target = document.querySelector('#popContent')
	let signature;
	if (data[data.signature].change && data[data.signature].sf) {
		signature = data[data.signature].change + 'SF'
	} else if (data[data.signature].change && !data[data.signature].sf) {
		signature = data[data.signature].change
	} else if (!data[data.signature].change && data[data.signature].sf) {
		signature = data.signature + 'SF'
	} else {	
		signature = data.signature
	}
	if (data.signature === 'two' && (!data[data.signature].info.name || !data[data.signature].info.surname || !data[data.signature].info.title || !data[data.signature].info.address || !data[data.signature].info.office)) {
		alert('Please complete the mandatory Name, Last name, Job Title, Address, and Office number fields.')
		return;
	}
	if (data[data.signature].info.nameCoach) {
		const validated = validate(data[data.signature].info.nameCoach, 'name-coach.com')
		if (!validated) {
			alert('Please use an actual NameCoach link.')
			return;
		}
	}
	target.innerHTML = ''
	togglePop()
	fetch(`./dist/files/${signature}SigU.html`)
		.then(res => res.text())
		.then(res => {
			loader.classList.add('hide')
			target.insertAdjacentHTML('beforeend', res)
			injectDeets()
			addNameCoach(target.querySelector('#surnameShow'))
			data[data.signature].sf ? genCode() : ''
		})
		.catch(e => {
			alert('Oops! An error occured. Please try again.\r\n' + e)
			window.location.reload()
		})
}

function letUserKnowAboutCopy(elem) {
	const currentText = elem.innerText
	toggleClass(elem, 'copied')
	elem.innerHTML = '<span style="line-height:12px">📋</span> Copied to clipboard!'
	document.querySelector('#cancel').innerText = 'Close'
	setTimeout(() => {
		toggleClass(elem, 'copied')
		elem.innerHTML = currentText
		clearTimeout()
	}, 3000)
}

export {
	copyElem,
	toggleClass,
	show,
	hide,
	data,
	genInputs,
	checkIfSalesforce,
	checkIfCustom,
	storeValue,
	togglePop,
	injectDeets,
	showHelpText,
	hideHelpText,
	addNameCoach,
	genCode,
	genSignature,
	letUserKnowAboutCopy
}


import * as utils from './utils.js'


const data = {
	signature: 'two',
	two: {
		btn: el('#twoBtn'),
		sf: false,
		info: {}
	},
	gs: {
		btn: el('#gsBtn'),
		sf: true,
		info: {}
	},
	tri: {
		btn: el('#triBtn'),
		sf: false,
		info: {}
	},
	pdf: {
		btn: el('#pdfBtn'),
		link: 'https://2universe.2u.com/brandportal/email_signature/email_signature_toolkitpdf',
	}
}

function genInputs() {
	const loader = el('#loader2')
	loader.classList.contains('hide') ? loader.classList.remove('hide') : ''
	const target = el('#inputs')
	target.innerHTML = ''
	fetch(`./dist/files/${data.signature + 'Input'}.html`)
		.then(res => res.text())
		.then(res => {
			loader.classList.add('hide')
			target.insertAdjacentHTML('beforeend', res)
		})
		.catch(e => {
			alert('Oops! An error occured. Please try again.\r\n' + e)
			window.location.reload()
		})
}

function checkIfSalesforce(el) {
	utils.toggleClass(el, 'sf-active')
	if (el.classList.contains('sf-active')) {
		data[data.signature].sf = true
		el.innerText = `It's SalesForce compatible!`
	} else {
		data[data.signature].sf = false
		el.innerText = `Make it SalesForce compatible`
	}
}

function checkIfCustom() {
	const more = el('.input-wrap .more', el('#inputs'))
	const els = [...el('.input-wrap').children]
	const custom = els.filter(a => a.value === 'custom')
	custom.length ? data[data.signature].customInput = true : data[data.signature].customInput = false
	if (data[data.signature].customInput) {
		utils.show(more)
		el('select').setAttribute('data-radius', 'top')
	} else {
		more ? utils.hide(more) : ''
		el('select') ? el('select').setAttribute('data-radius', 'all') : ''
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
	console.log(data[data.signature])
}

function togglePop() {
	const pop = el('#popWrap')
	utils.toggleClass(pop, 'show')
	utils.toggleClass(el('body'), 'no-scroll')
	pop.classList.contains('show') ? el('#cancel').innerText = 'Cancel' : ''
}

function injectDeets() {
	const sig = el('#popContent table')
	const copyBtn = el('#copySig')
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
			el(`#${a}Pipe`) ? el(`#${a}Pipe`).remove() : ''
			el(`#${a}Title`) ? el(`#${a}Title`).remove() : ''
			el(`#${a}Show`) ? el(`#${a}Show`).remove() : ''
		}
		if (el(`#${a}Show`)) {
			el(`#${a}Show`).innerHTML = data[data.signature].info[a]
		}
	})
	console.log(data[data.signature])
}

function genCode() {
	const target = el('#popContent')
	const code = document.createElement('code')
	const minHtml = target.innerHTML.replace(/\r|\n|\r\n|\t|\s\s|(["])[\s]([a-z])/g, '$1$2')
	code.innerText = minHtml
	target.appendChild(code)
	const p = document.createElement('p')
	p.innerHTML = minHtml.length < 1333 ? minHtml.length + ' Characters 👍' : '⚠️ ' + minHtml.length + ' Characters - SF has a limit of 1333 &nbsp;⚠️'
	target.appendChild(p)
}

function genSignature() {
	const loader = el('#loader')
	loader.classList.contains('hide') ? loader.classList.remove('hide') : ''
	const target = el('#popContent')
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
	target.innerHTML = ''
	togglePop()
	fetch(`./dist/files/${signature}Sig.html`)
		.then(res => res.text())
		.then(res => {
			loader.classList.add('hide')
			target.insertAdjacentHTML('beforeend', res)
			injectDeets()
			data[data.signature].sf ? genCode() : ''
		})
		.catch(e => {
			alert('Oops! An error occured. Please try again.\r\n' + e)
			window.location.reload()
		})
}

function letUserKnowAboutCopy(elem) {
	const currentText = elem.innerText
	utils.toggleClass(elem, 'copied')
	elem.innerHTML = '<span style="line-height:12px">📋</span> Copied to clipboard!'
	el('#cancel').innerText = 'Close'
	setTimeout(() => {
		utils.toggleClass(elem, 'copied')
		elem.innerHTML = currentText
	}, 3000)
}

const html = el('html')
html.addEventListener('click', (event) => {
	const elem = event.target
	const popContent = el('#popContent')
	if (elem.classList.contains('nav-btn')) {
		utils.toggleClass(el('.nav-btn'), 'selected', elem)
		data.signature = elem.getAttribute('data-sig')
		genInputs()
	}
	event.target === el('.create-sig-btn') ? genSignature() : ''
	if (elem === el('#copySig')) {
		data[data.signature].sf ? utils.copyEl(el('code', popContent)) : utils.copyEl(popContent)
		letUserKnowAboutCopy(elem)
	}
	elem === el('#cancel') || elem.id === 'popWrap' ? togglePop() : ''
	elem === el('#sf') ? checkIfSalesforce(elem) : ''
})
data.two.btn.click()

const content = el('#content')
content.addEventListener('change', (event) => {
	const elem = event.target
	elem.classList.contains('info') ? storeValue(elem) : ''
})




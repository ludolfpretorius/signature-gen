import {copyElem, toggleClass, show, hide, data, genInputs, checkIfSalesforce, checkIfCustom, storeValue, togglePop, injectDeets, genCode, genSignature, letUserKnowAboutCopy } from './functions.js'

// === VARS ===
const html = document.querySelector('html')
const content = document.querySelector('#content')


// === INTERACTION ===
html.addEventListener('click', (event) => {
	
	// Vars
	const elem = event.target
	const popContent = document.querySelector('#popContent')

	// Gen inputs
	if (elem.classList.contains('tab')) {
		toggleClass(document.querySelector('.tab'), 'selected', elem)
		data.signature = elem.getAttribute('data-sig')
		genInputs()
	}

	// Open PDF Link
	if (elem === document.querySelector('#pdfBtn')) window.open('https://2universe.2u.com/brandportal/email_signature/email_signature_toolkitpdf', '_blank')

	// Gen Signature
	if (elem === document.querySelector('.create-sig-btn')) genSignature()

	// Copy signature
	if (elem === document.querySelector('#copySig')) {
		data[data.signature].sf ? copyElem(document.querySelector('code', popContent)) : copyElem(popContent)
		letUserKnowAboutCopy(elem)
	}

	// Close Popup
	if (elem === document.querySelector('#cancel') || elem.id === 'popWrap') togglePop()

	// Make it Salesforce compatible
	if (elem === document.querySelector('#sf')) checkIfSalesforce(elem)
})

// Load 2U inputs on first load
data.two.btn.click()

// On input change, capture data (update data object) to use for actual signature
content.addEventListener('change', (event) => {
	const elem = event.target
	elem.classList.contains('info') ? storeValue(elem) : ''
})





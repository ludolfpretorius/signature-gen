import { togglePopupLoader } from './utils.js'
import { getUser } from '../state/user.js'
import { updateSignatureDetails2U, updateSignatureDetailsGS} from './updateSignatureDetails.js'

function mountSignature(signature) {
	const popupContentDiv = document.querySelector('#popup-content')
	popupContentDiv.innerHTML = ''
	togglePopupLoader('show')
	if (getUser.salesforce || getUser.signature === 'gs') {
		signature += '-sf'
	}
	fetch(`./dist/files/signature-${signature}.html`)
		.then(resp => resp.text())
		.then(data => {
			popupContentDiv.innerHTML = data
			togglePopupLoader('hide')
			if (getUser.signature === '2u') {
				updateSignatureDetails2U(getUser)
			} else {
				updateSignatureDetailsGS(getUser)
			}
			if (getUser.salesforce) {
				 mountCode(popupContentDiv)
			}
		})
		.catch(err => {
			alert('Oops! An error occured. Please try again.')
			console.error(err)
		})
}

function mountCode(element) {
	const code = document.createElement('code')
	const hr = document.createElement('hr')
	const p = document.createElement('p')
	const copyBtn = document.querySelector('#copy-signature')
	const minHtml = element.innerHTML.replace(/\r|\n|\r\n|\t|\s\s|(["])[\s]([a-z])/g, '$1$2')
	code.innerText = minHtml
	copyBtn.innerText = 'Copy HTML'
	element.appendChild(hr)
	element.appendChild(code)
	p.innerHTML = minHtml.length <= 1333 ? minHtml.length + ' Characters 👍' : '⚠️ ' + minHtml.length + ' Characters - SF has a limit of 1333 &nbsp;⚠️' + '<br><a href="#" style="font-size:12px" onclick="alert(`Try removing some of the optional details.\r\nOtherwise, shorten the current details.`)">What should I do?</a>'
	element.appendChild(p)
}

export {
	mountSignature
}
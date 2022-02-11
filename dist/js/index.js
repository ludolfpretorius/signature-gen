// Modules
import { toggleClass, toggleLoader, togglePopup } from "./modules/utils.js"
import switchTabs from './modules/switchTabs.js'
import addNameCoach from "./modules/addNameCoach.js"
import toggleCustomAddress from "./modules/toggleCustomAddress.js"
import toggleSalesforce from "./modules/toggleSalesforce.js"
import validateUserDetails from './modules/validateUserDetails.js'
import { mountSignature, mountCode } from "./modules/mountSignature.js"
import updateSignatureDetails from "./modules/updateSignatureDetails.js"
import { copyElem, notification } from "./modules/copyToClipboard.js"
import initApp from './modules/initApp.js'

// State
import { getUser, updateUser } from './state/user.js'

// Interaction
document.addEventListener('click', (event) => {
	
	// Clicked element
	const elem = event.target

	// Tab Navigation (mounts input file with "mountInputs()" )
	if (elem.classList.contains('tab')) {
		switchTabs(elem, elem.getAttribute('data-brand'))
		updateUser('signature', elem.getAttribute('data-brand'))
	}

	// // Gen Signature
	if (elem.id === 'create-signature') {
		const isValid = validateUserDetails(getUser)
		if (isValid) {
			mountSignature(getUser.signature)
			updateSignatureDetails(getUser)
			togglePopup()
		}
	}

	// // Copy signature
	// if (elem === document.querySelector('#copySig')) {
	// 	data[data.signature].sf ? copyElem(document.querySelector('code', popContent)) : copyElem(popContent)
	// 	letUserKnowAboutCopy(elem)
	// }

	// // Close Popup
	// if (elem === document.querySelector('#cancel') || elem.id === 'popWrap') togglePop()

	// // Make it Salesforce compatible
	// if (event.target.id === 'sf') toggleSalesforce(event.target)
})

initApp()






// Modules
import { toggleClass, toggleLoader, togglePopup } from "./modules/utils.js"
import switchTabs from './modules/switchTabs.js'
import addNameCoach from "./modules/addNameCoach.js"
import toggleCustomAddress from "./modules/toggleCustomAddress.js"
import toggleSalesforce from "./modules/toggleSalesforce.js"
import validateUserDetails from './modules/validateUserDetails.js'
import { mountSignature, mountCode } from "./modules/mountSignature.js"
import updateSignatureDetails from "./modules/updateSignatureDetails.js"
import { copyElem, initCopyNotification } from "./modules/copyToClipboard.js"
import initApp from './modules/initApp.js'

// State
import { getUser, updateUser } from './state/user.js'

// Interaction
document.addEventListener('click', (event) => {
	
	// Clicked element
	const elem = event.target

	// Tab Navigation (mounts input file with "mountInputs()" )
	if (elem.classList.contains('tab')) {
		const brand = elem.getAttribute('data-brand')
		switchTabs(elem, brand)
		updateUser('signature', brand)
	}

	// Make it Salesforce compatible
	if (elem.id === 'salesforce-btn') {
		toggleSalesforce(elem)
	}

	// Gen Signature
	if (elem.id === 'create-signature') {
		const isValid = true//validateUserDetails(getUser)
		if (isValid) {
			mountSignature(getUser.signature)
			updateSignatureDetails(getUser)
			togglePopup('show')
		}
	}

	// Copy signature
	if (elem.id === 'copy-signature') {
		let popupContent = document.querySelector('#popup-content')
		if (getUser.salesforce) {
			popupContent = popupContent.querySelector('code')
		}
		copyElem(popupContent)
		initCopyNotification(elem)
	}

	// Close Popup
	if (elem.id === 'cancel-popup') {
		togglePopup('hide')
	}

})

initApp()






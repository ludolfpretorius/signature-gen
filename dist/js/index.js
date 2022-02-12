// Modules
import { togglePopup } from "./modules/utils.js"
import switchTabs from './modules/switchTabs.js'
import toggleSalesforce from "./modules/toggleSalesforce.js"
import validateUserDetails from './modules/validateUserDetails.js'
import { mountSignature } from "./modules/mountSignature.js"
import { copyElement, initCopyNotification } from "./modules/copyToClipboard.js"
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
		const isValid = validateUserDetails(getUser)
		if (isValid) {
			mountSignature(getUser.signature)
			togglePopup('show')
		}
	}

	// Copy signature / signature HTML
	if (elem.id === 'copy-signature') {
		let popupContent = document.querySelector('#popup-content')
		if (getUser.salesforce) {
			popupContent = popupContent.querySelector('code')
		}
		copyElement(popupContent)
		initCopyNotification(elem)
	}

	// Close Popup
	if (elem.id === 'cancel-popup') {
		togglePopup('hide')
	}

})

initApp()






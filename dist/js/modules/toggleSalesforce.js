import { updateUser } from '../state/user.js'

function toggleSalesforce(element) {
	element.classList.toggle('active')
	if (element.classList.contains('active')) {
		element.innerText = `It's SalesForce compatible!`
		updateUser('salesforce', true)
		return;
	}
	element.innerText = `Make it SalesForce compatible`
	updateUser('salesforce', false)
}

export default toggleSalesforce
function toggleSalesforce(element) {
	element.classList.toggle('sf-active')
	if (element.classList.contains('sf-active')) {
		user.salesforce = true
		element.innerText = `It's SalesForce compatible!`
	} else {
		delete user.salesforce
		element.innerText = `Make it SalesForce compatible`
	}
}

export default toggleSalesforce
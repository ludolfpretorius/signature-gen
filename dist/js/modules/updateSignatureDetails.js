import { getUser } from '../state/user.js'

function updateSignatureDetails2U(userObj) {
	const signature = document.querySelector('#popup-content > table')
	const name = signature.querySelector('#firstname')
	const lastname = signature.querySelector('#lastname')
	const title = signature.querySelector('#title')
	const address = signature.querySelector('#address')
	const numberNode = signature.querySelector('#number-node')
	const pronounNode = signature.querySelector('#pronoun-node')
	const namecoachNode = lastname.querySelector('#namecoach-node')

	name.innerText = getUser.name
	lastname.innerText = getUser.lastname
	title.innerText = getUser.title
	address.innerText = getUser.address
	
	if (getUser.number) {
		numberNode.querySelector('#number').innerText = getUser.number
	} else {
		numberNode.remove()
	}

	if (getUser.pronoun) {
		pronounNode.querySelector('#pronoun').innerText = getUser.pronoun
	} else {
		pronounNode.remove()
	}

	if (getUser.namecoach) {
		namecoachNode.href = getUser.namecoach
		lastname.appendChild(namecoachNode)
	} else {
		namecoachNode.remove()
	}
}


function updateSignatureDetailsGS(userObj) {
	const signature = document.querySelector('#popup-content > table')
	const name = signature.querySelector('#firstname')
	const lastname = signature.querySelector('#lastname')
	const title = signature.querySelector('#title')
	const number = signature.querySelector('#number')
	let customNumber = ''

	name.innerText = getUser.name
	lastname.innerText = getUser.lastname
	title.innerText = getUser.title

	if (getUser['number-za']) {
		customNumber = 'ZA: ' + getUser['number-za']
	}
	if (getUser['number-uk']) {
		customNumber += customNumber.length ? ' | UK: ' + getUser['number-uk'] : 'UK: ' + getUser['number-uk']
	}
	if (getUser['number-us']) {
		customNumber += customNumber.length ? ' | US: ' + getUser['number-us'] : 'US: ' + getUser['number-us']
	}
	
	if (getUser.number || customNumber.length) {
		number.innerHTML = getUser.number || customNumber
	} else {
		number.remove()
	}
}

export {
	updateSignatureDetails2U,
	updateSignatureDetailsGS
}
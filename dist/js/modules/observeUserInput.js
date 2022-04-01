import { updateUser, getUser } from '../state/user.js'
import toggleRemoteAddress from './toggleRemoteAddress.js'

function observeUserInput() {
	const inputsWrap = document.querySelector('#inputs')

	inputsWrap.addEventListener('change', (event) => {
		const input = event.target.classList.contains('data') ? event.target : null
		const select = inputsWrap.querySelector('select')
		if (input) {
			updateUser(input.name, input.value.trim())
			if (select.value === 'Remote') {
				toggleRemoteAddress('show')
			} else {
				toggleRemoteAddress('hide')
			}
			if (getUser.address === 'Remote') {
				updateUser('address', null) // Setting a value to null/falsey removes the entry form the user object
			}

			//GS signature specific
			if (getUser.number === 'Remote') { 
				updateUser('number', null)
			}
			if (getUser.number && getUser.number !== 'Remote') {
				updateUser('number-za', null)
				updateUser('number-uk', null)
				updateUser('number-us', null)
			}
		}
	})
}

export default observeUserInput
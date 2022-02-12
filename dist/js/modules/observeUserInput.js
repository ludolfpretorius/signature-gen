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
				updateUser('address', null)
			}
		}
	})
}

export default observeUserInput
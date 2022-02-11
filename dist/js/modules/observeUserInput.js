import { updateUser } from '../state/user.js'

function observeUserInput() {
	const inputsWrap = document.querySelector('#inputs')
	inputsWrap.addEventListener('change', (event) => {
		const input = event.target.classList.contains('data') ? event.target : null
		if (input) {
			updateUser(input.name, input.value.trim())
			// user.address === 'custom' ? showCustomInput() : hideCustomInput()
		}
	})
}

export default observeUserInput
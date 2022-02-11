import observeUserInput from './observeUserInput.js'

function initApp() {
	const btn2U = document.querySelector('.tab.btn-2u')
	btn2U.classList.add('selected')
	btn2U.click()
	observeUserInput()
}

export default initApp
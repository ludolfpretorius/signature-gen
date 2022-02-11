import observeUserInput from './observeUserInput.js'

function initApp() {
	const btn2U = document.querySelector('.tab[data-brand="2u"]')
	btn2U.click()
	observeUserInput()
}

export default initApp
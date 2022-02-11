import { toggleLoader } from './utils.js'
import { resetUser } from '../state/user.js'

function mountInputs(brand) {
	const inputWrap = document.querySelector('#inputs')
	inputWrap.innerHTML = ''
	toggleLoader('show')
	resetUser()
	fetch(`./dist/files/input-${brand}.html`)
		.then(resp => resp.text())
		.then(data => {
			inputWrap.innerHTML = data
			toggleLoader('hide')
		})
		.catch(err => {
			alert('Oops! An error occured. Please check your connection and try again.')
			console.error(err)
		})
}

export default mountInputs
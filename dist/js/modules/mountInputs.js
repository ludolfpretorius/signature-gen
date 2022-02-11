import { toggleLoader } from './utils.js'
import { resetUser } from '../state/user.js'

function mountInputs(brand) {
	toggleLoader()
	resetUser()
	fetch(`./dist/files/input-${brand}.html`)
		.then(resp => resp.text())
		.then(data => {
			const inputWrap = document.querySelector('#inputs')
			inputWrap.innerHTML = data
			toggleLoader()
		})
		.catch(err => {
			toggleLoader()
			alert('Oops! An error occured. Please check your connection and try again.')
			console.error(err)
		})
}

export default mountInputs
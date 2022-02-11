import { toggleClass, toggleLoader } from './utils.js'
import mountInputs from './mountInputs.js'

function switchTabs(element, input) {
	toggleClass(element, 'selected')
	mountInputs(input)
}

export default switchTabs
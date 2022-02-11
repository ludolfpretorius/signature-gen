function updateSignatureDetails(userObj) {
	const sig = document.querySelector('#popContent table')
	const copyBtn = document.querySelector('#copySig')
	const optional = document.querySelectorAll('.optional')

	// if (userObj.salesforce) {
	// 	copyBtn.innerText = 'Copy HTML'
	// } else {
	// 	copyBtn.innerText = 'Copy signature'
	// }

	// if (data[data.signature].info.custom) {
	// 	let main;
	// 	const other = [];
	// 	Object.keys(data[data.signature].info.custom).map(a => other.push(a))
	// 	if (data.signature === 'two') {
	// 		data[data.signature].info[other[0].split('-')[0]] = data[data.signature].info.custom[other[0]]	
	// 	} else if (data.signature === 'gs') {
	// 		data[data.signature].info[other[0].split('-')[0]] = `<b>ZA:</b> ${data[data.signature].info.custom[other[0]]} | <b>UK:</b> ${data[data.signature].info.custom[other[1]]} | <b>US:</b> ${data[data.signature].info.custom[other[2]]}`
	// 	}
	// 	delete data[data.signature].info.custom
	// }
	// const entries = Object.keys(data[data.signature].info)
	// entries.map(a => {
	// 	if (!data[data.signature].info[a].length) {
	// 		document.querySelector(`#${a}Pipe`) ? document.querySelector(`#${a}Pipe`).remove() : ''
	// 		document.querySelector(`#${a}Title`) ? document.querySelector(`#${a}Title`).remove() : ''
	// 		document.querySelector(`#${a}Show`) ? document.querySelector(`#${a}Show`).remove() : ''
	// 	}
	// 	if (document.querySelector(`#${a}Show`)) {
	// 		document.querySelector(`#${a}Show`).innerHTML = data[data.signature].info[a]
	// 	}
	// })
}

export default updateSignatureDetails
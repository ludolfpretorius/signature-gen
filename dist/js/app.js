import * as utils from './utils.js'

const html = el('html')
const content = el('#content')
const data = {
	signature: 'two',
	two: {
		btn: el('#twoBtn'),
		sf: false,
		info: {}
	},
	gs: {
		btn: el('#gsBtn'),
		sf: true,
		info: {}
	},
	tri: {
		btn: el('#triBtn'),
		sf: false,
		info: {}
	},
	pdf: {
		btn: el('#pdfBtn'),
		link: 'https://2universe.2u.com/brandportal/email_signature/email_signature_toolkitpdf',
	}
}

function checkIfCustom() {
	const more = el('.input-wrap .more', el('#inputs'))
	const els = [...el('.input-wrap').children]
	const custom = els.filter(a => a.value === 'custom')
	custom.length ? data[data.signature].customInput = true : data[data.signature].customInput = false
	data[data.signature].customInput ? utils.show(more) : utils.hide(more)
}

function storeValue(input) {
	checkIfCustom()
	if (input.classList.contains('custom')) {
		data[data.signature].info.custom = data[data.signature].info.custom ? data[data.signature].info.custom : {}
		data[data.signature].info.custom[input.id] = input.value
	} else {
		data[data.signature].info[input.id] = input.value
	}
	if (input.classList.contains('change') && input.value.length) {
		data[data.signature].change = input.getAttribute('data-sig')
	} else {
		delete data[data.signature].change
	}
	const optionals = document.querySelectorAll('.optional')
	optionals.forEach(a => {
		if (optionals.length && a.value === '') {
			data[data.signature].info[a.id] = ''
		}
	})
}

function togglePop() {
	const pop = el('#popWrap')
	utils.toggleClass(pop, 'show')
}

function injectDeets() {
	const sig = el('#popContent table')
	const copyBtn = el('#copySig')
	const optional = document.querySelectorAll('.optional')
	data[data.signature].sf ? copyBtn.innerText = 'Copy HTML' : copyBtn.innerText = 'Copy signature'
	if (data[data.signature].info.custom) {
		let main;
		const other = [];
		Object.keys(data[data.signature].info.custom).map(a => other.push(a))
		if (data.signature === 'two') {
			data[data.signature].info[other[0].split('-')[0]] = data[data.signature].info.custom[other[0]]	
		} else if (data.signature === 'gs') {
			data[data.signature].info[other[0].split('-')[0]] = `<b>ZA:</b> ${data[data.signature].info.custom[other[0]]} | <b>ZA:</b> ${data[data.signature].info.custom[other[0]]} | <b>ZA:</b> ${data[data.signature].info.custom[other[0]]}`
		} else if (data.signature === 'tri') {
			
		}
		delete data[data.signature].info.custom
	}
	const entries = Object.keys(data[data.signature].info)
	entries.map(a => {
		if (!data[data.signature].info[a].length) {
			el(`#${a}Pipe`) ? el(`#${a}Pipe`).remove() : ''
			el(`#${a}Title`) ? el(`#${a}Title`).remove() : ''
			el(`#${a}Show`) ? el(`#${a}Show`).remove() : ''
		}
		if (el(`#${a}Show`)) {
			el(`#${a}Show`).innerHTML = data[data.signature].info[a]
		}
	})
	console.log(data[data.signature])
}

function genCode() {
	const target = el('#popContent')
	const code = document.createElement('code')
	const minHtml = target.innerHTML.replace(/\n|\t|\s\s/g, '')
	code.innerText = minHtml
	target.appendChild(code)
}

function genSignature() {
	const target = el('#popContent')
	const signature = data[data.signature].change ? data[data.signature].change : data.signature
	target.innerHTML = ''
	togglePop()
	fetch(`./dist/files/${signature}Sig.html`)
		.then(res => res.text())
		.then(res => {
			target.insertAdjacentHTML('beforeend', res)
			injectDeets()
			data[data.signature].sf ? genCode() : ''
		})
		.catch(e => {
			alert('Oops! An error occured. Please try again.\r\n' + e)
			// window.location.reload()
		})
}

function genInputs() {
		const target = el('#inputs')
		target.innerHTML = ''
		fetch(`./dist/files/${data.signature + 'Input'}.html`)
			.then(res => res.text())
			.then(res => {
				target.insertAdjacentHTML('beforeend', res)
			})
			.catch(e => {
				alert('Oops! An error occured. Please try again.\r\n' + e)
				window.location.reload()
			})
}
html.addEventListener('click', (event) => {
	const elem = event.target
	const popContent = el('#popContent')
	if (elem.classList.contains('nav-btn')) {
		utils.toggleClass(el('.nav-btn'), 'selected', elem)
		data.signature = elem.getAttribute('data-sig')
		genInputs()
	}
	event.target === el('.create-sig-btn') ? genSignature() : ''
	if (elem === el('#copySig')) {
		data[data.signature].sf ? utils.copyEl(el('code', popContent)) : utils.copyEl(popContent)
	}
	elem === el('#cancel') || elem.id === 'popWrap' ? togglePop() : ''
	
})
data.two.btn.click()

content.addEventListener('change', (event) => {
	const elem = event.target
	elem.classList.contains('info') ? storeValue(elem) : ''
})












//Pronoun preview --> `<link href="https://fonts.googleapis.com/css?family=Montserrat:400,700,800" rel="stylesheet"><table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="background-color: #fff; font-family: 'Montserrat', 'Arial', sans-serif;"> <tr> <td width="470"> <table align="left" border="0" cellspacing="0" cellpadding="0" style="background-color: #fff; font-family: 'Montserrat', 'Arial', sans-serif; display: block;" width="100%"> <tr> <td width="470" height="50" valign="" style="border-bottom: 1px solid #eee;" colspan="2"> <img src="https://bit.ly/2AeJ6qA" alt="2u" border="0" width="43" height="38"> </td></tr><tr> <td width="470" height="120" valign="" style="border-bottom: 5px solid #1475d4;" colspan="2"> <p style="color: #1475d4; margin: 0; line-height: 18px; font-size: 12px;"><span style="font-weight: 700;">${name.value} ${surname.value}</span> | ${pronoun.value}<br>${title.value}<br></p><p style="margin: 0; line-height: 18px; font-size: 12px; color: #000!important">${remote.value.length ? remote.value : address.value}<br><span style="color: #000!important">${office.value.length ? '<b>Office: </b>' + office.value + ' ' : ''}${phone.value.length ? '<b>Phone: </b>' + phone.value + ' ' : ''}${office.value.length && cell.value.length || phone.value.length && cell.value.length ? '| <b>Cell: </b>' + cell.value + ' ' : ''}${!office.value.length && !phone.value.length && cell.value.length ? '<b>Cell: </b>' + cell.value : ''}<br><span style="font-weight: 700; color: #000!important"><a href="https://2u.com" target="_blank" style="text-decoration: none!important; color: #000!important;">www.2u.com</a> | #NOBACKROW</span></p></td></tr><tr> <td width="70" height="70" valign="top"> <img src="https://bit.ly/2yNprfI" border="0" width="52px" height="79.23"> </td><td width="400" height="50" valign="" style="border-bottom: 1px solid #eee;"> <p style="margin: 0; line-height: 18px; font-size: 12px; color: #000!important">We&#8217;re a purpose-driven business looking for talented people who care about what they do. Join us at <span style="font-weight: 700"><a href="https://2u.com/careers/" target="_blank" style="text-decoration: none!important; color: #000!important;">2u.com/careers/</a></span>.</p></td></tr><tr> <td width="470" height="120" valign="top" style="padding-top: 20px" colspan="2"> <p style="margin: 0; line-height: 12px; font-size: 9px; color: #000!important">This message contains confidential information and is intended only for the individual named. If you are not the named addressee you should not disseminate, distribute or copy this e-mail. Please notify the sender immediately by e-mail if you have received this e-mail by mistake and delete this e-mail from your system.</p></td></tr></table> </td></tr></table>`

// function genContent(event) {
// 	if (event.target.nodeName === 'BUTTON') {
// 		const content = el('#content')
// 		const inputs = el('#inputs', content)
// 		const preview = el('#preview', content)
// 		const target = event.target.getAttribute('data-content')
// 		inputs.innerHTML = ''
// 		preview.innerHTML = ''
// 		fetch(`./dist/files/${target}.html`)
// 			.then(res => res.text())
// 			.then(res => {
// 				inputs.insertAdjacentHTML('beforeend', res)
// 				preview.insertAdjacentHTML('beforeend', data[target].preview)
// 			})
// 			.catch(e => alert('Oops! An error occured. Please try again\r\n' + e) ? window.location.reload() : '')
// 	}
// }
// const code = document.querySelector('#code');
// const samp = document.querySelector('#samp');
// const nav = document.querySelectorAll('button');
// const u2Btn = document.querySelector('#u2Btn');
// const gsBtn = document.querySelector('#gsBtn');
// const triBtn = document.querySelector('#triBtn');
// const sf = document.querySelector('.sf');

// samp.innerHTML = u2Preview;
// code.appendChild(document.createTextNode(u2Preview));
// sf.addEventListener('click', () => {
//     sf.classList.toggle('selected')
//     if  (sf.classList.contains('selected')) {
//         sf.innerText = `It's Salesforce compatible!`
//     } else if (!sf.classList.contains('selected')) {
//          sf.innerText = `Make it Salesforce compatible`
//     }
// })

// nav.forEach((i) => {
//     i.addEventListener('click', () => {
//         nav.forEach((hasClass) => hasClass.classList.remove('selected'));
//         i.classList.add('selected');
//         if (gsBtn.classList.contains('selected')) {
//             samp.innerHTML = gsPreview;
//             code.innerText = '';
//             code.appendChild(document.createTextNode(gsPreview));
//             go.style.backgroundColor = '#f42684';
//             go.style.borderColor = '#f42684';
//             title.setAttribute('style', 'margin-bottom: 15px; border-radius: 0 0 3px 3px;')
//             sf.style.display = 'none';
//             pronoun.style.display = 'none';
//             address.style.display = 'none';
//             remote.style.display = 'none';
//             office.style.display = 'none';
//             cell.style.display = 'none';
//             phone.style.display = 'none';   
//             cell.style.marginBottom = '-1px';
//             code.parentElement.style.display = 'block';
//         } else if (triBtn.classList.contains('selected')) {
//             samp.innerHTML = triPreview;
//             go.style.backgroundColor = '#2e91a3';
//             go.style.borderColor = '#2e91a3';
//             sf.style.display = 'none';
//             pronoun.style.display = 'none';
//             address.style.display = 'none';
//             remote.style.display = 'none';
//             title.setAttribute('style', 'margin-bottom: 15px; border-radius: 0 0 3px 3px;');
//             office.setAttribute('style', 'display: block; border-radius: 3px 0 0 3px;');
//             cell.setAttribute('style', 'display: block; border-radius: 0 3px 3px 0;')
//             phone.style.display = 'none';
//             cell.style.marginBottom = '15px';
//             office.placeholder = "Office number";
//             code.parentElement.style.display = 'none';
//         } else if (u2Btn.classList.contains('selected')) {
//             samp.innerHTML = u2Preview;
//             go.style.backgroundColor = '#1576d4';
//             go.style.borderColor = '#1576d4';
//             sf.style.display = 'block';
//             address.style.display = 'block';
//             office.style.display = 'block';
//             cell.style.display = 'block';
//             phone.style.display = 'block';
//             cell.style.marginBottom = '-1px'
//             office.placeholder = "Office number (2U/GS)"
//             code.parentElement.style.display = 'none';
//             code.innerText = ''
//         }
//     })
// })

// let name = document.querySelector('#name');
// let surname = document.querySelector('#surname');
// let title = document.querySelector('#title');
// let pronoun = document.querySelector('#pronoun');
// let address = document.querySelector('#address');
// let remote = document.querySelector('#remote');
// let office = document.querySelector('#office');
// let cell = document.querySelector('#cell');
// let phone = document.querySelector('#phone');
// const go = document.querySelector('#go');
// const charCount = document.querySelector('#charCount');

// let toCopy;
// const insertU2Preview = () => {
    
//     var result = HtmlSanitizer.SanitizeHtml(name.value, surname.value, title.value, office.value, address.value, remote.value, office.value, cell.value, phone.value);
//     if (office.value.length && phone.value.length) {
//         alert(`You can not add both an 'Office' and a 'Phone' number. They are the same thing. The one you need use depends on which brand you work for. 'Office' is for 2U and GS. 'Phone' is for Trilogy.`);
//         office.value = '';
//         phone.value = '';
//     };
//     address.value === 'Working remotely' && !remote.value.length ? alert('Please specify your remote address below the address dropdown.') : '';
//     let newU2Preview;
//     let newU2PreviewSF;
//     if (pronoun.value.length) {
//         newU2Preview = '';
//             code.parentElement.style.display = 'none';
//     } else {
//         newU2Preview = `<link href="https://fonts.googleapis.com/css?family=Montserrat:400,700,800" rel="stylesheet"><table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="background-color: #fff; font-family: 'Montserrat', 'Arial', sans-serif;"> <tr> <td width="470"> <table align="left" border="0" cellspacing="0" cellpadding="0" style="background-color: #fff; font-family: 'Montserrat', 'Arial', sans-serif; display: block;" width="100%"> <tr> <td width="470" height="50" valign="" style="border-bottom: 1px solid #eee;" colspan="2"> <img src="https://bit.ly/2AeJ6qA" alt="2u" border="0" width="43" height="38"> </td></tr><tr> <td width="470" height="120" valign="" style="border-bottom: 5px solid #1475d4;" colspan="2"> <p style="color: #1475d4; margin: 0; line-height: 18px; font-size: 12px;"><span style="font-weight: 700;">${name.value} ${surname.value}</span> | ${title.value}</p><p style="margin: 0; line-height: 18px; font-size: 12px; color: #000!important">${remote.value.length ? remote.value : address.value}<br><span style="color: #000!important">${office.value.length ? '<b>Office: </b>' + office.value + ' ' : ''}${phone.value.length ? '<b>Phone: </b>' + phone.value + ' ' : ''}${office.value.length && cell.value.length || phone.value.length && cell.value.length ? '| <b>Cell: </b>' + cell.value + ' ' : ''}${!office.value.length && !phone.value.length && cell.value.length ? '<b>Cell: </b>' + cell.value : ''}<br><span style="font-weight: 700; color: #000!important"><a href="https://2u.com" target="_blank" style="text-decoration: none!important; color: #000!important;">www.2u.com</a> | #NOBACKROW</span></p></td></tr><tr> <td width="70" height="70" valign="top"> <img src="https://bit.ly/2yNprfI" border="0" width="52px" height="79.23"> </td><td width="400" height="50" valign="" style="border-bottom: 1px solid #eee;"> <p style="margin: 0; line-height: 18px; font-size: 12px; color: #000!important">We&#8217;re a purpose-driven business looking for talented people who care about what they do. Join us at <span style="font-weight: 700"><a href="https://2u.com/careers/" target="_blank" style="text-decoration: none!important; color: #000!important;">2u.com/careers/</a></span>.</p></td></tr><tr> <td width="470" height="120" valign="top" style="padding-top: 20px" colspan="2"> <p style="margin: 0; line-height: 12px; font-size: 9px; color: #000!important">This message contains confidential information and is intended only for the individual named. If you are not the named addressee you should not disseminate, distribute or copy this e-mail. Please notify the sender immediately by e-mail if you have received this e-mail by mistake and delete this e-mail from your system.</p></td></tr></table> </td></tr></table>`;
//             code.parentElement.style.display = 'none';
//     }

//     if (sf.classList.contains('selected') && pronoun.value.length) {
//         newU2Preview = `<link href="https://fonts.googleapis.com/css?family=Montserrat:400,700,800"rel="stylesheet"><table align="left"border="0"cellspacing="0"cellpadding="0"width="100%"style="background-color:#fff;font-family:'Montserrat','Arial',sans-serif;"><tr><td width="470"><table align="left"border="0"cellspacing="0"cellpadding="0"style="background-color:#fff;font-family:'Montserrat', 'Arial', sans-serif;display:block;"width="100%"><tr><td width="470"height="50"style="border-bottom:1px solid #eee;"colspan="2"><img src="https://bit.ly/2AeJ6qA"alt="2u"border="0"width="43"height="38"></td></tr><tr><td width="470"height="120"colspan="2"><p style="color:#1475d4;margin:0;line-height:18px;font-size:12px;"><b>${name.value} ${surname.value}</b> | ${pronoun.value}<br>${title.value}<br></p><p style="margin:0;line-height:18px;font-size:12px;color:#000!important">${remote.value.length?remote.value:address.value}<br>${office.value.length?'<b>Office: </b>' + office.value + ' ':''}${phone.value.length?'<b>Phone: </b>' + phone.value + ' ':''}${office.value.length && cell.value.length || phone.value.length && cell.value.length?'| <b>Cell:</b>' + cell.value + ' ':''}${!office.value.length && !phone.value.length && cell.value.length?'<b>Cell: </b>' + cell.value:''}<br><b><a href="https://2u.com"target="_blank"style="text-decoration:none!important;color:#000;">www.2u.com</a> | #NOBACKROW</b></p></td></tr><tr><td width="470"height="200"valign="top"colspan="2"><a href="https://2u.com/careers/"target="_blank"><img src="https://go.aws/2H4UTe0"border="0"width="470"></a></td></tr></table></td></tr></table>`
//             code.parentElement.style.display = 'block';
//             if (newU2Preview.length > 1333) {
//                 charCount.innerText = '⚠️ ' + newU2Preview.length + ' characters ⚠️'
//                 alert('You have too many characters in your email signature. Speak to your lead about what to do next.')
//             } else {
//                 charCount.innerText = newU2Preview.length + ' characters'
//             }
//     } else if (sf.classList.contains('selected')) {
//         newU2Preview = `<link href="https://fonts.googleapis.com/css?family=Montserrat:400,700,800"rel="stylesheet"><table align="left"border="0"cellspacing="0"cellpadding="0"width="100%"style="background-color:#fff;font-family:'Montserrat','Arial',sans-serif;"><tr><td width="470"><table align="left"border="0"cellspacing="0"cellpadding="0"style="background-color:#fff;font-family:'Montserrat', 'Arial', sans-serif;display:block;"width="100%"><tr><td width="470"height="50"style="border-bottom:1px solid #eee;"colspan="2"><img src="https://bit.ly/2AeJ6qA"alt="2u"border="0"width="43"height="38"></td></tr><tr><td width="470"height="120"colspan="2"><p style="color:#1475d4;margin:0;line-height:18px;font-size:12px;"><b>${name.value} ${surname.value}</b> | ${title.value}<br></p><p style="margin:0;line-height:18px;font-size:12px;color:#000!important">${remote.value.length?remote.value:address.value}<br>${office.value.length?'<b>Office: </b>' + office.value + ' ':''}${phone.value.length?'<b>Phone: </b>' + phone.value + ' ':''}${office.value.length && cell.value.length || phone.value.length && cell.value.length?'| <b>Cell:</b>' + cell.value + ' ':''}${!office.value.length && !phone.value.length && cell.value.length?'<b>Cell: </b>' + cell.value:''}<br><b><a href="https://2u.com"target="_blank"style="text-decoration:none!important;color:#000;">www.2u.com</a> | #NOBACKROW</b></p></td></tr><tr><td width="470"height="200"valign="top"colspan="2"><a href="https://2u.com/careers/"target="_blank"><img src="https://go.aws/2H4UTe0"border="0"width="470"></a></td></tr></table></td></tr></table>`
//             code.parentElement.style.display = 'block';
//             if (newU2Preview.length > 1333) {
//                 charCount.innerText = '⚠️ ' + newU2Preview.length + ' characters ⚠️'
//                 alert('You have too many characters in your email signature. Speak to your lead about what to do next.')
//             } else {
//                 charCount.innerText = newU2Preview.length + ' characters'
//             }
//     }
//     samp.innerHTML = newU2Preview;
//     let newText = document.createTextNode(newU2Preview);
//     code.innerHTML = '';
//     code.appendChild(newText);
//     toCopy = newU2Preview;
// }

// address.addEventListener('change', () => {
//     if (address.value === 'Working remotely') {
//         remote.classList.add('show')
//     } else {
//         remote.value = '';
//         remote.classList.remove('show');
//     }
// })

// const insertGsPreview = () => {
//     var result = HtmlSanitizer.SanitizeHtml(name.value, surname.value, title.value, address.value, office.value, cell.value, phone.value);
//     let link = `https://getsmartergraphics.s3-us-west-2.amazonaws.com/GS+email+signatures/${name.value}-${surname.value}.png`;
//     let newlink;
//     let newGsPreview;

//     //Link Shortener API
//     var data = null;
//     var xhr = new XMLHttpRequest();
//     xhr.withCredentials = true;
//     xhr.addEventListener("readystatechange", function () {
//         if (this.readyState === this.DONE) {
//             const shortUrl = this.responseText.split('"')[1];
//             newGsPreview = `<link href="https://fonts.googleapis.com/css?family=Montserrat:400,700,800"rel="stylesheet"><table align="left"border="0"cellspacing="0"cellpadding="0"style="background-color:#fff;font-family:'Montserrat','Arial',sans-serif;border-color:transparent;display:block;width:100%"><tr><td width="470"height="50"style="border-bottom:1px solid #eee"colspan="2"><img src="https://bit.ly/2PHr3Pn"border="0"width="126"height="56.81"></td></tr><tr><td width="70"height="120"><img src="${shortUrl}"border="0"width="66"height="66"></td><td width="392" height="120"><p style="line-height:18px;font-size:12px;"><span style="color:#f42684"><b>${name.value} ${surname.value}</b> | ${title.value}</span><br>GetSmarter, a 2U, Inc. brand<br><b>UK:</b> +44 20 3457 5774 | <b>US:</b> +1 224 249 3522 | <b>ZA:</b> +27 21 447 7565 <br><b><a href="https://getsmarter.com"target="_blank"style="text-decoration:none;color:inherit">www.getsmarter.com</a></b></p></td></tr><tr><td width="470"height="50"colspan="2"><a href="https://bit.ly/2yO9k1v"target="_blank"><img src="https://bit.ly/2Av8esb"border="0"width="470"></a></td></tr><tr><td style="padding-top:12px"width="470"height="120"valign="top"colspan="2"><img src="https://bit.ly/2CV4sfB"border="0"width="470"></td></tr></table>`;
//             toCopy = newGsPreview;
//             samp.innerHTML = newGsPreview;
//             let newText = document.createTextNode(newGsPreview);
//             code.innerHTML = '';
//             code.appendChild(newText);
//             if (newGsPreview.length > 1333) {
//                 charCount.innerText = '⚠️ ' + newGsPreview.length + ' characters ⚠️'
//                 alert('You have too many characters in your email signature. Speak to your lead about what to do next.')
//             } else {
//                 charCount.innerText = newGsPreview.length + ' characters'
//             }
//         }
//     });
//     xhr.open("GET", "https://shorturl-sfy-cx.p.rapidapi.com/?url=" + link);
//     xhr.setRequestHeader("x-rapidapi-host", "shorturl-sfy-cx.p.rapidapi.com");
//     xhr.setRequestHeader("x-rapidapi-key", "a4531c0347msh7b143135cc6c3c2p160ecejsnc14c110a3d47");
//     xhr.send(data);

// }

// const insertTriPreview = () => {
//     var result = HtmlSanitizer.SanitizeHtml(name.value, surname.value, title.value, office.value, cell.value);
//     let newTriPreview = `<link href="https://fonts.googleapis.com/css?family=Montserrat:400,700,800" rel="stylesheet"><table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="background-color: #fff; font-family: 'Montserrat', 'Arial', sans-serif;"> <tr> <td width="470"> <table align="left" border="0" cellspacing="0" cellpadding="0" style="background-color: #fff; font-family: 'Montserrat', 'Arial', sans-serif; display: block;" width="100%"> <tr> <td width="470" height="50" style="border-bottom: 1px solid #eee;" colspan="2"> <img src="http://bit.ly/2KPKcx8" border="0" width="155" height="60"> </td></tr><tr> <td width="392" height="120" style="border-bottom: 5px solid #2e91a3;" colspan="2"> <p style="line-height: 18px; font-size: 12px; color: #000"> <span style="color:#2e91a3"><b>${name.value} ${surname.value}</b> | ${title.value}</span> <br>Trilogy Education, a 2U, Inc. brand <br>${office.value.length ? '<b>Office: </b>' + office.value + ' ' : ''}${office.value.length && cell.value.length ? '| <b>Cell: </b>' + cell.value + ' ' : ''}${!office.value.length && cell.value.length ? '<b>Cell: </b>' + cell.value : ''}<br><b><a href="https://www.trilogyed.com"target="_blank"style="text-decoration:none; color: #000">www.trilogyed.com</a> | <a href="https://twitter.com/trilogyedu?lang=en"target="_blank"style="text-decoration:none; color: #000">@trilogyedu</a></b></p></td></tr><tr> <td width="70" height="70" valign="top"> <img src="https://bit.ly/2yNprfI" border="0" width="52px" height="79.23"> </td><td width="400" height="50" style="border-bottom: 1px solid #eee;"> <p style="margin: 0; line-height: 18px; font-size: 12px">We’re a purpose-driven business looking for talented people who care about what they do. Join us at <b><a href="https://www.trilogyed.com/about/careers/" target="_blank" style="text-decoration: none; color: #000;">trilogyed.com/about/careers/</a></b></p></td></tr><tr> <td width="470" height="120" valign="top" style="padding-top: 20px" colspan="2"> <p style="color: #000; margin: 0; line-height: 12px; font-size: 9px;">This message contains confidential information and is intended only for the individual named. If you are not the named addressee you should not disseminate, distribute or copy this e-mail. Please notify the sender immediately by e-mail if you have received this e-mail by mistake and delete this e-mail from your system.</p></td></tr></table> </td></tr></table>`;
//     let newText = document.createTextNode(newTriPreview);
//     samp.innerHTML = newTriPreview;
//     //toCopy = newTriPreview;
//     //code.innerHTML = '';
//     //code.appendChild(newText); 
// }


// const copy = document.querySelector('.copy');
// const copyAlert = document.querySelector('#tip');
// go.addEventListener('click', () => {
//    if (gsBtn.classList.contains('selected')) {
//         insertGsPreview();
//     } else if (triBtn.classList.contains('selected')) {
//        insertTriPreview();
//     } else if (u2Btn.classList.contains('selected')) {
//         insertU2Preview();
//     }
//     window.location.href = window.location.href + '#samp' 
// })
// //document.addEventListener('keypress', (e) => e.which == 13 ? insertTriPreview() : '')

// copy.addEventListener('click', () => {
//     const newInput = document.createElement('input');
//     newInput.id = 'newInput';
//     newInput.style.opacity = '0';
//     newInput.value = toCopy;
//     document.body.appendChild(newInput)
//     let getInput = document.querySelector('#newInput');
//     getInput.select();
//     document.execCommand('copy');
//     getInput.remove();
//     copyAlert.classList.add('show');
//     setTimeout(() => {copyAlert.classList.remove('show');}, 2000)
// });
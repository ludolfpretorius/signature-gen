function createUser() {
	const user = {}
	return function(prop = null, val = null) {
		if (prop) {
			user[prop] = val
		}
		if (!user[prop]) { 
			delete user[prop] // Setting a value to falsey removes the entry form the user object
		}
		return user
	}
}

const updateUser = createUser()

const getUser = updateUser()

function resetUser() {
	for (let prop in getUser) {
		updateUser(prop, null)
	}
}

export {
	updateUser,
	getUser,
	resetUser
}
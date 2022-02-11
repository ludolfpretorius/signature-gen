function validateUserDetails(userObj) {
	if (userObj.signature === '2u') {
		if (!userObj.name || !userObj.lastname || !userObj.title || !userObj.address) {
			alert('Please complete the mandatory Name, Last name, Title, and Address fields.')
			return false;
		}
		if (userObj.namecoach?.includes('name-coach.com')) {
			alert('Please use an actual NameCoach link.')
			return false;
		}
	}
	
	return true
}

export default validateUserDetails
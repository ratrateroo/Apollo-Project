let userData = {};
export const setUserData = (s) => {
	console.log('User Data Set.');
	userData = s;
};

export const getUserData = () => {
	console.log('User Data Get.');
	return userData;
};

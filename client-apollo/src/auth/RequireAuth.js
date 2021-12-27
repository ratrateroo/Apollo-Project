import React, { useContext } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
//import { AuthContext } from './AuthContext';
import { getUserData } from '../util/userData';

export default function RequireAuth({ children }) {
	//let auth = useContext(AuthContext);
	let location = useLocation();
	const userData = getUserData();

	if (!userData.token) {
		// Redirect them to the /login page, but save the current location they were
		// trying to go to when they were redirected. This allows us to send them
		// along to that page after they login, which is a nicer user experience
		// than dropping them off on the home page.
		return <Navigate to="/login" state={{ from: location }} />;
	}

	return children;
}

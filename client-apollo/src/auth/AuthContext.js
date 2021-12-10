import { createContext } from 'react';

const AuthContext = createContext({
	isLoggedIn: false,
	userId: null,
	token: null,
	login: (token, userId, tokenExpiration) => {},
	logout: () => {},
});

export default AuthContext;

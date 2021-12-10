import { ApolloClient, InMemoryCache } from '@apollo/client';

import { createUploadLink } from 'apollo-upload-client';
import { setContext } from '@apollo/client/link/context';

import { LOGGED_IN_USER } from '../constants';
const authLink = setContext((_, { headers }) => {
	const userData = localStorage.getItem(LOGGED_IN_USER);

	const data = JSON.parse(userData);

	return {
		headers: {
			...headers,
			authorization: data ? `Bearer ${data.token}` : '',
		},
	};
});

const httpLink = createUploadLink({
	uri: `http://localhost:8000`,
	// credentials: 'include',
});

//new client
export const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});

// export const client = new ApolloClient({
// 	link: link,
// 	cache: new InMemoryCache(),
// });

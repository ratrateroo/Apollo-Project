import { ApolloClient, InMemoryCache } from '@apollo/client';

import { createUploadLink } from 'apollo-upload-client';
import { setContext } from '@apollo/client/link/context';

import { AUTH_TOKEN } from '../constants';
const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem(AUTH_TOKEN);
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : '',
		},
	};
});

const httpLink = createUploadLink({
	uri: 'http://localhost:4000/graphql',
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

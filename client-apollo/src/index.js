import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import { ApolloProvider } from '@apollo/client';

import ColorModeProvider from './context/ColorModeProvider';
import App from './App';
import { client } from './components/ApolloClient';
ReactDOM.render(
	<ApolloProvider client={client}>
		<ColorModeProvider>
			<Router>
				<App />
			</Router>
		</ColorModeProvider>
	</ApolloProvider>,
	document.getElementById('root')
);

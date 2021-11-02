import React from 'react';
import ReactDOM from 'react-dom';
// import {
// 	ApolloClient,
// 	InMemoryCache,
// 	ApolloProvider,
// 	gql,
// 	useMutation,
// 	ApolloLink,
// } from '@apollo/client';
// import { createUploadLink } from 'apollo-upload-client';

import { Upload } from './components/Upload';
import { Files } from './components/Files';
import InputUpload from './components/InputUpload';

// const httpLink = createUploadLink({
// 	uri: 'http://localhost:4000/',
// });

// const client = new ApolloClient({
// 	link: httpLink,
// 	cache: new InMemoryCache(),
// });

// const UPLOAD_FILE = gql`
// 	mutation singleUpload($file: FileUpload!) {
// 		singleUpload(file: $file) {
// 			filename
// 			mimetype
// 			encoding
// 		}
// 	}
// `;

// function FileInput() {
// 	const [singleUpload] = useMutation(UPLOAD_FILE);

// 	return (
// 		<input
// 			type="file"
// 			required
// 			onChange={({
// 				target: {
// 					validity,
// 					files: [file],
// 				},
// 			}) => validity.valid && singleUpload({ variables: { file } })}
// 		/>
// 	);
// }

function App() {
	return (
		<div>
			<Upload />
			<Files />
			<InputUpload />
		</div>
	);
}

export default App;

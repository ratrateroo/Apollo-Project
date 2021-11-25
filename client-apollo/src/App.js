import React from 'react';

import Upload from './components/Upload';
import { Files } from './components/Files';
import InputUpload from './components/InputUpload';
import SignUp from './components/SignUp';

const App = () => {
	return (
		<div>
			{/* <Upload /> */}
			<SignUp />
			<Files />
			<InputUpload />
		</div>
	);
};

export default App;

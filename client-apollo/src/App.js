import React from 'react';

import Upload from './components/Upload';
import { Files } from './components/Files';
import InputUpload from './components/InputUpload';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';

const App = () => {
	return (
		<div>
			{/* <Upload /> */}
			<SignUp />
			<LogIn />
			<Files />
			<InputUpload />
		</div>
	);
};

export default App;

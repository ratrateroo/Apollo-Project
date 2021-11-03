import React from 'react';

import Upload from './components/Upload';
import { Files } from './components/Files';
import InputUpload from './components/InputUpload';

const App = () => {
	return (
		<div>
			<Upload />
			<Files />
			<InputUpload />
		</div>
	);
};

export default App;

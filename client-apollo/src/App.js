import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Container from '@mui/material/Container';

import Upload from './components/Upload';
import { Files } from './components/Files';
import InputUpload from './components/InputUpload';
import Welcome from './components/Welcome';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import Navigation from './components/Navigation';

const App = () => {
	return (
		<React.Fragment>
			<Navigation />
			<Container>
				<Routes>
					<Route path="/" element={<Welcome />} />
					<Route path="signup" element={<SignUp />} />
					<Route path="login" element={<LogIn />} />
				</Routes>
				<Outlet />
			</Container>
			{/* <Upload /> */}

			{/* <SignUp />
			<LogIn /> */}
			<Files />
			<InputUpload />
		</React.Fragment>
	);
};

export default App;

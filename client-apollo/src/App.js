import React, { useState } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Container from '@mui/material/Container';

import Upload from './components/Upload';
import { Files } from './components/Files';
import InputUpload from './components/InputUpload';
import Welcome from './components/Welcome';
import SignUp from './components/SignUp';
import SignUpUser from './components/SignUpUser';
import LogIn from './components/LogIn';
import LogInUser from './components/LogInUser';
import Navigation from './components/Navigation';
import UserProfile from './components/UserProfile';
import UserList from './components/UserList';
import Users from './components/Users';

import { setUserData, getUserData } from './util/userData';

const App = () => {
	// const [userInfo, setUserInfo] = useState();

	// const setUserDataHandler = (token, userId, tokenExpiration) => {
	// 	setUserData({
	// 		token: token,
	// 		userId: userId,
	// 		tokenExpiration: tokenExpiration,
	// 	});
	// 	setUserInfo({
	// 		token: token,
	// 		userId: userId,
	// 		tokenExpiration: tokenExpiration,
	// 	});
	// };

	return (
		<React.Fragment>
			<Navigation />
			<Container>
				<Routes>
					<Route path="/" element={<Welcome />} />
					<Route path="profile/:uid" element={<UserProfile />} />
					<Route path="userlist" element={<UserList />} />
					<Route path="users" element={<Users />} />
					<Route path="signup" element={<SignUp />} />
					<Route path="signupuser" element={<SignUpUser />} />
					<Route path="login" element={<LogIn />} />
					<Route path="loginuser" element={<LogInUser />} />
				</Routes>
				<Outlet />
			</Container>
			{/* <Upload /> */}

			{/* <SignUp />
			<LogIn /> */}
			{/* <Files /> */}
			<InputUpload />
		</React.Fragment>
	);
};

export default App;

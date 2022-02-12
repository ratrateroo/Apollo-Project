import React, { useContext } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme/theme';
import Container from '@mui/material/Container';

import Files from './components/Files';

import Welcome from './components/Welcome';
import SignUp from './components/SignUp';
import SignUpUser from './components/SignUpUser';
import LogIn from './components/LogIn';
import LogInUser from './components/LogInUser';
import Navigation from './components/Navigation';
import UserProfile from './components/UserProfile';
import UserList from './components/UserList';
import Users from './components/Users';

import RequireAuth from './auth/RequireAuth';
import { ColorModeContext } from './context/ColorModeContext';
const App = () => {
	const colorMode = useContext(ColorModeContext);
	return (
		<ThemeProvider theme={theme}>
			<React.Fragment>
				<Navigation colorMode={colorMode} />
				<Container>
					<Routes>
						<Route path="/" element={<Welcome />} />
						<Route path="files" element={<Files />} />

						<Route
							path="profile/:uid"
							element={
								//<RequireAuth>
								<UserProfile />
								//	</RequireAuth>
							}
						/>
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
			</React.Fragment>
		</ThemeProvider>
	);
};

export default App;

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { lightGreen } from '@mui/material/colors';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { setUserData } from '../util/userData';

const theme = createTheme({
	palette: {
		primary: {
			// Purple and green play nicely together.
			main: lightGreen[900],
		},
		secondary: {
			// This is green.A700 as hex.
			main: '#11cb5f',
		},
	},
});
const LogIn = (props) => {
	let navigate = useNavigate();
	let location = useLocation();
	let from = location.state?.from?.pathname || '/';
	const [user, setUser] = useState({
		username: '',
	});

	function usernameChangeHandler(e) {
		setUser({
			...user,
			username: e.target.value,
		});
	}

	function logInUserHandler(e) {
		e.preventDefault();
		console.log(user);
		const requestBody = {
			query: `
		  query logInUser(
			  $username: String!,
			  
			  ) {
		    logInUser(userInput: {
				username: $username,
				
				}) {
		      userId
			  token
			  tokenExpiration
		      
		    }
		  }
		`,
			variables: {
				username: user.username,
			},
		};

		fetch(`http://localhost:8000/graphql`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(requestBody),
		})
			.then((res) => {
				console.log(res);
				if (res.status !== 200 && res.status !== 201) {
					throw new Error('Failed!');
				}
				return res.json();
			})
			.then((resData) => {
				console.log(resData);
				// localStorage.setItem(
				// 	LOGGED_IN_USER,
				// 	JSON.stringify({
				// 		token: resData.data.logInUser.token,
				// 		userId: resData.data.logInUser.userId,
				// 		tokenExpiration: resData.data.logInUser.tokenExpiration,
				// 	})
				// );

				setUserData({
					token: resData.data.logInUser.token,
					userId: resData.data.logInUser.userId,
					tokenExpiration: resData.data.logInUser.tokenExpiration,
				});
				navigate(from, { replace: true });
				// props.onLogin(
				// 	resData.data.logInUser.token,
				// 	resData.data.logInUser.userId,
				// 	resData.data.logInUser.tokenExpiration
				// );

				return {
					token: resData.data.logInUser.token,
					userId: resData.data.logInUser.userId,
					tokenExpiration: resData.data.logInUser.tokenExpiration,
				};
				// if (resData.data.createUser.token) {
				// 	auth.login(
				// 		resData.data.createUser.token,
				// 		resData.data.createUser.userId,
				// 		resData.data.createUser.tokenExpiration
				// 	);
				// }
			})
			.catch((err) => {
				console.log(err);
			});
	}

	return (
		<React.Fragment>
			{/* <div style={{ border: '1px solid black', margin: '25px' }}>
				<form onSubmit={logInUserHandler}>
					<label>
						Username:
						<input
							value={user.username}
							onChange={usernameChangeHandler}
						/>
					</label>
					<button type="submit">Log In</button>
				</form>
			</div> */}

			<ThemeProvider theme={theme}>
				<Container component="main" maxWidth="xs">
					<CssBaseline />
					<Box
						sx={{
							marginTop: 8,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
						}}>
						<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
							<LockOutlinedIcon />
						</Avatar>
						<Typography component="h1" variant="h5">
							Log In
						</Typography>
						<Box
							component="form"
							onSubmit={logInUserHandler}
							noValidate
							sx={{ mt: 1 }}>
							<TextField
								name="username"
								margin="normal"
								required
								fullWidth
								id="username"
								label="Username"
								autoFocus
								onChange={usernameChangeHandler}
								value={user.username}
								type="text"
							/>

							{/* <FormControlLabel
								control={<Checkbox value="remember" color="primary" />}
								label="Remember me"
							/> */}
							<Button
								type="submit"
								fullWidth
								variant="contained"
								sx={{ mt: 3, mb: 2 }}>
								Login In
							</Button>
							{/* <Grid container>
								<Grid item>
									<Link to="/signup" variant="body2">
										{"Don't have an account? Sign Up"}
									</Link>
								</Grid>
							</Grid> */}
						</Box>
					</Box>
				</Container>
			</ThemeProvider>
		</React.Fragment>
	);
};

export default LogIn;

import React, { useState } from 'react';
import { LOGGED_IN_USER } from '../constants';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright(props) {
	return (
		<Typography
			variant="body2"
			color="text.secondary"
			align="center"
			{...props}>
			{'Copyright © '}
			<Link color="inherit" href="https://mui.com/">
				Your Website
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const theme = createTheme();

const SignUp = () => {
	const [user, setUser] = useState({
		username: '',
	});

	function usernameChangeHandler(e) {
		setUser({
			...user,
			username: e.target.value,
		});
	}

	function signUpUserHandler(e) {
		e.preventDefault();
		console.log(user);
		const requestBody = {
			query: `
		  mutation signUpUser(
			  $username: String!,
			  
			  ) {
		    signUpUser(userInput: {
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

		fetch('http://localhost:4000/graphql', {
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
				localStorage.setItem(
					LOGGED_IN_USER,
					JSON.stringify({
						token: resData.data.logInUser.token,
						userId: resData.data.logInUser.userId,
						tokenExpiration: resData.data.logInUser.tokenExpiration,
					})
				);
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
				<form onSubmit={signUpUserHandler}>
					<label>
						Username:
						<input
							value={user.username}
							onChange={usernameChangeHandler}
						/>
					</label>
					<button type="submit">Sign Up</button>
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
							Sign Up
						</Typography>
						<Box
							component="form"
							noValidate
							onSubmit={signUpUserHandler}
							sx={{ mt: 1 }}>
							<TextField
								name="username"
								required
								fullWidth
								id="username"
								label="Username"
								autoFocus
								onChange={usernameChangeHandler}
								value={user.username}
								type="text"
							/>

							<Button
								type="submit"
								fullWidth
								variant="contained"
								sx={{ mt: 3, mb: 2 }}>
								Sign Up
							</Button>
							<Grid container justifyContent="flex-end">
								<Grid item>
									<Link href="/login" variant="body2">
										Already have an account? Log in.
									</Link>
								</Grid>
							</Grid>
						</Box>
					</Box>
				</Container>
			</ThemeProvider>
		</React.Fragment>
	);
};

export default SignUp;

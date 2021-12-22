import React, { useState } from 'react';

import { gql, useMutation } from '@apollo/client';

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

export const SIGNUP_MUTATION = gql`
	mutation SignUpMutation($username: String!) {
		signUpUser(userInput: { username: $username }) {
			userId
			token
			tokenExpiration
		}
	}
`;

const SignUpUser = () => {
	const [signUpUser, { error }] = useMutation(SIGNUP_MUTATION);
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

		try {
			signUpUser({
				variables: {
					username: user.username,
				},
				onCompleted: ({ signUpUser }) => {
					setUserData({
						token: signUpUser.token,
						userId: signUpUser.userId,
						tokenExpiration: signUpUser.tokenExpiration,
					});
				},
			}).catch((err) => {
				console.log(err);
			});
		} catch (error) {
			console.log(error);
		}

		console.log(user);
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

							<Button
								type="submit"
								fullWidth
								variant="contained"
								sx={{ mt: 3, mb: 2 }}>
								Sign Up
							</Button>
							{/* <Grid container justifyContent="flex-end">
								<Grid item>
									<RouterLink to="/login" variant="body2">
										Already have an account? Log in.
									</RouterLink>
								</Grid>
							</Grid> */}
						</Box>
					</Box>
				</Container>
			</ThemeProvider>
		</React.Fragment>
	);
};

export default SignUpUser;

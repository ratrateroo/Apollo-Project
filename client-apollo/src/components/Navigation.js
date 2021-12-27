import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

import AppBar from '@mui/material/AppBar';

import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import { lightGreen } from '@mui/material/colors';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import { getUserData } from '../util/userData';

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

const Navigation = () => {
	const userData = getUserData();
	return (
		<React.Fragment>
			<ThemeProvider theme={theme}>
				<Box sx={{ flexGrow: 1 }}>
					<AppBar position="static" color="primary">
						<Toolbar>
							<IconButton
								size="large"
								edge="start"
								color="inherit"
								aria-label="menu"
								sx={{ mr: 2 }}>
								<MenuIcon />
							</IconButton>
							<Typography
								variant="h6"
								component="div"
								sx={{ flexGrow: 1 }}>
								Merry Christmas...
							</Typography>
							<Button color="inherit" to="/" component={RouterLink}>
								Home
							</Button>
							<Button color="inherit" to="/files" component={RouterLink}>
								Files
							</Button>

							{getUserData.token && (
								<Button
									color="inherit"
									to="/profile"
									component={RouterLink}>
									Profile
								</Button>
							)}

							<Button color="inherit" to="/users" component={RouterLink}>
								Users
							</Button>
							<Button
								color="inherit"
								to="/userlist"
								component={RouterLink}>
								User List
							</Button>
							<Button
								color="inherit"
								to="/signup"
								component={RouterLink}>
								Sign Up
							</Button>
							<Button
								color="inherit"
								to="/signupuser"
								component={RouterLink}>
								Sign Up User
							</Button>

							<Button color="inherit" to="/login" component={RouterLink}>
								Log In
							</Button>
							<Button
								color="inherit"
								to="/loginuser"
								component={RouterLink}>
								Log In User
							</Button>
						</Toolbar>
					</AppBar>
				</Box>
			</ThemeProvider>
		</React.Fragment>
	);
};
export default Navigation;

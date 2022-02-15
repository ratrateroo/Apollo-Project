import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

import Button from '@mui/material/Button';

import AppBar from '@mui/material/AppBar';

import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import { useTheme } from '@mui/material/styles';

import { getUserData } from '../util/userData';

const Navigation = ({ colorMode }) => {
	const theme = useTheme();
	return (
		<React.Fragment>
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
							sx={{ flexGrow: 1 }}></Typography>
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
						<Button color="inherit" to="/userlist" component={RouterLink}>
							User List
						</Button>
						<Button color="inherit" to="/signup" component={RouterLink}>
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
						<IconButton
							color="inherit"
							onClick={colorMode.toggleColorMode}>
							{theme.palette.mode === 'light' ? (
								<Brightness7Icon />
							) : (
								<Brightness4Icon />
							)}
						</IconButton>
					</Toolbar>
				</AppBar>
			</Box>
		</React.Fragment>
	);
};
export default Navigation;

import React, { useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { lightGreen } from '@mui/material/colors';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { setUserData } from '../util/userData';
import { useParams } from 'react-router-dom';
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

const USER_QUERY = gql`
	{
		users {
			_id
			username
			profileimage
		}
	}
`;

const UserProfile = (props) => {
	const userData = getUserData();
	const params = useParams();
	const { uid } = params;
	const [loadedUser, setLoadedUser] = useState({});
	const { loading, error, data } = useQuery(USER_QUERY, {
		variables: {
			id: userData.userId,
		},
	});
	useEffect(() => {
		console.log(uid);
	});
	return (
		<React.Fragment>
			<ThemeProvider theme={theme}>
				<Container
					component="main"
					sx={{
						background: 'gray',
						padding: '25px',
						mt: 5,
					}}>
					<CssBaseline />
					<Box
						sx={{
							marginTop: 3,
							padding: 3,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
						}}>
						<Paper elevation={3} sx={{ padding: '30px' }}>
							<Avatar
								alt="Remy Sharp"
								src="https://i.pravatar.cc/250"
								sx={{ width: 250, height: 250 }}
							/>
							<Box
								sx={{
									marginTop: 3,
									padding: 3,
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
								}}>
								<Typography component="h1" variant="h5">
									Username
								</Typography>
								{userData.userId === uid && (
									<Button>Update Profile</Button>
								)}
							</Box>
						</Paper>
					</Box>
				</Container>
			</ThemeProvider>
		</React.Fragment>
	);
};
export default UserProfile;

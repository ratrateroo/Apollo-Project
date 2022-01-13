import React, { useState, useEffect } from 'react';
import { gql, useQuery, useMutation, useApolloClient } from '@apollo/client';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import CssBaseline from '@mui/material/CssBaseline';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { lightGreen } from '@mui/material/colors';

import Modal from '@mui/material/Modal';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { setUserData } from '../util/userData';
import { useParams } from 'react-router-dom';
import { getUserData } from '../util/userData';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

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
	query UserQuery($id: ID!) {
		user(id: $id) {
			_id
			username
			profileimage
		}
	}
`;

const SINGLE_UPLOAD_MUTATION = gql`
	mutation uploadFile($file: Upload!) {
		uploadFile(file: $file) {
			filename
			mimetype
			encoding
		}
	}
`;

const UserProfile = (props) => {
	const [isUpdating, setIsUpdating] = useState(false);
	const userData = getUserData();
	const params = useParams();
	const { uid } = params;
	//const [loadedUser, setLoadedUser] = useState({});
	const { loading, error, data } = useQuery(USER_QUERY, {
		variables: {
			id: uid,
		},
	});
	const [uploadFileMutation] = useMutation(SINGLE_UPLOAD_MUTATION);
	const apolloClient = useApolloClient();

	// useEffect(() => {
	// 	setLoadedUser(data);
	// }, [loading, error, data]);

	const startProfileUpdateHandler = (event) => {
		event.preventDefault();
		setIsUpdating(true);
	};
	const stopProfileUpdateHandler = (event) => {
		event.preventDefault();
		setIsUpdating(false);
	};

	const onUploadHandler = ({
		target: {
			validity,
			files: [file],
		},
	}) => {
		validity.valid &&
			uploadFileMutation({ variables: { file: file } }).then(() => {
				apolloClient.resetStore();
			});
	};
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
					{loading ? (
						<h3>Loading</h3>
					) : (
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
									src="http://localhost:8000/freefiles/images/bk8iLAFWbuK5.jpg"
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
										{data.user.username}
									</Typography>

									{userData.userId === uid && (
										<Button onClick={startProfileUpdateHandler}>
											Update Profile
										</Button>
									)}
								</Box>
							</Paper>
							<Modal
								open={isUpdating}
								onClose={stopProfileUpdateHandler}
								aria-labelledby="modal-modal-title"
								aria-describedby="modal-modal-description">
								<Box sx={style}>
									<Typography
										id="modal-modal-title"
										variant="h6"
										component="h2">
										Change Profile Image
									</Typography>

									<Avatar
										alt="Remy Sharp"
										src="https://i.pravatar.cc/250"
										sx={{ width: 250, height: 250 }}
									/>
									<Input
										type="file"
										accept="image/*"
										style={{ display: 'none' }}
										multiple
										id="raised-button-file"
										onChange={onUploadHandler}
									/>
									<label htmlFor="raised-button-file">
										<Button variant="raised" component="span">
											Upload
										</Button>
									</label>
								</Box>
							</Modal>
						</Box>
					)}
				</Container>
			</ThemeProvider>
		</React.Fragment>
	);
};
export default UserProfile;

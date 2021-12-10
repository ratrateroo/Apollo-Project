import React, { useEffect, useState } from 'react';

import { gql, useQuery } from '@apollo/client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import UserCard from './UserCard';

const Item = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	color: theme.palette.text.secondary,
}));

export const USERS_QUERY = gql`
	query AllUsersQuery {
		users {
			_id
			username
			profileimage
		}
	}
`;

const Welcome = () => {
	const [loadedUsers, setLoadedUsers] = useState([]);
	const { loading, error, data } = useQuery(USERS_QUERY);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				console.log(data);

				//setLoadedUsers(resData.data.users);
			} catch (err) {
				console.log(err);
			}
		};
		fetchUsers();
	}, []);

	return (
		<React.Fragment>
			<Box sx={{ width: '100%', maxWidth: 500 }}>
				<Typography variant="h2" component="div" gutterBottom>
					Welcome...
				</Typography>
				<Typography variant="h4" gutterBottom component="div">
					It is nice to be home.
				</Typography>
			</Box>
			<Box sx={{ flexGrow: 1 }}>
				<Grid container spacing={2}>
					<Grid item>
						<UserCard />
					</Grid>
					<Grid item>
						<UserCard />
					</Grid>
					<Grid item>
						<UserCard />
					</Grid>
					{/* <Grid item xs={6} md={8}>
						<UserCard />
					</Grid> */}
				</Grid>
			</Box>
		</React.Fragment>
	);
};
export default Welcome;

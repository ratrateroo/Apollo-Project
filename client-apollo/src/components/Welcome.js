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
	const { loading, error, data } = useQuery(USERS_QUERY, {});

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const userData = data.json();
				console.log(userData);

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
				<UserCard />
				<Grid container spacing={2}>
					<Grid item xs={6} md={8}>
						<Item>xs=6 md=8</Item>
					</Grid>
					<Grid item xs={6} md={4}>
						<Item>xs=6 md=4</Item>
					</Grid>
					<Grid item xs={6} md={4}>
						<Item>xs=6 md=4</Item>
					</Grid>
					<Grid item xs={6} md={8}>
						<Item>xs=6 md=8</Item>
					</Grid>
				</Grid>
			</Box>
		</React.Fragment>
	);
};
export default Welcome;

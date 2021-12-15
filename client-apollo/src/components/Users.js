import React, { useEffect, useState } from 'react';

import { gql, useQuery } from '@apollo/client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import UserCard from './UserCard';

import { getUserData } from '../util/userData';

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

const UserList = () => {
	const [loadedUsers, setLoadedUsers] = useState([]);
	const { loading, error, data } = useQuery(USERS_QUERY);

	const userData = getUserData();
	console.log(userData);

	useEffect(() => {
		try {
			console.log(data);

			//setLoadedUsers(data.users);
		} catch (err) {
			console.log(err);
		}
	}, [loading, error, data]);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error</div>;

	return (
		<React.Fragment>
			<Box sx={{ flexGrow: 1 }}>
				<Grid container spacing={2}>
					{/* {loadedUsers.map(user,index) => {
                        <Grid item>
						<UserCard username={user.}/>
					</Grid>
                    }} */}
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
export default UserList;

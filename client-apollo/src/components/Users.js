import React, { useEffect, useState } from 'react';

import { gql, useLazyQuery } from '@apollo/client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Grid from '@mui/material/Grid';

import UserCard from './UserCard';

import { getUserData } from '../util/userData';

export const USERS_QUERY = gql`
	{
		users {
			_id
			username
			profileimage
		}
	}
`;

const Users = () => {
	const userData = getUserData();

	console.log(userData);
	console.log(`Bearer ${userData.token}`);
	const [loadedUsers, setLoadedUsers] = useState([]);

	const [getUsers, { data, loading, error }] = useLazyQuery(USERS_QUERY);

	useEffect(() => {
		try {
			getUsers();
			setLoadedUsers(data.users);
			console.log(data);
		} catch (err) {
			console.log(err);
		}
	}, [data, getUsers]);

	return (
		<React.Fragment>
			<Box sx={{ flexGrow: 1, mt: 2 }}>
				<Grid container spacing={2}>
					{/* {loadedUsers.map(user,index) => {
                        <Grid item>
						<UserCard username={user.}/>
					</Grid>
                    }} */}
					{loading && (
						<Typography gutterBottom variant="h5" component="div">
							Loading...
						</Typography>
					)}
					{error && (
						<Typography gutterBottom variant="h5" component="div">
							Some error occured...
						</Typography>
					)}
					{data &&
						loadedUsers.map((user) => (
							<Grid item key={user._id}>
								<UserCard
									username={user.username}
									profileimage={user.profileimage}
									id={user._id}
								/>
							</Grid>
						))}

					{/* <Grid item xs={6} md={8}>
						<UserCard />
					</Grid> */}
				</Grid>
			</Box>
		</React.Fragment>
	);
};
export default Users;

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
	const { loading, error, data } = useQuery(USERS_QUERY, {
		// fetchPolicy: 'standby',
		// context: {
		// 	headers: {
		// 		authorization: `Bearer${' '}${userData.token}`,
		// 	},
		// },
	});

	const loadUsersHandler = () => {
		console.log(`Bearer ${userData.token}`);
	};

	useEffect(() => {
		try {
			setLoadedUsers(data.users);
			console.log(data);

			//setLoadedUsers(data.users);
		} catch (err) {
			console.log(err);
		}
	}, [loading, error, data]);

	// if (loading) return <div>Loading...</div>;
	// if (error) {
	// 	console.log(error);
	// 	return <div>Error</div>;
	// }
	return (
		<React.Fragment>
			<Box sx={{ flexGrow: 1, mt: 2 }}>
				<Grid container spacing={2}>
					{/* {loadedUsers.map(user,index) => {
                        <Grid item>
						<UserCard username={user.}/>
					</Grid>
                    }} */}
					{loadedUsers.map((user) => (
						<Grid item>
							<UserCard
								key={user._id}
								username={user.username}
								profileimage={user.profileimage}
								id={user._id}
							/>
						</Grid>
					))}
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
export default Users;

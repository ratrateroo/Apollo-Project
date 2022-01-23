import React, { useEffect, useState } from 'react';

import { gql, useLazyQuery } from '@apollo/client';

import Box from '@mui/material/Box';

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
	//const { loading, error, data } = useQuery(USERS_QUERY);
	const [getUsers, { data }] = useLazyQuery(USERS_QUERY);

	useEffect(() => {
		try {
			getUsers();
			setLoadedUsers(data.users);
			console.log(data);

			//setLoadedUsers(data.users);
		} catch (err) {
			console.log(err);
		}
	}, [getUsers, data]);

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

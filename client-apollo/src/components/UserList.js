import React, { useEffect, useState } from 'react';

import { gql } from '@apollo/client';

import Box from '@mui/material/Box';

import Grid from '@mui/material/Grid';

import UserCard from './UserCard';

import { getUserData } from '../util/userData';

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

	const userData = getUserData();
	console.log(userData);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const requestBody = {
					query: `
        query {
			users{
				_id
			username
			profileimage
    			
			}
    
          }
        
      `,
				};

				fetch('http://localhost:8000/graphql', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						//Authorization: 'Bearer ' + userData.token,
					},
					body: JSON.stringify(requestBody),
				})
					.then((res) => {
						if (res.status !== 200 && res.status !== 201) {
							throw new Error('Failed!');
						}

						return res.json();
					})
					.then((resData) => {
						console.log(resData.data);
						console.log(resData.data.users);
						setLoadedUsers(resData.data.users);
					})
					.catch((err) => {
						console.log(err);
					});
			} catch (err) {
				console.log(err);
			}
		};
		fetchUsers();
	}, []);
	return (
		<React.Fragment>
			<Box sx={{ flexGrow: 1 }}>
				<Grid container spacing={2}>
					{loadedUsers.map((user, index) => {
						<Grid item>
							<UserCard username={user.username} />
						</Grid>;
					})}
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

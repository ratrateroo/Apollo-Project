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
	const [isLoading, setIsLoading] = useState(true);
	const [loadedUsers, setLoadedUsers] = useState();
	const [showUsers, setShowUsers] = useState(false);

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

				await fetch('http://localhost:8000/graphql', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + userData.token,
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
		setIsLoading(false);
	}, [userData.token]);

	const loadHandler = () => {
		setShowUsers(true);
		console.log(loadedUsers);
		loadedUsers.map((user) => {
			console.log(user);
			return user.username;
		});
	};
	return (
		<React.Fragment>
			<button onClick={loadHandler}>load</button>
			<h1>User:{showUsers ? 'True' : 'False'}</h1>
			<Box sx={{ flexGrow: 1 }}>
				<Grid container spacing={2}>
					{!isLoading ? (
						loadedUsers.map((user) => {
							return (
								<Grid item key={user._id}>
									<UserCard
										username={user.username}
										profileimage={user.profileimage}
										id={user._id}
									/>
									{console.log(user.username)}
									<h1>{user.username}</h1>
								</Grid>
							);
						})
					) : (
						<h1>Loading</h1>
					)}
				</Grid>
			</Box>
		</React.Fragment>
	);
};
export default UserList;

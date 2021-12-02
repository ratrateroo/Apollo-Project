import React, { useState } from 'react';
const SignUp = () => {
	const [user, setUser] = useState({
		username: '',
	});

	function usernameChangeHandler(e) {
		setUser({
			...user,
			username: e.target.value,
		});
	}

	function signUpUserHandler(e) {
		e.preventDefault();
		console.log(user);
		const requestBody = {
			query: `
		  mutation signUpUser(
			  $username: String!,
			  
			  ) {
		    signUpUser(userInput: {
				username: $username,
				
				}) {
		      userId
			  token
			  tokenExpiration
		      
		    }
		  }
		`,
			variables: {
				username: user.username,
			},
		};

		fetch('http://localhost:4000/graphql', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(requestBody),
		})
			.then((res) => {
				console.log(res);
				if (res.status !== 200 && res.status !== 201) {
					throw new Error('Failed!');
				}
				return res.json();
			})
			.then((resData) => {
				console.log(resData);
				// if (resData.data.createUser.token) {
				// 	auth.login(
				// 		resData.data.createUser.token,
				// 		resData.data.createUser.userId,
				// 		resData.data.createUser.tokenExpiration
				// 	);
				// }
			})
			.catch((err) => {
				console.log(err);
			});
	}

	return (
		<div style={{ border: '1px solid black', margin: '25px' }}>
			<form onSubmit={signUpUserHandler}>
				<label>
					Username:
					<input value={user.username} onChange={usernameChangeHandler} />
				</label>
				<button type="submit">Sign Up</button>
			</form>
		</div>
	);
};

export default SignUp;

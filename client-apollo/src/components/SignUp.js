import React, { useState } from 'react';

const SignUp = () => {
	const [{ username }, setUsername] = useState({ username: '' });
	const submitHandler = (event) => {
		event.preventDefault();
		setUsername((currentState) => {
			return {
				...currentState,
				username: event.target.value,
			};
		});
	};
	return (
		<div>
			{/* <form onSubmit={submitHandler}>
				<label htmlFor="username"></label>
				<input type="text" placeholder="Enter Username" name="username" />
				<button type="submit">Sign Up</button>
			</form> */}
			<h1>{username}</h1>
			<form onSubmit={submitHandler}>
				<label>
					Name:
					<input type="text" name="username" />
				</label>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
};

export default SignUp;

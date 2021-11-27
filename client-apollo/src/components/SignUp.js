import React, { useState } from 'react';

const SignUp = () => {
	const [username, setUsername] = useState();
	const submitHandler = (event) => {
		event.preventDefault();
		setUsername(event.target.value);
		console.log(username);
	};
	return (
		<div>
			{/* <form onSubmit={submitHandler}>
				<label htmlFor="username"></label>
				<input type="text" placeholder="Enter Username" name="username" />
				<button type="submit">Sign Up</button>
			</form> */}
			{/* <h1>{username.value}</h1> */}
			<form onSubmit={submitHandler}>
				<label>
					Name:
					<input type="text" />
				</label>
				<input type="submit" value="Submit" />
			</form>
		</div>
	);
};

export default SignUp;

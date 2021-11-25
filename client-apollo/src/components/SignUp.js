import React from 'react';

const SignUp = () => {
	const submitHandler = (e) => {
		e.preventDefault();
		console.log(e.target.value);
	};
	return (
		<div>
			<form onSubmit={submitHandler}>
				<label htmlFor="username"></label>
				<input type="text" placeholder="Enter Username" name="username" />
				<button type="submit">Sign Up</button>
			</form>
		</div>
	);
};

export default SignUp;

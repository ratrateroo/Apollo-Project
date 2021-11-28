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

	function submitFormHandler(e) {
		e.preventDefault();
		console.log(user);
	}

	return (
		<div>
			<form onSubmit={submitFormHandler}>
				<label>
					Username:
					<input value={user.username} onChange={usernameChangeHandler} />
				</label>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
};

export default SignUp;

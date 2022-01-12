import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// import { styled } from '@mui/material/styles';
// import Paper from '@mui/material/Paper';

import { getUserData } from '../util/userData';

// const Item = styled(Paper)(({ theme }) => ({
// 	...theme.typography.body2,
// 	padding: theme.spacing(1),
// 	textAlign: 'center',
// 	color: theme.palette.text.secondary,
// }));

const Welcome = () => {
	const userData = getUserData();
	console.log(userData);

	return (
		<React.Fragment>
			<Box sx={{ width: '100%', maxWidth: 'lg' }}>
				<Typography variant="h2" component="div" gutterBottom>
					Welcome...
				</Typography>
				<Typography variant="h4" gutterBottom component="div">
					It is nice to be home.
				</Typography>
			</Box>
		</React.Fragment>
	);
};
export default Welcome;

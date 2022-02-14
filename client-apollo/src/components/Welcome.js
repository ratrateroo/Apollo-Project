import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { getUserData } from '../util/userData';

const Welcome = () => {
	const userData = getUserData();

	console.log('Page Reloaded');

	return (
		<React.Fragment>
			<Box sx={{ width: '100%', maxWidth: 'lg' }}></Box>
			<Typography gutterBottom variant="h1" component="div">
				Loading...
			</Typography>
		</React.Fragment>
	);
};
export default Welcome;

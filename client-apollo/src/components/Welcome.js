import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { getUserData } from '../util/userData';

import customtheme from '../theme/custometheme';

import { ThemeProvider } from '@mui/material/styles';
const Welcome = () => {
	const userData = getUserData();
	console.log(userData);

	return (
		<React.Fragment>
			<ThemeProvider theme={customtheme}>
				<Box sx={{ width: '100%', maxWidth: 'lg' }}></Box>
				<Typography gutterBottom variant="body2" primary component="div">
					Loading...
				</Typography>
			</ThemeProvider>
		</React.Fragment>
	);
};
export default Welcome;

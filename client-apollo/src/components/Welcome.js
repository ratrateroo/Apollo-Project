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
				<Typography component="div" variant="h3">
					<Box sx={{ color: 'primary.main' }}>primary.main</Box>
					<Box sx={{ color: 'primary.light' }}>primary.main</Box>
					<Box sx={{ color: 'primary.dark' }}>primary.main</Box>
					<Box sx={{ color: 'secondary.main' }}>secondary.main</Box>
					<Box sx={{ color: 'secondary.light' }}>secondary.main</Box>
					<Box sx={{ color: 'secondary.dark' }}>secondary.main</Box>
					<Box sx={{ color: 'error.main' }}>error.main</Box>
					<Box sx={{ color: 'warning.main' }}>warning.main</Box>
					<Box sx={{ color: 'info.main' }}>info.main</Box>
					<Box sx={{ color: 'success.main' }}>success.main</Box>
					<Box sx={{ color: 'text.primary' }}>text.primary</Box>
					<Box sx={{ color: 'text.secondary' }}>text.secondary</Box>
					<Box sx={{ color: 'text.disabled' }}>text.disabled</Box>
				</Typography>
			</ThemeProvider>
		</React.Fragment>
	);
};
export default Welcome;

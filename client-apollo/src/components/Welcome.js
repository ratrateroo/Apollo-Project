import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Types() {
	return (
		<Box sx={{ width: '100%', maxWidth: 500 }}>
			<Typography variant="h2" component="div" gutterBottom>
				Welcome...
			</Typography>
			<Typography variant="h4" gutterBottom component="div">
				It is nice to be home.
			</Typography>
		</Box>
	);
}

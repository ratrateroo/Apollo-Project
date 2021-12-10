import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

export default function UserCard() {
	return (
		<Card sx={{ maxWidth: 300 }}>
			<CardActionArea>
				<CardMedia
					component="img"
					height="250"
					image="https://picsum.photos/300/250"
					alt="user-random-image"
				/>
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
						Username
					</Typography>
				</CardContent>
			</CardActionArea>
			<CardActions>
				<Button size="small" color="primary">
					Share
				</Button>
			</CardActions>
		</Card>
	);
}

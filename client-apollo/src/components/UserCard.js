import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { NavLink } from 'react-router-dom';

export default function UserCard({ username, id, profileimage }) {
	return (
		<Button to={`/profile/${id}`} component={NavLink}>
			<Card sx={{ maxWidth: 300 }}>
				<CardActionArea>
					<CardMedia
						component="img"
						height="250"
						image="https://picsum.photos/300/250"
						alt={(id + username + profileimage).toString()}
					/>
					<CardContent>
						<Typography gutterBottom variant="h5" component="div">
							{username}
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
		</Button>
	);
}

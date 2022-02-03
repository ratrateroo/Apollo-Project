import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { NavLink } from 'react-router-dom';

export default function UserCard(props) {
	return (
		<Button to={`/profile/${props.id}`} component={NavLink}>
			<Card sx={{ maxWidth: 300 }}>
				<CardActionArea>
					<CardMedia
						component="img"
						height="250"
						image={`http://localhost:8000/freefiles/images/${props.profileimage}`}
						alt={(
							props.id +
							props.username +
							props.profileimage
						).toString()}
					/>
					<CardContent>
						<Typography gutterBottom variant="h5" component="div">
							{props.username}
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
		</Button>
	);
}

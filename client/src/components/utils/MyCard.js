import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router'
import { Outlet } from 'react-router-dom'

export default function MyCard({ name, image, route }) {
    const navigate = useNavigate()

    return (
        <Card style={{ width: "60%", marginLeft: "auto", marginRight: "auto", marginTop: "1rem", marginBottom: "1rem" }}
            onClick={() => navigate(`/products/${route}`)} >
            <CardActionArea>
                <CardContent className="cardContent">
                    <Typography gutterBottom variant="h5" textAlign="center" >
                        {name}
                    </Typography>

                </CardContent>
                <CardMedia
                    component="img"
                    image={image}
                    alt={name}
                />
            </CardActionArea>
            <Outlet />
        </Card>
    );
}



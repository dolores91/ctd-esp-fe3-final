import React, { FC } from 'react';
import Link from 'next/link';
import { Card, Typography, Button, CardMedia, CardContent, CardActions } from '@mui/material';

interface CCProps {
    title: string;
    image: string;
    id: number;
}
 
const ComicCard: FC<CCProps> = ({ title, image, id }) => {
    const handleVerDetalleClick = () => {
        console.log(`/comics/${id}`);
    };
    const handleComprarClick = () => {
        console.log(`Compra directa del cómic con ID: ${id}`);
    };
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                height="350"
                alt="Foto portada del cómic"
                image={image}
                sx={{ borderRadius: '16px' }}
            />
            <CardContent>
                <Typography gutterBottom variant="body2" component="div">
                    {title}
                </Typography>
            </CardContent>

            <CardActions sx={{ justifyContent: 'center' }}>
                <Link href={`/comics/${id}`}>
                    <Button size="small" variant="outlined" onClick={handleVerDetalleClick}>
                        VER DETALLE
                    </Button>
                </Link>
                <Link href={{ pathname: "/checkout/", query: `comic=${id}` }}>
                    <Button onClick={handleComprarClick} size="small" variant="contained">
                        COMPRAR
                    </Button></Link>
            </CardActions>
        </Card >
    );
};

export default ComicCard;

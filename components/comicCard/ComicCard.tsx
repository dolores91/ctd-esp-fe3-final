import React, { FC } from 'react';
import Link from 'next/link';
import { Card, Typography, Button, CardMedia, CardContent, CardActions } from '@mui/material';

interface CCProps {
    title: string;
    image: string;
    id: number;
}

const ComicCard: FC<CCProps> = ({ title, image, id }) => {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                height="300"
                alt="Foto portada del cómic"
                image={image}
                sx={{ objectFit: 'contain' }}
            />
            <CardContent>
                <Typography gutterBottom variant="body2" component="div">
                    {title}
                </Typography>
            </CardContent>

            <CardActions>
                <Button size="small" variant="contained">
                    COMPRAR
                </Button>
                <Link href={`/comics/${id}`}>
                    <Button size="small" variant="outlined">
                        VER DETALLE
                    </Button>
                </Link>
            </CardActions>
        </Card >
    );
};

export default ComicCard;
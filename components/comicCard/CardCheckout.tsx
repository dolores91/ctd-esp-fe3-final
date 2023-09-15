import React, { FC } from 'react';
import { IComic } from 'types/IComic.type';
import { Paper, CardContent, Typography, Card, CardMedia, Box } from '@mui/material';

type CardCheckoutProps = {
  comic: IComic | undefined;
};

const CardCheckout: FC<CardCheckoutProps> = ({ comic }) => {
  return (
    <Paper elevation={1}>
      <Card>
        {comic && (
          <>
            <CardMedia
              component="img"
              alt={comic.title}
              height="200"
              image={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
              sx={{
                objectFit: 'contain',
                minWidth: '100%',
                marginTop: '8px',
              }}
            />
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                {comic.title} -{' '}
                <span style={{ fontWeight: 'bold' }}>$ {comic.price}</span>
              </Typography>
            </CardContent>
          </>
        )}
      </Card>
    </Paper>
  );
};

export default CardCheckout;




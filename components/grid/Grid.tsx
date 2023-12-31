import React, { FC } from 'react'
import { Grid } from '@mui/material';
import { IComic } from 'types/IComic.type';
import ComicCard from '../comicCard/ComicCard';

interface GProps {
    comics: IComic[],
}

const GridLayout: FC<GProps> = ({ comics }) => {

    return (
        <Grid container spacing={{ xs: 2 }} sx={{ marginBottom: '15px', justifyContent: 'center', alignItems: 'center' }}>
            {comics.map((comic, index) => (
                <Grid item xs={12} md={6} lg={4} key={index}>
                    <ComicCard title={comic.title} image={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} id={comic.id} />
                </Grid>
            ))}
        </Grid>
    )
}

export default GridLayout
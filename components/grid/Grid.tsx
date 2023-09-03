import React, { FC } from 'react'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import Item from '@mui/material/Unstable_Grid2/Grid2';
//import { Comic } from 'dh-marvel/features/comic.types';
import ComicCard from '../card/Card';

interface Props {
    comics: Comic[],
}

const Grid: FC<Props> = ({ comics }) => {
    return (
        <Grid2 container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {comics.map((comic, index) => (
                <Grid2 xs={12} sm={4} md={4} key={index}>
                    <ComicCard title={comic.title} img={comic.thumbnail.path + "." + comic.thumbnail.extension} />
                </Grid2>
            ))}
        </Grid2>
    )
}
type Images = {
    path: string,
    extension: string,
}

export type Comic = {
    id: number,
    digitalId: number,
    title: string,
    issueNumber: number,
    variantDescription: string,
    description: string,
    modified: string,
    isbn: string,
    upc: string,
    diamondCode: string,
    ean: string,
    issn: string,
    format: string,
    pageCount: number,
    textObjects: [],
    resourceURI: string,
    urls: [],
    series: {},
    variants: [],
    collections: [],
    collectedIssues: [],
    dates: [],
    thumbnail: {
        path: string,
        extension: string,
    },
    images: Images[],
    creators: {
        available: number,
        collectionURI: string,
        items: [],
        returned: number,
    },
    characters: {
        available: number,
        collectionURI: string,
        items: [],
        returned: number,
    },
    stories: {
        available: number,
        collectionURI: string,
        items: [],
        returned: number,
    },
    events: {
        available: number,
        collectionURI: string,
        items: [],
        returned: number
    }
}
export default Grid;
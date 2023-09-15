import React from 'react'
import Head from 'next/head'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { getComic, getComics } from 'dh-marvel/services/marvel/marvel.service'
import { IComic, IComicResponse } from 'types/IComic.type'
import BodySingle from 'dh-marvel/components/layouts/body/single/body-single'
import ComicCardDetail from 'dh-marvel/components/comicCard/ComicCardDetail'
import { Grid, CardMedia, Typography } from "@mui/material";
import { useRouter } from 'next/router'

interface ComicProps {
    comic: IComic
}

const Comic: NextPage<ComicProps> = ({ comic }) => {
    const router = useRouter();

    if (router.isFallback === true) {
        return <Typography>Loading Comic...</Typography>
    }
    console.log(comic);

    return (
        <>
            <Head>
                <title>Comic | DH MARVEL</title>
                <meta name="description" content={`Marvel comic: ${comic.title}`} />
                <link rel="icon" href="/marvel.png" />
            </Head>
            <BodySingle title={comic.title}>
                <Grid container spacing={2} sx={{ maxWidth: "900px", margin: "0 auto" }}>
                    <Grid item xs={12} md={4} >
                        <CardMedia
                            component="img"
                            height="auto"
                            alt={comic.title}
                            image={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                            sx={{
                                objectFit: "cover",
                                borderRadius: "16px",
                            }}
                        />
                    </Grid>
                    <Grid md={8} sx={{ alignSelf: "center" }}>
                        <ComicCardDetail comic={comic}></ComicCardDetail>
                    </Grid>
                </Grid>

            </BodySingle>


        </>
    )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const id = parseInt(params?.id as string);
    const data = await getComic(id)

    return {
        props: {
            comic: data
        },
        revalidate: 10,
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const data: IComicResponse = await getComics();

    const paths = data.data.results.map((comic) => {
        return { params: { id: comic.id.toString() } }
    })

    return {
        paths,
        fallback: true,
    }
}

export default Comic;
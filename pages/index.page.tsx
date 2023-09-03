import { useEffect, useState } from 'react';
import type { NextPage } from 'next'
import Head from 'next/head'
import BodySingle from "dh-marvel/components/layouts/body/single/body-single";
import { getComics } from 'dh-marvel/services/marvel/marvel.service';
import Grid from 'dh-marvel/components/grid/Grid';

const INITIAL_OFFSET = 0
const INITIAL_LIMIT = 12

export async function getServerSideProps() {
    const response = await getComics(INITIAL_OFFSET, INITIAL_LIMIT)
    return {
        props: {
            initialComics: response.data.results,
            limit: response.data.count,
            initialTotal: response.data.total
        },
    };

}
type indexProps = {
    initialComics: any;
    initialTotal: number,
}




const Index: NextPage<indexProps> = ({ initialComics, initialTotal }) => {

    const [comics, setComics] = useState(initialComics)
    console.log(comics);

    return (
        <>
            <Head>
                <title>Home</title>
                <meta name="description" content="Pagina de inicio de DH Marvel" />
                <link rel="icon" href="/marvel.png" />
            </Head>

            <BodySingle title={"DH Marvel"}>

                <Grid comics={comics} ></Grid>


            </BodySingle>
        </>
    )
}

export default Index
/** La grilla deberá soportar algún tipo de paginación simple. Se puede utilizar botones de `Anterior y Siguiente` o `carga infinita (Endless loading)`
* Esta página permite la funcionalidad [Opcional 3: Compra de 1 Click](#opcional-3-compra-de-1-click)*/
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Head from 'next/head';
import Box from '@mui/material/Box';
import { GetStaticProps, NextPage } from 'next';
import { faqsData } from '../components/faqs/faqsData'
import { Container } from '@mui/material';
import AccordionFaq from 'dh-marvel/components/accordion/AccordionFaq';



const faqs: NextPage<FaqProps> = ({ faq }) => {
    return (
        <>
            <Head>
                <title>Preguntas frecuentes</title>
                <meta name="description" content="Preguntas frecuentes sobre DH MARVEL" />
                <link rel="icon" href="/marvel.png" />
            </Head>
            <Box sx={{ p: 2 }}>
                <Box width="100%" display="flex" alignItems="center" justifyContent="center" sx={{ p: 2 }}>
                    <Typography variant="h3" component="h1" textAlign='center' sx={{ color: 'gray', fontWeight: 'bold', alignSelf: 'center' }}>
                        Preguntas frecuentes
                    </Typography></Box>

                <Container sx={{
                    marginTop: 5,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'start',
                }}>

                    {faq.map(q => <AccordionFaq key={q.id} title={q.question} text={q.answer} />)}
                </Container>

            </Box>
        </>

    );
}

type Faq = {
    id: number,
    question: string,
    answer: string
}

export const getStaticProps: GetStaticProps = () => {

    const faq: Faq[] = faqsData

    return {
        props: {
            faq
        }
    }
}


type FaqProps = {
    faq: Faq[]
}
export default faqs
/*- 
VER SI TENIA Q HACER API SI O SI,
SINO BORRAR ARCHIVO DE API
Si te animás a Storybook, podes crear un componente Faqs junto con su story, para visualizarlo
    - El mismo deberia recibir un array de Faqs, un objeto que deberiamos tipar
    - Renderizar por cada FAQ un item del `accordion`
    - Con el componente listo, ya podemos proceder a utilizarlo dentro de las página
  - Finalmente, si bien no es obligatorio, este es un componente simple para testear, para mantener alto nuestro coverage y dar por cerrada esta función.
   */
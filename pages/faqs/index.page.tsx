import * as React from 'react';
import Typography from '@mui/material/Typography';
import Head from 'next/head';
import Box from '@mui/material/Box';
import { GetStaticProps, NextPage } from 'next';
import { faqsData } from '../../components/faqs/faqsData'
import { Container } from '@mui/material';
import AccordionFaq from 'dh-marvel/components/accordion/AccordionFaq';



const faqs: NextPage<FaqProps> = ({ faq }) => {
    return (
        <>
            <Head>
                <title>Preguntas frecuentes | DH MARVEL</title>
                <meta name="description" content="Preguntas frecuentes sobre DH MARVEL" />
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

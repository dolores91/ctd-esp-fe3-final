import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head'
import { IComic } from 'types/IComic.type';
import { getComicsById } from 'dh-marvel/services/comic/comic.service';
import BodySingle from 'dh-marvel/components/layouts/body/single/body-single';
import { Grid, Typography } from '@mui/material';
import CardCheckout from 'dh-marvel/components/comicCard/CardCheckout';
import StepperForm from 'dh-marvel/components/Forms/StepperForm';
import LayoutCheckout from 'dh-marvel/components/layouts/layout-checkout';

const Checkout: NextPage = () => {
  const router = useRouter();
  const { comic } = router.query;
  const [comicData, setComicData] = useState<IComic>();
  console.log(comicData);

  useEffect(() => {
    const id = parseInt(comic as string);

    if (comic) {
      getComicsById(id).then((data) => {
        setComicData(data);
      });
    } else {
      router.push('/');
    }
  }, [comic]);

  return (<>
    <Head>
      <title>Checkout | DH MARVEL</title>
      <meta name="description" content={"Pagina de pago de DH Marvel"} />
      <link rel="icon" href="/marvel.png" />
    </Head>
    <BodySingle title={comicData && `Usted esta comprando: ${comicData?.title}`}>
      <Grid container spacing={2} sx={{ marginTop: '10px' }}>
        {comicData ? (
          <>
            <Grid container justifyContent="center" alignItems="center" spacing={2}>
              <Grid item xs={12} md={3}>
                <CardCheckout comic={comicData} />
              </Grid>
              <Grid item xs={12} md={5} marginTop={"20px"}>
                <StepperForm comic={comicData} />
              </Grid>
            </Grid>
          </>
        ) : (
          <Typography variant="body2" sx={{ margin: "0 auto" }}>Redirigiendo...</Typography>
        )}
      </Grid>
    </BodySingle>
  </>);
};

(Checkout as any).Layout = LayoutCheckout;

export default Checkout;

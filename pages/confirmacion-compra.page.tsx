import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Head from 'next/head'
import { useRouter } from 'next/router';
import { ICheckout } from 'types/ICheckout.type';
import Link from 'next/link';
import { Button, Stack, Typography } from '@mui/material';
import CardSuccess from 'dh-marvel/components/comicCard/CardSuccess';
import LayoutCheckout from 'dh-marvel/components/layouts/layout-checkout';

const CheckoutSuccess: NextPage = () => {
  const router = useRouter();
  const [dataCheckout, setDataCheckout] = useState<ICheckout>();

  useEffect(() => {
    const data = localStorage.getItem('checkoutData');
    if (data !== null) {
      const obj = JSON.parse(data);
      setDataCheckout(obj);
    } else {
      alert("error localStorage")
      router.push('/');
    }
  }, []);

  return (<>
    <Head>
      <title>Compra exitosa | DH MARVEL</title>
      <meta name="description" content={"Pagina confirmación de compra de DH Marvel"} />
      <link rel="icon" href="/marvel.png" />
    </Head>
    <Stack
      paddingTop={3}
      direction="column"
      alignItems="center"
      sx={{ width: '95%' }}
    >
      {dataCheckout ? (
        <>
          <CardSuccess data={dataCheckout} />
          <Link href="/">
            <Button size="small" variant="outlined" sx={{ margin: '30px 0px' }}>
              Volver al home
            </Button>
          </Link>
        </>
      ) : (
        <Typography variant="body2">Redirigiendo...</Typography>
      )}
    </Stack>
  </>);
};
(CheckoutSuccess as any).Layout = LayoutCheckout;

export default CheckoutSuccess;

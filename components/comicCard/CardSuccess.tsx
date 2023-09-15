import { FC } from 'react';
import { ICheckout } from 'types/ICheckout.type';
import { Box, Card, Typography, CardMedia, CardContent, Paper, Grid } from '@mui/material';

type CardSuccessProps = {
  data: ICheckout;
};

const CardSuccess: FC<CardSuccessProps> = ({ data }) => {
  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item xs={12} md={4}>
        <Paper elevation={1}>
          <Card>
            <CardMedia
              component="img"
              alt="comic image"
              height="220"
              image={`${data?.order.image}`}
              sx={{ objectFit: 'contain', marginTop: '20px' }}
            />
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                {data?.order.name}
              </Typography>
            </CardContent>
          </Card>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6" paddingBottom={2}>
              Datos Personales:
            </Typography>
            <Typography variant="body2" paddingBottom={1}>
              {data?.customer.name} {data?.customer.lastname}
            </Typography>
            <Typography variant="body2" paddingBottom={1}>
              {data?.customer.email}
            </Typography>
          </CardContent>
        </Card>
        <Paper sx={{ marginTop: '15px' }}>
          <Card>
            <CardContent>
              <Typography variant="h6" paddingBottom={2}>
                Dirección de entrega:
              </Typography>
              <Typography variant="body2" paddingBottom={1}>
                {data?.customer.address.address1}
              </Typography>
              <Typography variant="body2" paddingBottom={1}>
                {data?.customer.address.city} ({data?.customer.address.zipCode})
              </Typography>
            </CardContent>
          </Card>
        </Paper>
      </Grid>
    </Grid>

  );
};

export default CardSuccess;


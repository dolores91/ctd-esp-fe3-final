import React, { FC } from "react";
import { IComic } from "types/IComic.type";
import { Paper, CardContent, Typography, Button, Grid, Box } from "@mui/material";
import Link from "next/link";
import ComicDetailAccordion from "../accordion/ComicDetailAccordion";

interface ComicCardDetailProps {
  comic: IComic;
}

const ComicCardDetail: FC<ComicCardDetailProps> = ({ comic }) => {
  console.log(comic);

  return (
    <Paper elevation={1} sx={{ padding: "3px" }}>
      <CardContent>
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <Typography gutterBottom variant="h5">
              Precio:
            </Typography>
          </Grid>
          <Grid item>
            <Typography gutterBottom variant="h6" fontWeight="bold">
              ${comic.price}
            </Typography>
          </Grid>
        </Grid>

        {comic.oldPrice && comic.stock > 0 && (
          <Typography variant="body1" style={{ textDecoration: 'line-through', color: 'red' }}>Antes ${comic.oldPrice}</Typography>
        )}

        <ComicDetailAccordion comic={comic}></ComicDetailAccordion>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>

          {comic.stock > 0 ? (
            <Link href={{ pathname: "/checkout/", query: `comic=${comic.id}` }}>
              <Button size="medium" variant="contained" type="button">
                COMPRAR
              </Button>
            </Link>
          ) : (
            <Button size="medium" variant="contained" type="button" disabled>
              COMPRAR
            </Button>
          )}
        </Box>
      </CardContent>
    </Paper>
  );
};

export default ComicCardDetail;

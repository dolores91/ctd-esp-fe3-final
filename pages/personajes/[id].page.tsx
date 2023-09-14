import React, { FC, useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { getCharacter } from 'dh-marvel/services/marvel/marvel.service';
import BodySingle from 'dh-marvel/components/layouts/body/single/body-single';
import { Grid, CardMedia, Paper, CardContent, Typography, Card } from '@mui/material';
import { ISummary, IThumbnail } from "../../types/IComic.type";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


interface CharacterProps {
  character: ICharacter;
}

const Character: FC<CharacterProps> = ({ character }) => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleAccordionChange = (panel: string) => (
    event: React.SyntheticEvent,
    isExpanded: boolean
  ) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <BodySingle title={`Personaje: ${character.name}`}>
      <Card sx={{ maxWidth: '600px', margin: '0 auto' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <CardMedia
              component="img"
              height="350"
              image={`${character.thumbnail.path}.${character.thumbnail.extension}`}
              alt={character.name}
              sx={{ objectFit: 'contain', borderRadius: '15px' }}
            />
          </Grid>
          <Grid item xs={12} md={8} sx={{ alignSelf: 'center' }}>
            <Accordion
              expanded={expanded === 'descriptionPanel'}
              onChange={handleAccordionChange('descriptionPanel')}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="description-panel-content"
                id="description-panel-header"
              >
                <Typography variant="body2">Descripción</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2">
                  {character.description !== null &&
                    character.description !== ''
                    ? character.description
                    : 'Sin descripción disponible'}
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion
              expanded={expanded === 'comicsPanel'}
              onChange={handleAccordionChange('comicsPanel')}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="comics-panel-content"
                id="comics-panel-header"
              >
                <Typography variant="body2">Cómics</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2">
                  {character.comics.items.length ? (
                    character.comics.items.map((comic) => {
                      return (
                        <p key={comic.name}>{comic.name}</p>
                      );
                    })
                  ) : (
                    <Typography variant="body2">
                      Sin listado de personajes disponible
                    </Typography>
                  )}
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
      </Card>
    </BodySingle>
  );
};


export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = parseInt(params?.id as string);
  const data = await getCharacter(id);

  return {
    props: {
      character: data,
    },
  };
};

export default Character;

interface ILink {
  type: "detail" | "comiclink" | "purchase" | string;
  url: string;
}

export interface ICharacterResponse {
  code: number;
  status: string;
  copyright: string;
  attributionText: string;
  attributionHTML: string;
  etag: string;
  data: {
    offset: number;
    limit: number;
    total: number;
    count: number;
    results: ICharacter[];
  };
}

export interface ICharacter {
  id: number;
  name: string;
  description: string | null;
  modified: Date;
  thumbnail: IThumbnail;
  resourceURI: string;
  comics: ISummary;
  series: ISummary;
  stories: ISummary;
  events: ISummary;
  urls: ILink[];
}
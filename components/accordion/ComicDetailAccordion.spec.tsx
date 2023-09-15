import { render, screen, waitFor } from '@testing-library/react';
import mockProps from 'dh-marvel/test/mocks/comic';
import userEvent from '@testing-library/user-event';
import { IComic } from 'types/IComic.type';
import ComicDetailAccordion from './ComicDetailAccordion';

describe('ComicDetailAccordion', () => {
    describe('Cuando se renderiza el componente', () => {
        it('debería renderizar titulos', () => {
            render(<ComicDetailAccordion comic={mockProps as unknown as IComic} />);
            const titleDescription = screen.getByText('Descripción');
            const titlePersonajes = screen.getByText('Personajes');
            expect(titleDescription).toBeInTheDocument();
            expect(titlePersonajes).toBeInTheDocument();
        });
        it('No debería mostrar el contenido', () => {
            render(<ComicDetailAccordion comic={mockProps as unknown as IComic} />);
            const contentDescription = screen.getByText('Sin descripción disponible');
            const contentPersonajes = screen.getByText(
                'Sin listado de personajes disponible'
            );
            expect(contentDescription).not.toBeVisible();
            expect(contentPersonajes).not.toBeVisible();
        });
        it('debería decir "Sin listado de personajes disponible" cuando no hay personajes', async () => {
            const comicWithoutCharacters: IComic = {
                ...mockProps,
                characters: {
                    available: 0,
                    collectionURI: 'http://gateway.marvel.com/v1/public/comics/82967/characters',
                    items: [],
                    returned: 0,
                },
            };

            render(<ComicDetailAccordion comic={comicWithoutCharacters} />);
            const titlePersonajes = screen.getByText('Personajes');
            userEvent.click(titlePersonajes);

            const noCharactersMessage = await screen.findByText('Sin listado de personajes disponible');
            expect(noCharactersMessage).toBeInTheDocument();
        });
        it('debería mostrar el contenido al hacer click en el título', async () => {
            render(<ComicDetailAccordion comic={mockProps as unknown as IComic} />);
            const titleDescription = screen.getByText('Descripción');
            const titlePersonajes = screen.getByText('Personajes');
            userEvent.click(titleDescription);
            userEvent.click(titlePersonajes);

            expect(
                await screen.findByText('Sin descripción disponible')
            ).toBeInTheDocument();
            expect(
                await screen.findByText('Sin listado de personajes disponible')
            ).toBeInTheDocument();
        });


    });
});
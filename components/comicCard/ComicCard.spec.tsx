import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ComicCard from './ComicCard';

// Mock de las funciones de Next.js para manejar las rutas
jest.mock('next/link', () => ({ children }) => children);

describe('ComicCard', () => {
    const mockProps = {
        title: 'Marvel Previews (2017)',
        image: 'http://marvel.com/comics/issue/82967/marvel_previews_2017?utm_campaign=apiRef&utm_source=d32fcbfed8f7d25c5d0de33a4411c4d4',
        id: 82967,
    };

    it('deberían renderizarse titulo y foto de la card', () => {
        render(<ComicCard {...mockProps} />);

        const titleElement = screen.getByText('Marvel Previews (2017)');
        expect(titleElement).toBeInTheDocument();

        const imageElement = screen.getByAltText('Foto portada del cómic');
        expect(imageElement).toBeInTheDocument();
    });
    it('deberia renderizarse "VER DETALLE" button', () => {
        render(<ComicCard {...mockProps} />);

        const verDetalleButton = screen.getByText('VER DETALLE');
        expect(verDetalleButton).toBeInTheDocument();


    });
});






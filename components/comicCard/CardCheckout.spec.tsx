import React from 'react';
import { render, screen } from '@testing-library/react';
import CardCheckout from './CardCheckout';

const comicMock = {
    title: 'Marvel Age Spider-Man Vol. 2: Everyday Hero (Digest)',
    thumbnail: {
        path: 'http://i.annihil.us/u/prod/marvel/i/mg/9/20/4bc665483c3aa',
        extension: 'jpg',
    },
    price: 72,
};

describe('CardCheckout', () => {

    it('debería renderizar el precio', () => {
        render(<CardCheckout comic={comicMock} />);
        const priceElement = screen.getByText('$ 72');
        expect(priceElement).toBeInTheDocument();
    });

    it('debería renderizar la imagen', () => {
        render(<CardCheckout comic={comicMock} />);
        const imageElement = screen.getByAltText('Marvel Age Spider-Man Vol. 2: Everyday Hero (Digest)');
        expect(imageElement).toBeInTheDocument();
        expect(imageElement).toHaveAttribute(
            'src',
            'http://i.annihil.us/u/prod/marvel/i/mg/9/20/4bc665483c3aa.jpg'
        );
    });

    it('No debería renderizar nada cuando es undefined', () => {
        render(<CardCheckout comic={undefined} />);
        const paperElement = screen.queryByTestId('paper');
        expect(paperElement).toBeNull();
    });
});

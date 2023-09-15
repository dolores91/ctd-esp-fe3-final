import { render, screen, waitFor } from '@testing-library/react';
import comicMock from 'dh-marvel/test/mocks/comic';
import { useRouter } from 'next/router';
import userEvent from '@testing-library/user-event';
import ComicCardDetail from './ComicCardDetail';
import { IComic } from 'types/IComic.type';

const mockPush = jest.fn();
jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));
(useRouter as jest.Mock).mockImplementation(() => ({
    push: mockPush,
}));

describe('ComicCardDetail', () => {
    describe('cuando se renderiza el componente', () => {
        it('deberia mostrar el precio viejo', () => {
            render(<ComicCardDetail comic={comicMock as unknown as IComic} />);
            const oldPrice = screen.getByText('Antes $87');
            expect(oldPrice).toBeInTheDocument();
        });
        it('deberia mostrar el precio actual', () => {
            render(<ComicCardDetail comic={comicMock as unknown as IComic} />);
            const currentPrice = screen.getByText('$72');
            expect(currentPrice).toBeInTheDocument();
        });
        it('debería renderizar el boton comprar', () => {
            render(<ComicCardDetail comic={comicMock as unknown as IComic} />);
            const buyButton = screen.getByRole('button', { name: 'COMPRAR' });
            expect(buyButton).toBeInTheDocument();
        });
    });
    describe('al hacer click en el boton comprar', () => {
        it('deberia llevar a la pagina de checkout', async () => {
            render(<ComicCardDetail comic={comicMock as unknown as IComic} />);

            userEvent.click(screen.getByRole('button', { name: 'COMPRAR' }));

            waitFor(() => {
                expect(mockPush).toHaveBeenCalledWith(1, '/checkout?comic=82967');
            });
        });
    });
});
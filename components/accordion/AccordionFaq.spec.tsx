import React from 'react';
import { render, screen } from '@testing-library/react';
import AccordionFaq from './AccordionFaq';
import userEvent from '@testing-library/user-event';
import { IComic } from 'types/IComic.type';

const mockedData = {
    title: "Accordion title",
    children: <div>Children data</div>,
};
describe('AccordionFaq', () => {

    it('debería mostrar el titulo', () => {
        render(<AccordionFaq title="Question" text="Answer" />);
        const titleElement = screen.getByText('Question');
        expect(titleElement).toBeInTheDocument();
    });

    it('should render the accordion text', () => {
        render(<AccordionFaq title="Question" text="Answer" />);
        const textElement = screen.getByText('Answer');
        expect(textElement).toBeInTheDocument();
    });

    it('should collapse when clicked twice', () => {
        render(<AccordionFaq title="Question" text="Answer" />);
        const summaryElement = screen.getByRole('button', { name: 'Question' });
        userEvent.click(summaryElement);
        userEvent.click(summaryElement);
        expect(summaryElement).toHaveAttribute('aria-expanded', 'false');
    });

})

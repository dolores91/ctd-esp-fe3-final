import { render, screen } from "@testing-library/react";
import Faqs from "dh-marvel/pages/faqs/index.page";
import { faqsData } from "../../components/faqs/faqsData";
import userEvent from "@testing-library/user-event";

describe("Al renderizar FaqsPage", () => {
    it("deberia renderizar el titulo", () => {
        render(<Faqs faq={faqsData} />);
        const pageTitle = screen.getByText("Preguntas frecuentes");
        expect(pageTitle).toBeInTheDocument();
    });

    it("deberia renderizar las preguntas y respuestas", () => {
        render(<Faqs faq={faqsData} />);
        for (const faq of faqsData) {
            const question = screen.getByText(faq.question);
            const answer = screen.getByText(faq.answer);
            expect(question).toBeInTheDocument();
            expect(answer).toBeInTheDocument();
        }
    });
    describe("Cuando el usuario hace clic en una pregunta", () => {
        it("deberia renderizar la respuesta", async () => {
            render(<Faqs faq={faqsData} />);
            const questionI = screen.getByText("¿Cuántos comics tienen?");
            expect(questionI).toBeEnabled();

            await userEvent.click(questionI);
            expect(
                await screen.findByText(
                    "Actualmente disponemos de toda la colección de Marvel. Algunos ejemplares pueden contar con poca o nula disponibilidad por el momento. Para mas información puede acceder a https://marvel.com"
                )
            ).toBeVisible();
        });
    })
});

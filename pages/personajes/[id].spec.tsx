import { render, screen } from "@testing-library/react";
import Character from "./[id].page";
import characterMock from "../../test/mocks/character";
import { ICharacter } from "../personajes/[id].page";

describe("CharacterPage renderizado inicial", () => {
    it("debería renderizar el nombre", () => {
        render(<Character character={characterMock as unknown as ICharacter} />);
        const pageTitle = screen.getByText(`Personaje: ${characterMock.name}`);
        expect(pageTitle).toBeInTheDocument();
    });

    it("debería renderizar la sección Otros comics", () => {
        render(<Character character={characterMock as unknown as ICharacter} />);
        const comicsSection = screen.getByText("Otros comics");
        expect(comicsSection).toBeInTheDocument();
    });
});

import { screen } from "@testing-library/react";
import { renderWithReactHookForm } from "dh-marvel/test/form-helper";
import StepperForm from "./StepperForm";
import mockProps from "dh-marvel/test/mocks/comic";

describe("StepperForm component", () => {
    describe("Renderizado inicial", () => {
        it("Debería renderizar los 3 pasos", () => {
            renderWithReactHookForm(<StepperForm comic={mockProps} />);
            const steps = [
                "Datos Personales",
                "Dirección de envio",
                "Datos del pago",
            ];

            const stepperDataI = screen.getByText("Datos Personales");
            const stepperDataII = screen.getByText("Dirección de envio");
            const stepperDataIII = screen.getByText("Datos del pago");

            expect(stepperDataI).toBeInTheDocument();
            expect(stepperDataII).toBeInTheDocument();
            expect(stepperDataIII).toBeInTheDocument();
        });
    });
});
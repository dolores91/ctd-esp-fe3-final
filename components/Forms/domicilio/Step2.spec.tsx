import { screen } from "@testing-library/react";
import { renderWithReactHookForm } from "dh-marvel/test/form-helper";
import userEvent from "@testing-library/user-event";
import Step2 from "./Step2";

const defaultData = {
    address: "",
    city: "",
    state: "",
    zipCode: "",
};

describe("DeliveryForm component", () => {
    describe("renderizado inicial", () => {
        it("deberia renderizar todos los imputs", () => {
            renderWithReactHookForm(
                <Step2
                    data={defaultData}
                    activeStep={1}
                    handleNext={() => { }}
                    handleBack={() => { }}
                />
            );

            const textboxAddress1 = screen.getByRole("textbox", {
                name: "Dirección",
            });
            const textboxcity = screen.getByRole("textbox", { name: "Ciudad" });
            const textboxState = screen.getByRole("textbox", { name: "Provincia" });
            const textboxZipCode = screen.getByRole("textbox", {
                name: "Código postal",
            });

            expect(textboxAddress1).toBeInTheDocument();
            expect(textboxcity).toBeInTheDocument();
            expect(textboxState).toBeInTheDocument();
            expect(textboxZipCode).toBeInTheDocument();
        });
    });
    describe("Cuando el usuario completa los imputs", () => {
        it("debería renderizar la informacion", async () => {
            renderWithReactHookForm(
                <Step2
                    data={defaultData}
                    activeStep={1}
                    handleNext={() => { }}
                    handleBack={() => { }}
                />
            );

            const textboxAddress = screen.getByRole<HTMLInputElement>("textbox", {
                name: "Dirección",
            });
            const textboxcity = screen.getByRole<HTMLInputElement>("textbox", {
                name: "Ciudad",
            });
            const textboxState = screen.getByRole<HTMLInputElement>("textbox", {
                name: "Provincia",
            });
            const textboxZipCode = screen.getByRole<HTMLInputElement>("textbox", {
                name: "Código postal",
            });

            await userEvent.type(textboxAddress, "Adress");
            await userEvent.type(textboxcity, "City");
            await userEvent.type(textboxState, "State");
            await userEvent.type(textboxZipCode, "1234");

            expect(textboxAddress.value).toBe("Adress");
            expect(textboxcity.value).toBe("City");
            expect(textboxState.value).toBe("State");
            expect(textboxZipCode.value).toBe("1234");
        });
    });
});
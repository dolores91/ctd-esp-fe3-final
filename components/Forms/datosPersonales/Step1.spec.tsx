import { screen } from "@testing-library/react";
import { renderWithReactHookForm } from "dh-marvel/test/form-helper";
import userEvent from "@testing-library/user-event";
import Step1 from "./Step1";

const defaultData = {
    name: "",
    lastname: "",
    email: "",
    address: {
        address1: "",
        address2: null,
        city: "",
        state: "",
        zipCode: "",
    },
};

describe("CustomerForm component", () => {
    describe("Renderizado inicial", () => {
        it("debería renderizar todos los imputs", () => {
            renderWithReactHookForm(
                <Step1
                    data={defaultData}
                    activeStep={0}
                    handleNext={() => { }}
                />
            );

            const textboxName = screen.getByRole("textbox", { name: "Nombre" });
            const textboxLastname = screen.getByRole("textbox", { name: "Apellido" });
            const textboxEmail = screen.getByRole("textbox", { name: "Email" });

            expect(textboxName).toBeInTheDocument();
            expect(textboxLastname).toBeInTheDocument();
            expect(textboxEmail).toBeInTheDocument();
        });
    });

    describe("Cuando el usuario escribe en el input", () => {
        it("debería mostrar la información", async () => {
            renderWithReactHookForm(
                <Step1
                    data={defaultData}
                    activeStep={0}
                    handleNext={() => { }}
                />
            );

            const textboxName = screen.getByRole<HTMLInputElement>("textbox", {
                name: "Nombre",
            });
            const textboxLastname = screen.getByRole<HTMLInputElement>("textbox", {
                name: "Apellido",
            });
            const textboxEmail = screen.getByRole<HTMLInputElement>("textbox", {
                name: "Email",
            });

            await userEvent.type(textboxName, "Test");
            await userEvent.type(textboxLastname, "User");
            await userEvent.type(textboxEmail, "Test@test.test");

            expect(textboxName.value).toBe("Test");
            expect(textboxLastname.value).toBe("User");
            expect(textboxEmail.value).toBe("Test@test.test");
        });
    });
});
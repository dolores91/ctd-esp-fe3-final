import { render, screen } from '@testing-library/react';
import { FC, PropsWithChildren } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import userEvent from '@testing-library/user-event';
import Step3 from './Step3';

const Wrapper: FC<PropsWithChildren> = ({ children }) => {
    const methods = useForm({
        mode: 'all',
        defaultValues: {
            nombre: '',
        },
    });
    return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('PaymentForm', () => {
    describe('when rendering default', () => {
        it('should render inputs', () => {
            render(
                <Wrapper>
                    <Step3
                        activeStep={2}
                        handleBack={() => { }}
                        handleNext={() => { }}
                    />
                </Wrapper>
            );

            const textFieldCard = screen.getByRole('textbox', { name: 'Número de tarjeta' });
            const textFieldNameCard = screen.getByRole('textbox', { name: 'Nombre como aparece en la tarjeta' });
            const textFieldExp = screen.getByRole('textbox', { name: 'Exp MMYY' });
            const textFieldCvc = screen.getByLabelText('CVC');

            expect(textFieldCard).toBeInTheDocument();
            expect(textFieldNameCard).toBeInTheDocument();
            expect(textFieldExp).toBeInTheDocument();
            expect(textFieldCvc).toBeInTheDocument();
        });

        describe('when users interact', () => {
            it('should render the information introduced', async () => {
                render(
                    <Wrapper>
                        <Step3
                            activeStep={2}
                            handleBack={() => { }}
                            handleNext={() => { }}
                        />
                    </Wrapper>
                );
                const textFieldCard = screen.getByRole('textbox', { name: 'Número de tarjeta' });
                const textFieldNameCard = screen.getByRole('textbox', { name: 'Nombre como aparece en la tarjeta' });
                const textFieldExp = screen.getByRole('textbox', { name: 'Exp MMYY' });
                const textFieldCvc = screen.getByLabelText('CVC');

                await userEvent.type(textFieldCard, '1234567891234567');
                await userEvent.type(textFieldNameCard, 'Test User');
                await userEvent.type(textFieldExp, '0228');
                await userEvent.type(textFieldCvc, '123');

                expect(textFieldCard).toHaveValue('1234567891234567');
                expect(textFieldNameCard).toHaveValue('Test User');
                expect(textFieldExp).toHaveValue('0228');
                expect(textFieldCvc).toHaveValue('123');
            });
        });
        describe('when users put none or wrong information', () => {
            it('should render error messages clicking on next without putting information', async () => {
                render(
                    <Wrapper>
                        <Step3
                            activeStep={2}
                            handleBack={() => { }}
                            handleNext={() => { }}
                        />
                    </Wrapper>
                );

                const nextButton = screen.getByRole('button', { name: 'FINALIZAR' });

                await userEvent.click(nextButton);

                expect(await screen.findByText('El número es requerido.')).toBeInTheDocument();
                expect(await screen.findByText('El nombre es requerido.')).toBeInTheDocument();
                expect(await screen.findByText('La fecha de vencimiento es requerida.')).toBeInTheDocument();
                expect(await screen.findByText('El código CVC es requerido.')).toBeInTheDocument();
            });
            it('should render error message when typing invalid information', async () => {
                render(
                    <Wrapper>
                        <Step3
                            activeStep={2}
                            handleBack={() => { }}
                            handleNext={() => { }}
                        />
                    </Wrapper>
                );

                const textFieldCard = screen.getByRole('textbox', { name: 'Número de tarjeta' });
                const textFieldNameCard = screen.getByRole('textbox', { name: 'Nombre como aparece en la tarjeta' });
                const textFieldExp = screen.getByRole('textbox', { name: 'Exp MMYY' });
                const textFieldCvc = screen.getByLabelText('CVC');
                const nextButton = screen.getByRole('button', { name: 'FINALIZAR' });

                await userEvent.type(textFieldCard, '12345');
                await userEvent.type(textFieldNameCard, 'user');
                await userEvent.type(textFieldExp, '028');
                await userEvent.type(textFieldCvc, '12');
                await userEvent.click(nextButton);

                expect(await screen.findByText('Ingrese 16 números.')).toBeInTheDocument();
                expect(await screen.findByText('Ingrese 4 números.')).toBeInTheDocument();
                expect(await screen.findByText('Ingrese 3 números.')).toBeInTheDocument();
            });
        });
    });
})
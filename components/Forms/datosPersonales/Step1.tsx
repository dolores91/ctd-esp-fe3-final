import { FC, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { personalDataSchema } from './schema';
import { ICustomer } from 'types/ICheckout.type';
import { Stack } from '@mui/material';
import ControlledInput from 'dh-marvel/components/Forms/ControlledInput';
import StepperNavigation from '../StepperNavigation';

export type Step1Props = {
  data: ICustomer;
  activeStep: number;
  handleNext: (data: ICustomer) => void;
};

const Step1: FC<Step1Props> = ({ data, activeStep, handleNext }: Step1Props) => {

  const methods = useForm<ICustomer>({
    resolver: yupResolver(personalDataSchema),
    defaultValues: { ...data },
  });

  const { handleSubmit } = methods;


  const onSubmit = (data: ICustomer) => {
    handleNext(data);
  };

  return (
    <Stack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormProvider {...methods}>
          <ControlledInput name="name" label="Nombre" />
          <ControlledInput name="lastname" label="Apellido" />
          <ControlledInput name="email" label="Email" />
        </FormProvider>
      </form>
      <StepperNavigation
        activeStep={activeStep}
        handleNext={handleSubmit(onSubmit)}
        handleBack={() => { }}
      />
    </Stack>
  );
};

export default Step1;

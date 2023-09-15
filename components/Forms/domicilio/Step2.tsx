import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import deliverySchema from './schema';
import { IAddress } from 'types/ICheckout.type';
import { Stack } from '@mui/material';
import ControlledInput from 'dh-marvel/components/Forms/ControlledInput';
import StepperNavigation from '../StepperNavigation';

export type Step2Props = {
  data: IAddress;
  activeStep: number;
  handleNext: (data: IAddress) => void;
  handleBack: () => void;
};

const Step2: FC<Step2Props> = ({ data, activeStep, handleNext, handleBack }) => {

  const methods = useForm<IAddress>({
    resolver: yupResolver(deliverySchema),
    defaultValues: {
      ...data,
    },
  });

  const { handleSubmit } = methods;



  const onSubmit = (data: IAddress) => {
    handleNext(data);
  };

  return (
    <Stack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormProvider {...methods}>
          <ControlledInput name="address1" label="Dirección" />
          {/*<ControlledInput name="address2" label="Dirección alternativa" />*/}
          <ControlledInput name="city" label="Ciudad" />
          <ControlledInput name="state" label="Provincia" />
          <ControlledInput name="zipCode" label="Código postal" />
        </FormProvider>
      </form>
      <StepperNavigation
        activeStep={activeStep}
        handleNext={handleSubmit(onSubmit)}
        handleBack={handleBack}
      />
    </Stack>
  );
};

export default Step2;

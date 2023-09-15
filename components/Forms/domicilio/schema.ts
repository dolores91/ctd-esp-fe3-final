import * as yup from "yup";
import { errorMesages } from "./errorMessages";

const deliverySchema = yup
  .object({
    address1: yup.string().required(errorMesages.address.required),
    address2: yup.string().nullable(),
    city: yup.string().required(errorMesages.city.required),
    state: yup.string().required(errorMesages.state.required),
    zipCode: yup.string().required(errorMesages.zipCode.required),
  })
  .required(errorMesages.form.required);

export default deliverySchema;
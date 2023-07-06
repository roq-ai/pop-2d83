import * as yup from 'yup';

export const projectValidationSchema = yup.object().shape({
  prompt: yup.string().required(),
  story: yup.string(),
  startup_id: yup.string().nullable(),
});

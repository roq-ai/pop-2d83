import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createProject } from 'apiSdk/projects';
import { Error } from 'components/error';
import { projectValidationSchema } from 'validationSchema/projects';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { StartupInterface } from 'interfaces/startup';
import { getStartups } from 'apiSdk/startups';
import { ProjectInterface } from 'interfaces/project';

function ProjectCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: ProjectInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createProject(values);
      resetForm();
      router.push('/projects');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<ProjectInterface>({
    initialValues: {
      prompt: '',
      story: '',
      startup_id: (router.query.startup_id as string) ?? null,
    },
    validationSchema: projectValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Project
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="prompt" mb="4" isInvalid={!!formik.errors?.prompt}>
            <FormLabel>Prompt</FormLabel>
            <Input type="text" name="prompt" value={formik.values?.prompt} onChange={formik.handleChange} />
            {formik.errors.prompt && <FormErrorMessage>{formik.errors?.prompt}</FormErrorMessage>}
          </FormControl>
          <FormControl id="story" mb="4" isInvalid={!!formik.errors?.story}>
            <FormLabel>Story</FormLabel>
            <Input type="text" name="story" value={formik.values?.story} onChange={formik.handleChange} />
            {formik.errors.story && <FormErrorMessage>{formik.errors?.story}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<StartupInterface>
            formik={formik}
            name={'startup_id'}
            label={'Select Startup'}
            placeholder={'Select Startup'}
            fetcher={getStartups}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'project',
    operation: AccessOperationEnum.CREATE,
  }),
)(ProjectCreatePage);

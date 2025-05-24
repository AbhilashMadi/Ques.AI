import { Button, Input } from '@custom';
import { type UseFormReturn } from '@hooks/use-form';
import ServerKeys from '@resources/server-keys';
import { type CreateProjectInput } from '@schemas/create-project-schema';
import { type FC } from 'react';

interface CreateProjectFormProps {
  form: UseFormReturn<CreateProjectInput>;
}

const CreateProjectForm: FC<CreateProjectFormProps> = ({ form }) => {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
  } = form;

  return (
    <form
      className="space-y-4"
      onSubmit={handleSubmit}
      onReset={resetForm}
    >
      <Input
        label="Enter Project Name"
        name={ServerKeys.PROJECT_NAME}
        value={values[ServerKeys.PROJECT_NAME]}
        onChange={handleChange}
        onBlur={handleBlur}
        errorMessage={errors[ServerKeys.PROJECT_NAME]}
        touched={touched[ServerKeys.PROJECT_NAME]}
        required
      />
      <div className="flex justify-end gap-2">
        <Button
          type="reset"
          variant="ghost"
          className="text-destructive"
        >
          Cancel
        </Button>
        <Button type="submit">Create</Button>
      </div>
    </form>
  );
};

export default CreateProjectForm;

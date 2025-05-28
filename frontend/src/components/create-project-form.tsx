import { type UseFormReturn } from '@hooks/use-form';
import { type CreateProjectInput } from '@schemas/project-schemas';
import { type FC } from 'react';

import { Button, Input, Textarea } from '@custom';
import ServerKeys from '@resources/server-keys';

interface CreateProjectFormProps {
  form: UseFormReturn<CreateProjectInput>;
  isCreating: boolean;
}

const CreateProjectForm: FC<CreateProjectFormProps> = ({ form, isCreating }) => {
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
        name={ServerKeys.TITLE}
        value={values[ServerKeys.TITLE]}
        onChange={handleChange}
        onBlur={handleBlur}
        errorMessage={errors[ServerKeys.TITLE]}
        touched={touched[ServerKeys.TITLE]}
        required
      />
      <Textarea
        required
        label="Description"
        name={ServerKeys.DESCRIPTION}
        onChange={handleChange}
        onBlur={handleBlur}
        errorMessage={errors[ServerKeys.DESCRIPTION]}
        touched={touched[ServerKeys.DESCRIPTION]}
        value={values[ServerKeys.DESCRIPTION]}
      />
      <div className="flex justify-end gap-2">
        <Button
          type="reset"
          variant="ghost"
          className="text-destructive"
          disabled={isCreating}>
          Cancel
        </Button>
        <Button
          type="submit"
          loading={isCreating}
          disabled={isCreating}>
          Create</Button>
      </div>
    </form>
  );
};

export default CreateProjectForm;

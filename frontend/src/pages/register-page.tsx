import { SitePaths } from '@configs/site-config';
import { Button, Input, SecretInput } from '@custom';
import { useForm } from '@hooks/use-form';
import ServerKeys from '@resources/server-keys';
import { type RegisterFormInput, registerFormSchema } from '@schemas/register-form-schema';
import { Link } from 'react-router-dom';

export default function RegisterPage() {
  const {
    errors,
    values,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm,
  } = useForm<RegisterFormInput>({
    initialValues: {
      [ServerKeys.FULL_NAME]: '',
      [ServerKeys.EMAIL]: '',
      [ServerKeys.PASSWORD]: '',
      [ServerKeys.CONFIRM_PASSWORD]: '',
    },
    validationSchema: registerFormSchema,
    onSubmit: console.log,
  });

  return (
    <form onSubmit={handleSubmit} onReset={resetForm} className="space-y-5">
      <div className="space-y-1.5">
        <Input
          name={ServerKeys.FULL_NAME}
          value={values[ServerKeys.FULL_NAME]}
          onChange={handleChange}
          onBlur={handleBlur}
          touched={touched[ServerKeys.FULL_NAME]}
          errorMessage={errors[ServerKeys.FULL_NAME]}
          placeholder="Full Name"
        />
        <Input
          name={ServerKeys.EMAIL}
          type="email"
          value={values[ServerKeys.EMAIL]}
          onChange={handleChange}
          onBlur={handleBlur}
          touched={touched[ServerKeys.EMAIL]}
          errorMessage={errors[ServerKeys.EMAIL]}
          placeholder="Email Address"
        />
        <SecretInput
          name={ServerKeys.PASSWORD}
          value={values[ServerKeys.PASSWORD]}
          onChange={handleChange}
          onBlur={handleBlur}
          touched={touched[ServerKeys.PASSWORD]}
          errorMessage={errors[ServerKeys.PASSWORD]}
          placeholder="Password"
        />
        <SecretInput
          name={ServerKeys.CONFIRM_PASSWORD}
          value={values[ServerKeys.CONFIRM_PASSWORD]}
          onChange={handleChange}
          onBlur={handleBlur}
          touched={touched[ServerKeys.CONFIRM_PASSWORD]}
          errorMessage={errors[ServerKeys.CONFIRM_PASSWORD]}
          placeholder="Confirm Password"
        />
      </div>

      <Button type="submit" className="w-full">
        Register
      </Button>

      <p className="text-center text-sm text-gray-600 dark:text-gray-400">
        Already have an account?{' '}
        <Link to={SitePaths.AUTH_LOGIN} className="text-blue-600 hover:underline dark:text-blue-400">
          Login
        </Link>
      </p>
    </form>
  );
}

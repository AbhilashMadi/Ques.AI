import { Button, Checkbox, Input, SecretInput } from '@custom';
import { useForm } from '@hooks/use-form';
import { loginFormValidationSchema, type LoginFormInput } from '@schemas/login-form-schema';
import { Link } from 'react-router-dom';
import ServerKeys from '@resources/server-keys';

export default function LoginPage() {
  const {
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm,
    touched,
    values,
  } = useForm<LoginFormInput>({
    initialValues: {
      [ServerKeys.EMAIL]: '',
      [ServerKeys.PASSWORD]: '',
      [ServerKeys.REMEMBER]: true,
    },
    validationSchema: loginFormValidationSchema,
    onSubmit: console.log,
  })

  return (<form
    onSubmit={handleSubmit}
    onReset={resetForm}
    className="space-y-5">
    <div className="space-y-1.5">
      <Input
        name={ServerKeys.EMAIL}
        onChange={handleChange}
        value={values[ServerKeys.EMAIL]}
        onBlur={handleBlur}
        touched={touched[ServerKeys.EMAIL]}
        errorMessage={errors[ServerKeys.EMAIL]}
        placeholder="Email Address (e.g: user@mail.com)"
      />
      <SecretInput
        name={ServerKeys.PASSWORD}
        onChange={handleChange}
        onBlur={handleBlur}
        touched={touched[ServerKeys.PASSWORD]}
        value={values[ServerKeys.PASSWORD]}
        errorMessage={errors[ServerKeys.PASSWORD]}
        placeholder="Password"
      />
    </div>

    <div className="flex items-center justify-between text-sm">
      <Checkbox
        label="Remember me"
        name={ServerKeys.REMEMBER}
        onChange={handleChange}
        checked={values[ServerKeys.REMEMBER]}
      />
      <Link to="/auth/forgot-password" className="text-blue-600 dark:text-blue-400 hover:underline">
        Forgot Password?
      </Link>
    </div>

    <Button type="submit" className="w-full">
      Login
    </Button>

    <p className="text-center text-sm text-gray-600 dark:text-gray-400">
      Don’t have an account?{' '}
      <Link to="/auth/register" className="text-blue-600 hover:underline dark:text-blue-400">
        Register
      </Link>
    </p>
  </form>);
}

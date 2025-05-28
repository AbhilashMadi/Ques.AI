import { useForgotPasswordMutation } from '@/redux/auth/auth-api';
import ServerKeys from '@/resources/server-keys';
import { type ForgotPasswordInput, forgotPasswordValidationSchema } from '@schemas/auth-schemas';
import { Button, Input } from '@custom';
import { useForm } from '@hooks/use-form';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export default function ForgotPasswordPage() {
  const [forgotPassword, { isLoading, isSuccess }] = useForgotPasswordMutation();

  const { errors, touched, values, handleBlur, handleChange, handleSubmit, resetForm } = useForm<ForgotPasswordInput>({
    initialValues: {
      [ServerKeys.EMAIL]: '',
    },
    validationSchema: forgotPasswordValidationSchema,
    onSubmit: async (values) => {
      try {
        const { message } = await forgotPassword(values).unwrap();
        toast.success(message);
      } catch (error: any) {
        console.error(error);
        toast.error(error?.data?.message || error.message || 'Something went wrong');
      }
    },
  })

  return (
    <form
      onSubmit={handleSubmit}
      onReset={resetForm}
      className="space-y-4">
      {!isSuccess
        ? <>
          <p className="text-muted">
            Enter the email address associated with your account. We'll send you a link to reset your password.
          </p>
          <Input
            name={ServerKeys.EMAIL}
            onChange={handleChange}
            value={values[ServerKeys.EMAIL]}
            onBlur={handleBlur}
            touched={touched[ServerKeys.EMAIL]}
            errorMessage={errors[ServerKeys.EMAIL]}
            placeholder="Email Address (e.g: user@mail.com)" />
          <Button type="submit" className="w-full" loading={isLoading} disabled={isLoading}>
            Request reset link
          </Button>
        </>
        : <p className="text-muted">
          (If the email is registered, you’ll receive a password reset link.)
        </p>}

      <p className="text-center text-sm">
        <Link to="/auth/login" className="text-blue-600 hover:underline dark:text-blue-400">
          Back to Login
        </Link>
      </p>
    </form>
  );
}

import ServerKeys from '@resources/server-keys';
import { SitePaths } from '@/configs/site-config';
import { useResetPasswordMutation } from '@/redux/auth/auth-api';
import { Button, SecretInput } from '@custom';
import { useForm } from '@hooks/use-form';
import { type ResetPasswordInput, resetPasswordValidationSchema } from '@schemas/auth-schemas';
import { toast } from 'react-hot-toast';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const navigate = useNavigate();

  const {
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    values,
    resetForm
  } = useForm<ResetPasswordInput>({
    initialValues: {
      [ServerKeys.PASSWORD]: '',
      [ServerKeys.CONFIRM_PASSWORD]: '',
    },
    validationSchema: resetPasswordValidationSchema,
    onSubmit: async (values) => {
      try {
        const { message } = await resetPassword({ ...values, token: searchParams.get('token') ?? '' }).unwrap();
        toast.success(message);
        navigate(SitePaths.AUTH_LOGIN);
      } catch (error: any) {
        console.error(error);
        toast.error(error?.data?.message || error.message || 'Something went wrong');
        navigate(SitePaths.AUTH_FORGOT_PASSWORD);
      }
    }
  })

  return (
    <form className="space-y-4" onSubmit={handleSubmit} onReset={resetForm}>
      <div>
        <SecretInput
          name={ServerKeys.PASSWORD}
          value={values[ServerKeys.PASSWORD]}
          onChange={handleChange}
          onBlur={handleBlur}
          touched={touched[ServerKeys.PASSWORD]}
          errorMessage={errors[ServerKeys.PASSWORD]}
          placeholder="Password"
        />
        <ul className="text-muted mt-2 list-disc pl-5 space-y-1">
          <li>At least 8 characters long</li>
          <li>Contains at least one uppercase letter</li>
          <li>Includes a number</li>
          <li>Includes a special character (e.g., !, @, #, $)</li>
        </ul>
        <div className="mt-4" />
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
      <Button
        className="w-full"
        loading={isLoading}
        disabled={isLoading}>Update Password</Button>
    </form>
  );
}

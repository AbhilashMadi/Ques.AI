import { SitePaths } from '@/configs/site-config';
import { Button, OtpInput } from '@custom';
import { useVerifyUserOtpMutation } from '@redux/auth/auth-api';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

export default function OtpPage() {
  const [otp, setOtp] = useState('');
  const [verifyOtp, { isLoading }] = useVerifyUserOtpMutation();
  const navigate = useNavigate();

  const handleOtpSubmit = async (): Promise<void> => {
    if (otp.length !== 6) {
      toast.error('Please enter the full 6-digit OTP');
      return;
    }

    try {
      await verifyOtp({ otp }).unwrap();
      toast.success('OTP verified successfully! You can now access your account.');
      navigate(SitePaths.PROJECTS);
    } catch (err: any) {
      console.error(err);
      toast.error(
        err?.data?.message ||
        err?.message ||
        'Verification failed. Please try again or request a new OTP.'
      );
    }

  };

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        handleOtpSubmit();
      }}>
      <p className="text-muted">
        Enter the 6-digit verification code that was sent to your email address.
      </p>
      <OtpInput className="mt-2" onChange={setOtp} />
      <Button
        type="submit"
        className="w-full"
        loading={isLoading}
        disabled={isLoading}>
        Submit OTP
      </Button>
      <p className="text-center text-sm text-gray-600 dark:text-gray-400">
        Need to modify any details?{' '}
        <Link
          to={SitePaths.AUTH_REGISTER}
          className="text-blue-600 hover:underline dark:text-blue-400">
          Register
        </Link>
      </p>
    </form>
  );
}

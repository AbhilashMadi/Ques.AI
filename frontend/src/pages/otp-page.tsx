import { SitePaths } from '@/configs/site-config';
import { Button, OtpInput } from '@custom';
import { useResendVerficationOtpMutation, useVerifyUserOtpMutation } from '@redux/auth/auth-api';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function OtpPage() {
  const [otp, setOtp] = useState('');
  const [verifyOtp, { isLoading }] = useVerifyUserOtpMutation();
  const [resendVerficationOTP, { isLoading: resendingOtp }] = useResendVerficationOtpMutation();
  const [resendTimer, setResendTimer] = useState(60);
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

  const handleResendOtp = async (): Promise<void> => {
    try {
      const { message } = await resendVerficationOTP().unwrap();
      toast.success(message);
      // Reset timer to 60 seconds
      setResendTimer(60);
    } catch (error: any) {
      console.error(error);
      toast.error(error?.data?.message || 'Something went wrong');
      navigate(SitePaths.AUTH_REGISTER);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [resendTimer]);

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

      <p className="text-muted">
        If you can't find the verification code, please request a new OTP after {resendTimer > 0 ? resendTimer : 0} seconds.
        <br />
        <Button
          type="button"
          variant="link"
          className="p-0 h-auto inline"
          onClick={handleResendOtp}
          disabled={resendingOtp || resendTimer > 0}>
          Resend OTP
        </Button>
      </p>
    </form>
  );
}

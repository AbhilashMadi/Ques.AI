import Button from '@/components/custom/button';
import OtpInput from '@components/custom/otp-input';
import Text from '@components/custom/text';

export default function OtpPage() {
  return (<form className="space-y-4">
    <Text variant="muted">Enter the 6-digit verification code that was sent to your email address.</Text>
    <OtpInput className="mt-2" />
    <Button className="w-full">Submit OTP</Button>
  </form>)
}
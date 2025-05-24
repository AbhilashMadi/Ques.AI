import Button from '@/components/custom/button';
import Input from '@/components/custom/input';

export default function ResetPassword() {
  return (
    <form className="space-y-4">
      <div>
        <Input placeholder="Password" />
        <ul className="text-muted mt-2 list-disc pl-5 space-y-1">
          <li>At least 8 characters long</li>
          <li>Contains at least one uppercase letter</li>
          <li>Includes a number</li>
          <li>Includes a special character (e.g., !, @, #, $)</li>
        </ul>
        <Input placeholder="Confirm Password" className="mt-4" />
      </div>
      <Button className="w-full">Update Password</Button>
    </form>
  );
}

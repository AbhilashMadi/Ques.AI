import { Input, Button } from '@custom';
import type { FormEvent } from 'react';
import { Link } from 'react-router-dom';

export default function ForgotPasswordPage() {
  const handleSubmit = (e: FormEvent<HTMLElement>) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <p className="text-muted">
        Enter the email address associated with your account. We'll send you a link to reset your password.
      </p>
      <p className="text-muted">
        (If the email is registered, you’ll receive a password reset link.)
      </p>
      <Input
        name="email"
        type="email"
        isValid
        touched
        placeholder="Email address"
      />
      <Button type="submit" className="w-full">
        Request reset link
      </Button>

      <p className="text-center text-sm">
        <Link to="/auth/login" className="text-blue-600 hover:underline dark:text-blue-400">
          Back to Login
        </Link>
      </p>
    </form>
  );
}

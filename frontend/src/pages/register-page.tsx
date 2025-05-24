import { Link } from 'react-router-dom';
import type { FormEvent } from 'react';
import { Button, SecretInput, Input } from '@custom';

export default function RegisterPage() {

  const handleSubmit = (e: FormEvent<HTMLElement>) => {
    e.preventDefault();
  };

  const handleReset = () => { };

  return (
    <form
      onSubmit={handleSubmit}
      onReset={handleReset}
      className="space-y-5"
    >
      <div className="">
        <Input
          name="name"
          type="text"
          isValid
          touched
          placeholder="Full Name"
        />
        <Input
          name="email"
          type="email"
          isValid
          touched
          placeholder="Email Address"
        />
        <SecretInput
          name="password"
          isValid
          touched
          placeholder="Password"
        />
        <SecretInput
          name="confirmPassword"
          isValid
          touched
          placeholder="Confirm Password"
        />
      </div>

      {/* <div className="flex items-center justify-between text-sm">
        <Checkbox label="I agree to the terms and conditions" required />
      </div> */}

      <Button type="submit" className="w-full">
        Register
      </Button>

      <p className="text-center text-sm text-gray-600 dark:text-gray-400">
        Already have an account?{' '}
        <Link to="/auth/login" className="text-blue-600 hover:underline dark:text-blue-400">
          Login
        </Link>
      </p>
    </form>
  );
}

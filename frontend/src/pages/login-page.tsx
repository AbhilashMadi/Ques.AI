import { Link } from 'react-router-dom';
import type { FormEvent } from 'react';
import { Button, Input, SecretInput, Checkbox } from '@custom';

export default function LoginPage() {

  const handleSubmit = (e: FormEvent<HTMLElement>) => {
    e.preventDefault();
  }

  const handleReset = () => { }

  return (<form
    onSubmit={handleSubmit}
    onReset={handleReset}
    className="space-y-5">
    <div className="space-y-1.5">
      <Input
        name="email"
        type="email"
        touched
        placeholder="Email Address"
      />
      <SecretInput
        name="password"
        touched
        placeholder="Password"
      />
    </div>

    <div className="flex items-center justify-between text-sm">
      <Checkbox label="Remember me" />
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

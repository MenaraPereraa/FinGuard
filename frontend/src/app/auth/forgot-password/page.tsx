'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';
import { showToast } from 'nextjs-toast-notify';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess(false);

    if (!email) {
      showToast.error('Please enter your email address.', {
        duration: 3000,
        progress: true,
        position: 'top-right',
        transition: 'bounceIn',
        sound: true,
      });
      setIsLoading(false);
      return;
    }

    fetch('/api/auth/forgot-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          showToast.error(data.error, {
            duration: 3000,
            progress: true,
            position: 'top-right',
            transition: 'bounceIn',
            sound: true,
          });
          setError(data.error);
          return;
        }
        if (data.message) {
          showToast.success(data.message, {
            duration: 3000,
            progress: true,
            position: 'top-right',
            transition: 'bounceIn',
            sound: true,
          });
          setSuccess(true);
        }
      })
      .catch((err) => {
        console.error(err);
        showToast.error('Failed to send password reset email.', {
          duration: 3000,
          progress: true,
          position: 'top-right',
          transition: 'bounceIn',
          sound: true,
        });
        setError(err.message || 'Failed to send password reset email. Please try again.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-white text-gray-900">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="rounded-full bg-blue-50 p-3 border border-blue-100 shadow-sm">
            <ShieldCheck className="h-8 w-8 text-blue-600" strokeWidth={2.25} />
          </div>
        </div>
        <h2 className="mt-5 text-center text-[26px] font-bold tracking-tight text-gray-900">
          Reset your password
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Enter your email address and we'll send you a link to reset your password.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-[420px] px-4">
        <div className="bg-white py-8 px-6 shadow-xl shadow-gray-100 border border-gray-100 rounded-2xl sm:px-10">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          {success ? (
            <div className="text-center space-y-4">
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl text-sm" role="alert">
                <span className="block sm:inline">Password reset email sent! Check your inbox for further instructions.</span>
              </div>
              <div className="pt-2">
                <Link
                  href="/auth/signin"
                  className="font-medium text-blue-600 hover:text-blue-500 transition-colors text-sm"
                >
                  Return to sign in
                </Link>
              </div>
            </div>
          ) : (
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@gmail.com"
                  className="w-full px-3.5 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-600/10 transition-all"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-60 disabled:cursor-not-allowed rounded-xl text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all"
                >
                  {isLoading ? 'Sending...' : 'Send reset link'}
                </button>
              </div>

              <div className="text-center pt-1">
                <Link
                  href="/auth/signin"
                  className="font-medium text-blue-600 hover:text-blue-500 transition-colors text-sm"
                >
                  Back to sign in
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
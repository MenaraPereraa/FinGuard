'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ShieldCheck, Eye, EyeOff } from 'lucide-react';
import { showToast } from 'nextjs-toast-notify';

function ResetPasswordContent() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      showToast.error('Invalid reset link', {
        duration: 3000,
        progress: true,
        position: 'top-right',
        transition: 'bounceIn',
        sound: true,
      });
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 8) {
      showToast.error('Password must be at least 8 characters', {
        duration: 3000,
        progress: true,
        position: 'top-right',
        transition: 'bounceIn',
        sound: true,
      });
      return;
    }

    if (password !== confirmPassword) {
      showToast.error('Passwords do not match', {
        duration: 3000,
        progress: true,
        position: 'top-right',
        transition: 'bounceIn',
        sound: true,
      });
      return;
    }

    setIsLoading(true);
    fetch('/api/auth/reset-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, password }),
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
          return;
        }
        if (data.message) {
          showToast.success('Password reset successfully! You can now sign in with your new password.', {
            duration: 3000,
            progress: true,
            position: 'top-right',
            transition: 'bounceIn',
            sound: true,
          });
          router.push('/auth/signin');
        }
      })
      .catch((err) => {
        showToast.error(err.message || 'Something went wrong', {
          duration: 3000,
          progress: true,
          position: 'top-right',
          transition: 'bounceIn',
          sound: true,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (!token) {
    return (
      <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-white text-gray-900">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <div className="rounded-full bg-blue-50 p-3 border border-blue-100 shadow-sm">
              <ShieldCheck className="h-8 w-8 text-blue-600" strokeWidth={2.25} />
            </div>
          </div>
          <h2 className="mt-5 text-center text-[26px] font-bold tracking-tight text-gray-900">
            Password Reset
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-[420px] px-4">
          <div className="bg-white py-8 px-6 shadow-xl shadow-gray-100 border border-gray-100 rounded-2xl sm:px-10 text-center space-y-6">
            <p className="text-gray-600 text-sm">
              Invalid or expired reset link. Please request a new password reset email.
            </p>
            <Link href="/auth/forgot-password">
              <button className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all">
                Request New Reset Link
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-white text-gray-900">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="rounded-full bg-blue-50 p-3 border border-blue-100 shadow-sm">
            <ShieldCheck className="h-8 w-8 text-blue-600" strokeWidth={2.25} />
          </div>
        </div>
        <h2 className="mt-5 text-center text-[26px] font-bold tracking-tight text-gray-900">
          Reset Your Password
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Enter your new password below
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-[420px] px-4">
        <div className="bg-white py-8 px-6 shadow-xl shadow-gray-100 border border-gray-100 rounded-2xl sm:px-10">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
                New Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-600/10 transition-all pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-600/10 transition-all pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-60 disabled:cursor-not-allowed rounded-xl text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all"
              >
                {isLoading ? 'Resetting...' : 'Reset Password'}
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
        </div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-white text-gray-900">
        <div className="text-center text-sm text-gray-500">Loading...</div>
      </div>
    }>
      <ResetPasswordContent />
    </Suspense>
  );
}
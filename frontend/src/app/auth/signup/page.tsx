'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Eye, EyeOff, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function AcceptInvitePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const invitedEmail = searchParams.get('email') ?? 'analyst@finguard.com';
  const invitedRole = searchParams.get('role') === 'ADMIN' ? 'Administrator' : 'Fraud analyst';

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [acknowledged, setAcknowledged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const next: Record<string, string> = {};

    if (!name.trim()) {
      next.name = 'Enter your full name.';
    }

    if (!password) {
      next.password = 'Choose a password.';
    } else if (password.length < 8) {
      next.password = 'Use at least 8 characters.';
    }

    if (confirmPassword !== password) {
      next.confirmPassword = 'Passwords don’t match.';
    }

    if (!acknowledged) {
      next.acknowledged = 'Confirm before activating your account.';
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 700));
    setIsLoading(false);
    setIsDone(true);

    setTimeout(() => router.push('/auth/signin'), 1400);
  };

  if (isDone) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0B1120] text-[#E8ECF3]">
        <div className="flex flex-col items-center text-center px-8">
          <CheckCircle2 className="w-8 h-8 text-[#E3A008]" strokeWidth={2} />
          <h2 className="mt-4 text-[18px] font-semibold">Account activated</h2>
          <p className="mt-1.5 text-[14px] text-[#8B96AC]">Redirecting you to sign in…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#0B1120] text-[#E8ECF3]">
      <div className="hidden lg:flex lg:w-[42%] relative flex-col justify-between p-12 bg-[#0B1120] border-r border-[#1F2A44] overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="#E8ECF3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        <div className="relative flex items-center gap-2.5">
          <ShieldCheck className="w-5 h-5 text-[#E3A008]" strokeWidth={2.25} />
          <span className="text-[15px] font-semibold tracking-tight">FinGuard</span>
        </div>

        <div className="relative">
          <h1 className="text-[28px] leading-[1.25] font-semibold max-w-[22ch]">
            You&apos;ve been added to the review team.
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-[#8B96AC] max-w-[38ch]">
            Set a password to activate your account and start reviewing flagged transactions.
          </p>
        </div>

        <div className="relative flex items-center gap-2 text-[13px] font-mono text-[#8B96AC]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E3A008]" />
          Invite verified
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center p-8">
        <div className="w-full max-w-[380px]">
          <div className="mb-8 lg:hidden flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-[#E3A008]" strokeWidth={2.25} />
            <span className="text-[15px] font-semibold tracking-tight">FinGuard</span>
          </div>

          <h2 className="text-[22px] font-semibold">Activate your account</h2>
          <p className="mt-1.5 text-[14px] text-[#8B96AC]">
            Invited as <span className="text-[#E8ECF3]">{invitedRole}</span>
          </p>

          {errors.form && (
            <div className="mt-5 px-3.5 py-2.5 rounded-md bg-[#2A1610] border border-[#5C2E1A] text-[13px] text-[#F0A875]">
              {errors.form}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-7 space-y-5">
            <div>
              <label className="block text-[13px] text-[#8B96AC] mb-1.5">Email</label>
              <input
                type="email"
                value={invitedEmail}
                disabled
                className="w-full px-3.5 py-2.5 bg-[#0A0F1C] border border-[#1F2A44] rounded-md text-[14px] text-[#8B96AC] cursor-not-allowed"
              />
            </div>

            <div>
              <label htmlFor="name" className="block text-[13px] text-[#8B96AC] mb-1.5">
                Full name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Cooper"
                className="w-full px-3.5 py-2.5 bg-[#0F1626] border border-[#1F2A44] rounded-md text-[14px] text-[#E8ECF3] placeholder-[#4B5468] focus:outline-none focus:border-[#E3A008] focus:ring-1 focus:ring-[#E3A008] transition-colors"
              />
              {errors.name && <p className="mt-1.5 text-[12.5px] text-[#F0A875]">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-[13px] text-[#8B96AC] mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  className="w-full px-3.5 py-2.5 bg-[#0F1626] border border-[#1F2A44] rounded-md text-[14px] text-[#E8ECF3] placeholder-[#4B5468] focus:outline-none focus:border-[#E3A008] focus:ring-1 focus:ring-[#E3A008] transition-colors pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8B96AC] hover:text-[#E8ECF3] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="mt-1.5 text-[12.5px] text-[#F0A875]">{errors.password}</p>}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-[13px] text-[#8B96AC] mb-1.5">
                Confirm password
              </label>
              <input
                id="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter your password"
                className="w-full px-3.5 py-2.5 bg-[#0F1626] border border-[#1F2A44] rounded-md text-[14px] text-[#E8ECF3] placeholder-[#4B5468] focus:outline-none focus:border-[#E3A008] focus:ring-1 focus:ring-[#E3A008] transition-colors"
              />
              {errors.confirmPassword && (
                <p className="mt-1.5 text-[12.5px] text-[#F0A875]">{errors.confirmPassword}</p>
              )}
            </div>

            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={acknowledged}
                onChange={(e) => setAcknowledged(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded border-[#1F2A44] bg-[#0F1626] accent-[#E3A008]"
              />
              <span className="text-[13px] leading-relaxed text-[#8B96AC]">
                I understand all review decisions I make are recorded in the audit log.
              </span>
            </label>
            {errors.acknowledged && <p className="text-[12.5px] text-[#F0A875]">{errors.acknowledged}</p>}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 mt-2 bg-[#E3A008] hover:bg-[#CC9007] disabled:opacity-60 disabled:cursor-not-allowed rounded-md text-[14px] font-semibold text-[#0B1120] transition-colors"
            >
              {isLoading ? 'Activating…' : 'Activate account'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
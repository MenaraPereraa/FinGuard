'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  Receipt,
  AlertTriangle,
  BarChart3,
  SlidersHorizontal,
  Users,
  ClipboardList,
  Settings,
  ShieldCheck,
} from 'lucide-react';

type Role = 'ANALYST' | 'ADMIN';

type NavItem = {
  name: string;
  href: string;
  icon: React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement>>;
  roles: Role[];
};

const navigation: NavItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, roles: ['ANALYST', 'ADMIN'] },
  { name: 'Transactions', href: '/transactions', icon: Receipt, roles: ['ANALYST', 'ADMIN'] },
  { name: 'Alerts', href: '/alerts', icon: AlertTriangle, roles: ['ANALYST', 'ADMIN'] },
  { name: 'Analytics', href: '/analytics', icon: BarChart3, roles: ['ANALYST', 'ADMIN'] },
  { name: 'Rules & thresholds', href: '/admin/rules', icon: SlidersHorizontal, roles: ['ADMIN'] },
  { name: 'User management', href: '/admin/users', icon: Users, roles: ['ADMIN'] },
  { name: 'Audit log', href: '/admin/audit-log', icon: ClipboardList, roles: ['ADMIN'] },
];

export default function Navigation({ role }: { role: Role }) {
  const pathname = usePathname();
  const visibleItems = navigation.filter((item) => item.roles.includes(role));
  const generalItems = visibleItems.filter((item) => !item.href.startsWith('/admin'));
  const adminItems = visibleItems.filter((item) => item.href.startsWith('/admin'));

  const renderItem = (item: NavItem) => {
    const isActive = pathname === item.href;
    return (
      <Link
        key={item.name}
        href={item.href}
        className={`flex items-center gap-3 px-3 py-2 rounded-md text-[13.5px] font-medium transition-colors ${
          isActive
            ? 'bg-[#1A2338] text-[#E8ECF3]'
            : 'text-[#8B96AC] hover:bg-[#131B2E] hover:text-[#E8ECF3]'
        }`}
      >
        <item.icon
          className={`w-4.5 h-4.5 flex-shrink-0 ${isActive ? 'text-[#E3A008]' : 'text-[#8B96AC]'}`}
          strokeWidth={1.75}
        />
        {item.name}
      </Link>
    );
  };

  return (
    <div className="flex h-full w-64 flex-col bg-[#0B1120] border-r border-[#1F2A44]">
      <Link href="/dashboard" className="flex items-center gap-2.5 px-5 py-5">
        <ShieldCheck className="w-5 h-5 text-[#E3A008]" strokeWidth={2.25} />
        <span className="text-[15px] font-semibold tracking-tight text-[#E8ECF3]">FinGuard</span>
      </Link>

      <nav className="flex-1 px-3 space-y-0.5">
        {generalItems.map(renderItem)}

        {adminItems.length > 0 && (
          <>
            <div className="mt-5 mb-1.5 px-3 text-[12px] text-[#5A6478]">Admin</div>
            {adminItems.map(renderItem)}
          </>
        )}
      </nav>

      <div className="px-3 pb-4">
        <Link
          href="/settings"
          className={`flex items-center gap-3 px-3 py-2 rounded-md text-[13.5px] font-medium transition-colors ${
            pathname === '/settings'
              ? 'bg-[#1A2338] text-[#E8ECF3]'
              : 'text-[#8B96AC] hover:bg-[#131B2E] hover:text-[#E8ECF3]'
          }`}
        >
          <Settings
            className={`w-4.5 h-4.5 ${pathname === '/settings' ? 'text-[#E3A008]' : 'text-[#8B96AC]'}`}
            strokeWidth={1.75}
          />
          Settings
        </Link>
      </div>
    </div>
  );
}
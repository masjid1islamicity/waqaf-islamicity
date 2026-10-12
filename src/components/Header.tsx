import React from 'react';
import { 
  ShieldCheck, 
  Moon, 
  Sun, 
  Bell, 
  Smartphone, 
  Lock, 
  FileText
} from 'lucide-react';
import { UserRole, NotificationItem } from '../types';

interface HeaderProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  userRole: UserRole;
  onChangeRole: (role: UserRole) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  unreadCount: number;
  onOpenNotifications: () => void;
  onOpenPdfReport: () => void;
  isFieldModeActive: boolean;
  onToggleFieldMode: () => void;
  e2eeEnabled: boolean;
  twoFactorActive: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  userRole,
  onChangeRole,
  darkMode,
  onToggleDarkMode,
  unreadCount,
  onOpenNotifications,
  onOpenPdfReport,
  isFieldModeActive,
  onToggleFieldMode,
  e2eeEnabled,
  twoFactorActive
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Ringkasan' },
    { id: 'blockchain', label: 'Ledger Abadi' },
    { id: 'distribution', label: 'Penyaluran Dana' },
    { id: 'tasks', label: 'Tugas Lapangan' },
    { id: 'kpi', label: 'Indeks Islamicity' },
    { id: 'audit', label: 'Audit Regulator' },
    { id: 'security', label: 'Keamanan & API' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar 3-Zone Contract */}
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Brand Wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button 
              onClick={() => onSelectTab('dashboard')} 
              className="flex items-center gap-2.5 text-left focus:outline-none"
            >
              <div className="w-9 h-9 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                <span>و</span>
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold tracking-tight text-neutral-900 dark:text-neutral-100 whitespace-nowrap">
                  Al-Waqfiyah <span className="text-emerald-700 dark:text-emerald-400 font-semibold">Islamicity</span>
                </span>
                <span className="text-[10px] text-neutral-600 dark:text-neutral-400 font-mono-numbers -mt-1 hidden sm:inline">
                  Syariah & Blockchain Vault
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                    isActive
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-semibold'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800/50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action & Controls */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Quick Field Mode Switcher */}
            <button
              onClick={onToggleFieldMode}
              title="Alihkan Tampilan Lapangan Mobile"
              className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap ${
                isFieldModeActive
                  ? 'bg-emerald-700 text-white border-emerald-700'
                  : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700/50'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden md:inline">{isFieldModeActive ? 'Keluar Mode Lapangan' : 'Mode Lapangan'}</span>
            </button>

            {/* Export PDF Button */}
            <button
              onClick={onOpenPdfReport}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors whitespace-nowrap"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Laporan BWI</span>
            </button>

            {/* Notification Bell */}
            <button
              onClick={onOpenNotifications}
              className="relative p-2 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              aria-label="Notifikasi"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full" />
              )}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={onToggleDarkMode}
              className="p-2 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              aria-label="Ganti Tema"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Role Selector Pill */}
            <div className="relative pl-1 border-l border-neutral-200 dark:border-neutral-800">
              <select
                value={userRole}
                onChange={(e) => onChangeRole(e.target.value as UserRole)}
                className="text-xs bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 py-1.5 px-2.5 rounded-md border border-neutral-200 dark:border-neutral-700 focus:outline-none cursor-pointer font-medium"
              >
                <option value="nadzir">Peran: Nadzir Eksekutif</option>
                <option value="sharia_auditor">Peran: Dewan Pengawas / BWI</option>
                <option value="field_officer">Peran: Petugas Lapangan</option>
                <option value="wakif">Peran: Wakif / Donatur</option>
              </select>
            </div>
          </div>
        </div>

        {/* Secondary Sub-Bar on Mobile for Horizontal Navigation */}
        <div className="lg:hidden flex items-center gap-1 overflow-x-auto py-2 border-t border-neutral-200 dark:border-neutral-800 scrollbar-none">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`px-3 py-1 text-xs font-medium rounded-md whitespace-nowrap ${
                currentTab === item.id
                  ? 'bg-emerald-700 text-white'
                  : 'text-neutral-600 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

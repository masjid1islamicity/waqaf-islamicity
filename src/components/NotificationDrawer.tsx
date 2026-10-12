import React from 'react';
import { 
  X, 
  CheckCheck, 
  Clock, 
  ShieldAlert, 
  Volume2, 
  VolumeX, 
  CheckCircle2, 
  Send,
  Sparkles
} from 'lucide-react';
import { NotificationItem } from '../types';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllAsRead: () => void;
  onMarkAsRead: (id: string) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onNavigateToTab?: (tab: string) => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
  onMarkAsRead,
  soundEnabled,
  onToggleSound,
  onNavigateToTab
}) => {
  if (!isOpen) return null;

  const getCategoryIcon = (category: NotificationItem['category']) => {
    switch (category) {
      case 'ibadah':
        return <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />;
      case 'audit_syariah':
        return <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400" />;
      case 'keamanan_2fa':
        return <ShieldAlert className="w-4 h-4 text-rose-600 dark:text-rose-400" />;
      case 'progres_program':
        return <Send className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
      default:
        return <Sparkles className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        className="absolute inset-0 bg-neutral-950/40 backdrop-blur-xs transition-opacity" 
        onClick={onClose} 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-neutral-900 border-l border-neutral-200 dark:border-neutral-800 shadow-2xl flex flex-col">
          {/* Drawer Header */}
          <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm">
                Pusat Notifikasi Terintegrasi
              </span>
              <span className="text-xs text-neutral-500 font-mono-numbers">
                ({notifications.filter(n => !n.isRead).length} belum dibaca)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={onToggleSound}
                className="p-1.5 text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                title={soundEnabled ? 'Notifikasi Suara Aktif (Adhan/Alert)' : 'Suara Dimatikan'}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-600" /> : <VolumeX className="w-4 h-4" />}
              </button>
              <button
                onClick={onClose}
                className="p-1.5 text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Actions Bar */}
          <div className="px-4 py-2 bg-neutral-50 dark:bg-neutral-950/50 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-xs">
            <span className="text-neutral-500">
              Notifikasi otomatis diperbarui real-time
            </span>
            <button
              onClick={onMarkAllAsRead}
              className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400 hover:underline font-medium"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Tandai Semua Dibaca</span>
            </button>
          </div>

          {/* Notification List */}
          <div className="flex-1 overflow-y-auto divide-y divide-neutral-100 dark:divide-neutral-800">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-neutral-500 text-sm">
                Tidak ada notifikasi saat ini.
              </div>
            ) : (
              notifications.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onMarkAsRead(item.id)}
                  className={`p-4 transition-colors cursor-pointer flex gap-3 ${
                    item.isRead
                      ? 'bg-transparent opacity-75 hover:bg-neutral-50 dark:hover:bg-neutral-800/40'
                      : 'bg-emerald-50/40 dark:bg-emerald-950/20 hover:bg-emerald-50/70 dark:hover:bg-emerald-950/30'
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    {getCategoryIcon(item.category)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-xs font-semibold text-neutral-900 dark:text-neutral-100 truncate">
                        {item.title}
                      </h4>
                      <span className="text-[11px] text-neutral-600 dark:text-neutral-400 font-mono-numbers shrink-0">
                        {item.timestamp}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1 leading-relaxed">
                      {item.message}
                    </p>
                    <div className="mt-2 flex items-center gap-2 text-[10px] text-neutral-600 dark:text-neutral-400">
                      <span className="capitalize">{item.category.replace('_', ' ')}</span>
                      <span>·</span>
                      <span>Sistem Otomatis</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer Preferences */}
          <div className="p-4 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950/50">
            <div className="text-[11px] text-neutral-500">
              <span className="font-semibold text-neutral-700 dark:text-neutral-300">Pemberitahuan Aktif:</span> Pengingat Sholat 5 Waktu, Status Ledger Blockchain, dan Alert Tenggat Tugas Lapangan.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

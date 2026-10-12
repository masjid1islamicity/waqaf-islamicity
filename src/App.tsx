import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { DashboardView } from './components/DashboardView';
import { BlockchainView } from './components/BlockchainView';
import { DistributionView } from './components/DistributionView';
import { FieldAndAiTaskView } from './components/FieldAndAiTaskView';
import { IslamicityKpiView } from './components/IslamicityKpiView';
import { AuditRegulatorView } from './components/AuditRegulatorView';
import { SecurityApiView } from './components/SecurityApiView';
import { NotificationDrawer } from './components/NotificationDrawer';
import { PdfReportModal } from './components/PdfReportModal';
import { 
  UserRole, 
  WaqfAsset, 
  DistributionProject, 
  BlockchainBlock, 
  AuditLog, 
  TeamMemberKPI, 
  MutabaahEntry, 
  TaskItem, 
  NotificationItem, 
  HalaqahPost, 
  ApiIntegration 
} from './types';
import {
  INITIAL_WAQF_ASSETS,
  INITIAL_PROJECTS,
  INITIAL_BLOCKS,
  INITIAL_AUDIT_LOGS,
  INITIAL_TEAM_KPIS,
  INITIAL_TASKS,
  INITIAL_NOTIFICATIONS,
  INITIAL_HALAQAH_POSTS,
  INITIAL_MUTABAAH_DAYS,
  INITIAL_API_INTEGRATIONS
} from './data/mockData';
import { Smartphone, X, ShieldCheck, HeartHandshake, Award } from 'lucide-react';

export default function App() {
  // Navigation & Role states
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [userRole, setUserRole] = useState<UserRole>('nadzir');

  // Dark Mode
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // UI Modals & Drawers
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [isFieldModeActive, setIsFieldModeActive] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Security toggles
  const [e2eeEnabled, setE2eeEnabled] = useState(true);
  const [twoFactorActive, setTwoFactorActive] = useState(true);

  // Domain Data State
  const [assets, setAssets] = useState<WaqfAsset[]>(INITIAL_WAQF_ASSETS);
  const [projects, setProjects] = useState<DistributionProject[]>(INITIAL_PROJECTS);
  const [blocks, setBlocks] = useState<BlockchainBlock[]>(INITIAL_BLOCKS);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);
  const [teamKpis, setTeamKpis] = useState<TeamMemberKPI[]>(INITIAL_TEAM_KPIS);
  const [tasks, setTasks] = useState<TaskItem[]>(INITIAL_TASKS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [halaqahPosts, setHalaqahPosts] = useState<HalaqahPost[]>(INITIAL_HALAQAH_POSTS);
  const [mutabaahEntries, setMutabaahEntries] = useState<MutabaahEntry[]>(INITIAL_MUTABAAH_DAYS);
  const [apiIntegrations] = useState<ApiIntegration[]>(INITIAL_API_INTEGRATIONS);

  // Synchronize Dark Mode to HTML document tag
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Push notification helper
  const handleTriggerNotification = (title: string, message: string, category: NotificationItem['category']) => {
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title,
      message,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
      category,
      isRead: false
    };
    setNotifications(prev => [newNotif, ...prev]);

    // Optional audio beep if sound enabled
    if (soundEnabled && typeof window !== 'undefined' && 'AudioContext' in window) {
      try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.frequency.value = 587.33; // D5 harmonious tone
        gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.3);
      } catch {
        // audio context non-critical
      }
    }
  };

  const handleMarkAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const handleMarkNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? ({ ...n, isRead: true }) : n));
  };

  // Business Action Handlers
  const handleAddDisbursement = (newProjData: Omit<DistributionProject, 'id'>) => {
    const newId = `dist-0${projects.length + 1}`;
    const newProj: DistributionProject = { ...newProjData, id: newId };
    setProjects(prev => [newProj, ...prev]);

    // Also auto-commit a block to blockchain
    handleCommitNewBlock(`Penyaluran Baru: ${newProj.title} (Rp ${(newProj.budgetTotal / 1000000).toFixed(0)} Jt)`);

    // Add audit log
    const newLog: AuditLog = {
      id: `aud-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }) + ' ' +
                 new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
      category: 'Kepatuhan Syariah',
      action: `Pengajuan Program: ${newProj.title}`,
      actor: newProj.fieldOfficer,
      actorRole: 'Petugas Lapangan',
      details: `Alokasi Rp ${(newProj.budgetTotal / 1000000).toFixed(0)} Jt untuk ${newProj.beneficiariesCount} penerima di ${newProj.location}. Sesuai ${newProj.fatwaReference}`,
      e2eeHash: 'aes256:' + Math.random().toString(36).substring(2, 10),
      regulatorStatus: 'Sesuai DSN-MUI'
    };
    setAuditLogs(prev => [newLog, ...prev]);

    handleTriggerNotification(
      'Penyaluran Baru Diajukan',
      `Program "${newProj.title}" telah didaftarkan dan menunggu verifikasi akhir pengawas.`,
      'progres_program'
    );
  };

  const handleCommitNewBlock = (summary: string) => {
    const prevBlock = blocks[0];
    const newBlockNumber = prevBlock ? prevBlock.blockNumber + 1 : 421891;
    const randomHex = () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const newBlock: BlockchainBlock = {
      blockNumber: newBlockNumber,
      timestamp: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }) + ' ' +
                 new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' WIB',
      hash: '0x' + randomHex() + randomHex(),
      previousHash: prevBlock ? prevBlock.hash : '0x0000000000000000',
      transactionsCount: Math.floor(Math.random() * 8) + 1,
      validatorNode: 'Node-Jakarta-BWI-Validator-01',
      shariaSeal: 'BWI-SHA256-CERTIFIED',
      status: 'Terkonfirmasi',
      payloadSummary: summary
    };
    setBlocks(prev => [newBlock, ...prev]);

    handleTriggerNotification(
      'Blok Blockchain Baru Tersegel',
      `Blok #${newBlockNumber} telah divalidasi oleh konsorsium node BWI & DSN-MUI.`,
      'progres_program'
    );
  };

  const handleAddTask = (newTask: TaskItem) => {
    setTasks(prev => [newTask, ...prev]);
  };

  const handleUpdateTaskStatus = (taskId: string, newStatus: TaskItem['status']) => {
    setTasks(prev => prev.map(t => t.id === taskId ? ({ ...t, status: newStatus }) : t));
  };

  const handleAddHalaqahPost = (message: string, mutabaahSummary: string) => {
    const newPost: HalaqahPost = {
      id: `hq-${Date.now()}`,
      author: 'H. Ahmad Zaki, M.Ag',
      role: 'Nadzir Eksekutif',
      avatar: '/src/assets/images/avatar_nadzir_ahmad_1791795735025.jpg',
      timestamp: 'Baru saja',
      message,
      mutabaahSummary,
      likes: 1,
      hasLiked: false,
      commentsCount: 0
    };
    setHalaqahPosts(prev => [newPost, ...prev]);
  };

  const handleLikeHalaqahPost = (postId: string) => {
    setHalaqahPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.hasLiked ? post.likes - 1 : post.likes + 1,
          hasLiked: !post.hasLiked
        };
      }
      return post;
    }));
  };

  const totalAssetsValuation = assets.reduce((sum, a) => sum + a.valuation, 0);
  const overallYield = assets.reduce((sum, a) => sum + a.monthlyYield, 0);
  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors">
      {/* Top Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        userRole={userRole}
        onChangeRole={setUserRole}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        unreadCount={unreadCount}
        onOpenNotifications={() => setIsNotificationOpen(true)}
        onOpenPdfReport={() => setIsPdfModalOpen(true)}
        isFieldModeActive={isFieldModeActive}
        onToggleFieldMode={() => setIsFieldModeActive(!isFieldModeActive)}
        e2eeEnabled={e2eeEnabled}
        twoFactorActive={twoFactorActive}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* If Mobile Field Mode is explicitly active, wrap in phone frame or show dedicated mobile header */}
        {isFieldModeActive ? (
          <div className="max-w-md mx-auto my-2 p-4 bg-white dark:bg-neutral-900 border-2 border-emerald-600 rounded-3xl shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800 text-xs">
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-emerald-600" />
                <span className="font-bold">Mode Lapangan Mobile (Staf Offline-First)</span>
              </div>
              <button
                onClick={() => setIsFieldModeActive(false)}
                className="text-neutral-400 hover:text-neutral-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* In field mode, primarily render Field & AI Tasks */}
            <FieldAndAiTaskView
              tasks={tasks}
              onAddTask={handleAddTask}
              onUpdateTaskStatus={handleUpdateTaskStatus}
              onTriggerNotification={handleTriggerNotification}
              isFieldModeActive={isFieldModeActive}
              onToggleFieldMode={() => setIsFieldModeActive(!isFieldModeActive)}
            />
          </div>
        ) : (
          /* Standard Desktop & Multi-Device Workspace */
          <>
            {currentTab === 'dashboard' && (
              <DashboardView
                assets={assets}
                projects={projects}
                recentBlocks={blocks.slice(0, 3)}
                onNavigateToTab={setCurrentTab}
                onOpenPdfReport={() => setIsPdfModalOpen(true)}
              />
            )}

            {currentTab === 'blockchain' && (
              <BlockchainView
                blocks={blocks}
                assets={assets}
                onCommitNewBlock={handleCommitNewBlock}
              />
            )}

            {currentTab === 'distribution' && (
              <DistributionView
                projects={projects}
                onAddDisbursement={handleAddDisbursement}
                onNavigateToTab={setCurrentTab}
              />
            )}

            {currentTab === 'tasks' && (
              <FieldAndAiTaskView
                tasks={tasks}
                onAddTask={handleAddTask}
                onUpdateTaskStatus={handleUpdateTaskStatus}
                onTriggerNotification={handleTriggerNotification}
                isFieldModeActive={isFieldModeActive}
                onToggleFieldMode={() => setIsFieldModeActive(!isFieldModeActive)}
              />
            )}

            {currentTab === 'kpi' && (
              <IslamicityKpiView
                teamKpis={teamKpis}
                mutabaahEntries={mutabaahEntries}
                halaqahPosts={halaqahPosts}
                onAddHalaqahPost={handleAddHalaqahPost}
                onLikeHalaqahPost={handleLikeHalaqahPost}
                onTriggerNotification={handleTriggerNotification}
              />
            )}

            {currentTab === 'audit' && (
              <AuditRegulatorView
                auditLogs={auditLogs}
                onOpenPdfReport={() => setIsPdfModalOpen(true)}
                onTriggerNotification={handleTriggerNotification}
              />
            )}

            {currentTab === 'security' && (
              <SecurityApiView
                apiIntegrations={apiIntegrations}
                e2eeEnabled={e2eeEnabled}
                onToggleE2ee={() => setE2eeEnabled(!e2eeEnabled)}
                twoFactorActive={twoFactorActive}
                onToggleTwoFactor={() => setTwoFactorActive(!twoFactorActive)}
                onTriggerNotification={handleTriggerNotification}
              />
            )}
          </>
        )}
      </main>

      {/* Quiet, Respectful Footer */}
      <footer className="border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 py-6 text-xs text-neutral-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-neutral-800 dark:text-neutral-200">
              Al-Waqfiyah Islamicity
            </span>
            <span>·</span>
            <span>Regulasi BWI No. 3.3.00192</span>
            <span>·</span>
            <span>Dewan Pengawas Syariah DSN-MUI</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-mono-numbers">
            <span>Enkripsi AES-256 E2EE</span>
            <span>·</span>
            <span>Node Consensus v3.4</span>
            <span>·</span>
            <span>© 2026 Lembaga Pengelola Wakaf Al-Waqfiyah</span>
          </div>
        </div>
      </footer>

      {/* Slide-over Notification Center */}
      <NotificationDrawer
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
        notifications={notifications}
        onMarkAllAsRead={handleMarkAllNotificationsAsRead}
        onMarkAsRead={handleMarkNotificationAsRead}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
        onNavigateToTab={(tab) => {
          setCurrentTab(tab);
          setIsNotificationOpen(false);
        }}
      />

      {/* Printable / Downloadable PDF Report Modal */}
      <PdfReportModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        assets={assets}
        projects={projects}
        auditLogs={auditLogs}
        overallYield={overallYield}
        totalAssetsValuation={totalAssetsValuation}
      />
    </div>
  );
}

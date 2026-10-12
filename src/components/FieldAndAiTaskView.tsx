import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  Smartphone, 
  Wifi, 
  WifiOff, 
  RefreshCw, 
  AlertTriangle, 
  Plus, 
  Calendar, 
  User, 
  ArrowRight,
  Shield,
  Layers
} from 'lucide-react';
import { TaskItem } from '../types';
import { analyzeTaskWithGemini, AiTaskAnalysis } from '../lib/gemini';

interface FieldAndAiTaskViewProps {
  tasks: TaskItem[];
  onAddTask: (task: TaskItem) => void;
  onUpdateTaskStatus: (taskId: string, newStatus: TaskItem['status']) => void;
  onTriggerNotification: (title: string, message: string, category: any) => void;
  isFieldModeActive: boolean;
  onToggleFieldMode: () => void;
}

export const FieldAndAiTaskView: React.FC<FieldAndAiTaskViewProps> = ({
  tasks,
  onAddTask,
  onUpdateTaskStatus,
  onTriggerNotification,
  isFieldModeActive,
  onToggleFieldMode
}) => {
  // Offline simulation state
  const [isOffline, setIsOffline] = useState(false);
  const [offlineQueueCount, setOfflineQueueCount] = useState(2);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncSuccessMsg, setSyncSuccessMsg] = useState<string | null>(null);

  // Filter state
  const [statusFilter, setStatusFilter] = useState<string>('Semua');

  // AI Task Creation modal/form
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDesc, setNewTaskDesc] = useState('');
  const [newTaskAssignee, setNewTaskAssignee] = useState('Ustadz Salman Farisi, S.Sos');
  const [newTaskDeadline, setNewTaskDeadline] = useState('14 Okt 2026, 17:00 WIB');
  const [isAnalyzingAi, setIsAnalyzingAi] = useState(false);
  const [aiAnalysisResult, setAiAnalysisResult] = useState<AiTaskAnalysis | null>(null);

  const handleRunAiAnalysis = async () => {
    if (!newTaskTitle.trim()) return;
    setIsAnalyzingAi(true);
    try {
      const result = await analyzeTaskWithGemini(newTaskTitle, newTaskDesc);
      setAiAnalysisResult(result);
    } finally {
      setIsAnalyzingAi(false);
    }
  };

  const handleSaveTask = () => {
    if (!newTaskTitle.trim()) return;

    const priority = aiAnalysisResult?.fiqhPriority || 'Hajiyyat';
    const note = aiAnalysisResult 
      ? `Maqashid: ${aiAnalysisResult.maqashidPillar}. ${aiAnalysisResult.urgencyExplanation}` 
      : 'Tugas operasional lapangan standar.';

    const newTask: TaskItem = {
      id: `tsk-${Date.now().toString().slice(-4)}`,
      title: newTaskTitle.trim(),
      description: newTaskDesc.trim() || 'Tugas operasional terkoordinasi.',
      fiqhPriority: priority,
      deadline: newTaskDeadline,
      assignee: newTaskAssignee,
      status: 'Belum Dimulai',
      isAiRecommended: !!aiAnalysisResult,
      shariaNote: note,
      isOfflineQueued: isOffline
    };

    if (isOffline) {
      setOfflineQueueCount(prev => prev + 1);
      onTriggerNotification(
        'Tugas Disimpan di Cache Luring (Offline)',
        `Tugas "${newTask.title}" disimpan lokal di perangkat. Akan disinkronkan saat terhubung internet.`,
        'tugas_lapangan'
      );
    } else {
      onAddTask(newTask);
      onTriggerNotification(
        'Tugas Baru Ditugaskan',
        `Tugas baru "${newTask.title}" dialokasikan kepada ${newTask.assignee} (Prioritas: ${priority}).`,
        'tugas_lapangan'
      );
    }

    setShowCreateModal(false);
    setNewTaskTitle('');
    setNewTaskDesc('');
    setAiAnalysisResult(null);
  };

  const handleSyncToCentral = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setOfflineQueueCount(0);
      setSyncSuccessMsg('Sinkronisasi Berhasil: 2 antrean data luring & bukti foto telah terunggah ke basis data pusat.');
      onTriggerNotification(
        'Sinkronisasi Basis Data Pusat Tuntas',
        'Seluruh antrean data lapangan terverifikasi dan disimpan aman di server terenkripsi.',
        'tugas_lapangan'
      );
      setTimeout(() => setSyncSuccessMsg(null), 5000);
    }, 1800);
  };

  const filteredTasks = tasks.filter(t => {
    if (statusFilter === 'Semua') return true;
    return t.status === statusFilter;
  });

  const getPriorityBadgeClass = (priority: TaskItem['fiqhPriority']) => {
    switch (priority) {
      case 'Daruriyyat':
        return 'text-rose-700 dark:text-rose-400 font-bold';
      case 'Hajiyyat':
        return 'text-amber-700 dark:text-amber-400 font-semibold';
      case 'Tahsiniyyat':
        return 'text-emerald-700 dark:text-emerald-400 font-medium';
    }
  };

  return (
    <div className="space-y-8">
      {/* Title & Field Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            Manajemen Tugas AI & Operasional Lapangan Luring
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1">
            Prioritas tugas berbasis Maqashid al-Shariah dengan kemampuan luring (offline) sinkronisasi otomatis
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Field Mode Toggle Button */}
          <button
            onClick={onToggleFieldMode}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
              isFieldModeActive
                ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>{isFieldModeActive ? 'Tampilan Desktop' : 'Mode HP Lapangan'}</span>
          </button>

          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tugas AI Baru</span>
          </button>
        </div>
      </div>

      {/* Offline Status & Central Database Auto-Sync Banner */}
      <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsOffline(!isOffline)}
            className={`p-2 rounded-lg border transition-colors flex items-center gap-1.5 text-xs font-medium ${
              isOffline
                ? 'bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-700'
                : 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700'
            }`}
            title="Klik untuk menguji simulasi kondisi luring/daring di pelosok"
          >
            {isOffline ? <WifiOff className="w-4 h-4 text-amber-600" /> : <Wifi className="w-4 h-4 text-emerald-600" />}
            <span>{isOffline ? 'Mode Luring (Offline Pelosok)' : 'Daring (Terhubung Pusat)'}</span>
          </button>

          <div className="text-xs">
            <span className="font-semibold text-neutral-900 dark:text-neutral-100">
              {isOffline ? 'Penyimpanan Lokal Aktif: ' : 'Status Database: '}
            </span>
            <span className="text-neutral-500">
              {isOffline
                ? `${offlineQueueCount} data tersimpan di IndexedDB lokal perangkat.`
                : 'Tersinkronisasi otomatis setiap 5 menit ke basis data pusat terenkripsi.'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleSyncToCentral}
            disabled={isSyncing || offlineQueueCount === 0}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg transition-colors disabled:opacity-40 shadow-xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Menyinkronkan...' : `Sinkronisasi Sekarang (${offlineQueueCount})`}</span>
          </button>
        </div>
      </div>

      {syncSuccessMsg && (
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 rounded-lg text-xs text-emerald-800 dark:text-emerald-200 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
          <span>{syncSuccessMsg}</span>
        </div>
      )}

      {/* Task Filters & Counts */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1 p-1 bg-neutral-100 dark:bg-neutral-800 rounded-lg overflow-x-auto scrollbar-none">
          {['Semua', 'Belum Dimulai', 'Sedang Dikerjakan', 'Menunggu Verifikasi', 'Selesai'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                statusFilter === st
                  ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="text-xs text-neutral-500 font-mono-numbers text-right">
          Menampilkan {filteredTasks.length} dari {tasks.length} tugas terdaftar
        </div>
      </div>

      {/* Tasks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className="p-5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs flex flex-col justify-between space-y-4 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors"
          >
            <div className="space-y-2.5">
              {/* Header with Priority and AI badge */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-xs">
                  <span className={`text-[11px] uppercase tracking-wider ${getPriorityBadgeClass(task.fiqhPriority)}`}>
                    Kategori: {task.fiqhPriority}
                  </span>
                  {task.isAiRecommended && (
                    <span className="flex items-center gap-1 text-[10px] text-emerald-700 dark:text-emerald-400 font-mono-numbers">
                      <Sparkles className="w-3 h-3" />
                      <span>AI Maqashid</span>
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5 text-xs text-neutral-500 font-mono-numbers">
                  <Clock className="w-3.5 h-3.5 text-neutral-400" />
                  <span>{task.deadline}</span>
                </div>
              </div>

              {/* Title & Desc */}
              <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 leading-snug">
                {task.title}
              </h3>

              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {task.description}
              </p>

              {/* Sharia Justification Note */}
              {task.shariaNote && (
                <div className="text-[11px] text-neutral-500 bg-neutral-50 dark:bg-neutral-800/40 p-2.5 rounded-lg border border-neutral-100 dark:border-neutral-800 leading-relaxed">
                  <span className="font-semibold text-neutral-700 dark:text-neutral-300">Catatan Fiqh: </span>
                  {task.shariaNote}
                </div>
              )}
            </div>

            {/* Footer with Assignee & Status Change */}
            <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-1.5 text-neutral-600 dark:text-neutral-400 truncate">
                <User className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                <span className="truncate">{task.assignee}</span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <select
                  value={task.status}
                  onChange={(e) => {
                    const nextStatus = e.target.value as TaskItem['status'];
                    onUpdateTaskStatus(task.id, nextStatus);
                    onTriggerNotification(
                      'Status Tugas Diperbarui',
                      `Tugas "${task.title}" diubah statusnya menjadi ${nextStatus}.`,
                      'tugas_lapangan'
                    );
                  }}
                  className="text-xs py-1 px-2 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-700 focus:outline-none cursor-pointer font-medium"
                >
                  <option value="Belum Dimulai">Belum Dimulai</option>
                  <option value="Sedang Dikerjakan">Sedang Dikerjakan</option>
                  <option value="Menunggu Verifikasi">Menunggu Verifikasi</option>
                  <option value="Selesai">Selesai</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: Create Task with AI Fiqh Classification */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/60 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                  Buat Tugas & Klasifikasi AI Maqashid
                </h3>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3.5 text-xs">
              <div>
                <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Nama Tugas Lapangan / Administrasi
                </label>
                <input
                  type="text"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="Contoh: Pengiriman Bantuan Obat Darurat Korban Gempa"
                  className="w-full p-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Keterangan & Rincian Tugas
                </label>
                <textarea
                  rows={2}
                  value={newTaskDesc}
                  onChange={(e) => setNewTaskDesc(e.target.value)}
                  placeholder="Jelaskan kebutuhan di lapangan dan pihak penerima..."
                  className="w-full p-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* AI Trigger Button */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleRunAiAnalysis}
                  disabled={isAnalyzingAi || !newTaskTitle.trim()}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 font-medium transition-colors disabled:opacity-50"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isAnalyzingAi ? 'Menganalisis Kaidah Fiqh...' : 'Analisis Prioritas AI & Maqashid'}</span>
                </button>
              </div>

              {/* AI Analysis Preview Box */}
              {aiAnalysisResult && (
                <div className="p-3.5 rounded-lg bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-2 text-[11px]">
                  <div className="flex items-center justify-between font-bold text-emerald-900 dark:text-emerald-200">
                    <span>Hasil Analisis: Prioritas {aiAnalysisResult.fiqhPriority}</span>
                    <span>{aiAnalysisResult.maqashidPillar}</span>
                  </div>
                  <p className="text-emerald-800 dark:text-emerald-300 leading-relaxed">
                    {aiAnalysisResult.urgencyExplanation}
                  </p>
                  <div className="space-y-1 pt-1">
                    <span className="font-semibold text-emerald-900 dark:text-emerald-200">Rekomendasi Langkah:</span>
                    <ul className="list-disc pl-4 space-y-0.5 text-emerald-800 dark:text-emerald-300">
                      {aiAnalysisResult.recommendedSteps.map((step, idx) => (
                        <li key={idx}>{step}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Penerima Tugas (Assignee)
                  </label>
                  <select
                    value={newTaskAssignee}
                    onChange={(e) => setNewTaskAssignee(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none"
                  >
                    <option value="Ustadz Salman Farisi, S.Sos">Ustadz Salman Farisi, S.Sos</option>
                    <option value="dr. Farhan Syahputra, Sp.A">dr. Farhan Syahputra, Sp.A</option>
                    <option value="Siti Rahmawati, S.E.I">Siti Rahmawati, S.E.I</option>
                    <option value="Dr. Fatima Zahra, MEc">Dr. Fatima Zahra, MEc</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Tenggat Waktu (Deadline)
                  </label>
                  <input
                    type="text"
                    value={newTaskDeadline}
                    onChange={(e) => setNewTaskDeadline(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 font-mono-numbers focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-neutral-200 dark:border-neutral-800">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleSaveTask}
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-lg"
                >
                  Simpan Tugas
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

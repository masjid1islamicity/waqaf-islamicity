import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Search, 
  FileCheck2, 
  Lock, 
  Printer, 
  Download, 
  CheckCircle2, 
  AlertCircle, 
  Building2, 
  Key, 
  UserCheck
} from 'lucide-react';
import { AuditLog } from '../types';

interface AuditRegulatorViewProps {
  auditLogs: AuditLog[];
  onOpenPdfReport: () => void;
  onTriggerNotification: (title: string, message: string, category: any) => void;
}

export const AuditRegulatorView: React.FC<AuditRegulatorViewProps> = ({
  auditLogs,
  onOpenPdfReport,
  onTriggerNotification
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchActor, setSearchActor] = useState('');
  const [signedOfficial, setSignedOfficial] = useState(false);

  const filteredLogs = auditLogs.filter((log) => {
    const matchesCat = selectedCategory === 'Semua' || log.category === selectedCategory;
    const matchesSearch = log.actor.toLowerCase().includes(searchActor.toLowerCase()) ||
                          log.action.toLowerCase().includes(searchActor.toLowerCase()) ||
                          log.details.toLowerCase().includes(searchActor.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleSignAuditStatement = () => {
    setSignedOfficial(true);
    onTriggerNotification(
      'Pernyataan Kepatuhan Syariah Ditandatangani',
      'Dewan Pengawas Syariah & Inspektorat BWI telah mensahkan lembar audit triwulanan dengan segel kriptografis.',
      'audit_syariah'
    );
  };

  return (
    <div className="space-y-8">
      {/* Title & Regulator Seal */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            Modul Audit Internal & Portal Pengawas Regulator
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1">
            Akses resmi bagi Badan Wakaf Indonesia (BWI), Dewan Pengawas Syariah (DPS), dan Auditor Independen
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenPdfReport}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg transition-colors shadow-xs"
          >
            <Printer className="w-4 h-4" />
            <span>Unduh Berkas Audit Resmi</span>
          </button>
        </div>
      </div>

      {/* Regulator Compliance Status Banner */}
      <div className="p-6 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-100 dark:border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 flex items-center justify-center font-bold">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                Pemeriksaan Badan Wakaf Indonesia (BWI) & DSN-MUI
              </h3>
              <p className="text-xs text-neutral-500">
                Status Registrasi Nazhir: BWI-3.3.00192 · Kategori: Nazhir Unggulan Nasional
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 flex items-center gap-1 font-mono-numbers">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Kepatuhan: 100% (WTP)</span>
            </span>
          </div>
        </div>

        {/* 4 Compliance Checkpoints */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200/60 dark:border-neutral-800 space-y-1">
            <div className="font-semibold text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Integritas Pokok Wakaf</span>
            </div>
            <p className="text-[11px] text-neutral-500">
              Pokok harta wakaf 100% terisolasi dan tidak mengalami penurunan nilai.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200/60 dark:border-neutral-800 space-y-1">
            <div className="font-semibold text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Bebas Ribawi & Gharar</span>
            </div>
            <p className="text-[11px] text-neutral-500">
              Seluruh instrumen penempatan menggunakan akad Mudharabah / Ijarah resmi.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200/60 dark:border-neutral-800 space-y-1">
            <div className="font-semibold text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Kesesuaian Mauquf 'Alaih</span>
            </div>
            <p className="text-[11px] text-neutral-500">
              Alokasi hasil murni sesuai dengan amanat klausul ikrar wakaf para wakif.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200/60 dark:border-neutral-800 space-y-1">
            <div className="font-semibold text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Tanda Tangan Kriptografi</span>
            </div>
            <p className="text-[11px] text-neutral-500">
              Log tersegel dengan SHA-256 dan kunci privat DPS tersimpan di HSM.
            </p>
          </div>
        </div>

        {/* Regulator Sign-off Button */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-neutral-500">
            {signedOfficial 
              ? 'Telah disahkan secara digital oleh Dewan Pengawas Syariah pada 12 Okt 2026.'
              : 'Memerlukan otentikasi DPS untuk penutupan buku kuartalan.'}
          </span>
          <button
            onClick={handleSignAuditStatement}
            disabled={signedOfficial}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              signedOfficial
                ? 'bg-neutral-200 dark:bg-neutral-800 text-neutral-500 cursor-default'
                : 'bg-emerald-700 hover:bg-emerald-800 text-white'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>{signedOfficial ? 'Audit Sah Terverifikasi' : 'Sahkan Audit Kuartal Ini'}</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchActor}
            onChange={(e) => setSearchActor(e.target.value)}
            placeholder="Cari tindakan, nama auditor, atau rincian..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center gap-1 p-1 bg-neutral-100 dark:bg-neutral-800 rounded-lg overflow-x-auto scrollbar-none">
          {['Semua', 'Kepatuhan Syariah', 'Keuangan', 'Aset Wakaf', 'Akses Sistem'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Audit Logs Table */}
      <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
          <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
            Jejak Audit Terenkripsi Ujung-ke-Ujung (Immutable Audit Trail)
          </h3>
          <span className="text-xs text-neutral-500 font-mono-numbers">
            {filteredLogs.length} entri tercatat
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-neutral-50 dark:bg-neutral-800/60 text-neutral-600 dark:text-neutral-400 font-semibold border-b border-neutral-200 dark:border-neutral-800">
              <tr>
                <th className="py-3 px-4">Waktu & Hash</th>
                <th className="py-3 px-4">Kategori</th>
                <th className="py-3 px-4">Aktivitas Audit</th>
                <th className="py-3 px-4">Pelaku (Actor)</th>
                <th className="py-3 px-4">Rincian Kepatuhan</th>
                <th className="py-3 px-4 text-center">Status BWI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-800/30 transition-colors">
                  <td className="py-3.5 px-4 font-mono-numbers">
                    <div className="font-medium text-neutral-900 dark:text-neutral-100">{log.timestamp}</div>
                    <div className="text-[10px] text-neutral-400 font-mono flex items-center gap-1 mt-0.5">
                      <Lock className="w-2.5 h-2.5 text-emerald-600" />
                      <span>{log.e2eeHash}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-neutral-700 dark:text-neutral-300">
                    {log.category}
                  </td>
                  <td className="py-3.5 px-4 font-medium text-neutral-900 dark:text-neutral-100">
                    {log.action}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-medium text-neutral-900 dark:text-neutral-100">{log.actor}</div>
                    <div className="text-[10px] text-neutral-500">{log.actorRole}</div>
                  </td>
                  <td className="py-3.5 px-4 text-neutral-600 dark:text-neutral-400 max-w-xs leading-relaxed">
                    {log.details}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
                      {log.regulatorStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

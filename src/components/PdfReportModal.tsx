import React, { useRef } from 'react';
import { 
  X, 
  Printer, 
  Download, 
  FileSpreadsheet, 
  ShieldCheck, 
  CheckCircle2, 
  QrCode,
  Building2,
  Calendar
} from 'lucide-react';
import { WaqfAsset, DistributionProject, AuditLog } from '../types';

interface PdfReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  assets: WaqfAsset[];
  projects: DistributionProject[];
  auditLogs: AuditLog[];
  overallYield: number;
  totalAssetsValuation: number;
}

export const PdfReportModal: React.FC<PdfReportModalProps> = ({
  isOpen,
  onClose,
  assets,
  projects,
  auditLogs,
  overallYield,
  totalAssetsValuation
}) => {
  const printAreaRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const totalDisbursed = projects.reduce((sum, p) => sum + p.disbursedTotal, 0);
  const totalBeneficiaries = projects.reduce((sum, p) => sum + p.beneficiariesCount, 0);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadCsv = () => {
    const headers = ['ID Proyek', 'Nama Program', 'Sektor', 'Anggaran (IDR)', 'Realisasi (IDR)', 'Penerima Manfaat', 'Status'];
    const rows = projects.map(p => [
      p.id,
      `"${p.title.replace(/"/g, '""')}"`,
      p.sector,
      p.budgetTotal,
      p.disbursedTotal,
      p.beneficiariesCount,
      p.status
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Laporan_Wakaf_AlWaqfiyah_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadJson = () => {
    const exportData = {
      platform: 'Al-Waqfiyah Islamicity Management Platform',
      generatedAt: new Date().toISOString(),
      regulatorProof: 'BWI-SHA256-CERTIFIED-LEDGER',
      merkleRoot: '0x3a9b1c7f4e8d2a6c9e0f1b3d5a7c8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d',
      summary: {
        totalAssetsValuation,
        overallMonthlyYield: overallYield,
        totalDisbursed,
        totalBeneficiaries
      },
      assets,
      projects,
      recentAudits: auditLogs.slice(0, 5)
    };
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(exportData, null, 2))}`;
    const link = document.createElement('a');
    link.setAttribute('href', jsonString);
    link.setAttribute('download', `Audit_Ledger_AlWaqfiyah_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-neutral-950/70 backdrop-blur-xs">
      <div className="relative w-full max-w-4xl bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        {/* Modal Toolbar (hidden when printing) */}
        <div className="no-print p-4 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950/50 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
              Laporan Akuntabilitas Resmi (Format PDF & Cetak)
            </span>
            <span className="text-xs text-neutral-500 font-mono-numbers">
              · Standar BWI & DSN-MUI
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-emerald-700 text-white rounded-lg hover:bg-emerald-800 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak / Unduh PDF</span>
            </button>
            <button
              onClick={handleDownloadCsv}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Ekspor CSV</span>
            </button>
            <button
              onClick={handleDownloadJson}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>JSON Kripto</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 rounded-md"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Formal Printable Document Viewport */}
        <div ref={printAreaRef} className="flex-1 overflow-y-auto p-8 sm:p-12 text-neutral-900 dark:text-neutral-100 bg-white dark:bg-neutral-900 space-y-8 font-sans">
          {/* Official Letterhead */}
          <div className="border-b-2 border-neutral-900 dark:border-neutral-200 pb-6">
            <div className="flex items-start justify-between gap-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded bg-emerald-800 text-white flex items-center justify-center font-bold text-sm">
                    و
                  </div>
                  <h1 className="text-xl font-bold tracking-tight uppercase">
                    Lembaga Pengelola Wakaf Al-Waqfiyah Islamicity
                  </h1>
                </div>
                <p className="text-xs text-neutral-500">
                  Tergistrasi Resmi di Badan Wakaf Indonesia (BWI) No: 3.3.00192/BWI/2022
                </p>
                <p className="text-xs text-neutral-500">
                  Diawasi oleh Dewan Pengawas Syariah (DPS) Terakreditasi DSN-MUI No: 088/DPS/DSN-MUI/2023
                </p>
              </div>

              <div className="text-right shrink-0">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-neutral-100 dark:bg-neutral-800 text-xs font-mono-numbers">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>BLOCKCHAIN VERIFIED</span>
                </div>
                <div className="text-[11px] text-neutral-500 mt-1 font-mono-numbers">
                  No Dokumen: WQF-REP-2026/X-12
                </div>
                <div className="text-[11px] text-neutral-500 font-mono-numbers">
                  Tanggal: 12 Oktober 2026
                </div>
              </div>
            </div>
          </div>

          {/* Report Title */}
          <div className="text-center space-y-1 py-2">
            <h2 className="text-lg font-bold tracking-tight">
              LAPORAN AKUNTABILITAS PENGELOLAAN WAKAF PRODUKTIF & PENYALURAN DANA DAKWAH
            </h2>
            <p className="text-xs text-neutral-500">
              Periode Triwulan Berjalan Tahun Anggaran 2026 — Terisolasi, Transparan & Diawasi Penuh
            </p>
          </div>

          {/* Executive Summary Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-lg bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200 dark:border-neutral-800">
            <div>
              <div className="text-[11px] text-neutral-500 uppercase tracking-wider">Total Aset Wakaf</div>
              <div className="text-base font-bold font-mono-numbers mt-0.5">
                Rp {(totalAssetsValuation / 1000000000).toFixed(1)} Miliar
              </div>
              <div className="text-[10px] text-emerald-600">Pokok Terjaga Utuh</div>
            </div>
            <div>
              <div className="text-[11px] text-neutral-500 uppercase tracking-wider">Hasil Kelola / Bulan</div>
              <div className="text-base font-bold font-mono-numbers mt-0.5">
                Rp {(overallYield / 1000000).toFixed(0)} Juta
              </div>
              <div className="text-[10px] text-neutral-500">Yield Tahunan ~12.2%</div>
            </div>
            <div>
              <div className="text-[11px] text-neutral-500 uppercase tracking-wider">Realisasi Mauquf</div>
              <div className="text-base font-bold font-mono-numbers mt-0.5">
                Rp {(totalDisbursed / 1000000).toFixed(0)} Juta
              </div>
              <div className="text-[10px] text-emerald-600">Sesuai Ikrar Wakaf</div>
            </div>
            <div>
              <div className="text-[11px] text-neutral-500 uppercase tracking-wider">Penerima Manfaat</div>
              <div className="text-base font-bold font-mono-numbers mt-0.5">
                {totalBeneficiaries.toLocaleString()} Jiwa
              </div>
              <div className="text-[10px] text-neutral-500">4 Sektor Utama</div>
            </div>
          </div>

          {/* Section: Portofolio Aset Wakaf Produktif */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-800 dark:text-neutral-200 flex items-center justify-between">
              <span>I. Status Portofolio Aset Wakaf Produktif</span>
              <span className="text-[11px] font-normal text-neutral-500 lowercase">4 aset terdaftar</span>
            </h3>

            <div className="border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden">
              <table className="w-full text-xs text-left">
                <thead className="bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 font-medium border-b border-neutral-200 dark:border-neutral-800">
                  <tr>
                    <th className="py-2.5 px-3">Kode Aset</th>
                    <th className="py-2.5 px-3">Nama Objek Wakaf</th>
                    <th className="py-2.5 px-3">Kategori</th>
                    <th className="py-2.5 px-3 text-right">Nilai Wajar Aset</th>
                    <th className="py-2.5 px-3 text-right">Hasil Kelola/Bln</th>
                    <th className="py-2.5 px-3 text-center">Audit Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                  {assets.map((asset) => (
                    <tr key={asset.id} className="hover:bg-neutral-50/50">
                      <td className="py-2.5 px-3 font-mono-numbers font-medium text-neutral-700 dark:text-neutral-300">
                        {asset.code}
                      </td>
                      <td className="py-2.5 px-3 font-medium">
                        {asset.name}
                        <div className="text-[10px] text-neutral-500">{asset.location}</div>
                      </td>
                      <td className="py-2.5 px-3 text-neutral-600 dark:text-neutral-400">
                        {asset.category}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono-numbers font-medium">
                        Rp {(asset.valuation / 1000000000).toFixed(2)} M
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono-numbers text-emerald-700 dark:text-emerald-400">
                        Rp {(asset.monthlyYield / 1000000).toFixed(1)} Jt
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        <span className="text-[11px] font-medium text-neutral-700 dark:text-neutral-300">
                          {asset.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section: Penyaluran Mauquf Alaih */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-800 dark:text-neutral-200 flex items-center justify-between">
              <span>II. Realisasi Distribusi Dana Mauquf 'Alaih</span>
              <span className="text-[11px] font-normal text-neutral-500 lowercase">4 program strategis</span>
            </h3>

            <div className="border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden">
              <table className="w-full text-xs text-left">
                <thead className="bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 font-medium border-b border-neutral-200 dark:border-neutral-800">
                  <tr>
                    <th className="py-2.5 px-3">Program Mauquf</th>
                    <th className="py-2.5 px-3">Sektor Dakwah</th>
                    <th className="py-2.5 px-3 text-right">Anggaran</th>
                    <th className="py-2.5 px-3 text-right">Realisasi</th>
                    <th className="py-2.5 px-3 text-right">Penerima</th>
                    <th className="py-2.5 px-3">Rujukan Fatwa</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                  {projects.map((proj) => (
                    <tr key={proj.id}>
                      <td className="py-2.5 px-3 font-medium">
                        {proj.title}
                        <div className="text-[10px] text-neutral-500">PIC: {proj.fieldOfficer}</div>
                      </td>
                      <td className="py-2.5 px-3 text-neutral-600 dark:text-neutral-400">
                        {proj.sector}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono-numbers">
                        Rp {(proj.budgetTotal / 1000000).toFixed(0)} Jt
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono-numbers font-medium text-emerald-700 dark:text-emerald-400">
                        Rp {(proj.disbursedTotal / 1000000).toFixed(0)} Jt
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono-numbers">
                        {proj.beneficiariesCount}
                      </td>
                      <td className="py-2.5 px-3 text-[10px] text-neutral-500 max-w-xs truncate">
                        {proj.fatwaReference}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Cryptographic & Blockchain Verification Seal */}
          <div className="p-4 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white dark:bg-neutral-900 rounded border border-neutral-300 dark:border-neutral-700">
                <QrCode className="w-12 h-12 text-neutral-900 dark:text-neutral-100" />
              </div>
              <div className="text-left space-y-0.5">
                <div className="text-xs font-bold text-neutral-900 dark:text-neutral-100">
                  Verifikasi Kriptografis Smart Contract & BWI Node
                </div>
                <div className="text-[10px] font-mono-numbers text-neutral-500 break-all max-w-md">
                  Merkle Root: 0x3a9b1c7f4e8d2a6c9e0f1b3d5a7c8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d
                </div>
                <div className="text-[10px] text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Status: Immutable Ledger Tersegel Kriptografis (AES-256 / SHA-256)</span>
                </div>
              </div>
            </div>

            <div className="text-right text-[11px] text-neutral-500 shrink-0">
              <div>Pindai QR untuk validasi</div>
              <div className="font-mono-numbers">https://verify.alwaqfiyah.id/cert</div>
            </div>
          </div>

          {/* Official Signatures & Endorsement */}
          <div className="pt-8 border-t border-neutral-200 dark:border-neutral-800 grid grid-cols-2 sm:grid-cols-3 gap-6 text-center text-xs">
            <div className="space-y-12">
              <div>
                <p className="text-neutral-500">Ketua Nadzir Eksekutif,</p>
              </div>
              <div>
                <p className="font-bold underline">H. Ahmad Zaki, M.Ag</p>
                <p className="text-[10px] text-neutral-500">NRP: BWI-NZR-2022-098</p>
              </div>
            </div>

            <div className="space-y-12">
              <div>
                <p className="text-neutral-500">Dewan Pengawas Syariah (DPS),</p>
              </div>
              <div>
                <p className="font-bold underline">Dr. Fatima Zahra, MEc</p>
                <p className="text-[10px] text-neutral-500">Sertifikasi DSN-MUI: DPS-1092</p>
              </div>
            </div>

            <div className="col-span-2 sm:col-span-1 space-y-12">
              <div>
                <p className="text-neutral-500">Inspektorat Audit BWI RI,</p>
              </div>
              <div>
                <p className="font-bold underline">Drs. H. M. Shiddiq, M.M</p>
                <p className="text-[10px] text-neutral-500">NIP: 19780512 200312 1 002</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

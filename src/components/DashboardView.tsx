import React, { useState } from 'react';
import { 
  Building2, 
  TrendingUp, 
  HeartHandshake, 
  ShieldCheck, 
  ExternalLink, 
  SlidersHorizontal, 
  Sparkles, 
  ArrowUpRight,
  Layers,
  MapPin,
  CheckCircle2,
  Lock,
  Compass
} from 'lucide-react';
import { WaqfAsset, DistributionProject, BlockchainBlock } from '../types';
import { InteractiveMap } from './InteractiveMap';

interface DashboardViewProps {
  assets: WaqfAsset[];
  projects: DistributionProject[];
  recentBlocks: BlockchainBlock[];
  darkMode: boolean;
  onNavigateToTab: (tab: string) => void;
  onOpenPdfReport: () => void;
  onSelectAsset?: (asset: WaqfAsset) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  assets,
  projects,
  recentBlocks,
  darkMode,
  onNavigateToTab,
  onOpenPdfReport,
  onSelectAsset
}) => {
  // Widget customization states
  const [showMapWidget, setShowMapWidget] = useState(true);
  const [showYieldWidget, setShowYieldWidget] = useState(true);
  const [showSectorDistribution, setShowSectorDistribution] = useState(true);
  const [showBlockchainTicker, setShowBlockchainTicker] = useState(true);
  const [showCustomizer, setShowCustomizer] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');

  const totalValuation = assets.reduce((sum, a) => sum + a.valuation, 0);
  const totalMonthlyYield = assets.reduce((sum, a) => sum + a.monthlyYield, 0);
  const totalDisbursed = projects.reduce((sum, p) => sum + p.disbursedTotal, 0);
  const totalBeneficiaries = projects.reduce((sum, p) => sum + p.beneficiariesCount, 0);

  const filteredAssets = selectedCategory === 'Semua' 
    ? assets 
    : assets.filter(a => a.category.includes(selectedCategory));

  return (
    <div className="space-y-8">
      {/* Top Banner & Personalization Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            Dasbor Pengelolaan Wakaf Produktif & Investasi Dakwah
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1">
            Transparansi terenkripsi ujung-ke-ujung berbasis Smart Contract & Regulasi BWI RI
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Widget Layout Personalizer Button */}
          <button
            onClick={() => setShowCustomizer(!showCustomizer)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Kustomisasi Tata Letak</span>
          </button>

          <button
            onClick={onOpenPdfReport}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg transition-colors"
          >
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>Ekspor Akuntabilitas</span>
          </button>
        </div>
      </div>

      {/* Widget Customizer Drawer Panel if toggled */}
      {showCustomizer && (
        <div className="p-4 rounded-xl bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider">
              Personalisasi Widget Dasbor
            </span>
            <span className="text-xs text-neutral-500">
              Sesuaikan metrik yang ingin dipantau
            </span>
          </div>
          <div className="flex flex-wrap gap-4 text-xs">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showMapWidget}
                onChange={(e) => setShowMapWidget(e.target.checked)}
                className="rounded text-emerald-600 focus:ring-emerald-500"
              />
              <span className="text-neutral-700 dark:text-neutral-300 font-medium">Peta Geospasial Interaktif Nusantara</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showYieldWidget}
                onChange={(e) => setShowYieldWidget(e.target.checked)}
                className="rounded text-emerald-600 focus:ring-emerald-500"
              />
              <span className="text-neutral-700 dark:text-neutral-300">Widget Kinerja Imbal Hasil (Yield)</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showSectorDistribution}
                onChange={(e) => setShowSectorDistribution(e.target.checked)}
                className="rounded text-emerald-600 focus:ring-emerald-500"
              />
              <span className="text-neutral-700 dark:text-neutral-300">Analisis Distribusi Sektor Dakwah</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showBlockchainTicker}
                onChange={(e) => setShowBlockchainTicker(e.target.checked)}
                className="rounded text-emerald-600 focus:ring-emerald-500"
              />
              <span className="text-neutral-700 dark:text-neutral-300">Ticker Validasi Blockchain Real-Time</span>
            </label>
          </div>
        </div>
      )}

      {/* Main KPI Strip - High Density & Tabular Figures */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="p-5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-neutral-500 text-xs">
            <span className="font-medium uppercase tracking-wider">Total Aset Wakaf Dikelola</span>
            <Building2 className="w-4 h-4 text-neutral-400" />
          </div>
          <div className="text-2xl font-bold font-mono-numbers text-neutral-900 dark:text-neutral-100">
            Rp {(totalValuation / 1000000000).toFixed(2)} M
          </div>
          <div className="flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-400">
            <span>4 Portofolio Produktif</span>
            <span aria-hidden="true">·</span>
            <span className="text-emerald-700 dark:text-emerald-400 font-medium">100% Pokok Terjaga</span>
          </div>
        </div>

        {/* KPI 2 (Yield) */}
        {showYieldWidget && (
          <div className="p-5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-neutral-500 text-xs">
              <span className="font-medium uppercase tracking-wider">Hasil Kelola Bersih / Bln</span>
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-bold font-mono-numbers text-emerald-700 dark:text-emerald-400">
              Rp {(totalMonthlyYield / 1000000).toFixed(1)} Jt
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-400">
              <span>Rerata Yield 12.1% p.a.</span>
              <span aria-hidden="true">·</span>
              <span className="font-medium text-emerald-700 dark:text-emerald-400">Siap Disalurkan</span>
            </div>
          </div>
        )}

        {/* KPI 3 */}
        <div className="p-5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-neutral-500 text-xs">
            <span className="font-medium uppercase tracking-wider">Distribusi Mauquf 'Alaih</span>
            <HeartHandshake className="w-4 h-4 text-neutral-400" />
          </div>
          <div className="text-2xl font-bold font-mono-numbers text-neutral-900 dark:text-neutral-100">
            Rp {(totalDisbursed / 1000000000).toFixed(2)} M
          </div>
          <div className="flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-400">
            <span>{totalBeneficiaries.toLocaleString()} Penerima</span>
            <span aria-hidden="true">·</span>
            <span>Terserap 82.4%</span>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="p-5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-neutral-500 text-xs">
            <span className="font-medium uppercase tracking-wider">Indeks Kepatuhan Syariah</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold font-mono-numbers text-neutral-900 dark:text-neutral-100">
            97.8 / 100
          </div>
          <div className="flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-400">
            <span>Fatwa DSN-MUI</span>
            <span aria-hidden="true">·</span>
            <span className="text-emerald-700 dark:text-emerald-400 font-medium">BWI Terverifikasi</span>
          </div>
        </div>
      </div>

      {/* Interactive Geolocation Map of Waqf Assets & Projects across Indonesia */}
      {showMapWidget && (
        <InteractiveMap
          assets={assets}
          projects={projects}
          darkMode={darkMode}
          onNavigateToTab={onNavigateToTab}
        />
      )}

      {/* Productive Waqf Assets Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
              Portofolio Aset Wakaf Produktif Berpenghasilan
            </h3>
            <p className="text-xs text-neutral-500">
              Aset riil bersertifikat wakaf dengan escrow kustodian syariah & catatan blockchain abadi
            </p>
          </div>

          {/* Interactive filter tabs */}
          <div className="flex items-center gap-1 p-1 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
            {['Semua', 'Kesehatan', 'Agribisnis', 'Ventura', 'Sukuk'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  selectedCategory === cat
                    ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-xs'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Assets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredAssets.map((asset) => (
            <div
              key={asset.id}
              className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-xs hover:border-emerald-500/50 transition-colors flex flex-col"
            >
              {/* Image & Header */}
              <div className="relative h-48 w-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
                <img
                  src={asset.image}
                  alt={asset.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/20 to-transparent" />
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="text-[11px] font-mono-numbers bg-neutral-900/80 backdrop-blur-xs text-white px-2 py-0.5 rounded">
                    {asset.code}
                  </span>
                  <span className="text-[11px] bg-emerald-900/80 backdrop-blur-xs text-emerald-200 px-2 py-0.5 rounded flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>{asset.status}</span>
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h4 className="text-base font-bold leading-tight">
                    {asset.name}
                  </h4>
                  <div className="flex items-center gap-1 text-xs text-neutral-300 mt-1">
                    <MapPin className="w-3 h-3" />
                    <span>{asset.location}</span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                {/* Financial strip */}
                <div className="grid grid-cols-3 gap-2 p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200/60 dark:border-neutral-800">
                  <div>
                    <div className="text-[10px] text-neutral-500 uppercase tracking-wider">Nilai Wajar</div>
                    <div className="text-xs font-bold font-mono-numbers text-neutral-900 dark:text-neutral-100 mt-0.5">
                      Rp {(asset.valuation / 1000000000).toFixed(1)} M
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-neutral-500 uppercase tracking-wider">Surplus / Bln</div>
                    <div className="text-xs font-bold font-mono-numbers text-emerald-700 dark:text-emerald-400 mt-0.5">
                      Rp {(asset.monthlyYield / 1000000).toFixed(0)} Jt
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-neutral-500 uppercase tracking-wider">Yield (p.a.)</div>
                    <div className="text-xs font-bold font-mono-numbers text-neutral-900 dark:text-neutral-100 mt-0.5">
                      {asset.yieldPercentage}%
                    </div>
                  </div>
                </div>

                {/* Mauquf target */}
                <div className="text-xs space-y-1">
                  <div className="font-semibold text-neutral-700 dark:text-neutral-300">
                    Target Alokasi Mauquf 'Alaih:
                  </div>
                  <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {asset.mauqufAlaihTarget}
                  </p>
                </div>

                {/* Blockchain Proof Footer */}
                <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 text-[11px] text-neutral-500 font-mono-numbers truncate max-w-[220px]">
                    <Lock className="w-3 h-3 text-emerald-600 shrink-0" />
                    <span>Contract: {asset.blockchainContract.slice(0, 14)}...</span>
                  </div>

                  <button
                    onClick={() => onNavigateToTab('blockchain')}
                    className="text-emerald-700 dark:text-emerald-400 hover:underline font-medium flex items-center gap-1"
                  >
                    <span>Cek Ledger</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Real-Time Distribution & Sector Analytics Split */}
      {showSectorDistribution && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sector Breakdown */}
          <div className="p-6 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-4">
            <div>
              <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                Alokasi Sektor Mauquf 'Alaih
              </h3>
              <p className="text-xs text-neutral-500">
                Distribusi surplus hasil investasi wakaf produktif
              </p>
            </div>

            <div className="space-y-3">
              {[
                { sector: 'Dakwah & Da\'i Pedalaman', percent: 28, amount: 'Rp 980 Jt', color: 'bg-emerald-600' },
                { sector: 'Kesehatan Dhuafa & Klinik Apung', percent: 33, amount: 'Rp 1.12 M', color: 'bg-blue-600' },
                { sector: 'Pendidikan & Beasiswa Kader Ulama', percent: 25, amount: 'Rp 850 Jt', color: 'bg-amber-600' },
                { sector: 'Pemberdayaan UMKM Syariah', percent: 14, amount: 'Rp 480 Jt', color: 'bg-teal-600' },
              ].map((item) => (
                <div key={item.sector} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-neutral-800 dark:text-neutral-200 truncate pr-2">
                      {item.sector}
                    </span>
                    <span className="font-mono-numbers text-neutral-500 shrink-0">
                      {item.percent}% ({item.amount})
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                    <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.percent}%` }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 text-[11px] text-neutral-500">
              Semua alokasi diverifikasi sesuai rujukan klausul Ikrar Wakaf (Waqf Deed) dan Fatwa DSN-MUI.
            </div>
          </div>

          {/* Active Field Programs & Real-Time Evidence */}
          <div className="lg:col-span-2 p-6 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                  Program Penyaluran Lapangan Terkini
                </h3>
                <p className="text-xs text-neutral-500">
                  Progres penyaluran real-time oleh petugas lapangan ber-GPS
                </p>
              </div>
              <button
                onClick={() => onNavigateToTab('distribution')}
                className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold hover:underline"
              >
                Lihat Semua ({projects.length})
              </button>
            </div>

            <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
              {projects.slice(0, 3).map((proj) => (
                <div key={proj.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-semibold text-neutral-900 dark:text-neutral-100 truncate">
                        {proj.title}
                      </h4>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                        {proj.sector}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-[11px] text-neutral-500 font-mono-numbers">
                      <span>PIC: {proj.fieldOfficer}</span>
                      <span>·</span>
                      <span>{proj.location}</span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-xs font-bold font-mono-numbers text-neutral-900 dark:text-neutral-100">
                      Rp {(proj.disbursedTotal / 1000000).toFixed(0)} Jt
                    </div>
                    <div className="text-[10px] text-emerald-600">
                      {proj.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Real-time Blockchain Consensus Ticker */}
      {showBlockchainTicker && (
        <div className="p-4 rounded-xl bg-neutral-900 text-white space-y-3">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-semibold uppercase tracking-wider text-neutral-300">
                Konsensus Jaringan Blockchain Syariah BWI (Real-Time Node Explorer)
              </span>
            </div>
            <button
              onClick={() => onNavigateToTab('blockchain')}
              className="text-xs text-emerald-400 hover:underline font-mono-numbers flex items-center gap-1"
            >
              <span>Node Aktif: 4 Validator</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {recentBlocks.map((block) => (
              <div
                key={block.blockNumber}
                className="p-3 rounded-lg bg-neutral-800/80 border border-neutral-700/80 space-y-1 font-mono-numbers text-xs"
              >
                <div className="flex justify-between items-center text-neutral-400 text-[11px]">
                  <span>Block #{block.blockNumber}</span>
                  <span className="text-emerald-400">{block.transactionsCount} Tx</span>
                </div>
                <div className="text-[11px] text-neutral-300 truncate">
                  Hash: {block.hash.slice(0, 20)}...
                </div>
                <div className="text-[10px] text-neutral-400 truncate">
                  {block.payloadSummary}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

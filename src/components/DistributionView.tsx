import React, { useState } from 'react';
import { 
  HeartHandshake, 
  Plus, 
  MapPin, 
  CheckCircle2, 
  ShieldCheck, 
  FileText, 
  Camera, 
  Search,
  Filter,
  Sparkles,
  DollarSign
} from 'lucide-react';
import { DistributionProject } from '../types';

interface DistributionViewProps {
  projects: DistributionProject[];
  onAddDisbursement: (newProject: Omit<DistributionProject, 'id'>) => void;
  onNavigateToTab: (tab: string) => void;
}

export const DistributionView: React.FC<DistributionViewProps> = ({
  projects,
  onAddDisbursement,
  onNavigateToTab
}) => {
  const [selectedSector, setSelectedSector] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New disbursement form state
  const [formTitle, setFormTitle] = useState('');
  const [formSector, setFormSector] = useState<DistributionProject['sector']>('Dakwah & Da\'i Pedalaman');
  const [formBudget, setFormBudget] = useState('');
  const [formDisbursed, setFormDisbursed] = useState('');
  const [formBeneficiaries, setFormBeneficiaries] = useState('');
  const [formLocation, setFormLocation] = useState('');
  const [formFieldOfficer, setFormFieldOfficer] = useState('Ustadz Salman Farisi, S.Sos');
  const [formFatwa, setFormFatwa] = useState('Fatwa DSN-MUI No. 106/DSN-MUI/X/2016 tentang Wakaf Manfaat');

  const filteredProjects = projects.filter((p) => {
    const matchesSector = selectedSector === 'Semua' || p.sector.includes(selectedSector);
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.fieldOfficer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSector && matchesSearch;
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formBudget || !formLocation.trim()) return;

    onAddDisbursement({
      title: formTitle.trim(),
      sector: formSector,
      budgetTotal: Number(formBudget),
      disbursedTotal: Number(formDisbursed || formBudget),
      beneficiariesCount: Number(formBeneficiaries || 100),
      location: formLocation.trim(),
      fatwaReference: formFatwa.trim(),
      status: 'Berjalan',
      fieldOfficer: formFieldOfficer.trim(),
      lastProgressUpdate: 'Hari ini (Disetujui Dewan Pengawas Syariah & Tercatat)',
      photos: ['/src/assets/images/wakaf_asset_hospital_1791795776935.jpg'],
      gpsCoordinates: '-6.2088° S, 106.8456° E (Jakarta Pusat)'
    });

    setIsModalOpen(false);
    setFormTitle('');
    setFormBudget('');
    setFormDisbursed('');
    setFormLocation('');
  };

  return (
    <div className="space-y-8">
      {/* Title & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            Penyaluran Surplus Wakaf & Dana Mauquf 'Alaih
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1">
            Pelaporan real-time progres program di lapangan dengan verifikasi GPS, tanda terima, dan bukti foto
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg transition-colors shadow-xs shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Ajukan Penyaluran Baru</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari program, lokasi, atau nama petugas..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Sector Tabs */}
        <div className="flex items-center gap-1 p-1 bg-neutral-100 dark:bg-neutral-800 rounded-lg overflow-x-auto scrollbar-none">
          {['Semua', 'Dakwah', 'Pendidikan', 'Kesehatan', 'UMKM'].map((sec) => (
            <button
              key={sec}
              onClick={() => setSelectedSector(sec)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                selectedSector === sec
                  ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
              }`}
            >
              {sec}
            </button>
          ))}
        </div>
      </div>

      {/* Projects List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((project) => {
          const percentDisbursed = Math.min(
            100,
            Math.round((project.disbursedTotal / project.budgetTotal) * 100)
          );

          return (
            <div
              key={project.id}
              className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-xs flex flex-col justify-between overflow-hidden hover:border-emerald-500/40 transition-colors"
            >
              <div className="p-5 space-y-4">
                {/* Header & Sector */}
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-700 dark:text-emerald-400">
                      {project.sector}
                    </span>
                    <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100 leading-snug">
                      {project.title}
                    </h3>
                  </div>
                  <span className="text-xs font-medium px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 shrink-0">
                    {project.status}
                  </span>
                </div>

                {/* Location & PIC */}
                <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-neutral-500 font-mono-numbers">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                    <span>{project.location}</span>
                  </div>
                  <span>·</span>
                  <div>Petugas: {project.fieldOfficer}</div>
                </div>

                {/* Budget & Progress Bar */}
                <div className="space-y-1.5 p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200/60 dark:border-neutral-800">
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-500">Realisasi Penyaluran:</span>
                    <span className="font-bold font-mono-numbers text-neutral-900 dark:text-neutral-100">
                      Rp {(project.disbursedTotal / 1000000).toFixed(0)} Jt / Rp {(project.budgetTotal / 1000000).toFixed(0)} Jt ({percentDisbursed}%)
                    </span>
                  </div>
                  <div className="h-2 w-full bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-600 rounded-full transition-all duration-500"
                      style={{ width: `${percentDisbursed}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[11px] text-neutral-500 font-mono-numbers pt-0.5">
                    <span>Penerima: {project.beneficiariesCount.toLocaleString()} Jiwa</span>
                    <span>GPS: {project.gpsCoordinates}</span>
                  </div>
                </div>

                {/* Sharia Fatwa Citation */}
                <div className="text-xs text-neutral-600 dark:text-neutral-400 bg-neutral-100/50 dark:bg-neutral-800/30 p-2.5 rounded-lg border border-neutral-200/50 dark:border-neutral-800">
                  <span className="font-semibold text-neutral-700 dark:text-neutral-300">Dasar Akad & Fatwa: </span>
                  {project.fatwaReference}
                </div>

                {/* Progress Update String */}
                <div className="text-xs text-neutral-500">
                  <span className="font-medium text-neutral-700 dark:text-neutral-300">Pembaruan Lapangan: </span>
                  {project.lastProgressUpdate}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="px-5 py-3 border-t border-neutral-100 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950/30 flex items-center justify-between text-xs">
                <span className="text-neutral-500 text-[11px]">
                  Terverifikasi Dewan Pengawas Syariah
                </span>
                <button
                  onClick={() => onNavigateToTab('tasks')}
                  className="text-emerald-700 dark:text-emerald-400 hover:underline font-semibold"
                >
                  Buka Tugas Lapangan →
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal: New Disbursement Proposal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/60 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3">
              <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                Pengajuan Penyaluran Dana Mauquf 'Alaih
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Nama Program / Kegiatan Dakwah
                </label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="Contoh: Bantuan Kafalah Da'i Perintis Pedalaman Maluku"
                  className="w-full p-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Sektor
                  </label>
                  <select
                    value={formSector}
                    onChange={(e) => setFormSector(e.target.value as any)}
                    className="w-full p-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none"
                  >
                    <option value="Dakwah & Da'i Pedalaman">Dakwah & Da'i Pedalaman</option>
                    <option value="Pendidikan & Beasiswa">Pendidikan & Beasiswa</option>
                    <option value="Kesehatan Dhuafa">Kesehatan Dhuafa</option>
                    <option value="Pemberdayaan UMKM Syariah">Pemberdayaan UMKM Syariah</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Lokasi Sasaran
                  </label>
                  <input
                    type="text"
                    required
                    value={formLocation}
                    onChange={(e) => setFormLocation(e.target.value)}
                    placeholder="Contoh: Halmahera Selatan"
                    className="w-full p-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Total Anggaran (IDR)
                  </label>
                  <input
                    type="number"
                    required
                    value={formBudget}
                    onChange={(e) => setFormBudget(e.target.value)}
                    placeholder="250000000"
                    className="w-full p-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 font-mono-numbers focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Jumlah Penerima Manfaat
                  </label>
                  <input
                    type="number"
                    value={formBeneficiaries}
                    onChange={(e) => setFormBeneficiaries(e.target.value)}
                    placeholder="120"
                    className="w-full p-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 font-mono-numbers focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Petugas Lapangan (PIC)
                </label>
                <input
                  type="text"
                  value={formFieldOfficer}
                  onChange={(e) => setFormFieldOfficer(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none"
                />
              </div>

              <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 text-[11px] space-y-1">
                <div className="font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Validasi Otomatis Fiqh Muamalah</span>
                </div>
                <p>
                  Pengajuan akan otomatis dikonsultasikan dengan aturan ikrar wakaf dan setelah disetujui DPS, hash pencairan akan dicatat ke Blockchain BWI.
                </p>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-lg"
                >
                  Simpan & Kirim ke DPS
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

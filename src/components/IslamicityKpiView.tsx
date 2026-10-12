import React, { useState } from 'react';
import { 
  Heart, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  Users, 
  Award, 
  BookOpen, 
  Sparkles, 
  Send, 
  Volume2, 
  VolumeX, 
  Flame, 
  TrendingUp,
  MessageSquare
} from 'lucide-react';
import { TeamMemberKPI, MutabaahEntry, HalaqahPost } from '../types';
import { PRAYER_SCHEDULE } from '../data/mockData';

interface IslamicityKpiViewProps {
  teamKpis: TeamMemberKPI[];
  mutabaahEntries: MutabaahEntry[];
  halaqahPosts: HalaqahPost[];
  onAddHalaqahPost: (message: string, summary: string) => void;
  onLikeHalaqahPost: (postId: string) => void;
  onTriggerNotification: (title: string, message: string, category: any) => void;
}

export const IslamicityKpiView: React.FC<IslamicityKpiViewProps> = ({
  teamKpis,
  mutabaahEntries,
  halaqahPosts,
  onAddHalaqahPost,
  onLikeHalaqahPost,
  onTriggerNotification
}) => {
  // Today's mutabaah state
  const [todayIbadah, setTodayIbadah] = useState<MutabaahEntry>(
    mutabaahEntries[0] || {
      date: '12 Okt 2026',
      sholatJamaah: true,
      sholatDhuha: true,
      qiyamulLail: true,
      tilawahPages: 10,
      sedekahSubuh: true,
      dzikirPagiPetang: true,
      rawatib: true
    }
  );

  const [tilawahCount, setTilawahCount] = useState(todayIbadah.tilawahPages);
  const [selectedTab, setSelectedTab] = useState<'kpi' | 'mutabaah' | 'halaqah'>('kpi');
  const [postText, setPostText] = useState('');
  const [isAdhanSoundOn, setIsAdhanSoundOn] = useState(true);

  const toggleIbadah = (key: keyof Omit<MutabaahEntry, 'date' | 'tilawahPages'>) => {
    const updated = { ...todayIbadah, [key]: !todayIbadah[key] };
    setTodayIbadah(updated);
    onTriggerNotification(
      'Capaian Mutaba\'ah Disimpan',
      `Komitmen ibadah harian telah diperbarui pada hisab spiritual tim.`,
      'ibadah'
    );
  };

  const handlePostHalaqah = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postText.trim()) return;

    const summary = `Subuh ✓ · Dhuha ${todayIbadah.sholatDhuha ? '✓' : '—'} · Tilawah ${tilawahCount} Hal · Sedekah Subuh ${todayIbadah.sedekahSubuh ? '✓' : '—'}`;
    onAddHalaqahPost(postText.trim(), summary);
    setPostText('');
    onTriggerNotification(
      'Progres Ibadah Dibagikan ke Komunitas',
      'Pesan motivasi dan ringkasan mutaba\'ah Anda telah tampil di lingkaran halaqah.',
      'ibadah'
    );
  };

  return (
    <div className="space-y-8">
      {/* Title & Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            Islamicity Performance Index (KPI) & Mutaba'ah Spiritual
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1">
            Pengukuran produktivitas berbasis 4 pilar kenabian (Siddiq, Amanah, Tabligh, Fathanah) dan hisab amal yaumiyah
          </p>
        </div>

        {/* Tab switch within module */}
        <div className="flex items-center gap-1 p-1 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
          <button
            onClick={() => setSelectedTab('kpi')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              selectedTab === 'kpi'
                ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
            }`}
          >
            Indeks KPI Tim
          </button>
          <button
            onClick={() => setSelectedTab('mutabaah')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              selectedTab === 'mutabaah'
                ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
            }`}
          >
            Mutaba'ah Yaumiyah
          </button>
          <button
            onClick={() => setSelectedTab('halaqah')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              selectedTab === 'halaqah'
                ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
            }`}
          >
            Lingkaran Halaqah
          </button>
        </div>
      </div>

      {/* Prayer Schedule Banner (Jadwal Sholat Harian) */}
      <div className="p-5 rounded-xl bg-gradient-to-r from-emerald-900 to-emerald-950 text-white shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-300" />
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-200">
              Jadwal Sholat & Pengingat Ibadah ({PRAYER_SCHEDULE.city})
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-emerald-200">Waktu Berikutnya: <strong>Ashar (14:56 WIB)</strong></span>
            <button
              onClick={() => setIsAdhanSoundOn(!isAdhanSoundOn)}
              className="p-1 rounded bg-emerald-800/80 hover:bg-emerald-700 text-emerald-200 transition-colors ml-2"
              title={isAdhanSoundOn ? 'Notifikasi Adhan Nyala' : 'Notifikasi Senyap'}
            >
              {isAdhanSoundOn ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Schedule Grid */}
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 pt-1 text-center font-mono-numbers">
          {[
            { name: 'Imsak', time: PRAYER_SCHEDULE.imsak },
            { name: 'Subuh', time: PRAYER_SCHEDULE.subuh },
            { name: 'Terbit', time: PRAYER_SCHEDULE.terbit },
            { name: 'Dhuha', time: PRAYER_SCHEDULE.dhuha },
            { name: 'Dzuhur', time: PRAYER_SCHEDULE.dzuhur },
            { name: 'Ashar', time: PRAYER_SCHEDULE.ashar, active: true },
            { name: 'Maghrib', time: PRAYER_SCHEDULE.maghrib },
            { name: 'Isya', time: PRAYER_SCHEDULE.isya },
          ].map((item) => (
            <div
              key={item.name}
              className={`p-2 rounded-lg border ${
                item.active 
                  ? 'bg-white text-emerald-950 border-white font-bold' 
                  : 'bg-emerald-800/40 border-emerald-700/50 text-emerald-100'
              }`}
            >
              <div className="text-[10px] uppercase">{item.name}</div>
              <div className="text-xs mt-0.5">{item.time}</div>
            </div>
          ))}
        </div>
      </div>

      {/* TAB 1: Islamicity KPI Overview */}
      {selectedTab === 'kpi' && (
        <div className="space-y-6">
          {/* Spiritual Dimension Definition Banner */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-1">
              <div className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                1. Amanah (Trustworthy)
              </div>
              <div className="text-2xl font-bold font-mono-numbers text-neutral-900 dark:text-neutral-100">
                97.5%
              </div>
              <p className="text-[11px] text-neutral-500">
                Integritas penjagaan pokok harta wakaf & nihil deviasi akad.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-1">
              <div className="text-xs font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider">
                2. Siddiq (Truthful)
              </div>
              <div className="text-2xl font-bold font-mono-numbers text-neutral-900 dark:text-neutral-100">
                97.5%
              </div>
              <p className="text-[11px] text-neutral-500">
                Ketepatan data pembukuan & sinkronisasi bukti fisik lapangan.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-1">
              <div className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
                3. Tabligh (Advocacy)
              </div>
              <div className="text-2xl font-bold font-mono-numbers text-neutral-900 dark:text-neutral-100">
                96.0%
              </div>
              <p className="text-[11px] text-neutral-500">
                Transparansi pelaporan donatur & komunikasi publik yang santun.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-1">
              <div className="text-xs font-bold text-purple-700 dark:text-purple-400 uppercase tracking-wider">
                4. Fathanah (Visionary)
              </div>
              <div className="text-2xl font-bold font-mono-numbers text-neutral-900 dark:text-neutral-100">
                96.3%
              </div>
              <p className="text-[11px] text-neutral-500">
                Inovasi produktivitas wakaf dan efisiensi operasional digital.
              </p>
            </div>
          </div>

          {/* Team Member Cards */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
              Evaluasi Indeks Islamicity Anggota Tim Nadzir & Lapangan
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {teamKpis.map((member) => (
                <div
                  key={member.id}
                  className="p-5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-4 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-full object-cover border border-neutral-200 dark:border-neutral-700"
                    />
                    <div className="min-w-0 flex-1">
                      <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 truncate">
                        {member.name}
                      </h4>
                      <p className="text-xs text-neutral-500 truncate">
                        {member.role} · {member.fieldLocation}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-base font-bold font-mono-numbers text-emerald-700 dark:text-emerald-400">
                        {member.overallIslamicityScore}
                      </div>
                      <div className="text-[10px] text-neutral-500">Indeks Komposit</div>
                    </div>
                  </div>

                  {/* 4 Pillars progress bars */}
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-neutral-600 dark:text-neutral-400">Amanah</span>
                      <span className="font-mono-numbers text-neutral-900 dark:text-neutral-100 font-semibold">{member.amanahScore}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${member.amanahScore}%` }} />
                    </div>

                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-neutral-600 dark:text-neutral-400">Siddiq</span>
                      <span className="font-mono-numbers text-neutral-900 dark:text-neutral-100 font-semibold">{member.siddiqScore}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 rounded-full" style={{ width: `${member.siddiqScore}%` }} />
                    </div>

                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-neutral-600 dark:text-neutral-400">Tabligh & Fathanah</span>
                      <span className="font-mono-numbers text-neutral-900 dark:text-neutral-100 font-semibold">
                        {Math.round((member.tablighScore + member.fathanahScore) / 2)}%
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-600 rounded-full"
                        style={{ width: `${Math.round((member.tablighScore + member.fathanahScore) / 2)}%` }}
                      />
                    </div>
                  </div>

                  {/* Task counts */}
                  <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 flex justify-between text-[11px] text-neutral-500 font-mono-numbers">
                    <span>Tugas Aktif: {member.activeTasks}</span>
                    <span className="text-emerald-700 dark:text-emerald-400">Tuntas: {member.completedTasks} Program</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Mutaba'ah Yaumiyah & Monthly Statistics */}
      {selectedTab === 'mutabaah' && (
        <div className="space-y-6">
          {/* Daily Checklist Panel */}
          <div className="p-6 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-neutral-200 dark:border-neutral-800">
              <div>
                <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                  Hisab Ibadah Yaumiyah Hari Ini ({todayIbadah.date})
                </h3>
                <p className="text-xs text-neutral-500">
                  Konsistensi spiritual menjaga kebersihan niat dan keberkahan amanah umat
                </p>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                <Flame className="w-4 h-4 text-amber-500" />
                <span>Streak Berkelanjutan: 14 Hari Konsisten</span>
              </div>
            </div>

            {/* Checklist Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { key: 'sholatJamaah', label: 'Sholat 5 Waktu Berjamaah', desc: 'Di masjid / tepat pada awal waktu' },
                { key: 'sholatDhuha', label: 'Sholat Sunnah Dhuha', desc: 'Minimal 2 atau 4 rakaat pagi' },
                { key: 'qiyamulLail', label: 'Qiyamul Lail (Tahajjud & Witir)', desc: 'Menghidupkan sepertiga malam' },
                { key: 'sedekahSubuh', label: 'Sedekah Subuh', desc: 'Infaq harian pelindung bala & rezeki' },
                { key: 'dzikirPagiPetang', label: 'Al-Ma\'tsurat (Dzikir Pagi Petang)', desc: 'Benteng spiritual harian' },
                { key: 'rawatib', label: 'Sholat Sunnah Rawatib Lengkap', desc: 'Qabliyah & Ba\'diyah muakkad' },
              ].map((item) => {
                const isChecked = (todayIbadah as any)[item.key];
                return (
                  <div
                    key={item.key}
                    onClick={() => toggleIbadah(item.key as any)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                      isChecked
                        ? 'bg-emerald-50/60 dark:bg-emerald-950/30 border-emerald-500 text-neutral-900 dark:text-neutral-100'
                        : 'bg-neutral-50 dark:bg-neutral-800/40 border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100'
                    }`}
                  >
                    <div className="mt-0.5">
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                        isChecked 
                          ? 'bg-emerald-700 border-emerald-700 text-white' 
                          : 'border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800'
                      }`}>
                        {isChecked && <CheckCircle2 className="w-4 h-4" />}
                      </div>
                    </div>
                    <div className="space-y-0.5">
                      <div className="text-xs font-bold leading-tight">{item.label}</div>
                      <div className="text-[11px] text-neutral-500">{item.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Tilawah Counter */}
            <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="text-xs font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-emerald-600" />
                  <span>Tilawah Al-Qur'an (One Day One Juz Target)</span>
                </div>
                <div className="text-[11px] text-neutral-500">
                  Target harian: minimal 10 - 20 lembar mushaf
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setTilawahCount(Math.max(0, tilawahCount - 2))}
                  className="w-8 h-8 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 flex items-center justify-center text-xs font-bold hover:bg-neutral-100"
                >
                  -
                </button>
                <span className="font-mono-numbers text-base font-bold text-neutral-900 dark:text-neutral-100 min-w-16 text-center">
                  {tilawahCount} Halaman
                </span>
                <button
                  onClick={() => setTilawahCount(tilawahCount + 2)}
                  className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center text-xs font-bold hover:bg-emerald-800"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Monthly Statistics Chart (History 7 - 30 Hari) */}
          <div className="p-6 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                  Dasbor Statistik Capaian Ibadah Bulanan (Oktober 2026)
                </h3>
                <p className="text-xs text-neutral-500">
                  Rerata pemenuhan mutaba'ah tim berada pada 94.2% (Kategori: Mumtaz)
                </p>
              </div>
              <div className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold font-mono-numbers">
                +6.4% dibanding bulan lalu
              </div>
            </div>

            {/* Weekly Days Bar representation */}
            <div className="space-y-3">
              {mutabaahEntries.map((day) => {
                const checks = [
                  day.sholatJamaah,
                  day.sholatDhuha,
                  day.qiyamulLail,
                  day.sedekahSubuh,
                  day.dzikirPagiPetang,
                  day.rawatib
                ].filter(Boolean).length;
                const scorePercent = Math.round((checks / 6) * 100);

                return (
                  <div key={day.date} className="flex items-center gap-3 text-xs">
                    <span className="w-24 text-neutral-500 font-mono-numbers shrink-0">
                      {day.date}
                    </span>
                    <div className="flex-1 h-3 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-600 rounded-full transition-all"
                        style={{ width: `${scorePercent}%` }}
                      />
                    </div>
                    <span className="w-16 text-right font-mono-numbers text-neutral-700 dark:text-neutral-300 font-semibold shrink-0">
                      {scorePercent}%
                    </span>
                    <span className="text-[11px] text-neutral-400 font-mono-numbers hidden sm:inline shrink-0">
                      ({day.tilawahPages} Hal Quran)
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Halaqah Peer Sharing */}
      {selectedTab === 'halaqah' && (
        <div className="space-y-6">
          {/* Post form */}
          <div className="p-5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
              Bagikan Catatan & Semangat Ibadah ke Lingkaran Komunitas Dakwah
            </h3>
            <form onSubmit={handlePostHalaqah} className="space-y-3">
              <textarea
                rows={3}
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                placeholder="Tuliskan muhasabah, doa, atau kabar gembira dakwah hari ini..."
                className="w-full text-xs p-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-emerald-500"
              />
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <span className="text-neutral-500">
                  Ringkasan ibadah hari ini akan otomatis dilampirkan secara transparan.
                </span>
                <button
                  type="submit"
                  disabled={!postText.trim()}
                  className="flex items-center justify-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-lg transition-colors disabled:opacity-40"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Kirim ke Halaqah</span>
                </button>
              </div>
            </form>
          </div>

          {/* Halaqah Posts Feed */}
          <div className="space-y-4">
            {halaqahPosts.map((post) => (
              <div
                key={post.id}
                className="p-5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={post.avatar}
                      alt={post.author}
                      referrerPolicy="no-referrer"
                      className="w-9 h-9 rounded-full object-cover border border-neutral-200 dark:border-neutral-700"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-neutral-900 dark:text-neutral-100">
                        {post.author}
                      </h4>
                      <p className="text-[11px] text-neutral-500">
                        {post.role} · {post.timestamp}
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  {post.message}
                </p>

                {/* Mutabaah summary attached */}
                <div className="p-2.5 rounded-lg bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/50 dark:border-neutral-800 text-[11px] text-emerald-800 dark:text-emerald-300 font-mono-numbers">
                  {post.mutabaahSummary}
                </div>

                {/* Footer buttons */}
                <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs">
                  <button
                    onClick={() => onLikeHalaqahPost(post.id)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors ${
                      post.hasLiked 
                        ? 'text-rose-600 bg-rose-50 dark:bg-rose-950/40 font-semibold' 
                        : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${post.hasLiked ? 'fill-current' : ''}`} />
                    <span>{post.hasLiked ? 'Aamiin (Didoakan)' : 'Kirim Doa'} ({post.likes})</span>
                  </button>

                  <div className="flex items-center gap-1 text-neutral-500 text-[11px]">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{post.commentsCount} Tanggapan Hikmah</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

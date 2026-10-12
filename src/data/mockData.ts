import { 
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
} from '../types';

export const INITIAL_WAQF_ASSETS: WaqfAsset[] = [
  {
    id: 'waqf-01',
    code: 'WQF-ID-2024-HOSP',
    name: 'RS Wakaf Syariah & Pusat Medis Dhuafa Terpadu',
    category: 'Kesehatan & Rumah Sakit',
    valuation: 34500000000, // Rp 34.5 M
    monthlyYield: 342000000, // Rp 342 Jt / bln
    yieldPercentage: 11.9,
    mauqufAlaihTarget: 'Subsidi Pelayanan Kesehatan 1,200 Pasien Kurang Mampu/Bulan',
    custodyVault: 'Bank Syariah Mandiri Custody Vault #0921',
    blockchainContract: '0x8f4d92a18fecbc6b718919b4e548ac4d3e49e210',
    merkleProof: '0x3a9b1c7f4e8d2a6c9e0f1b3d5a7c8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d',
    status: 'Aktif Menghasilkan',
    image: '/src/assets/images/wakaf_asset_hospital_1791795776935.jpg',
    location: 'Cianjur & Sukabumi, Jawa Barat',
    lat: -6.8222,
    lng: 107.1394,
    lastAudited: '10 Oktober 2026'
  },
  {
    id: 'waqf-02',
    code: 'WQF-ID-2023-AGRO',
    name: 'Kawasan Agribisnis Padi Organik & Greenhouse Hidroponik',
    category: 'Agribisnis & Pangan',
    valuation: 18200000000, // Rp 18.2 M
    monthlyYield: 215000000,
    yieldPercentage: 14.2,
    mauqufAlaihTarget: 'Pemberdayaan 185 Petani Lokal & Pasokan Pangan 12 Pesantren',
    custodyVault: 'Kustodian Amanah Wakaf Tani #3312',
    blockchainContract: '0x4e7b1a9c3d2e5f8a0b1c2d3e4f5a6b7c8d9e0f1a',
    merkleProof: '0x7c8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e',
    status: 'Aktif Menghasilkan',
    image: '/src/assets/images/wakaf_asset_hospital_1791795776935.jpg',
    location: 'Subang & Karawang, Jawa Barat',
    lat: -6.5599,
    lng: 107.7599,
    lastAudited: '08 Oktober 2026'
  },
  {
    id: 'waqf-03',
    code: 'WQF-ID-2025-VENT',
    name: 'Portofolio Ventura Halal & Sentra UMKM Halal Hub',
    category: 'Ventura Syariah',
    valuation: 12800000000,
    monthlyYield: 168000000,
    yieldPercentage: 15.75,
    mauqufAlaihTarget: 'Modal Usaha Qardhul Hasan & Pelatihan 320 Pengusaha Mikro Muslim',
    custodyVault: 'Syariah Venture Trust Account #7712',
    blockchainContract: '0x1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c',
    merkleProof: '0x9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b',
    status: 'Aktif Menghasilkan',
    image: '/src/assets/images/wakaf_asset_hospital_1791795776935.jpg',
    location: 'Jakarta Selatan & Tangerang Selatan',
    lat: -6.2615,
    lng: 106.8106,
    lastAudited: '02 Oktober 2026'
  },
  {
    id: 'waqf-04',
    code: 'WQF-ID-2025-CWLS',
    name: 'Cash Waqf Linked Sukuk Seri CWLS-008 Negara RI',
    category: 'Cash Waqf Sukuk',
    valuation: 22000000000,
    monthlyYield: 119166667,
    yieldPercentage: 6.5,
    mauqufAlaihTarget: 'Beasiswa Penuh 240 Mahasiswa Kader Ulama & Dai Perintis',
    custodyVault: 'Kemenkeu DJPPR & BI Custody Registry',
    blockchainContract: '0x99a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0',
    merkleProof: '0x5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c',
    status: 'Aktif Menghasilkan',
    image: '/src/assets/images/wakaf_asset_hospital_1791795776935.jpg',
    location: 'Nasional Republik Indonesia (DKI Jakarta)',
    lat: -6.1754,
    lng: 106.8272,
    lastAudited: '11 Oktober 2026'
  }
];

export const INITIAL_PROJECTS: DistributionProject[] = [
  {
    id: 'dist-01',
    title: 'Kafalah & Insentif Operasional 150 Da\'i Pedalaman Mentawai & NTT',
    sector: 'Dakwah & Da\'i Pedalaman',
    budgetTotal: 1250000000,
    disbursedTotal: 980000000,
    beneficiariesCount: 150,
    location: 'Kepulauan Mentawai & Alor, NTT',
    lat: -1.4880,
    lng: 98.9211,
    fatwaReference: 'Fatwa DSN-MUI No. 106/DSN-MUI/X/2016 tentang Wakaf Manfaat',
    status: 'Berjalan',
    fieldOfficer: 'Ustadz Salman Farisi, S.Sos',
    lastProgressUpdate: '11 Oktober 2026 (Penyaluran Bulan Berjalan Tahap IV Sukses)',
    photos: [
      '/src/assets/images/wakaf_asset_hospital_1791795776935.jpg'
    ],
    gpsCoordinates: '-1.4880° S, 98.9211° E'
  },
  {
    id: 'dist-02',
    title: 'Program Beasiswa Kader Ulama & Tahfizh Quran Multi-Level',
    sector: 'Pendidikan & Beasiswa',
    budgetTotal: 850000000,
    disbursedTotal: 850000000,
    beneficiariesCount: 240,
    location: 'Lombok Timur, NTB & Kudus, Jawa Tengah',
    lat: -8.6500,
    lng: 116.5312,
    fatwaReference: 'Keputusan BWI No. 04/BWI/2018 tentang Penyaluran Mauquf alaih Pendidikan',
    status: 'Selesai',
    fieldOfficer: 'H. Luqman Hakim, M.Pd',
    lastProgressUpdate: '09 Oktober 2026 (Lulus Uji Komprehensif Semester Genap)',
    photos: [
      '/src/assets/images/wakaf_asset_hospital_1791795776935.jpg'
    ],
    gpsCoordinates: '-8.6500° S, 116.5312° E'
  },
  {
    id: 'dist-03',
    title: 'Ambulans Apung & Klinik Wakaf Kesehatan Wilayah Pesisir',
    sector: 'Kesehatan Dhuafa',
    budgetTotal: 1450000000,
    disbursedTotal: 1120000000,
    beneficiariesCount: 3420,
    location: 'Kepulauan Selayar & Wakatobi',
    lat: -6.1200,
    lng: 120.4811,
    fatwaReference: 'Fatwa MUI No. 4 Tahun 2012 tentang Pengelolaan Harta Wakaf Kesehatan',
    status: 'Berjalan',
    fieldOfficer: 'dr. Farhan Syahputra, Sp.A',
    lastProgressUpdate: '12 Oktober 2026 (Pengobatan Gratis 145 Warga Pesisir)',
    photos: [
      '/src/assets/images/wakaf_asset_hospital_1791795776935.jpg'
    ],
    gpsCoordinates: '-6.1200° S, 120.4811° E'
  },
  {
    id: 'dist-04',
    title: 'Inkubasi 80 Usaha Halal Mandiri Berbasis Masjid (Wakaf Mikro)',
    sector: 'Pemberdayaan UMKM Syariah',
    budgetTotal: 720000000,
    disbursedTotal: 480000000,
    beneficiariesCount: 80,
    location: 'Solo Raya & Daerah Istimewa Yogyakarta',
    lat: -7.5681,
    lng: 110.8250,
    fatwaReference: 'Fatwa DSN-MUI No. 19/DSN-MUI/IV/2001 tentang Qardhul Hasan',
    status: 'Berjalan',
    fieldOfficer: 'Siti Rahmawati, S.E.I',
    lastProgressUpdate: '07 Oktober 2026 (Graduasi Angkatan II Batch Omzet Naik 35%)',
    photos: [
      '/src/assets/images/wakaf_asset_hospital_1791795776935.jpg'
    ],
    gpsCoordinates: '-7.5681° S, 110.8250° E'
  }
];

export const INITIAL_BLOCKS: BlockchainBlock[] = [
  {
    blockNumber: 421890,
    timestamp: '12 Okt 2026 09:14:22 WIB',
    hash: '0x9f8b4e7a2c1d3f5e6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f',
    previousHash: '0x8e7a3d6b1c0d2e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8a',
    transactionsCount: 14,
    validatorNode: 'Node-Jakarta-BWI-Validator-01',
    shariaSeal: 'BWI-SHA256-CERTIFIED',
    status: 'Terkonfirmasi',
    payloadSummary: 'Disbursement ID: dist-03 (Ambulans Apung Pesisir Rp 140 Jt) & Hasil Kelola RS Wakaf'
  },
  {
    blockNumber: 421889,
    timestamp: '12 Okt 2026 08:30:11 WIB',
    hash: '0x8e7a3d6b1c0d2e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8a',
    previousHash: '0x7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a9f8e7d6c',
    transactionsCount: 22,
    validatorNode: 'Node-Surabaya-ShariaConsortium-02',
    shariaSeal: 'DSN-MUI-MERKLE-CONFIRMED',
    status: 'Terkonfirmasi',
    payloadSummary: 'Penerimaan Hasil Agribisnis Karawang Rp 215 Jt ke Rekening Kustodian Mauquf Alaih'
  },
  {
    blockNumber: 421888,
    timestamp: '11 Okt 2026 23:45:00 WIB',
    hash: '0x7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a9f8e7d6c',
    previousHash: '0x6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a9f8e7d6c5b',
    transactionsCount: 8,
    validatorNode: 'Node-Bandung-KemenagWaqf-03',
    shariaSeal: 'BWI-SHA256-CERTIFIED',
    status: 'Terkonfirmasi',
    payloadSummary: 'Rekonsiliasi Sukuk CWLS-008 Kupon Kuartalan Rp 119.16 Jt'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'aud-991',
    timestamp: '12 Okt 2026 09:20 WIB',
    category: 'Kepatuhan Syariah',
    action: 'Verifikasi Alokasi Bagi Hasil RS Wakaf ke Pasien Dhuafa',
    actor: 'Dr. Fatima Zahra, MEc',
    actorRole: 'Auditor Dewan Pengawas Syariah (DPS)',
    details: 'Pemeriksaan kesesuaian klausul ikrar wakaf (Waqf Deed). Dana surplus murni disalurkan ke 1,200 kartu dhuafa.',
    e2eeHash: 'aes256:d8291a...e7f12',
    regulatorStatus: 'Disetujui BWI'
  },
  {
    id: 'aud-990',
    timestamp: '12 Okt 2026 08:45 WIB',
    category: 'Keuangan',
    action: 'Pencairan Dana Insentif 150 Da\'i Pedalaman Batch IV',
    actor: 'H. Ahmad Zaki, M.Ag',
    actorRole: 'Ketua Nadzir Eksekutif',
    details: 'Verifikasi tanda terima transfer multipihak via Bank Syariah dengan bukti tanda tangan digital lapangan.',
    e2eeHash: 'aes256:b192ca...99f01',
    regulatorStatus: 'Sesuai DSN-MUI'
  },
  {
    id: 'aud-989',
    timestamp: '11 Okt 2026 16:30 WIB',
    category: 'Aset Wakaf',
    action: 'Inspeksi Fisik Panen Raya Agribisnis Subang',
    actor: 'Salman Al-Farisi',
    actorRole: 'Petugas Monitoring Lapangan',
    details: 'Hasil timbang gabah kering panen 42.5 ton bersertifikat organik. Log GPS & foto metadata terenkripsi.',
    e2eeHash: 'aes256:4f881b...33a77',
    regulatorStatus: 'Disetujui BWI'
  },
  {
    id: 'aud-988',
    timestamp: '10 Okt 2026 14:15 WIB',
    category: 'Akses Sistem',
    action: 'Autentikasi 2FA TOTP & Kunci Kriptografi Audit Regulator',
    actor: 'Inspektur BWI Wilayah I',
    actorRole: 'Regulator Pemerintah RI',
    details: 'Akses baca langsung ke Immutable Ledger & Dokumen Ikrar Wakaf Elektronik (e-AIW).',
    e2eeHash: 'aes256:11bb9a...55e09',
    regulatorStatus: 'Disetujui BWI'
  }
];

export const INITIAL_TEAM_KPIS: TeamMemberKPI[] = [
  {
    id: 'usr-01',
    name: 'H. Ahmad Zaki, M.Ag',
    role: 'Ketua Nadzir & Direktur Investasi',
    avatar: '/src/assets/images/avatar_nadzir_ahmad_1791795735025.jpg',
    amanahScore: 98,
    siddiqScore: 99,
    tablighScore: 96,
    fathanahScore: 97,
    overallIslamicityScore: 97.5,
    activeTasks: 3,
    completedTasks: 48,
    fieldLocation: 'Kantor Pusat Jakarta'
  },
  {
    id: 'usr-02',
    name: 'Dr. Fatima Zahra, MEc',
    role: 'Auditor Senior Dewan Pengawas Syariah',
    avatar: '/src/assets/images/avatar_auditor_fatima_1791795753380.jpg',
    amanahScore: 99,
    siddiqScore: 98,
    tablighScore: 95,
    fathanahScore: 98,
    overallIslamicityScore: 97.8,
    activeTasks: 2,
    completedTasks: 56,
    fieldLocation: 'Komite Audit DPS'
  },
  {
    id: 'usr-03',
    name: 'Ustadz Salman Farisi, S.Sos',
    role: 'Koordinator Lapangan & Da\'i Pelosok',
    avatar: '/src/assets/images/avatar_nadzir_ahmad_1791795735025.jpg',
    amanahScore: 97,
    siddiqScore: 96,
    tablighScore: 99,
    fathanahScore: 94,
    overallIslamicityScore: 96.5,
    activeTasks: 5,
    completedTasks: 41,
    fieldLocation: 'Posko Mentawai & NTT'
  },
  {
    id: 'usr-04',
    name: 'Siti Rahmawati, S.E.I',
    role: 'Manajer Portofolio Ventura & UMKM',
    avatar: '/src/assets/images/avatar_auditor_fatima_1791795753380.jpg',
    amanahScore: 96,
    siddiqScore: 97,
    tablighScore: 94,
    fathanahScore: 96,
    overallIslamicityScore: 95.8,
    activeTasks: 4,
    completedTasks: 39,
    fieldLocation: 'Solo & Yogyakarta'
  }
];

export const INITIAL_TASKS: TaskItem[] = [
  {
    id: 'tsk-101',
    title: 'Penyaluran Dana Darurat Obat-obatan Klinik Apung Selayar',
    description: 'Pengadaan logistik medis darurat dan vitamin untuk 120 anak pesisir pulau terluar.',
    fiqhPriority: 'Daruriyyat', // Hifdz an-Nafs (Menjaga Jiwa)
    deadline: '13 Okt 2026, 17:00 WIB',
    assignee: 'dr. Farhan Syahputra, Sp.A',
    status: 'Sedang Dikerjakan',
    isAiRecommended: true,
    shariaNote: 'Prioritas Tertinggi (Maqashid: Hifdz An-Nafs). Wajib diverifikasi tanda bukti invoice apotek rekanan.'
  },
  {
    id: 'tsk-102',
    title: 'Audit Kuartalan Bagi Hasil Agribisnis Subang sebelum RUPS',
    description: 'Pencocokan buku kas fisik hasil panen gabah dengan smart contract deposit di custody bank.',
    fiqhPriority: 'Daruriyyat', // Hifdz al-Mal (Menjaga Harta)
    deadline: '15 Okt 2026, 12:00 WIB',
    assignee: 'Dr. Fatima Zahra, MEc',
    status: 'Belum Dimulai',
    isAiRecommended: true,
    shariaNote: 'Kepatuhan Syariah: Hindari unsur Tadlis & Gharar dengan audit rekonsiliasi neraca independen.'
  },
  {
    id: 'tsk-103',
    title: 'Distribusi Buku Kurikulum Tahfizh & Iqro Da\'i Pedalaman',
    description: 'Kirimkan 500 paket mushaf Al-Qur\'an dan buku tajwid ke desa binaan Mentawai.',
    fiqhPriority: 'Hajiyyat', // Hifdz ad-Din (Menjaga Agama/Pendidikan)
    deadline: '18 Okt 2026, 18:00 WIB',
    assignee: 'Ustadz Salman Farisi, S.Sos',
    status: 'Menunggu Verifikasi',
    isAiRecommended: false,
    shariaNote: 'Penyaluran fisik didokumentasikan dengan foto geotagged untuk transparansi donatur.'
  },
  {
    id: 'tsk-104',
    title: 'Peremajaan Plang Identitas Wakaf & QR Code Informasi Donatur',
    description: 'Pemasangan plang akrilik QR Code informasi transparansi blockchain di RS Wakaf Cianjur.',
    fiqhPriority: 'Tahsiniyyat', // Penyempurna/Kerapihan
    deadline: '24 Okt 2026, 16:00 WIB',
    assignee: 'Siti Rahmawati, S.E.I',
    status: 'Belum Dimulai',
    isAiRecommended: false,
    shariaNote: 'Dianjurkan untuk syiar dan transparansi publik, dialokasikan dari anggaran operasional nadzir.'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Pengingat Waktu Sholat Ashar',
    message: 'Waktu Ashar wilayah DKI Jakarta & sekitarnya akan masuk dalam 15 menit. Mari persiapkan diri untuk sholat berjamaah.',
    timestamp: '15:10 WIB',
    category: 'ibadah',
    isRead: false
  },
  {
    id: 'notif-2',
    title: 'Disbursement Sukses Masuk Blockchain',
    message: 'Transaksi dana Mauquf \'Alaih Klinik Apung Rp 140.000.000 telah diverifikasi pada Block #421890.',
    timestamp: '09:15 WIB',
    category: 'progres_program',
    isRead: false
  },
  {
    id: 'notif-3',
    title: 'Tenggat Waktu Tugas Daruriyyat',
    message: 'Tugas "Penyaluran Dana Darurat Obat-obatan" memiliki sisa waktu 24 jam. Mohon segera lengkapi bukti LPJ.',
    timestamp: '08:00 WIB',
    category: 'tugas_lapangan',
    isRead: false
  },
  {
    id: 'notif-4',
    title: 'Verifikasi Audit Regulator BWI',
    message: 'Laporan Triwulan III 2026 telah disetujui tanpa catatan perbaikan oleh Badan Wakaf Indonesia.',
    timestamp: 'Kemarin, 16:45 WIB',
    category: 'audit_syariah',
    isRead: true
  }
];

export const INITIAL_HALAQAH_POSTS: HalaqahPost[] = [
  {
    id: 'hq-01',
    author: 'Ustadz Salman Farisi, S.Sos',
    role: 'Da\'i Pedalaman & Staf Lapangan',
    avatar: '/src/assets/images/avatar_nadzir_ahmad_1791795735025.jpg',
    timestamp: '2 jam yang lalu',
    message: 'Alhamdulillah, hari ini tuntas menyalurkan amanah wakif untuk adik-adik tahfizh di pedalaman. Semoga menjadi amal jariyah yang terus mengalir pahalanya bagi para donatur dan tim.',
    mutabaahSummary: 'Subuh Berjamaah ✓ · Dhuha 4 Rakaat ✓ · Tilawah 1 Juz ✓ · Sedekah Subuh ✓',
    likes: 18,
    hasLiked: false,
    commentsCount: 6
  },
  {
    id: 'hq-02',
    author: 'Dr. Fatima Zahra, MEc',
    role: 'Auditor Dewan Pengawas Syariah',
    avatar: '/src/assets/images/avatar_auditor_fatima_1791795753380.jpg',
    timestamp: '5 jam yang lalu',
    message: 'Bismillah, mengingatkan seluruh tim pelaksana amanah: "Sesungguhnya Allah menyukai jika salah seorang dari kalian melakukan suatu pekerjaan, ia melakukannya dengan itqan (profesional & sungguh-sungguh)." Mari jaga integritas dan hisab spiritual kita hari ini.',
    mutabaahSummary: 'Tahajjud ✓ · Subuh Berjamaah ✓ · Rawatib Lengkap ✓ · Tilawah 1.5 Juz ✓',
    likes: 27,
    hasLiked: true,
    commentsCount: 11
  }
];

export const INITIAL_MUTABAAH_DAYS: MutabaahEntry[] = [
  { date: '12 Okt 2026', sholatJamaah: true, sholatDhuha: true, qiyamulLail: true, tilawahPages: 10, sedekahSubuh: true, dzikirPagiPetang: true, rawatib: true },
  { date: '11 Okt 2026', sholatJamaah: true, sholatDhuha: true, qiyamulLail: false, tilawahPages: 8, sedekahSubuh: true, dzikirPagiPetang: true, rawatib: true },
  { date: '10 Okt 2026', sholatJamaah: true, sholatDhuha: false, qiyamulLail: true, tilawahPages: 12, sedekahSubuh: true, dzikirPagiPetang: true, rawatib: true },
  { date: '09 Okt 2026', sholatJamaah: true, sholatDhuha: true, qiyamulLail: true, tilawahPages: 6, sedekahSubuh: true, dzikirPagiPetang: false, rawatib: false },
  { date: '08 Okt 2026', sholatJamaah: true, sholatDhuha: true, qiyamulLail: true, tilawahPages: 10, sedekahSubuh: true, dzikirPagiPetang: true, rawatib: true },
  { date: '07 Okt 2026', sholatJamaah: false, sholatDhuha: true, qiyamulLail: false, tilawahPages: 4, sedekahSubuh: true, dzikirPagiPetang: true, rawatib: true },
  { date: '06 Okt 2026', sholatJamaah: true, sholatDhuha: true, qiyamulLail: true, tilawahPages: 14, sedekahSubuh: true, dzikirPagiPetang: true, rawatib: true }
];

export const INITIAL_API_INTEGRATIONS: ApiIntegration[] = [
  {
    id: 'api-01',
    serviceName: 'Kemenag RI - Sistem Informasi Wakaf (SIWAK)',
    endpoint: 'https://api.kemenag.go.id/v2/siwak/registry/sync',
    authType: 'Bearer HMAC-SHA256',
    status: 'Aktif',
    lastPing: '12 Okt 2026 09:00:15 WIB (HTTP 200 OK)',
    eventsSubscribed: ['waqf.asset.registered', 'waqf.yield.disbursed']
  },
  {
    id: 'api-02',
    serviceName: 'Badan Wakaf Indonesia (BWI) Regulatory Node',
    endpoint: 'https://node.bwi.go.id/rpc/v1/sharia-audit',
    authType: 'Mutual TLS',
    status: 'Aktif',
    lastPing: '12 Okt 2026 09:15:00 WIB (Latency: 18ms)',
    eventsSubscribed: ['blockchain.block.mined', 'audit.log.created']
  },
  {
    id: 'api-03',
    serviceName: 'Bank Syariah Mandiri Core Custody ERP',
    endpoint: 'https://openapi.banksyariah.co.id/v3/custody/escrow',
    authType: 'OAuth 2.0',
    status: 'Aktif',
    lastPing: '12 Okt 2026 08:50:33 WIB (HTTP 200 OK)',
    eventsSubscribed: ['disbursement.settled', 'yield.credited']
  },
  {
    id: 'api-04',
    serviceName: 'Odoo / ERP Manajemen Proyek Lapangan (Webhook)',
    endpoint: 'https://erp.alwaqfiyah.id/webhooks/field-tasks',
    authType: 'Bearer HMAC-SHA256',
    status: 'Sandbox',
    lastPing: '11 Okt 2026 21:00:00 WIB (Simulasi Aktif)',
    eventsSubscribed: ['task.priority.updated', 'task.completed']
  }
];

export const PRAYER_SCHEDULE = {
  city: 'DKI Jakarta & Sekitarnya (WIB)',
  imsak: '04:12',
  subuh: '04:22',
  terbit: '05:37',
  dhuha: '06:01',
  dzuhur: '11:47',
  ashar: '14:56',
  maghrib: '17:52',
  isya: '19:02'
};

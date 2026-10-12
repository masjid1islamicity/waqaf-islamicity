export type UserRole = 'nadzir' | 'field_officer' | 'sharia_auditor' | 'wakif';

export interface WaqfAsset {
  id: string;
  code: string;
  name: string;
  category: 'Kesehatan & Rumah Sakit' | 'Agribisnis & Pangan' | 'Properti Produktif' | 'Ventura Syariah' | 'Cash Waqf Sukuk';
  valuation: number; // in IDR
  monthlyYield: number; // in IDR
  yieldPercentage: number; // annualized %
  mauqufAlaihTarget: string;
  custodyVault: string;
  blockchainContract: string;
  merkleProof: string;
  status: 'Aktif Menghasilkan' | 'Dalam Pengembangan' | 'Audit Berkala';
  image: string;
  location: string;
  lat: number;
  lng: number;
  lastAudited: string;
}

export interface DistributionProject {
  id: string;
  title: string;
  sector: 'Dakwah & Da\'i Pedalaman' | 'Pendidikan & Beasiswa' | 'Kesehatan Dhuafa' | 'Pemberdayaan UMKM Syariah';
  budgetTotal: number;
  disbursedTotal: number;
  beneficiariesCount: number;
  location: string;
  lat: number;
  lng: number;
  fatwaReference: string;
  status: 'Berjalan' | 'Selesai' | 'Verifikasi Pengawas';
  fieldOfficer: string;
  lastProgressUpdate: string;
  photos: string[];
  gpsCoordinates: string;
}

export interface BlockchainBlock {
  blockNumber: number;
  timestamp: string;
  hash: string;
  previousHash: string;
  transactionsCount: number;
  validatorNode: string;
  shariaSeal: string;
  status: 'Terkonfirmasi' | 'Memerlukan Validasi';
  payloadSummary: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  category: 'Keuangan' | 'Kepatuhan Syariah' | 'Aset Wakaf' | 'Akses Sistem';
  action: string;
  actor: string;
  actorRole: string;
  details: string;
  e2eeHash: string;
  regulatorStatus: 'Disetujui BWI' | 'Sesuai DSN-MUI' | 'Perlu Klarifikasi';
}

export interface TeamMemberKPI {
  id: string;
  name: string;
  role: string;
  avatar: string;
  amanahScore: number; // 0-100
  siddiqScore: number;
  tablighScore: number;
  fathanahScore: number;
  overallIslamicityScore: number;
  activeTasks: number;
  completedTasks: number;
  fieldLocation: string;
}

export interface MutabaahEntry {
  date: string;
  sholatJamaah: boolean; // Sholat 5 waktu tepat waktu/berjamaah
  sholatDhuha: boolean;
  qiyamulLail: boolean;
  tilawahPages: number;
  sedekahSubuh: boolean;
  dzikirPagiPetang: boolean;
  rawatib: boolean;
}

export interface TaskItem {
  id: string;
  title: string;
  description: string;
  fiqhPriority: 'Daruriyyat' | 'Hajiyyat' | 'Tahsiniyyat';
  deadline: string;
  assignee: string;
  status: 'Belum Dimulai' | 'Sedang Dikerjakan' | 'Menunggu Verifikasi' | 'Selesai';
  isAiRecommended?: boolean;
  shariaNote?: string;
  isOfflineQueued?: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  category: 'progres_program' | 'audit_syariah' | 'ibadah' | 'keamanan_2fa' | 'tugas_lapangan';
  isRead: boolean;
  actionUrl?: string;
}

export interface HalaqahPost {
  id: string;
  author: string;
  role: string;
  avatar: string;
  timestamp: string;
  message: string;
  mutabaahSummary: string;
  likes: number;
  hasLiked?: boolean;
  commentsCount: number;
}

export interface ApiIntegration {
  id: string;
  serviceName: string;
  endpoint: string;
  authType: 'Bearer HMAC-SHA256' | 'OAuth 2.0' | 'Mutual TLS';
  status: 'Aktif' | 'Terputus' | 'Sandbox';
  lastPing: string;
  eventsSubscribed: string[];
}

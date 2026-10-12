import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Key, 
  Smartphone, 
  Globe, 
  RefreshCw, 
  CheckCircle2, 
  Copy, 
  Check, 
  Send, 
  Terminal, 
  Fingerprint, 
  Database,
  Cloud,
  Layers
} from 'lucide-react';
import { ApiIntegration } from '../types';

interface SecurityApiViewProps {
  apiIntegrations: ApiIntegration[];
  e2eeEnabled: boolean;
  onToggleE2ee: () => void;
  twoFactorActive: boolean;
  onToggleTwoFactor: () => void;
  onTriggerNotification: (title: string, message: string, category: any) => void;
}

export const SecurityApiView: React.FC<SecurityApiViewProps> = ({
  apiIntegrations,
  e2eeEnabled,
  onToggleE2ee,
  twoFactorActive,
  onToggleTwoFactor,
  onTriggerNotification
}) => {
  // 2FA TOTP rolling simulation
  const [totpCode, setTotpCode] = useState('842 190');
  const [totpCountdown, setTotpCountdown] = useState(24);
  const [isBiometricVerified, setIsBiometricVerified] = useState(false);

  // E2EE Text Test tool
  const [rawText, setRawText] = useState('Identitas Wakif: H. Muhammad Arifin (Nominal Rp 500,000,000 via Sukuk CWLS)');
  const [cipherText, setCipherText] = useState('U2FsdGVkX1+x8w4f8a...e7b29a10fc39e81b67f401');

  // Webhook Test Tool
  const [selectedApi, setSelectedApi] = useState<ApiIntegration>(apiIntegrations[0]);
  const [webhookEvent, setWebhookEvent] = useState('waqf.yield.disbursed');
  const [isSendingWebhook, setIsSendingWebhook] = useState(false);
  const [webhookResponse, setWebhookResponse] = useState<string | null>(null);

  // Copy helper
  const [copiedKey, setCopiedKey] = useState(false);

  // Periodic TOTP refresh simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setTotpCountdown((prev) => {
        if (prev <= 1) {
          const newCode = Math.floor(100000 + Math.random() * 900000).toString();
          setTotpCode(`${newCode.slice(0, 3)} ${newCode.slice(3)}`);
          return 30;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleEncryptTest = () => {
    if (!rawText.trim()) return;
    const mockHash = 'U2FsdGVkX1+' + btoa(rawText).slice(0, 24) + '...' + Math.random().toString(36).substring(7);
    setCipherText(mockHash);
  };

  const handleTestBiometric = () => {
    setIsBiometricVerified(true);
    onTriggerNotification(
      'Autentikasi Biometrik Berhasil',
      'Verifikasi sidik jari/passkey perangkat berhasil dikonfirmasi untuk transaksi sensitif.',
      'keamanan_2fa'
    );
    setTimeout(() => setIsBiometricVerified(false), 4000);
  };

  const handleSendWebhookTest = () => {
    setIsSendingWebhook(true);
    setWebhookResponse(null);
    setTimeout(() => {
      setIsSendingWebhook(false);
      setWebhookResponse(JSON.stringify({
        status: 200,
        message: 'Webhook payload accepted and verified by third party endpoint.',
        timestamp: new Date().toISOString(),
        deliveryLatencyMs: 24,
        signatureVerified: true,
        endpoint: selectedApi.endpoint
      }, null, 2));
      onTriggerNotification(
        'Webhook Berhasil Dikirim',
        `Payload event "${webhookEvent}" berhasil dikirimkan ke ${selectedApi.serviceName}.`,
        'keamanan_2fa'
      );
    }, 1200);
  };

  return (
    <div className="space-y-8">
      {/* Title & Security Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            Pusat Keamanan, Enkripsi E2EE & Integrasi API Eksternal
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1">
            Enkripsi data tingkat tinggi, 2FA hardware token, serta koneksi webhook ke ERP & Kemenag SIWAK
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-xs font-semibold text-emerald-800 dark:text-emerald-300">
            <Lock className="w-3.5 h-3.5" />
            <span>Protokol Enkripsi AES-256 Aktif</span>
          </div>
        </div>
      </div>

      {/* 2 Top Security Cards: E2EE and 2FA */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: End-to-End Encryption (E2EE) */}
        <div className="p-6 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-emerald-600">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                  Enkripsi Ujung-ke-Ujung (End-to-End Encryption)
                </h3>
                <p className="text-xs text-neutral-500">
                  Perlindungan data donatur dan identitas wakif rahasia
                </p>
              </div>
            </div>

            <button
              onClick={onToggleE2ee}
              className={`text-xs px-2.5 py-1 rounded-md font-semibold transition-colors ${
                e2eeEnabled
                  ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                  : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-600'
              }`}
            >
              {e2eeEnabled ? 'E2EE AKTIF' : 'NON-AKTIF'}
            </button>
          </div>

          <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Data sensitif nama donatur, nomor rekening escrow, dan dokumen ikrar wakaf dienkripsi di peramban staf sebelum dikirim ke basis data pusat. Kunci privat didekripsi lokal via HSM.
          </p>

          {/* Interactive Cryptographic Tester */}
          <div className="space-y-2 pt-1 text-xs">
            <span className="font-semibold text-neutral-700 dark:text-neutral-300">
              Uji Enkripsi Teks Waktu-Nyata:
            </span>
            <input
              type="text"
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 text-xs focus:outline-none focus:border-emerald-500"
            />
            <div className="flex items-center justify-between gap-2 pt-1">
              <button
                onClick={handleEncryptTest}
                className="px-3 py-1.5 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded-lg hover:bg-neutral-800 font-medium transition-colors"
              >
                Enkripsi Teks (AES-256)
              </button>
              <span className="text-[11px] text-neutral-400 font-mono-numbers">Status Kunci: Rotasi Berkala</span>
            </div>

            <div className="p-2.5 rounded-lg bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 font-mono text-[11px] text-neutral-600 dark:text-neutral-400 break-all">
              <span className="text-neutral-400">Ciphertext: </span>{cipherText}
            </div>
          </div>
        </div>

        {/* Card 2: Two-Factor Authentication (2FA) & Biometric */}
        <div className="p-6 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-blue-600">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                  Autentikasi Dua Faktor (2FA) & Biometrik
                </h3>
                <p className="text-xs text-neutral-500">
                  Proteksi pencairan dana Mauquf & izin akses regulator
                </p>
              </div>
            </div>

            <button
              onClick={onToggleTwoFactor}
              className={`text-xs px-2.5 py-1 rounded-md font-semibold transition-colors ${
                twoFactorActive
                  ? 'bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300'
                  : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-600'
              }`}
            >
              {twoFactorActive ? '2FA AKTIF' : 'NON-AKTIF'}
            </button>
          </div>

          <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
            <div>
              <div className="text-[11px] text-neutral-500 uppercase tracking-wider">
                Kode TOTP Authenticator Saat Ini
              </div>
              <div className="text-2xl font-bold font-mono tracking-widest text-neutral-900 dark:text-neutral-100 mt-1">
                {totpCode}
              </div>
              <div className="text-[11px] text-neutral-500 font-mono-numbers mt-0.5">
                Kedaluwarsa dalam {totpCountdown} detik
              </div>
            </div>

            <div className="w-12 h-12 rounded-full border-2 border-emerald-500 flex items-center justify-center text-xs font-bold text-emerald-600 font-mono-numbers">
              {totpCountdown}s
            </div>
          </div>

          {/* Biometric Passkey simulation */}
          <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-400">
              <Fingerprint className="w-4 h-4 text-emerald-600" />
              <span>Verifikasi Perangkat WebAuthn / Passkey</span>
            </div>

            <button
              onClick={handleTestBiometric}
              className="px-3 py-1.5 text-xs font-semibold bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg transition-colors shrink-0"
            >
              {isBiometricVerified ? '✓ Terverifikasi!' : 'Uji Biometrik Cepat'}
            </button>
          </div>
        </div>
      </div>

      {/* API Integrations & Webhook Hub */}
      <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-xs p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-200 dark:border-neutral-800">
          <div>
            <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
              Gerbang Integrasi API Sistem Pihak Ketiga & Webhook
            </h3>
            <p className="text-xs text-neutral-500">
              Koneksi otomatis dengan Kemenag SIWAK, BWI Regulatory Node, Odoo ERP, dan Bank Syariah
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setCopiedKey(true);
                navigator.clipboard.writeText('ak_live_sharia_9941a87b1029c78d44e019');
                setTimeout(() => setCopiedKey(false), 2000);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-lg hover:bg-neutral-200 transition-colors"
            >
              {copiedKey ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Salin Kunci API Utama</span>
            </button>
          </div>
        </div>

        {/* API List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {apiIntegrations.map((api) => (
            <div
              key={api.id}
              onClick={() => setSelectedApi(api)}
              className={`p-4 rounded-xl border transition-all cursor-pointer space-y-3 ${
                selectedApi.id === api.id
                  ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-500 shadow-xs'
                  : 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 hover:border-neutral-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-neutral-900 dark:text-neutral-100">
                  {api.serviceName}
                </h4>
                <span className={`text-[11px] font-semibold ${
                  api.status === 'Aktif' 
                    ? 'text-emerald-700 dark:text-emerald-400' 
                    : 'text-amber-700 dark:text-amber-400'
                }`}>
                  {api.status}
                </span>
              </div>

              <div className="text-[11px] font-mono text-neutral-500 break-all">
                {api.endpoint}
              </div>

              <div className="flex items-center justify-between text-[11px] text-neutral-500 pt-2 border-t border-neutral-100 dark:border-neutral-800">
                <span>Otentikasi: {api.authType}</span>
                <span className="font-mono-numbers">{api.eventsSubscribed.length} Event Subscribed</span>
              </div>
            </div>
          ))}
        </div>

        {/* Webhook Payload Simulator Box */}
        <div className="p-5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-600" />
              <span>Simulasi Pengiriman Webhook ke: {selectedApi.serviceName}</span>
            </span>

            <div className="flex items-center gap-2">
              <select
                value={webhookEvent}
                onChange={(e) => setWebhookEvent(e.target.value)}
                className="text-xs p-1.5 rounded-md bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 font-mono"
              >
                <option value="waqf.yield.disbursed">Event: waqf.yield.disbursed</option>
                <option value="blockchain.block.mined">Event: blockchain.block.mined</option>
                <option value="task.completed">Event: task.completed</option>
              </select>

              <button
                onClick={handleSendWebhookTest}
                disabled={isSendingWebhook}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-emerald-700 hover:bg-emerald-800 text-white rounded-md transition-colors disabled:opacity-50"
              >
                <Send className="w-3 h-3" />
                <span>{isSendingWebhook ? 'Mengirim...' : 'Kirim Payload Uji'}</span>
              </button>
            </div>
          </div>

          {webhookResponse && (
            <div className="space-y-1">
              <div className="text-[10px] uppercase font-bold text-emerald-600 font-mono-numbers">
                Respon Server Pihak Ketiga (HTTP 200 OK):
              </div>
              <pre className="p-3 rounded-lg bg-neutral-900 text-emerald-400 font-mono text-[11px] overflow-x-auto">
                {webhookResponse}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

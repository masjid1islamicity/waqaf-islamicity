import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Search, 
  CheckCircle2, 
  ExternalLink, 
  Copy, 
  Check, 
  Layers, 
  Key, 
  Cpu, 
  Clock, 
  Database,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { BlockchainBlock, WaqfAsset } from '../types';

interface BlockchainViewProps {
  blocks: BlockchainBlock[];
  assets: WaqfAsset[];
  onCommitNewBlock: (summary: string) => void;
}

export const BlockchainView: React.FC<BlockchainViewProps> = ({
  blocks,
  assets,
  onCommitNewBlock
}) => {
  const [searchHash, setSearchHash] = useState('');
  const [copiedHash, setCopiedHash] = useState<string | null>(null);
  const [selectedBlock, setSelectedBlock] = useState<BlockchainBlock | null>(blocks[0] || null);
  const [simulatedSummary, setSimulatedSummary] = useState('');
  const [isMining, setIsMining] = useState(false);
  const [verificationResult, setVerificationResult] = useState<{
    valid: boolean;
    message: string;
    blockNumber?: number;
    timestamp?: string;
  } | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHash(text);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchHash.trim()) return;

    const term = searchHash.trim().toLowerCase();
    const matchedBlock = blocks.find(b => 
      b.hash.toLowerCase().includes(term) || 
      b.previousHash.toLowerCase().includes(term) ||
      b.blockNumber.toString() === term
    );

    const matchedAsset = assets.find(a => 
      a.blockchainContract.toLowerCase().includes(term) ||
      a.merkleProof.toLowerCase().includes(term) ||
      a.code.toLowerCase().includes(term)
    );

    if (matchedBlock) {
      setSelectedBlock(matchedBlock);
      setVerificationResult({
        valid: true,
        message: `Hash terverifikasi valid pada Blok #${matchedBlock.blockNumber}. Tersegel dengan validasi Syariah Konsorsium BWI & DSN-MUI.`,
        blockNumber: matchedBlock.blockNumber,
        timestamp: matchedBlock.timestamp
      });
    } else if (matchedAsset) {
      setVerificationResult({
        valid: true,
        message: `Kontrak Kustodian Aset '${matchedAsset.name}' terverifikasi autentik pada Escrow Syariah. Merkle proof terkonfirmasi utuh.`,
        blockNumber: 421888,
        timestamp: '11 Okt 2026'
      });
    } else {
      setVerificationResult({
        valid: false,
        message: 'Hash tidak ditemukan di buku besar publik. Pastikan hash atau nomor blok yang dimasukkan sudah benar.'
      });
    }
  };

  const handleMineBlock = () => {
    if (!simulatedSummary.trim()) {
      setSimulatedSummary('Penyaluran ZISWAF Terkini: Audit Tahap Lanjutan Dana Dakwah & Rekonsiliasi Sukuk');
    }
    setIsMining(true);
    setTimeout(() => {
      onCommitNewBlock(simulatedSummary.trim() || 'Verifikasi Ledger Baru: Penyaluran Dana Mauquf Alaih');
      setIsMining(false);
      setSimulatedSummary('');
    }, 1200);
  };

  return (
    <div className="space-y-8">
      {/* Title & Trust Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            Buku Besar Abadi (Immutable Sharia Blockchain Ledger)
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1">
            Konsensus terdistribusi multi-node (BWI, DSN-MUI, Bank Kustodian) untuk integritas aset wakaf 100% transparan
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold text-emerald-800 dark:text-emerald-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>4 Validator Syariah Online</span>
          </div>
        </div>
      </div>

      {/* Network Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-1">
          <div className="text-neutral-500 text-xs uppercase tracking-wider">Tinggi Blok Terkini</div>
          <div className="text-2xl font-bold font-mono-numbers text-neutral-900 dark:text-neutral-100">
            #{blocks[0]?.blockNumber || 421890}
          </div>
          <div className="text-[11px] text-neutral-500">Interval Blok: ~10 Menit</div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-1">
          <div className="text-neutral-500 text-xs uppercase tracking-wider">Kapasitas Transaksi Terverifikasi</div>
          <div className="text-2xl font-bold font-mono-numbers text-neutral-900 dark:text-neutral-100">
            18,492 Tx
          </div>
          <div className="text-[11px] text-emerald-600">0% Pelanggaran Akad Syariah</div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-1">
          <div className="text-neutral-500 text-xs uppercase tracking-wider">Metode Konsensus</div>
          <div className="text-2xl font-bold font-mono-numbers text-neutral-900 dark:text-neutral-100">
            PoA-Sharia
          </div>
          <div className="text-[11px] text-neutral-500">Proof of Authority Terakreditasi</div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-1">
          <div className="text-neutral-500 text-xs uppercase tracking-wider">Enkripsi Data Kustodian</div>
          <div className="text-2xl font-bold font-mono-numbers text-neutral-900 dark:text-neutral-100">
            AES-256 + SHA
          </div>
          <div className="text-[11px] text-emerald-600">E2EE Tamper-Proof Aktif</div>
        </div>
      </div>

      {/* Interactive Verification Tool for Donors & Regulators */}
      <div className="p-6 rounded-xl bg-gradient-to-r from-emerald-950/20 via-neutral-900 to-neutral-900 border border-neutral-800 text-white space-y-4 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>Verifikator Kriptografi Wakif & Donatur (Public Hash Check)</span>
            </h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              Masukkan Hash Transaksi, Kode Aset (misal: WQF-ID-2024-HOSP), atau Alamat Kontrak untuk membuktikan keaslian dana
            </p>
          </div>
        </div>

        <form onSubmit={handleVerify} className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
            <input
              type="text"
              value={searchHash}
              onChange={(e) => setSearchHash(e.target.value)}
              placeholder="Contoh: 0x9f8b4e7a2c1d3f5e... atau WQF-ID-2024-HOSP"
              className="w-full pl-9 pr-4 py-2 text-xs bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 font-mono focus:outline-none focus:border-emerald-500"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors shrink-0"
          >
            Verifikasi Bukti Kripto
          </button>
        </form>

        {verificationResult && (
          <div className={`p-4 rounded-lg text-xs border ${
            verificationResult.valid 
              ? 'bg-emerald-950/60 border-emerald-800 text-emerald-200' 
              : 'bg-rose-950/60 border-rose-800 text-rose-200'
          }`}>
            <div className="flex items-start gap-2">
              {verificationResult.valid ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <Key className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              )}
              <div className="space-y-1">
                <p className="font-semibold">{verificationResult.message}</p>
                {verificationResult.valid && verificationResult.blockNumber && (
                  <div className="text-[11px] text-neutral-300 font-mono-numbers">
                    Nomor Blok: #{verificationResult.blockNumber} · Waktu Verifikasi: {verificationResult.timestamp}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Two Column Layout: Block Explorer List & Block Inspector Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Recent Blocks List */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-600" />
              <span>Daftar Blok Tersegel Terbaru</span>
            </h3>
            <span className="text-xs text-neutral-500 font-mono-numbers">
              {blocks.length} blok termonitor
            </span>
          </div>

          <div className="space-y-3">
            {blocks.map((b) => {
              const isSelected = selectedBlock?.blockNumber === b.blockNumber;
              return (
                <div
                  key={b.blockNumber}
                  onClick={() => setSelectedBlock(b)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-50/50 dark:bg-emerald-950/30 border-emerald-500 shadow-xs'
                      : 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-bold font-mono-numbers text-neutral-900 dark:text-neutral-100">
                      Blok #{b.blockNumber}
                    </span>
                    <span className="text-[11px] text-neutral-500 font-mono-numbers">
                      {b.timestamp}
                    </span>
                  </div>

                  <div className="text-xs font-mono text-neutral-600 dark:text-neutral-400 truncate mb-2">
                    {b.hash}
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-neutral-500">
                    <span className="truncate pr-2 font-mono-numbers">
                      {b.transactionsCount} Transaksi
                    </span>
                    <span className="text-emerald-700 dark:text-emerald-400 font-medium">
                      {b.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mine / Seal Block Simulator */}
          <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-3">
            <div className="text-xs font-bold text-neutral-900 dark:text-neutral-100">
              Segel Transaksi Penyaluran Baru ke Blockchain
            </div>
            <input
              type="text"
              value={simulatedSummary}
              onChange={(e) => setSimulatedSummary(e.target.value)}
              placeholder="Ringkasan transaksi / alokasi mauquf alaih..."
              className="w-full text-xs p-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-emerald-500"
            />
            <button
              onClick={handleMineBlock}
              disabled={isMining}
              className="w-full py-2 text-xs font-semibold bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50"
            >
              {isMining ? (
                <>
                  <Cpu className="w-3.5 h-3.5 animate-spin" />
                  <span>Memvalidasi Konsensus Multi-Node...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Komit & Segel Blok Baru</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Detailed Block Inspector */}
        <div className="lg:col-span-7">
          {selectedBlock ? (
            <div className="p-6 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-neutral-800">
                <div>
                  <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                    Inspeksi Kriptografis Blok #{selectedBlock.blockNumber}
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Struktur pohon hash Merkle dan tanda tangan regulator
                  </p>
                </div>
                <div className="px-2.5 py-1 rounded bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 text-xs font-mono-numbers font-medium">
                  {selectedBlock.shariaSeal}
                </div>
              </div>

              {/* Technical Hash Fields */}
              <div className="space-y-4 text-xs font-mono">
                <div className="space-y-1">
                  <div className="text-[11px] font-sans font-semibold text-neutral-500 uppercase tracking-wider">
                    Block Hash (SHA-256)
                  </div>
                  <div className="p-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg flex items-center justify-between gap-2 break-all text-neutral-900 dark:text-neutral-100">
                    <span className="text-[11px]">{selectedBlock.hash}</span>
                    <button
                      onClick={() => handleCopy(selectedBlock.hash)}
                      className="p-1 hover:text-emerald-600 transition-colors shrink-0"
                      title="Salin Hash"
                    >
                      {copiedHash === selectedBlock.hash ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-[11px] font-sans font-semibold text-neutral-500 uppercase tracking-wider">
                    Previous Block Hash
                  </div>
                  <div className="p-3 bg-neutral-50 dark:bg-neutral-800/60 rounded-lg flex items-center justify-between gap-2 break-all text-neutral-700 dark:text-neutral-300">
                    <span className="text-[11px]">{selectedBlock.previousHash}</span>
                    <button
                      onClick={() => handleCopy(selectedBlock.previousHash)}
                      className="p-1 hover:text-emerald-600 transition-colors shrink-0"
                    >
                      {copiedHash === selectedBlock.previousHash ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Metadata Grid */}
              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-neutral-100 dark:border-neutral-800 text-xs">
                <div>
                  <span className="text-neutral-500">Validator Node Penandatangan:</span>
                  <div className="font-medium text-neutral-900 dark:text-neutral-100 mt-0.5">
                    {selectedBlock.validatorNode}
                  </div>
                </div>
                <div>
                  <span className="text-neutral-500">Waktu Konsensus:</span>
                  <div className="font-medium text-neutral-900 dark:text-neutral-100 mt-0.5 font-mono-numbers">
                    {selectedBlock.timestamp}
                  </div>
                </div>
                <div>
                  <span className="text-neutral-500">Total Transaksi:</span>
                  <div className="font-medium text-neutral-900 dark:text-neutral-100 mt-0.5 font-mono-numbers">
                    {selectedBlock.transactionsCount} Transaksi Mauquf 'Alaih
                  </div>
                </div>
                <div>
                  <span className="text-neutral-500">Status Integritas:</span>
                  <div className="font-medium text-emerald-600 mt-0.5 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Tersegel & Tidak Dapat Diubah (Immutable)</span>
                  </div>
                </div>
              </div>

              {/* Payload Summary */}
              <div className="p-4 rounded-lg bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200 dark:border-neutral-800 text-xs space-y-1">
                <span className="font-semibold text-neutral-700 dark:text-neutral-300">
                  Ringkasan Payload Transaksi Mauquf:
                </span>
                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed font-sans">
                  {selectedBlock.payloadSummary}
                </p>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-neutral-500 text-sm border border-dashed rounded-xl">
              Pilih salah satu blok untuk menginspeksi rincian kriptografi.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

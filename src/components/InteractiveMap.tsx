import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { 
  Building2, 
  HeartHandshake, 
  MapPin, 
  Layers, 
  Navigation, 
  ExternalLink, 
  ShieldCheck, 
  CheckCircle2,
  Maximize2
} from 'lucide-react';
import { WaqfAsset, DistributionProject } from '../types';

interface InteractiveMapProps {
  assets: WaqfAsset[];
  projects: DistributionProject[];
  darkMode: boolean;
  onNavigateToTab?: (tab: string) => void;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  assets,
  projects,
  darkMode,
  onNavigateToTab
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  const [activeFilter, setActiveFilter] = useState<'all' | 'assets' | 'projects'>('all');
  const [selectedItem, setSelectedItem] = useState<{
    type: 'asset' | 'project';
    data: WaqfAsset | DistributionProject;
  } | null>(null);

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Center of Indonesia Archipelago
      const map = L.map(mapContainerRef.current, {
        center: [-2.5489, 118.0149],
        zoom: 5,
        minZoom: 4,
        maxZoom: 16,
        scrollWheelZoom: false
      });

      mapInstanceRef.current = map;
      markersLayerRef.current = L.layerGroup().addTo(map);

      // Invalidate size once rendered
      setTimeout(() => {
        map.invalidateSize();
      }, 250);
    }

    const map = mapInstanceRef.current;

    // Tile Layer based on Dark Mode
    map.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) {
        map.removeLayer(layer);
      }
    });

    const tileUrl = darkMode
      ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
      : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

    L.tileLayer(tileUrl, {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map);

    return () => {
      // Clean up map when component unmounts
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [darkMode]);

  // Update Markers when filter or data changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersLayer = markersLayerRef.current;
    if (!map || !markersLayer) return;

    markersLayer.clearLayers();

    // Custom Waqf Asset Icon
    const createAssetIcon = (name: string) => {
      return L.divIcon({
        className: 'custom-map-icon',
        html: `
          <div style="
            background: #047857;
            color: white;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            box-shadow: 0 4px 10px rgba(4, 120, 87, 0.4);
            border: 2px solid white;
            cursor: pointer;
            transition: transform 0.2s ease;
          " title="${name}">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/>
              <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/>
              <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/>
            </svg>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, -18]
      });
    };

    // Custom Distribution Project Icon
    const createProjectIcon = (title: string) => {
      return L.divIcon({
        className: 'custom-map-icon',
        html: `
          <div style="
            background: #1d4ed8;
            color: white;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            box-shadow: 0 4px 10px rgba(29, 78, 216, 0.4);
            border: 2px solid white;
            cursor: pointer;
            transition: transform 0.2s ease;
          " title="${title}">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
            </svg>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, -18]
      });
    };

    // Add Waqf Asset markers
    if (activeFilter === 'all' || activeFilter === 'assets') {
      assets.forEach((asset) => {
        const marker = L.marker([asset.lat, asset.lng], {
          icon: createAssetIcon(asset.name)
        });

        const popupContent = `
          <div style="padding: 12px; font-family: 'Plus Jakarta Sans', sans-serif; min-width: 240px;">
            <div style="font-size: 10px; font-weight: 700; color: #047857; text-transform: uppercase; margin-bottom: 2px;">
              ASET WAKAF PRODUKTIF · ${asset.category}
            </div>
            <div style="font-size: 13px; font-weight: 700; color: #171717; margin-bottom: 4px; line-height: 1.3;">
              ${asset.name}
            </div>
            <div style="font-size: 11px; color: #737373; margin-bottom: 8px;">
              📍 ${asset.location}
            </div>
            <div style="background: #f5f5f5; padding: 6px 8px; border-radius: 6px; font-size: 11px; margin-bottom: 8px; font-family: 'JetBrains Mono', monospace;">
              <div>Nilai Aset: <strong>Rp ${(asset.valuation / 1000000000).toFixed(2)} M</strong></div>
              <div>Surplus: <strong style="color: #047857;">Rp ${(asset.monthlyYield / 1000000).toFixed(0)} Jt/bln</strong></div>
            </div>
            <div style="font-size: 10px; color: #047857; font-weight: 600;">
              ✓ Terverifikasi Blockchain BWI
            </div>
          </div>
        `;

        marker.bindPopup(popupContent);
        marker.on('click', () => {
          setSelectedItem({ type: 'asset', data: asset });
        });

        marker.addTo(markersLayer);
      });
    }

    // Add Distribution Project markers
    if (activeFilter === 'all' || activeFilter === 'projects') {
      projects.forEach((project) => {
        const marker = L.marker([project.lat, project.lng], {
          icon: createProjectIcon(project.title)
        });

        const popupContent = `
          <div style="padding: 12px; font-family: 'Plus Jakarta Sans', sans-serif; min-width: 240px;">
            <div style="font-size: 10px; font-weight: 700; color: #1d4ed8; text-transform: uppercase; margin-bottom: 2px;">
              DISTRIBUSI MAUQUF · ${project.sector}
            </div>
            <div style="font-size: 13px; font-weight: 700; color: #171717; margin-bottom: 4px; line-height: 1.3;">
              ${project.title}
            </div>
            <div style="font-size: 11px; color: #737373; margin-bottom: 8px;">
              📍 ${project.location} · PIC: ${project.fieldOfficer}
            </div>
            <div style="background: #f5f5f5; padding: 6px 8px; border-radius: 6px; font-size: 11px; margin-bottom: 8px; font-family: 'JetBrains Mono', monospace;">
              <div>Realisasi: <strong>Rp ${(project.disbursedTotal / 1000000).toFixed(0)} Jt</strong> / Rp ${(project.budgetTotal / 1000000).toFixed(0)} Jt</div>
              <div>Penerima: <strong>${project.beneficiariesCount} Jiwa</strong></div>
            </div>
            <div style="font-size: 10px; color: #1d4ed8; font-weight: 600;">
              Status: ${project.status} (GPS Terkunci)
            </div>
          </div>
        `;

        marker.bindPopup(popupContent);
        marker.on('click', () => {
          setSelectedItem({ type: 'project', data: project });
        });

        marker.addTo(markersLayer);
      });
    }
  }, [activeFilter, assets, projects]);

  const handleFlyTo = (lat: number, lng: number, item: any, type: 'asset' | 'project') => {
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.flyTo([lat, lng], 10, { duration: 1.2 });
    setSelectedItem({ type, data: item });
  };

  const handleResetView = () => {
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.flyTo([-2.5489, 118.0149], 5, { duration: 1 });
    setSelectedItem(null);
  };

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-xs overflow-hidden space-y-4 p-5 sm:p-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-emerald-600" />
            <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
              Peta Geospasial Persebaran Aset & Penyaluran Wakaf Nusantara
            </h3>
          </div>
          <p className="text-xs text-neutral-500 mt-0.5">
            Visualisasi geolokasi real-time aset produktif dan program dakwah lintas kepulauan Indonesia
          </p>
        </div>

        {/* Map Layers Filter */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 p-1 bg-neutral-100 dark:bg-neutral-800 rounded-lg text-xs">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 font-medium rounded-md transition-colors ${
                activeFilter === 'all'
                  ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
              }`}
            >
              Semua Titik ({assets.length + projects.length})
            </button>
            <button
              onClick={() => setActiveFilter('assets')}
              className={`px-3 py-1.5 font-medium rounded-md transition-colors flex items-center gap-1.5 ${
                activeFilter === 'assets'
                  ? 'bg-white dark:bg-neutral-900 text-emerald-700 dark:text-emerald-400 font-semibold shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              <span>Aset Wakaf ({assets.length})</span>
            </button>
            <button
              onClick={() => setActiveFilter('projects')}
              className={`px-3 py-1.5 font-medium rounded-md transition-colors flex items-center gap-1.5 ${
                activeFilter === 'projects'
                  ? 'bg-white dark:bg-neutral-900 text-blue-700 dark:text-blue-400 font-semibold shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              <span>Penyaluran ({projects.length})</span>
            </button>
          </div>

          <button
            onClick={handleResetView}
            className="p-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-300 transition-colors"
            title="Pusatkan Peta ke Seluruh Indonesia"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Map Canvas and Quick Location List Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Interactive Map Box */}
        <div className="lg:col-span-8 relative rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-950 min-h-[380px] h-[440px]">
          <div ref={mapContainerRef} className="w-full h-full" />

          {/* Floating Map Legend Indicator */}
          <div className="absolute bottom-3 left-3 z-20 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-800 text-[11px] shadow-md flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-600 flex items-center justify-center text-[8px] text-white font-bold">A</span>
              <span className="text-neutral-700 dark:text-neutral-300 font-medium">Aset Produktif (Escrow)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-blue-600 flex items-center justify-center text-[8px] text-white font-bold">P</span>
              <span className="text-neutral-700 dark:text-neutral-300 font-medium">Penyaluran Dakwah Lapangan</span>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Quick Location Inspector & Selector */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-3">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-neutral-700 dark:text-neutral-300">
              <span>Daftar Titik Koordinat Aktif:</span>
              <span className="text-[11px] text-neutral-500 font-mono-numbers">
                {activeFilter === 'all' 
                  ? `${assets.length} Aset + ${projects.length} Program` 
                  : activeFilter === 'assets' ? `${assets.length} Lokasi Aset` : `${projects.length} Lokasi Program`}
              </span>
            </div>

            <div className="max-h-[340px] overflow-y-auto space-y-2 pr-1 divide-y divide-neutral-100 dark:divide-neutral-800">
              {/* Assets list items */}
              {(activeFilter === 'all' || activeFilter === 'assets') && assets.map((asset) => (
                <div
                  key={asset.id}
                  onClick={() => handleFlyTo(asset.lat, asset.lng, asset, 'asset')}
                  className="pt-2 pb-1.5 px-2 rounded-lg hover:bg-neutral-100/70 dark:hover:bg-neutral-800/60 cursor-pointer transition-colors text-xs"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-0.5 min-w-0">
                      <div className="font-bold text-neutral-900 dark:text-neutral-100 truncate">
                        {asset.name}
                      </div>
                      <div className="text-[11px] text-neutral-500 truncate flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                        <span>{asset.location}</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0 font-mono-numbers text-emerald-700 dark:text-emerald-400 font-semibold text-[11px]">
                      Rp {(asset.valuation / 1000000000).toFixed(1)} M
                    </div>
                  </div>
                </div>
              ))}

              {/* Projects list items */}
              {(activeFilter === 'all' || activeFilter === 'projects') && projects.map((proj) => (
                <div
                  key={proj.id}
                  onClick={() => handleFlyTo(proj.lat, proj.lng, proj, 'project')}
                  className="pt-2 pb-1.5 px-2 rounded-lg hover:bg-neutral-100/70 dark:hover:bg-neutral-800/60 cursor-pointer transition-colors text-xs"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-0.5 min-w-0">
                      <div className="font-bold text-neutral-900 dark:text-neutral-100 truncate">
                        {proj.title}
                      </div>
                      <div className="text-[11px] text-neutral-500 truncate flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                        <span>{proj.location}</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0 font-mono-numbers text-blue-700 dark:text-blue-400 font-semibold text-[11px]">
                      Rp {(proj.disbursedTotal / 1000000).toFixed(0)} Jt
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Active Selection Card */}
          {selectedItem && (
            <div className="p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 text-xs space-y-1">
              <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                <span>{selectedItem.type === 'asset' ? 'Detail Aset Terpilih' : 'Detail Penyaluran Terpilih'}</span>
                <span className="text-emerald-600">Fokus Aktif</span>
              </div>
              <div className="font-bold text-neutral-900 dark:text-neutral-100 truncate">
                {'name' in selectedItem.data ? selectedItem.data.name : selectedItem.data.title}
              </div>
              <div className="text-[11px] text-neutral-500 font-mono-numbers">
                Koordinat: {selectedItem.data.lat.toFixed(4)}°, {selectedItem.data.lng.toFixed(4)}°
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

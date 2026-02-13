import React, { useEffect, useRef, useState } from 'react';
import { Plus, Minus } from 'lucide-react';

declare global {
  interface Window {
    L: any;
  }
}

interface VendorMapProps {
  fullScreen?: boolean;
  interactive?: boolean;
  searchQuery?: string;
}

const VendorMap: React.FC<VendorMapProps> = ({ fullScreen = false, interactive = false, searchQuery = '' }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  // Default location: Hazratganj, Lucknow
  const defaultLat = 26.8467;
  const defaultLng = 80.9462;

  // Mock Locations in Lucknow
  const [locations] = useState([
    { id: 1, lat: 26.8467, lng: 80.9462, type: 'user', popup: "You are here", name: "Current Location" },
    { id: 2, lat: 26.8480, lng: 80.9470, type: 'vendor', popup: "Sharma Tea Stall", name: "Sharma Tea Stall" },
    { id: 3, lat: 26.8450, lng: 80.9450, type: 'land', popup: "Space for Rent: 10x10", name: "Rent Spot A" },
    { id: 4, lat: 26.8490, lng: 80.9440, type: 'land', popup: "Vending Zone B", name: "Zone B" },
    { id: 5, lat: 26.8440, lng: 80.9480, type: 'vendor', popup: "Royal Chaat Corner", name: "Royal Chaat" },
    // Additional markers for richer map view
    { id: 6, lat: 26.8475, lng: 80.9490, type: 'vendor', popup: "Gulab Sweets Stall", name: "Gulab Sweets" },
    { id: 7, lat: 26.8430, lng: 80.9445, type: 'vendor', popup: "Kumar Mobile Repairs", name: "Kumar Mobile" },
    { id: 8, lat: 26.8500, lng: 80.9465, type: 'land', popup: "Open Plot for Market", name: "Open Plot" },
    { id: 9, lat: 26.8420, lng: 80.9475, type: 'vendor', popup: "Anita Fruit Stall", name: "Anita Fruits" },
    { id: 10, lat: 26.8455, lng: 80.9488, type: 'vendor', popup: "Saree Corner", name: "Saree Corner" },
  ]);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const L = window.L;
    if (!L) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        zoomControl: false,
        attributionControl: false,
        zoomAnimation: true,
        dragging: interactive,
        touchZoom: interactive,
        scrollWheelZoom: interactive,
        doubleClickZoom: interactive,
      }).setView([defaultLat, defaultLng], 15);
      
      mapInstanceRef.current = map;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
      }).addTo(map);
    }

    const map = mapInstanceRef.current;

    // Clear existing markers
    markersRef.current.forEach(marker => map.removeLayer(marker));
    markersRef.current = [];

    // --- Custom Icons ---
    const createIcon = (color: string, iconHtml: string) => L.divIcon({
      className: 'bg-transparent',
      html: `
        <div class="relative group cursor-pointer">
          <div class="w-10 h-10 ${color} rounded-full border-2 border-white shadow-xl flex items-center justify-center relative z-10 transition-transform transform group-hover:scale-110 group-active:scale-95">
             ${iconHtml}
          </div>
          <div class="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2 w-4 h-2 bg-black/30 rounded-full blur-sm"></div>
        </div>
      `,
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40]
    });

    const vendorSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/><path d="M2 7h20"/><path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7"/></svg>`;
    const landSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"/><path d="M5 21V7l8-4 8 4v14"/><path d="M17 21v-8.5a1.5 1.5 0 0 0-1.5-1.5h-7a1.5 1.5 0 0 0-1.5 1.5V21"/></svg>`;
    const userSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="10" r="3"/><path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"/></svg>`;

    const vendorIcon = createIcon('bg-saffron-500', vendorSvg);
    const landIcon = createIcon('bg-indiaGreen', landSvg); 
    const userIcon = createIcon('bg-blue-500', userSvg);

    // Filter locations based on search query
    const filteredLocations = locations.filter(loc => 
      !searchQuery || 
      loc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      loc.popup.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Helper to draw route between user and destination. Uses OSRM public server to follow roads.
    let currentRoute: any = null;
    const drawRoute = async (destLat: number, destLng: number) => {
      // remove existing route
      if (currentRoute && map.hasLayer(currentRoute)) {
        map.removeLayer(currentRoute);
      }
      // find user location
      const userLoc = locations.find(l => l.type === 'user');
      if (!userLoc) return;

      // OSRM expects lng,lat pairs
      const from = `${userLoc.lng},${userLoc.lat}`;
      const to = `${destLng},${destLat}`;
      const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${from};${to}?overview=full&geometries=geojson`;

      try {
        const res = await fetch(osrmUrl);
        if (!res.ok) throw new Error('Routing failed');
        const data = await res.json();
        if (data && data.routes && data.routes.length > 0 && data.routes[0].geometry) {
          const coords: number[][] = data.routes[0].geometry.coordinates; // [lng, lat]
          const latlngs = coords.map(c => [c[1], c[0]]);
          currentRoute = L.polyline(latlngs, { color: 'blue', weight: 5, opacity: 0.95 }).addTo(map);
          map.fitBounds(currentRoute.getBounds(), { padding: [60, 60] });
          return;
        }
        // fallback to straight line below if no valid route
        throw new Error('No route geometry');
      } catch (err) {
        // fallback: direct straight line
        const latlngs = [ [userLoc.lat, userLoc.lng], [destLat, destLng] ];
        currentRoute = L.polyline(latlngs, { color: 'blue', weight: 5, opacity: 0.9, dashArray: '6 6' }).addTo(map);
        map.fitBounds(currentRoute.getBounds(), { padding: [60, 60] });
      }
    };

    // Add Markers
    filteredLocations.forEach(loc => {
      let icon = userIcon;
      if (loc.type === 'vendor') icon = vendorIcon;
      if (loc.type === 'land') icon = landIcon;

      const popupHtml = `
        <div class="font-sans text-sm text-wood-darkest p-1 text-center">
          <div class="font-bold mb-1">${loc.name}</div>
          <div class="text-xs mb-2">${loc.popup}</div>
          <div class="flex items-center justify-center gap-2">
            <button class="leaflet-dir-btn bg-blue-500 text-white px-2 py-1 rounded text-[12px]" data-lat="${loc.lat}" data-lng="${loc.lng}">Directions</button>
          </div>
        </div>
      `;

      const marker = L.marker([loc.lat, loc.lng], { icon: icon })
        .addTo(map)
        .bindPopup(popupHtml);

      // when popup opens, attach click listener to directions button
      marker.on('popupopen', (e: any) => {
        const popupNode = e.popup.getElement();
        if (!popupNode) return;
        const btn = popupNode.querySelector('.leaflet-dir-btn');
        if (btn) {
          btn.addEventListener('click', (ev: any) => {
            const lat = parseFloat(btn.getAttribute('data-lat'));
            const lng = parseFloat(btn.getAttribute('data-lng'));
            drawRoute(lat, lng);
          });
        }
      });

      markersRef.current.push(marker);
    });

    // If search query exists and we have results, pan to the first result
    if (searchQuery && filteredLocations.length > 0) {
      // Skip the "user" location if possible unless it's the only one, to focus on search results
      const target = filteredLocations.find(l => l.type !== 'user') || filteredLocations[0];
      map.flyTo([target.lat, target.lng], 16);
    } else if (!searchQuery) {
        // Reset to default if cleared
        map.flyTo([defaultLat, defaultLng], 15);
    }
    // Small safety: cleanup on effect rerun
    return () => {
      if (currentRoute && map && map.hasLayer(currentRoute)) map.removeLayer(currentRoute);
    };
  }, [interactive, searchQuery]);

  return (
    <div className={`relative w-full rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-gradient-to-br from-saffron-100 via-white to-indiaGreen-100 bg-[length:200%_200%] animate-gradient-move p-0.5 ${fullScreen ? 'h-[calc(100vh-180px)]' : 'h-[350px]'}`}>
        <div ref={mapContainerRef} className="w-full h-full z-0 relative bg-white/50 backdrop-blur-sm" />
        
        {/* Floating Controls (Top Right) */}
        <div className="absolute top-3 right-3 z-[400] flex flex-col gap-2">
            <button onClick={() => { if (mapInstanceRef.current) (mapInstanceRef.current as any).zoomIn(); }} className="bg-white p-2.5 rounded-xl shadow-lg text-wood-dark hover:bg-saffron-50 transition-colors active:scale-95 border-2 border-wood-light/20">
                <Plus size={18} className="text-brick" />
            </button>
            <button onClick={() => { if (mapInstanceRef.current) (mapInstanceRef.current as any).zoomOut(); }} className="bg-white p-2.5 rounded-xl shadow-lg text-wood-dark hover:bg-saffron-50 transition-colors active:scale-95 border-2 border-wood-light/20">
                <Minus size={18} className="text-brick" />
            </button>
        </div>
        
        {/* Route Info Overlay (Only show if not fullscreen map mode to keep map clean) */}
        {!fullScreen && (
          <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md p-3 rounded-xl shadow-xl border-2 border-wood-light/10 z-[400] flex items-center justify-between">
              <div className="flex items-center gap-3">
                  <div className="bg-saffron-100 p-2 rounded-full text-saffron-600 border border-saffron-200">
                      <Navigation size={20} fill="currentColor" className="opacity-20" strokeWidth={2.5} />
                  </div>
                  <div>
                      <h4 className="font-bold text-wood-darkest text-sm leading-tight">Hazratganj, Lucknow</h4>
                      <p className="text-[10px] text-wood font-medium tracking-wide uppercase">3 Vendors • 2 Spots</p>
                  </div>
              </div>
          </div>
        )}
    </div>
  );
};

export default VendorMap;
import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useQuickBite } from '../../context/QuickBiteContext.jsx';

/**
 * High-Density GPS Waypoints along authentic roads in Banjara Hills, Hyderabad:
 * From Restaurant (Road No. 12) -> Taj Krishna Circle -> Main Rd -> Jubilee Enclave -> Sunshine Towers
 */
export const TRACKING_ROUTE_WAYPOINTS = [
  { lat: 17.4182, lng: 78.4354, street: "Road No. 12 (Kitchen)", speed: 0, instruction: "Pick up food and depart from kitchen", maneuver: "depart" },
  { lat: 17.4190, lng: 78.4362, street: "Road No. 12", speed: 28, instruction: "Head north-east on Road No. 12", maneuver: "straight" },
  { lat: 17.4201, lng: 78.4374, street: "Road No. 12 Crossing", speed: 34, instruction: "Continue straight past Care Hospital", maneuver: "straight" },
  { lat: 17.4212, lng: 78.4388, street: "Approaching Taj Krishna", speed: 30, instruction: "In 100m, prepare to turn at junction", maneuver: "straight" },
  { lat: 17.4222, lng: 78.4402, street: "Taj Krishna Circle", speed: 20, instruction: "Turn right onto Banjara Hills Main Rd", maneuver: "turn-right" },
  { lat: 17.4236, lng: 78.4416, street: "Banjara Hills Main Rd", speed: 36, instruction: "Proceed along Main Road towards City Center", maneuver: "straight" },
  { lat: 17.4250, lng: 78.4429, street: "City Center Boulevard", speed: 38, instruction: "Pass City Center Mall on the right", maneuver: "straight" },
  { lat: 17.4265, lng: 78.4442, street: "Road No. 1 Intersection", speed: 32, instruction: "Cross Road No. 1 junction smoothly", maneuver: "straight" },
  { lat: 17.4280, lng: 78.4454, street: "KBR Park Avenue", speed: 35, instruction: "Turn slight left towards Jubilee Enclave", maneuver: "turn-left" },
  { lat: 17.4296, lng: 78.4466, street: "Jubilee Enclave Arch", speed: 26, instruction: "Pass through Jubilee Enclave security gate", maneuver: "straight" },
  { lat: 17.4312, lng: 78.4476, street: "Sunshine Towers Lane", speed: 18, instruction: "Turn right into Sunshine Towers complex", maneuver: "turn-right" },
  { lat: 17.4325, lng: 78.4485, street: "Flat 402, Sunshine Towers", speed: 0, instruction: "Arrived at customer doorstep! Ringing bell", maneuver: "arrive" }
];

// Helper: Haversine distance in km
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Helper: Bearing angle in degrees (0-360)
function calculateBearing(lat1, lon1, lat2, lon2) {
  const lat1Rad = (lat1 * Math.PI) / 180;
  const lon1Rad = (lon1 * Math.PI) / 180;
  const lat2Rad = (lat2 * Math.PI) / 180;
  const lon2Rad = (lon2 * Math.PI) / 180;
  const y = Math.sin(lon2Rad - lon1Rad) * Math.cos(lat2Rad);
  const x =
    Math.cos(lat1Rad) * Math.sin(lat2Rad) -
    Math.sin(lat1Rad) * Math.cos(lat2Rad) * Math.cos(lon2Rad - lon1Rad);
  return (Math.atan2(y, x) * 180 / Math.PI + 360) % 360;
}

export default function LiveTrackingMap({
  order,
  restaurant,
  rider,
  currentStepIndex = 0,
  onTelemetryUpdate,
  onCallRider,
  onChatRider
}) {
  const { theme } = useQuickBite();
  const mapContainerRef = useRef(null);
  const leafletMapRef = useRef(null);
  const leafletMarkersRef = useRef({});
  const leafletPolylineRef = useRef({});

  // View modes: 'voyager' (Swiggy/Uber light) | 'dark' (Night drive) | 'vector' (Pure Vector Canvas)
  const [mapTheme, setMapTheme] = useState('voyager');
  const [isLeafletReady, setIsLeafletReady] = useState(false);

  // Live GPS simulation state (0.0 = at restaurant, 1.0 = at customer doorstep)
  const [simProgress, setSimProgress] = useState(() => {
    if (order?.status === 'delivered') return 1.0;
    if (order?.status === 'out_for_delivery') return 0.55;
    if (order?.status === 'ready') return 0.25;
    if (order?.status === 'preparing') return 0.12;
    return 0.04;
  });

  const [isLiveStreamActive, setIsLiveStreamActive] = useState(true);
  const [simSpeed, setSimSpeed] = useState(1); // 1x, 2x, 4x
  const [lastBearing, setLastBearing] = useState(45);

  const isDelivered = order?.status === 'delivered';
  const isCancelled = order?.status === 'cancelled';
  const isOutForDelivery = order?.status === 'out_for_delivery';

  // Sync simulation progress when order status changes externally
  useEffect(() => {
    if (isDelivered) {
      setSimProgress(1.0);
    } else if (order?.status === 'out_for_delivery') {
      setSimProgress((prev) => (prev < 0.2 ? 0.35 : prev));
    } else if (order?.status === 'ready') {
      setSimProgress((prev) => (prev > 0.3 ? 0.28 : prev));
    }
  }, [order?.status, isDelivered]);

  // Current interpolated coordinates & telemetry
  const currentTelemetry = useMemo(() => {
    const totalWaypoints = TRACKING_ROUTE_WAYPOINTS.length;
    const scaled = simProgress * (totalWaypoints - 1);
    const index = Math.min(Math.floor(scaled), totalWaypoints - 2);
    const fraction = scaled - index;

    const p1 = TRACKING_ROUTE_WAYPOINTS[index];
    const p2 = TRACKING_ROUTE_WAYPOINTS[index + 1] || p1;

    const lat = p1.lat + (p2.lat - p1.lat) * fraction;
    const lng = p1.lng + (p2.lng - p1.lng) * fraction;

    const bearing = calculateBearing(p1.lat, p1.lng, p2.lat, p2.lng);

    // Compute remaining distance
    const dest = TRACKING_ROUTE_WAYPOINTS[totalWaypoints - 1];
    const remainingKm = Math.max(0, calculateDistance(lat, lng, dest.lat, dest.lng));
    const etaMins = Math.max(1, Math.round(remainingKm * 3.5 + (isDelivered ? 0 : 2)));

    // Fluctuating realistic speed based on road and speed multiplier
    const currentSpeed = isDelivered ? 0 : Math.round((p1.speed + (p2.speed - p1.speed) * fraction) * (0.95 + Math.random() * 0.1));

    return {
      lat,
      lng,
      bearing,
      street: p1.street,
      instruction: p2.instruction || p1.instruction,
      maneuver: p2.maneuver || "straight",
      remainingKm: Number(remainingKm.toFixed(2)),
      etaMins,
      speed: currentSpeed,
      progressPct: Math.round(simProgress * 100)
    };
  }, [simProgress, isDelivered]);

  // Propagate telemetry up to parent if callback provided
  useEffect(() => {
    if (onTelemetryUpdate) {
      onTelemetryUpdate(currentTelemetry);
    }
  }, [currentTelemetry, onTelemetryUpdate]);

  // Track bearing angle changes smoothly
  useEffect(() => {
    if (currentTelemetry.bearing !== undefined && !isNaN(currentTelemetry.bearing)) {
      setLastBearing(currentTelemetry.bearing);
    }
  }, [currentTelemetry.bearing]);

  // Live GPS simulation loop
  useEffect(() => {
    if (!isLiveStreamActive || isDelivered || isCancelled) return;

    const interval = setInterval(() => {
      setSimProgress((prev) => {
        // Slow speed for realistic gliding, scaled by simSpeed
        const increment = 0.0035 * simSpeed;
        const next = prev + increment;
        if (next >= 1.0) {
          return 1.0;
        }
        return next;
      });
    }, 600);

    return () => clearInterval(interval);
  }, [isLiveStreamActive, isDelivered, isCancelled, simSpeed]);

  // Initialize & configure Leaflet map
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const initLeaflet = () => {
      if (!window.L || !mapContainerRef.current) return;
      if (leafletMapRef.current) return; // already initialized

      try {
        const L = window.L;
        const startPoint = [TRACKING_ROUTE_WAYPOINTS[0].lat, TRACKING_ROUTE_WAYPOINTS[0].lng];

        const map = L.map(mapContainerRef.current, {
          center: [17.425, 78.441],
          zoom: 15,
          zoomControl: false,
          attributionControl: false
        });

        // Add custom sleek zoom controls to bottom-right
        L.control.zoom({ position: 'bottomright' }).addTo(map);

        // Inject simple CSS for custom controls
        const ctrlStyle = document.createElement('style');
        ctrlStyle.innerHTML = `.leaflet-control-recenter button, .leaflet-control-fit button { background: #fff; border: 1px solid #ccc; border-radius:4px; width:30px; height:30px; line-height:30px; text-align:center; font-size:1.2rem; cursor:pointer; }`;
        document.head.appendChild(ctrlStyle);





        // Custom control: Recenter on Rider
        const RecenterControl = L.Control.extend({
          onAdd: function () {
            const btn = L.DomUtil.create('button', 'leaflet-control-recenter');
            btn.title = 'Recenter on Rider';
            btn.innerHTML = '🔁';
            L.DomEvent.on(btn, 'click', (e) => {
              L.DomEvent.stopPropagation(e);
              handleRecenterRider();
            });
            return btn;
          }
        });
        // Custom control: Fit Route
        const FitControl = L.Control.extend({
          onAdd: function () {
            const btn = L.DomUtil.create('button', 'leaflet-control-fit');
            btn.title = 'Fit Entire Route';
            btn.innerHTML = '📍';
            L.DomEvent.on(btn, 'click', (e) => {
              L.DomEvent.stopPropagation(e);
              handleFitRoute();
            });
            return btn;
          }
        });
        new RecenterControl({ position: 'topright' }).addTo(map);
        new FitControl({ position: 'topright' }).addTo(map);

        // CartoDB Voyager Tile Layer (Modern Uber/Swiggy clean vector map style)
        const tileUrl = mapTheme === 'dark'
          ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
          : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

        const tileLayer = L.tileLayer(tileUrl, {
          maxZoom: 19,
          subdomains: 'abcd'
        }).addTo(map);

        // 1. Full Road Route Polyline (Glow trail + inner route line)
        const latLngs = TRACKING_ROUTE_WAYPOINTS.map((w) => [w.lat, w.lng]);

        // Base road background (soft gray)
        const baseRoad = L.polyline(latLngs, {
          color: '#4B5563',
          weight: 8,
          opacity: 0.4,
          lineCap: 'round',
          lineJoin: 'round'
        }).addTo(map);

        // Highlighted route (glow)
        const glowLine = L.polyline(latLngs, {
          color: '#FF5A26',
          weight: 10,
          opacity: 0.35,
          lineCap: 'round',
          lineJoin: 'round'
        }).addTo(map);

        // Dashed inner route line
        const routeLine = L.polyline(latLngs, {
          color: '#FF5A26',
          weight: 4,
          dashArray: '8, 8',
          lineCap: 'round',
          lineJoin: 'round'
        }).addTo(map);

        // 2. Traveled Path Polyline (Solid green/orange)
        const traveledLine = L.polyline([latLngs[0]], {
          color: '#10B981',
          weight: 5,
          lineCap: 'round',
          lineJoin: 'round'
        }).addTo(map);

        // 3. Restaurant Marker
        const restIcon = L.divIcon({
          className: 'custom-map-pin-rest',
          html: `
            <div style="position: relative; text-align: center;">
              <div style="width: 44px; height: 44px; border-radius: 50%; background: #10B981; border: 3px solid #FFF; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 14px rgba(16,185,129,0.6); color: #FFF; font-size: 1.2rem;">
                <i class="fa-solid fa-utensils"></i>
              </div>
              <div style="margin-top: 4px; background: #0F172A; color: #FFF; font-size: 0.7rem; font-weight: 800; padding: 2px 8px; border-radius: 6px; white-space: nowrap; border: 1px solid rgba(255,255,255,0.2);">
                ${restaurant?.name || 'Restaurant Kitchen'}
              </div>
            </div>
          `,
          iconSize: [40, 60],
          iconAnchor: [20, 50]
        });
        const restMarker = L.marker([TRACKING_ROUTE_WAYPOINTS[0].lat, TRACKING_ROUTE_WAYPOINTS[0].lng], { icon: restIcon }).addTo(map);

        // 4. Customer Destination Marker
        const destCoord = TRACKING_ROUTE_WAYPOINTS[TRACKING_ROUTE_WAYPOINTS.length - 1];
        const destIcon = L.divIcon({
          className: 'custom-map-pin-dest',
          html: `
            <div style="position: relative; text-align: center;">
              <div style="width: 40px; height: 40px; border-radius: 50%; background: #0284C7; border: 3px solid #FFF; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 14px rgba(2,132,199,0.6); color: #FFF; font-size: 1rem;">
                <i class="fa-solid fa-house"></i>
              </div>
              <div style="margin-top: 4px; background: #0F172A; color: #FFF; font-size: 0.7rem; font-weight: 800; padding: 2px 8px; border-radius: 6px; white-space: nowrap; border: 1px solid rgba(255,255,255,0.2);">
                Your Delivery Address
              </div>
            </div>
          `,
          iconSize: [40, 60],
          iconAnchor: [20, 50]
        });
        const destMarker = L.marker([destCoord.lat, destCoord.lng], { icon: destIcon }).addTo(map);

        // 5. Rider Delivery Marker
        const riderIcon = L.divIcon({
          className: 'custom-map-pin-rider',
          html: `
            <div id="leaflet-rider-wrapper" style="position: relative; display: flex; flex-direction: column; align-items: center; justify-content: center;">
              <div style="position: absolute; width: 60px; height: 60px; border-radius: 50%; background: rgba(255,90,38,0.25); animation: pulse-radar 1.6s infinite;"></div>
              <div id="leaflet-rider-avatar" style="width: 48px; height: 48px; border-radius: 50%; background: #FF5A26; border: 3px solid #FFFFFF; display: flex; align-items: center; justify-content: center; color: #FFFFFF; font-size: 1.3rem; box-shadow: 0 6px 20px rgba(255,90,38,0.6); z-index: 2; transition: transform 0.3s ease;">
                <i class="fa-solid fa-motorcycle"></i>
              </div>
              <div id="leaflet-rider-tag" style="margin-top: 6px; background: #0F172A; color: #FF5A26; font-size: 0.7rem; font-weight: 800; padding: 3px 10px; border-radius: 9999px; border: 1.5px solid #FF5A26; white-space: nowrap; z-index: 2; box-shadow: 0 4px 10px rgba(0,0,0,0.3);">
                ${rider?.name?.split(' ')[0] || 'Vikram'} • 32 km/h
              </div>
            </div>
          `,
          iconSize: [60, 80],
          iconAnchor: [30, 45]
        });
        const riderMarker = L.marker([startPoint[0], startPoint[1]], { icon: riderIcon }).addTo(map);

        // Fit map bounds to encompass whole route comfortably
        map.fitBounds(L.latLngBounds(latLngs), { padding: [60, 60] });

        leafletMapRef.current = map;
        leafletMarkersRef.current = { restMarker, destMarker, riderMarker, tileLayer };
        leafletPolylineRef.current = { glowLine, routeLine, traveledLine };
        setIsLeafletReady(true);
      } catch (err) {
        console.warn('Leaflet initialization fallback to Vector Engine:', err);
      }
    };

    if (window.L) {
      initLeaflet();
    } else {
      const timer = setInterval(() => {
        if (window.L) {
          initLeaflet();
          clearInterval(timer);
        }
      }, 250);
      return () => clearInterval(timer);
    }

    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  }, []);

  // Update Leaflet marker position & traveled line smoothly
  useEffect(() => {
    if (!leafletMapRef.current || !leafletMarkersRef.current.riderMarker) return;

    try {
      const { riderMarker } = leafletMarkersRef.current;
      const { traveledLine } = leafletPolylineRef.current;

      const newLatLng = [currentTelemetry.lat, currentTelemetry.lng];
      riderMarker.setLatLng(newLatLng);

      // Rotate bike icon in DOM
      const avatarEl = document.getElementById('leaflet-rider-avatar');
      if (avatarEl) {
        avatarEl.style.transform = `rotate(${lastBearing - 45}deg)`;
      }

      const tagEl = document.getElementById('leaflet-rider-tag');
      if (tagEl) {
        tagEl.innerHTML = isDelivered
          ? '🎉 Arrived at Doorstep!'
          : `${rider?.name?.split(' ')[0] || 'Vikram'} • ${currentTelemetry.speed} km/h`;
      }

      // Update traveled polyline
      const totalWaypoints = TRACKING_ROUTE_WAYPOINTS.length;
      const currentIndex = Math.min(Math.floor(simProgress * (totalWaypoints - 1)), totalWaypoints - 1);
      const passedPoints = TRACKING_ROUTE_WAYPOINTS.slice(0, currentIndex + 1).map((w) => [w.lat, w.lng]);
      passedPoints.push(newLatLng);

      if (traveledLine) {
        traveledLine.setLatLngs(passedPoints);
      }
    } catch (e) {
      // Ignore transient errors
    }
  }, [currentTelemetry, lastBearing, simProgress, isDelivered, rider?.name]);

  // Update map tile theme
  useEffect(() => {
    if (!leafletMapRef.current || !leafletMarkersRef.current.tileLayer || !window.L) return;

    try {
      leafletMapRef.current.removeLayer(leafletMarkersRef.current.tileLayer);
      const newUrl = mapTheme === 'dark'
        ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
        : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

      const newTileLayer = window.L.tileLayer(newUrl, {
        maxZoom: 19,
        subdomains: 'abcd'
      }).addTo(leafletMapRef.current);

      leafletMarkersRef.current.tileLayer = newTileLayer;
    } catch (e) {}
  }, [mapTheme]);

  // Center on rider action
  const handleRecenterRider = () => {
    if (leafletMapRef.current) {
      leafletMapRef.current.setView([currentTelemetry.lat, currentTelemetry.lng], 16, {
        animate: true,
        duration: 0.8
      });
    }
  };

  // Fit entire route action
  const handleFitRoute = () => {
    if (leafletMapRef.current && window.L) {
      const latLngs = TRACKING_ROUTE_WAYPOINTS.map((w) => [w.lat, w.lng]);
      leafletMapRef.current.fitBounds(window.L.latLngBounds(latLngs), {
        padding: [60, 60],
        animate: true
      });
    }
  };

  // Turn maneuver icon helper
  const getManeuverIcon = (maneuver) => {
    switch (maneuver) {
      case 'turn-right': return 'fa-solid fa-arrow-turn-down fa-rotate-270';
      case 'turn-left': return 'fa-solid fa-arrow-turn-up fa-rotate-270';
      case 'arrive': return 'fa-solid fa-location-dot';
      default: return 'fa-solid fa-arrow-up';
    }
  };

  return (
    <div
      style={{
        position: 'relative',
        height: '460px',
        borderRadius: 'var(--radius-lg, 18px)',
        overflow: 'hidden',
        marginBottom: '24px',
        border: '1px solid var(--color-border)',
        boxShadow: '0 12px 36px rgba(0, 0, 0, 0.16)',
        background: mapTheme === 'dark' ? '#090D16' : '#F1F5F9'
      }}
    >
      {/* 1. Leaflet Interactive Map Container */}
      <div
        ref={mapContainerRef}
        style={{
          width: '100%',
          height: '100%',
          display: mapTheme === 'vector' ? 'none' : 'block',
          zIndex: 1
        }}
      />

      {/* 2. High-Fidelity Vector Street Canvas Engine (Active in 'vector' mode or as instant fallback) */}
      {(!isLeafletReady || mapTheme === 'vector') && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: theme === 'dark' ? '#0F172A' : '#E8EDF2',
            overflow: 'hidden',
            zIndex: 1
          }}
        >
          {/* Detailed Street Grid Background */}
          <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
            <defs>
              <pattern id="cityGrid" width="60" height="60" patternUnits="userSpaceOnUse">
                <rect width="60" height="60" fill="none" />
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke={theme === 'dark' ? '#1E293B' : '#CBD5E1'} strokeWidth="1" strokeDasharray="3,3" />
              </pattern>
              <filter id="vectorGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="2" stdDeviation="5" floodColor="#FF5A26" floodOpacity="0.45" />
              </filter>
            </defs>

            <rect width="100%" height="100%" fill="url(#cityGrid)" />

            {/* City Landmarks: Green Park Zone (KBR National Park) */}
            <path
              d="M 50% 10% Q 70% 5%, 85% 25% T 65% 50% Z"
              fill={theme === 'dark' ? 'rgba(16, 185, 129, 0.12)' : 'rgba(16, 185, 129, 0.2)'}
              stroke="rgba(16, 185, 129, 0.35)"
              strokeWidth="2"
            />
            <text x="68%" y="28%" fill={theme === 'dark' ? '#34D399' : '#059669'} fontSize="11" fontWeight="700" letterSpacing="0.5">
              🌲 KBR National Park
            </text>

            {/* Arterial Roads in Banjara Hills */}
            <path d="M 0 75% Q 30% 65%, 45% 55% T 85% 30% L 100% 25%" fill="none" stroke={theme === 'dark' ? '#334155' : '#CBD5E1'} strokeWidth="28" strokeLinecap="round" />
            <path d="M 0 75% Q 30% 65%, 45% 55% T 85% 30% L 100% 25%" fill="none" stroke={theme === 'dark' ? '#1E293B' : '#FFFFFF'} strokeWidth="22" strokeLinecap="round" />

            {/* Road Label: Road No. 12 */}
            <text x="18%" y="72%" fill={theme === 'dark' ? '#94A3B8' : '#64748B'} fontSize="11" fontWeight="700" transform="rotate(-15, 120, 300)">
              Road No. 12
            </text>

            {/* Road Label: Taj Krishna Circle */}
            <text x="42%" y="50%" fill={theme === 'dark' ? '#94A3B8' : '#64748B'} fontSize="11" fontWeight="700">
              Taj Krishna Circle
            </text>

            {/* Road Label: Jubilee Enclave */}
            <text x="70%" y="36%" fill={theme === 'dark' ? '#94A3B8' : '#64748B'} fontSize="11" fontWeight="700">
              Jubilee Enclave
            </text>

            {/* Active Delivery Route Corridor (Glow + Dash) */}
            <path
              d="M 18% 78% L 32% 66% L 45% 55% L 62% 43% L 82% 31%"
              fill="none"
              stroke="rgba(255, 90, 38, 0.3)"
              strokeWidth="12"
              strokeLinecap="round"
            />
            <path
              d="M 18% 78% L 32% 66% L 45% 55% L 62% 43% L 82% 31%"
              fill="none"
              stroke="#FF5A26"
              strokeWidth="4"
              strokeDasharray={isDelivered ? 'none' : '8,6'}
              filter="url(#vectorGlow)"
            />
          </svg>

          {/* Restaurant Pin on Vector Map */}
          <div style={{ position: 'absolute', left: '18%', top: '78%', transform: 'translate(-50%, -100%)', textAlign: 'center', pointerEvents: 'none' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#10B981', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', boxShadow: '0 4px 14px rgba(16,185,129,0.5)', border: '3px solid #FFF', margin: '0 auto 4px' }}>
              <i className="fa-solid fa-utensils"></i>
            </div>
            <div style={{ background: '#0F172A', color: '#FFF', fontSize: '0.7rem', fontWeight: 800, padding: '2px 8px', borderRadius: '6px', whiteSpace: 'nowrap', border: '1px solid rgba(255,255,255,0.2)' }}>
              {restaurant?.name || 'Restaurant Kitchen'}
            </div>
          </div>

          {/* Customer Destination Pin on Vector Map */}
          <div style={{ position: 'absolute', left: '82%', top: '31%', transform: 'translate(-50%, -100%)', textAlign: 'center', pointerEvents: 'none' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#0284C7', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', boxShadow: '0 4px 14px rgba(2,132,199,0.5)', border: '3px solid #FFF', margin: '0 auto 4px' }}>
              <i className="fa-solid fa-house"></i>
            </div>
            <div style={{ background: '#0F172A', color: '#FFF', fontSize: '0.7rem', fontWeight: 800, padding: '2px 8px', borderRadius: '6px', whiteSpace: 'nowrap', border: '1px solid rgba(255,255,255,0.2)' }}>
              Your Delivery Address
            </div>
          </div>

          {/* Moving Rider Scooter Marker on Vector Map */}
          <div
            style={{
              position: 'absolute',
              left: `${18 + (82 - 18) * simProgress}%`,
              top: `${78 + (31 - 78) * simProgress}%`,
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              pointerEvents: 'none',
              transition: 'all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)'
            }}
          >
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(255,90,38,0.3)', animation: 'pulse-radar 1.5s infinite' }} />
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#FF5A26', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', boxShadow: '0 6px 20px rgba(255,90,38,0.7)', border: '3px solid #FFF', margin: '0 auto', transform: `rotate(${lastBearing - 45}deg)`, transition: 'transform 0.4s ease', zIndex: 2 }}>
              <i className="fa-solid fa-motorcycle"></i>
            </div>
            <div style={{ background: '#0F172A', color: '#FF5A26', fontSize: '0.72rem', fontWeight: 800, padding: '3px 10px', borderRadius: '9999px', border: '1.5px solid #FF5A26', whiteSpace: 'nowrap', marginTop: '6px', zIndex: 2, position: 'relative' }}>
              {isDelivered ? 'Arrived at Doorstep!' : `${rider?.name?.split(' ')[0] || 'Vikram'} • ${currentTelemetry.speed} km/h`}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          3. FLOATING TOP HUD: REAL-TIME ETA, TURN MANEUVER & TELEMETRY
          ========================================================================= */}
      <div
        style={{
          position: 'absolute',
          top: '16px',
          left: '16px',
          zIndex: 20,
          background: theme === 'dark' ? 'rgba(15, 23, 42, 0.92)' : 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(14px)',
          border: '1px solid var(--color-border)',
          borderRadius: '16px',
          padding: '12px 18px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.18)',
          maxWidth: '360px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}
      >
        {/* Status Header with Pulsing Live Dot */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: isDelivered ? '#10B981' : '#FF5A26',
                boxShadow: `0 0 10px ${isDelivered ? '#10B981' : '#FF5A26'}`,
                animation: isDelivered ? 'none' : 'qbPulse 1.2s infinite'
              }}
            />
            <span
              style={{
                fontSize: '0.72rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.6px',
                color: isDelivered ? '#10B981' : 'var(--color-primary)'
              }}
            >
              {isDelivered ? 'Order Delivered' : isOutForDelivery ? 'Live GPS Navigation' : 'Kitchen Dispatched'}
            </span>
          </div>

          <span
            style={{
              fontSize: '0.72rem',
              fontWeight: 700,
              color: '#10B981',
              background: 'rgba(16, 185, 129, 0.12)',
              padding: '2px 8px',
              borderRadius: '9999px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <i className="fa-solid fa-satellite-dish"></i> 4G LTE
          </span>
        </div>

        {/* Big Dynamic ETA Title */}
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--color-text-main)', lineHeight: 1.1 }}>
            {isDelivered
              ? 'Arrived at your door'
              : `Arriving in ${currentTelemetry.etaMins} mins`}
          </div>
          {!isDelivered && (
            <div style={{ fontSize: '0.825rem', fontWeight: 700, color: 'var(--color-primary)' }}>
              {currentTelemetry.remainingKm} km left
            </div>
          )}
        </div>

        {/* Turn-by-Turn Maneuver Pill (Uber / Google Maps style) */}
        {!isDelivered && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: theme === 'dark' ? 'rgba(30, 41, 59, 0.8)' : 'rgba(241, 245, 249, 0.9)',
              padding: '8px 12px',
              borderRadius: '10px',
              border: '1px solid var(--color-border-subtle, rgba(0,0,0,0.08))'
            }}
          >
            <div
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '8px',
                background: 'var(--color-primary)',
                color: '#FFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.85rem',
                flexShrink: 0
              }}
            >
              <i className={getManeuverIcon(currentTelemetry.maneuver)}></i>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '0.785rem', fontWeight: 700, color: 'var(--color-text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {currentTelemetry.instruction}
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>{currentTelemetry.street}</span>
                <span>•</span>
                <span style={{ color: '#10B981' }}>Clear Traffic</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* =========================================================================
          4. FLOATING TOP-RIGHT CONTROLS: THEME, RECENTER & FIT ROUTE
          ========================================================================= */}
      <div
        style={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          zIndex: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '8px'
        }}
      >
        {/* Map Style Switcher (Voyager / Night / Vector) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            background: theme === 'dark' ? 'rgba(15, 23, 42, 0.94)' : 'rgba(255, 255, 255, 0.96)',
            backdropFilter: 'blur(10px)',
            border: '1px solid var(--color-border)',
            borderRadius: '9999px',
            padding: '3px 5px',
            boxShadow: '0 4px 14px rgba(0,0,0,0.12)'
          }}
        >
          <button
            type="button"
            onClick={() => setMapTheme('voyager')}
            style={{
              border: 'none',
              background: mapTheme === 'voyager' ? 'var(--color-primary)' : 'transparent',
              color: mapTheme === 'voyager' ? '#FFFFFF' : 'var(--color-text-main)',
              padding: '5px 10px',
              borderRadius: '9999px',
              fontSize: '0.72rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              transition: 'all 0.15s ease'
            }}
            title="CartoDB Voyager Street Map"
          >
            <i className="fa-solid fa-sun"></i> Day
          </button>

          <button
            type="button"
            onClick={() => setMapTheme('dark')}
            style={{
              border: 'none',
              background: mapTheme === 'dark' ? 'var(--color-primary)' : 'transparent',
              color: mapTheme === 'dark' ? '#FFFFFF' : 'var(--color-text-main)',
              padding: '5px 10px',
              borderRadius: '9999px',
              fontSize: '0.72rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              transition: 'all 0.15s ease'
            }}
            title="CartoDB Dark Matter Night Drive"
          >
            <i className="fa-solid fa-moon"></i> Night
          </button>

          <button
            type="button"
            onClick={() => setMapTheme('vector')}
            style={{
              border: 'none',
              background: mapTheme === 'vector' ? 'var(--color-primary)' : 'transparent',
              color: mapTheme === 'vector' ? '#FFFFFF' : 'var(--color-text-main)',
              padding: '5px 10px',
              borderRadius: '9999px',
              fontSize: '0.72rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              transition: 'all 0.15s ease'
            }}
            title="Vector Landmark Street Map"
          >
            <i className="fa-solid fa-draw-polygon"></i> Vector
          </button>
        </div>

        {/* Quick Camera Navigation Action Buttons */}
        <div style={{ display: 'flex', gap: '6px' }}>
          <button
            type="button"
            onClick={handleRecenterRider}
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              background: theme === 'dark' ? 'rgba(15, 23, 42, 0.94)' : '#FFFFFF',
              border: '1px solid var(--color-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-primary)',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              fontSize: '0.95rem'
            }}
            title="Center Camera on Delivery Rider"
          >
            <i className="fa-solid fa-crosshairs"></i>
          </button>

          <button
            type="button"
            onClick={handleFitRoute}
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              background: theme === 'dark' ? 'rgba(15, 23, 42, 0.94)' : '#FFFFFF',
              border: '1px solid var(--color-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-text-main)',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              fontSize: '0.95rem'
            }}
            title="View Full Delivery Route"
          >
            <i className="fa-solid fa-expand"></i>
          </button>
        </div>
      </div>

      {/* =========================================================================
          5. FLOATING BOTTOM TELEMETRY DOCK: SPEEDOMETER, STREAM TOGGLE & RIDER CALL
          ========================================================================= */}
      <div
        style={{
          position: 'absolute',
          bottom: '14px',
          left: '16px',
          right: '16px',
          zIndex: 20,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '10px',
          pointerEvents: 'none'
        }}
      >
        {/* Left: Speedometer & Telemetry Badge */}
        <div
          style={{
            pointerEvents: 'auto',
            background: 'rgba(15, 23, 42, 0.92)',
            backdropFilter: 'blur(10px)',
            color: '#FFFFFF',
            borderRadius: '9999px',
            padding: '6px 16px',
            fontSize: '0.75rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            boxShadow: '0 6px 18px rgba(0,0,0,0.35)',
            border: '1px solid rgba(255,255,255,0.12)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <i className="fa-solid fa-gauge-high" style={{ color: '#FF5A26' }}></i>
            <span style={{ fontSize: '0.85rem', fontWeight: 800 }}>{currentTelemetry.speed}</span>
            <span style={{ fontSize: '0.65rem', color: '#94A3B8' }}>km/h</span>
          </div>

          <span style={{ color: '#475569' }}>|</span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <i className="fa-solid fa-road" style={{ color: '#10B981' }}></i>
            <span>{currentTelemetry.street}</span>
          </div>

          <span style={{ color: '#475569' }}>|</span>

          <div style={{ color: '#38BDF8', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <i className="fa-solid fa-shield-halved"></i>
            <span>Thermal 68°C</span>
          </div>
        </div>

        {/* Right: Simulation Speed & Controls */}
        <div
          style={{
            pointerEvents: 'auto',
            background: 'rgba(15, 23, 42, 0.92)',
            backdropFilter: 'blur(10px)',
            color: '#FFFFFF',
            borderRadius: '9999px',
            padding: '4px 10px',
            fontSize: '0.72rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 6px 18px rgba(0,0,0,0.35)',
            border: '1px solid rgba(255,255,255,0.12)'
          }}
        >
          {/* Play / Pause Live Stream */}
          <button
            type="button"
            onClick={() => setIsLiveStreamActive(!isLiveStreamActive)}
            style={{
              background: isLiveStreamActive ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
              color: isLiveStreamActive ? '#34D399' : '#F87171',
              border: isLiveStreamActive ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid rgba(239, 68, 68, 0.4)',
              borderRadius: '9999px',
              padding: '3px 8px',
              fontSize: '0.68rem',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}
            title={isLiveStreamActive ? 'Pause real-time GPS stream' : 'Resume real-time GPS stream'}
          >
            <i className={`fa-solid ${isLiveStreamActive ? 'fa-pause' : 'fa-play'}`}></i>
            {isLiveStreamActive ? 'GPS Live' : 'Paused'}
          </button>

          {/* Speed Multiplier Pill */}
          <button
            type="button"
            onClick={() => setSimSpeed((s) => (s === 1 ? 2 : s === 2 ? 4 : 1))}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '9999px',
              padding: '3px 8px',
              fontSize: '0.68rem',
              fontWeight: 800,
              cursor: 'pointer'
            }}
            title="Adjust GPS simulation speed"
          >
            {simSpeed}x Speed
          </button>

          {/* Quick Action Buttons on Map */}
          {onCallRider && (
            <button
              type="button"
              onClick={onCallRider}
              style={{
                background: '#10B981',
                color: '#FFF',
                border: 'none',
                borderRadius: '9999px',
                padding: '4px 10px',
                fontSize: '0.7rem',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px'
              }}
              title="Call Rider directly from map"
            >
              <i className="fa-solid fa-phone"></i> Call
            </button>
          )}

          {onChatRider && (
            <button
              type="button"
              onClick={onChatRider}
              style={{
                background: 'var(--color-primary)',
                color: '#FFF',
                border: 'none',
                borderRadius: '9999px',
                padding: '4px 10px',
                fontSize: '0.7rem',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px'
              }}
              title="Message rider directly from map"
            >
              <i className="fa-regular fa-comment-dots"></i> Chat
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

import { useEffect, useRef, useState, useCallback } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MapPin, Loader2, Navigation, AlertTriangle } from "lucide-react";

type Branch = {
  name: string;
  address: string;
  lat: number;
  lng: number;
};

const BRANCHES: Branch[] = [
  {
    name: "PIA Road Branch",
    address: "9-D PIA Road, Main Blvd, near Wapda Town",
    lat: 31.44530798235614,
    lng: 74.2806119771848,
  },
  {
    name: "Khayaban-e-Amin Branch",
    address: "94 Pine Ave, Block B, Khayaban E Amin",
    lat: 31.3809727527684,
    lng: 74.25553485857607,
  },
];

const DELIVERY_RADIUS_KM = 10;
const LAHORE_CENTER = { lat: 31.41, lng: 74.27 };

export type DeliveryLocation = {
  lat: number;
  lng: number;
  address: string;
  nearestBranch: string;
  branchAddress: string;
};

function haversineDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function getNearestBranch(lat: number, lng: number) {
  let nearest = BRANCHES[0];
  let minDist = Infinity;
  for (const b of BRANCHES) {
    const d = haversineDistance(lat, lng, b.lat, b.lng);
    if (d < minDist) {
      minDist = d;
      nearest = b;
    }
  }
  return { branch: nearest, distance: minDist };
}

// Custom pin icon
const pinIcon = L.divIcon({
  className: "",
  html: `<div style="display:flex;flex-direction:column;align-items:center;pointer-events:none;">
    <svg width="40" height="50" viewBox="0 0 40 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 0C9 0 0 9 0 20c0 15 20 30 20 30s20-15 20-30C40 9 31 0 20 0z" fill="hsl(7,95%,36%)"/>
      <circle cx="20" cy="18" r="8" fill="white"/>
    </svg>
  </div>`,
  iconSize: [40, 50],
  iconAnchor: [20, 50],
});

const branchIcon = L.divIcon({
  className: "",
  html: `<div style="display:flex;flex-direction:column;align-items:center;">
    <div style="background:hsl(32,60%,50%);color:white;border-radius:50%;width:32px;height:32px;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:14px;border:2px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3);">D</div>
  </div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: (location: DeliveryLocation) => void;
};

export default function DeliveryLocationModal({ open, onClose, onConfirm }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMap = useRef<L.Map | null>(null);
  const centerMarker = useRef<L.Marker | null>(null);
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [withinRange, setWithinRange] = useState(true);
  const [nearestInfo, setNearestInfo] = useState<{ branch: Branch; distance: number } | null>(null);
  const [coords, setCoords] = useState<{ lat: number; lng: number }>(LAHORE_CENTER);
  const abortRef = useRef<AbortController | null>(null);
  const [mapReady, setMapReady] = useState(false);

  const reverseGeocode = useCallback(async (lat: number, lng: number) => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    setLoading(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
        { signal: controller.signal }
      );
      const data = await res.json();
      const addr = data.display_name || "Unknown location";
      setAddress(addr);
    } catch (e: any) {
      if (e.name !== "AbortError") setAddress("Could not detect address");
    } finally {
      if (!controller.signal.aborted) setLoading(false);
    }
  }, []);

  const updateLocation = useCallback(
    (lat: number, lng: number) => {
      setCoords({ lat, lng });
      const info = getNearestBranch(lat, lng);
      setNearestInfo(info);
      setWithinRange(info.distance <= DELIVERY_RADIUS_KM);
      reverseGeocode(lat, lng);
    },
    [reverseGeocode]
  );

  useEffect(() => {
    if (!open || !mapRef.current) return;
    if (leafletMap.current) return;

    const map = L.map(mapRef.current, {
      center: [LAHORE_CENTER.lat, LAHORE_CENTER.lng],
      zoom: 13,
      zoomControl: false,
    });

    L.control.zoom({ position: "bottomright" }).addTo(map);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>',
      maxZoom: 19,
    }).addTo(map);

    // Branch markers & radius circles
    BRANCHES.forEach((b) => {
      L.marker([b.lat, b.lng], { icon: branchIcon })
        .addTo(map)
        .bindPopup(`<strong>${b.name}</strong><br/>${b.address}`);
      L.circle([b.lat, b.lng], {
        radius: DELIVERY_RADIUS_KM * 1000,
        color: "hsl(7,95%,36%)",
        fillColor: "hsl(7,95%,36%)",
        fillOpacity: 0.07,
        weight: 1.5,
        dashArray: "6 4",
      }).addTo(map);
    });

    // Center pin marker
    const marker = L.marker(map.getCenter(), { icon: pinIcon, zIndexOffset: 1000 }).addTo(map);
    centerMarker.current = marker;

    map.on("move", () => {
      const c = map.getCenter();
      marker.setLatLng(c);
    });

    map.on("moveend", () => {
      const c = map.getCenter();
      updateLocation(c.lat, c.lng);
    });

    leafletMap.current = map;

    // Try geolocation
    navigator.geolocation?.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        map.setView([latitude, longitude], 15);
      },
      () => {
        // Fallback: stay at Lahore center
        updateLocation(LAHORE_CENTER.lat, LAHORE_CENTER.lng);
      }
    );

    updateLocation(LAHORE_CENTER.lat, LAHORE_CENTER.lng);

    // Fix tile rendering after dialog animation
    setTimeout(() => map.invalidateSize(), 100);
    setTimeout(() => map.invalidateSize(), 400);
    setTimeout(() => map.invalidateSize(), 800);

    return () => {};
  }, [open, updateLocation]);

  // Cleanup on close
  useEffect(() => {
    if (!open && leafletMap.current) {
      leafletMap.current.remove();
      leafletMap.current = null;
      centerMarker.current = null;
    }
  }, [open]);

  const handleLocateMe = () => {
    navigator.geolocation?.getCurrentPosition(
      (pos) => {
        leafletMap.current?.setView([pos.coords.latitude, pos.coords.longitude], 16);
      },
      () => {
        // permission denied
      }
    );
  };

  const handleConfirm = () => {
    if (!withinRange || !nearestInfo) return;
    onConfirm({
      lat: coords.lat,
      lng: coords.lng,
      address,
      nearestBranch: nearestInfo.branch.name,
      branchAddress: nearestInfo.branch.address,
    });
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-lg p-0 overflow-hidden gap-0 rounded-2xl sm:max-w-md max-h-[95vh]">
        <DialogTitle className="sr-only">Select Delivery Location</DialogTitle>

        {/* Header */}
        <div className="flex items-center gap-2 border-b border-border px-4 py-3 bg-card">
          <MapPin className="h-5 w-5 text-primary" />
          <h2 className="text-base font-bold text-card-foreground">Select Delivery Location</h2>
        </div>

        {/* Map */}
        <div className="relative w-full" style={{ height: "55vh", minHeight: 280 }}>
          <div ref={mapRef} className="h-full w-full" />
          {/* Locate me button */}
          <button
            onClick={handleLocateMe}
            className="absolute top-3 right-3 z-[1000] rounded-full bg-card p-2.5 shadow-lg border border-border hover:bg-secondary transition-colors"
            title="Use my location"
          >
            <Navigation className="h-5 w-5 text-primary" />
          </button>
        </div>

        {/* Address info */}
        <div className="px-4 py-3 space-y-2 bg-card border-t border-border">
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
            <div className="min-w-0 flex-1">
              {loading ? (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  Detecting address...
                </div>
              ) : (
                <p className="text-sm text-card-foreground leading-snug line-clamp-2">{address}</p>
              )}
            </div>
          </div>

          {nearestInfo && (
            <p className="text-xs text-muted-foreground">
              Nearest branch: <span className="font-medium text-card-foreground">{nearestInfo.branch.name}</span>{" "}
              ({nearestInfo.distance.toFixed(1)} km away)
            </p>
          )}

          {!withinRange && (
            <div className="flex items-center gap-2 rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
              <AlertTriangle className="h-4 w-4 shrink-0" />
              Sorry, delivery is not available in your area.
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="px-4 py-3 border-t border-border bg-card">
          <Button
            onClick={handleConfirm}
            disabled={!withinRange || loading}
            className="w-full rounded-full font-bold"
          >
            Confirm Location
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

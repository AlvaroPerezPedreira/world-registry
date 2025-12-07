import React, { useEffect } from "react";
import Map from "../../components/map/Map";
import { useMarkersStore } from "../../stores/MarkersStore.js";

export default function MapsPage() {
  const { markers, fetchMarkers } = useMarkersStore();

  useEffect(() => {
    if (markers.length === 0) {
      fetchMarkers();
    }
  }, [markers.length, fetchMarkers]);

  console.log("Rendering MapsPage");
  return (
    <div>
      <Map />
    </div>
  );
}

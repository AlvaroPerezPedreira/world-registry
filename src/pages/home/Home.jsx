import { useEffect } from "react";
import Map from "../../components/map/Map";
import { useMarkersStore } from "../../stores/MarkersStore";

export default function Home() {
  const { markers, fetchMarkers } = useMarkersStore();

  useEffect(() => {
    if (markers.length === 0) {
      fetchMarkers();
    }
  }, [markers.length, fetchMarkers]);

  return (
    <div>
      <Map />
    </div>
  );
}

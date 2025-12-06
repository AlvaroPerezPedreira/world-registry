import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import "./styles.css";
import { getCustomIconByName } from "./customIcons";
import MapPagination from "./MapPagination";
import { renderTileLayer } from "./MapLayers";
import { Button, useDisclosure } from "@nextui-org/react";
import MapDrawer from "./MapDrawer";
import MapFilter from "./MapFilter";
import { GrFilter } from "react-icons/gr";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

export default function Map() {
  const {
    isOpen: isInfoDrawerOpen,
    onOpen: onOpenInfoDrawer,
    onOpenChange: onInfoDrawerChange,
  } = useDisclosure();

  const {
    isOpen: isFilterDrawerOpen,
    onOpen: onOpenFilterDrawer,
    onOpenChange: onFilterDrawerChange,
  } = useDisclosure();

  const [activeMarker, setActiveMarker] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [filteredMarkers, setFilteredMarkers] = useState([]);
  const [mapOption, setMapOption] = useState(1);

  useEffect(() => {
    const fetchMarkers = async () => {
      const querySnapshot = await getDocs(collection(db, "markers"));
      const markersData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMarkers(markersData);
      setFilteredMarkers(markersData);
    };

    fetchMarkers();
  }, []);

  const handleMarkerClick = (marker) => {
    setActiveMarker(marker);
    onOpenInfoDrawer();
  };

  return (
    <>
      <div style={{ height: "100vh", width: "100%" }}>
        <div className="map-filter-button">
          <Button
            color="warning"
            variant="bordered"
            isIconOnly
            radius="full"
            onPress={() => onOpenFilterDrawer()}
          >
            <GrFilter size={20} />
          </Button>
          <MapFilter
            isOpen={isFilterDrawerOpen}
            onOpenChange={onFilterDrawerChange}
            markers={markers}
            setFilteredMarkers={setFilteredMarkers}
          />
        </div>
        <MapPagination mapOption={mapOption} setMapOption={setMapOption} />
        <div
          className="map-wrapper"
          style={{
            height: "100%",
            width: "100%",
            position: "relative",
          }}
        >
          <MapContainer
            center={[40.4168, -3.7038]}
            zoom={3}
            minZoom={4}
            maxZoom={18}
            worldCopyJump={true}
            maxBounds={[
              [-85, -Infinity],
              [85, Infinity],
            ]}
            maxBoundsViscosity={1.0}
            style={{ height: "100%", width: "100%" }}
          >
            {renderTileLayer(mapOption)}

            {filteredMarkers.map((m) => (
              <Marker
                key={m.id}
                icon={getCustomIconByName(m.data.visitor)}
                position={[m.location.lat, m.location.lon]}
                eventHandlers={{
                  click: () => handleMarkerClick(m),
                }}
              />
            ))}
          </MapContainer>
        </div>
        <MapDrawer
          isOpen={isInfoDrawerOpen}
          onOpenChange={onInfoDrawerChange}
          marker={activeMarker}
        />
      </div>
    </>
  );
}

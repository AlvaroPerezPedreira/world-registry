import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Modal, Box, Typography, IconButton } from "@mui/material";
import { IoClose } from "react-icons/io5";
import { getMonthName } from "../../utils/MonthUtils";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import "./styles.css";
import { getCustomIconByName } from "./customIcons";
import MapPagination from "./MapPagination";
import { renderTileLayer } from "./MapLayers";
import { Button, useDisclosure } from "@nextui-org/react";

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
  const [activeMarker, setActiveMarker] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [filteredMarkers, setFilteredMarkers] = useState([]);
  const [mapOption, setMapOption] = useState(1);

  const handleClose = () => setActiveMarker(null);

  useEffect(() => {
    const fetchMarkers = async () => {
      const querySnapshot = await getDocs(collection(db, "markers"));
      const markersData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMarkers(markersData);
      setFilteredMarkers(markers);
    };

    fetchMarkers();
  }, [markers]);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <MapPagination mapOption={mapOption} setMapOption={setMapOption} />
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
              click: () => setActiveMarker(m),
            }}
          />
        ))}
      </MapContainer>

      <Modal open={!!activeMarker} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.black",
            backdropFilter: "blur(20px)",
            border: "2px solid #FFF",
            borderRadius: 8,
            boxShadow: 2,
            p: 3,
            outline: "none",
          }}
        >
          {activeMarker && (
            <>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                  color: "white",
                }}
              >
                <Typography variant="h5">{activeMarker.title}</Typography>
                <IconButton
                  onClick={handleClose}
                  size="small"
                  sx={{ color: "white" }}
                >
                  <IoClose />
                </IconButton>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  color: "white",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    mt: 1,
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  {activeMarker.data.visitor &&
                    activeMarker.data.visitor !== "" && (
                      <Typography variant="h8" sx={{ color: "lightgrey" }}>
                        {activeMarker.data.visitor}
                      </Typography>
                    )}

                  {activeMarker.data?.date?.month != null &&
                    activeMarker.data?.date?.year != null &&
                    !isNaN(activeMarker.data.date.month) &&
                    !isNaN(activeMarker.data.date.year) && (
                      <Typography variant="h8" sx={{ color: "lightgrey" }}>
                        {getMonthName(activeMarker.data.date.month)},{" "}
                        {activeMarker.data.date.year}
                      </Typography>
                    )}
                </Box>
                <Typography variant="h8" sx={{ mt: 1, color: "lightgrey" }}>
                  {activeMarker.location.state}, {activeMarker.location.country}
                </Typography>
              </Box>
              <div className="image-container">
                <img
                  src={activeMarker.imageUrl}
                  alt={activeMarker.title}
                  style={{ width: "100%", height: "auto", borderRadius: "8px" }}
                />
              </div>
              <Typography variant="body1" sx={{ mt: 2, color: "white" }}>
                {activeMarker.data.description}
              </Typography>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { FaMapMarkerAlt } from "react-icons/fa";
import ReactDOMServer from "react-dom/server";
import { Modal, Box, Typography, IconButton } from "@mui/material";
import { IoClose } from "react-icons/io5";
import { getMonthName } from "../utils/MonthUtils";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import "./Styles.css";

export default function Map() {
  const [activeMarker, setActiveMarker] = useState(null);
  const [markers, setMarkers] = useState([]);

  console.log(markers);

  const customIcon = L.divIcon({
    html: ReactDOMServer.renderToString(
      <FaMapMarkerAlt size={32} color="red" />
    ),
    iconSize: [32, 32],
    className: "custom-marker",
  });

  const handleClose = () => setActiveMarker(null);

  useEffect(() => {
    const fetchMarkers = async () => {
      const querySnapshot = await getDocs(collection(db, "markers"));
      const markersData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMarkers(markersData);
    };

    fetchMarkers();
  }, []);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <MapContainer
        center={[20, 0]}
        zoom={3}
        minZoom={3}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://tiles.stadiamaps.com/tiles/stamen_toner/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.stadiamaps.com/">Stadia Maps</a> &copy; <a href="https://www.stamen.com/">Stamen Design</a> &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          maxZoom={20}
        />

        {markers.map((m) => (
          <Marker
            key={m.id}
            icon={customIcon}
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

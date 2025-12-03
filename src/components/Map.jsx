import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { FaMapMarkerAlt } from "react-icons/fa";
import ReactDOMServer from "react-dom/server";
import { Modal, Box, Typography, IconButton, Pagination } from "@mui/material";
import { IoClose } from "react-icons/io5";
import { getMonthName } from "../utils/MonthUtils";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import "./Styles.css";

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
  const [mapOption, setMapOption] = useState(1);

  const customIcon = L.divIcon({
    html: ReactDOMServer.renderToString(
      <FaMapMarkerAlt size={32} color="red" />
    ),
    iconSize: [32, 32],
    className: "custom-marker",
  });

  const handleClose = () => setActiveMarker(null);

  const renderTileLayer = () => {
    switch (mapOption) {
      case 1:
        return (
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            maxZoom={19}
          />
        );
      case 2:
        return (
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            attribution="&copy; OpenStreetMap &copy; CARTO"
            maxZoom={20}
          />
        );
      case 3:
        return (
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution="&copy; OpenStreetMap &copy; CARTO"
            maxZoom={20}
          />
        );
      case 4:
        return (
          <TileLayer
            url="https://tiles.stadiamaps.com/tiles/stamen_terrain/{z}/{x}/{y}{r}.png"
            attribution="&copy; Stadia Maps &copy; Stamen Design &copy; OpenMapTiles &copy; OpenStreetMap"
            maxZoom={18}
          />
        );
      case 5:
        return (
          <TileLayer
            url="https://tiles.stadiamaps.com/tiles/stamen_toner/{z}/{x}/{y}{r}.png"
            attribution="&copy; Stadia Maps &copy; Stamen Design &copy; OpenMapTiles &copy; OpenStreetMap"
            maxZoom={20}
          />
        );
      case 6:
        return (
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            attribution="&copy; Esri"
            maxZoom={19}
          />
        );
      case 7:
        return (
          <TileLayer
            url="https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg"
            attribution="&copy; Stadia Maps &copy; Stamen Design &copy; OpenStreetMap"
            maxZoom={16}
          />
        );
      default:
        return null;
    }
  };

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
      <Box
        sx={{
          position: "absolute",
          // top: 16,
          top: 50,
          right: 16,
          zIndex: 1000,
          padding: "8px 12px",
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: "white",
        }}
      >
        <Pagination
          count={7}
          page={mapOption}
          onChange={(event, value) => setMapOption(value)}
          size="medium"
          color="primary"
          variant="text"
          shape="rounded"
          defaultPage={1}
        />
      </Box>
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
        {renderTileLayer()}

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

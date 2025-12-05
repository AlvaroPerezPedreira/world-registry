import React from "react";
import { TileLayer } from "react-leaflet";

export const renderTileLayer = (mapOption) => {
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
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attribution="&copy; Esri"
          maxZoom={19}
        />
      );
    default:
      return null;
  }
};

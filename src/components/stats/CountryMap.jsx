import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./styles.css";
import { useMarkers } from "../../hooks/useMarkers";
import countryMappings from "../../utils/CountryMapUtils";
import { tr } from "framer-motion/client";
import CountryMapFilter from "./CountryMapFilter";

// Datos GeoJSON de países
const countriesGeoJSON =
  "https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json";

export default function CountryMap() {
  const [countries, setCountries] = useState(null);
  const [color, setColor] = useState("#4A4A4A");
  const [selectedCountries, setSelectedCountries] = useState(new Set());
  const { uniqueCountries, uniqueLCountries, uniqueACountries } = useMarkers();

  useEffect(() => {
    fetch(countriesGeoJSON)
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);

        const countryNames = uniqueCountries
          .map((spanishName) => {
            const countryMapping = countryMappings[spanishName];
            return countryMapping ? countryMapping.name : spanishName;
          })
          .filter((name) => name);

        setSelectedCountries(new Set(countryNames));
      })
      .catch((error) => {
        console.error("Error loading countries data:", error);
      });
  }, [uniqueCountries]);

  const getCountryStyle = (feature) => {
    const countryId = feature.properties.name || feature.id;
    const isSelected = selectedCountries.has(countryId);

    return {
      fillColor: isSelected ? color : "transparent",
      opacity: 0,
      color: "transparent",
      fillOpacity: isSelected ? 1 : 0,
    };
  };

  return (
    <div className="countryMap-container">
      <div className="countryMap-info">
        <div className="controls-info">
          <CountryMapFilter
            setColor={setColor}
            selectedCountries={selectedCountries}
            setSelectedCountries={setSelectedCountries}
          />
        </div>
      </div>

      <div className="countryMap-map">
        <MapContainer
          center={[0, 0]}
          zoom={2}
          minZoom={2}
          maxZoom={6}
          style={{ height: "100%", width: "100%" }}
          maxBounds={[
            [-65, -Infinity],
            [65, Infinity],
          ]}
          maxBoundsViscosity={1}
          worldCopyJump={true}
          inertia={false}
          dragging={false}
          zoomControl={false}
          scrollWheelZoom={false}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            minZoom={2}
            maxZoom={6}
            noWrap={false}
          />
          {countries && countries.features && (
            <GeoJSON data={countries} style={getCountryStyle} />
          )}
        </MapContainer>
      </div>
    </div>
  );
}

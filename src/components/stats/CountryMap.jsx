import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./styles.css";
import { useMarkers } from "../../hooks/useMarkers";
import countryMappings from "../../utils/CountryMapUtils";
import CountryMapFilter from "./CountryMapFilter";
import CountryMapBarChart from "./CountryMapBarChart";

// Datos GeoJSON de países
const countriesGeoJSON =
  "https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json";

export default function CountryMap() {
  const [countries, setCountries] = useState(null);
  const [color, setColor] = useState("#3b82f6");
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
    <div className="w-full flex flex-col lg:flex-row gap-4 lg:gap-6 min-h-[600px] lg:min-h-[85vh]">
      {/* Side Panel: Filter + Chart */}
      <div className="w-full lg:w-80 xl:w-96 2xl:w-[28rem] flex flex-col gap-4 lg:gap-6">
        <CountryMapFilter
          setColor={setColor}
          selectedCountries={selectedCountries}
          setSelectedCountries={setSelectedCountries}
        />
        <CountryMapBarChart />
      </div>

      {/* Map Container */}
      <div className="flex-1 min-h-[400px] sm:min-h-[500px] lg:min-h-0 relative">
        <div className="w-full h-full rounded-2xl shadow-card overflow-hidden countryMap-leaflet-container">
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
    </div>
  );
}

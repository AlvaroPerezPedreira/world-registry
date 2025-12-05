import L from "leaflet";
import ReactDOMServer from "react-dom/server";
import { FaMapMarkerAlt } from "react-icons/fa";

export const customBlackIcon = L.divIcon({
  html: ReactDOMServer.renderToString(
    <FaMapMarkerAlt size={32} color="black" />
  ),
  iconSize: [32, 32],
  className: "custom-marker",
});

export const customPinkIcon = L.divIcon({
  html: ReactDOMServer.renderToString(<FaMapMarkerAlt size={32} color="red" />),
  iconSize: [32, 32],
  className: "custom-marker",
});

export const customBlueIcon = L.divIcon({
  html: ReactDOMServer.renderToString(
    <FaMapMarkerAlt size={32} color="blue" />
  ),
  iconSize: [32, 32],
  className: "custom-marker",
});

export const getCustomIconByName = (name) => {
  switch (name) {
    case "Álvaro":
      return customBlueIcon;
    case "Lara":
      return customPinkIcon;
    default:
      return customBlackIcon;
  }
};

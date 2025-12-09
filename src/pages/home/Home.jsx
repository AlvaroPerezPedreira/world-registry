import "./styles.css";
import { Button } from "@nextui-org/react";
import { FaMapLocationDot } from "react-icons/fa6";
import { MdQueryStats } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const handleMap = () => {
    navigate("/map-dashboard");
  };

  const handleStats = () => {
    navigate("/stats");
  };

  return (
    <div className="home-container">
      <div className="home-stars-layer-1" />
      <div className="home-stars-layer-2" />
      <div className="home-stars-layer-3" />
      <div className="home-stars-layer-4" />
      <div className="home-line" />
      <div className="home-button-container">
        <Button
          color="warning"
          variant="bordered"
          isIconOnly
          radius="full"
          className="w-12 h-12 flex items-center justify-center"
          onPress={handleMap}
        >
          <FaMapLocationDot size={24} />
        </Button>
        <Button
          color="warning"
          variant="bordered"
          isIconOnly
          radius="full"
          className="w-12 h-12 flex items-center justify-center"
          onPress={handleStats}
        >
          <MdQueryStats size={24} />
        </Button>
      </div>
      <h1 className="home-title">
        <em className="home-title-letter">H</em>
        <em className="home-title-letter home-planet left">O</em>
        <em className="home-title-letter">R</em>
        <em className="home-title-letter">Z</em>
        <em className="home-title-letter home-planet right">O</em>
        <em className="home-title-letter">N</em>
      </h1>
    </div>
  );
}

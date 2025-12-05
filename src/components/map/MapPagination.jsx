import "./styles.css";
import { Pagination } from "@nextui-org/react";

export default function MapPagination({ mapOption, setMapOption }) {
  return (
    <div className="map-pagination">
      <Pagination
        page={mapOption}
        loop
        showShadow
        showControls
        color="warning"
        initialPage={1}
        total={4}
        isCompact={true}
        size="lg"
        radius="full"
        onChange={(value) => setMapOption(value)}
      />
    </div>
  );
}

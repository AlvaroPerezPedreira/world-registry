import React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
} from "@nextui-org/react";
import MapFilterRadioButton from "./MapFilterRadioButton";
import { useFilter } from "../../contexts/useFilter";

export default function MapFilter({
  isOpen,
  onOpenChange,
  markers,
  setFilteredMarkers,
}) {
  const { setFilterValue } = useFilter();

  const handleReset = () => {
    setFilterValue("all");
    setFilteredMarkers(markers);
    onOpenChange(false);
  };

  return (
    <div className="drawer-container">
      <Drawer isOpen={isOpen} onOpenChange={onOpenChange} placement="left">
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1">
                <h1 className="text-2xl font-bold leading-7">Filtros </h1>
              </DrawerHeader>
              <DrawerBody>
                <span className="text-medium font-medium">
                  Filtro por persona
                </span>
                <div>
                  <MapFilterRadioButton
                    markers={markers}
                    setFilteredMarkers={setFilteredMarkers}
                  />
                </div>
                <p>
                  Magna exercitation reprehenderit magna aute tempor cupidatat
                  consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex
                  incididunt cillum quis. Velit duis sit officia eiusmod Lorem
                  aliqua enim laboris do dolor eiusmod.
                </p>
              </DrawerBody>
              <DrawerFooter>
                <div className="w-full flex justify-center mb-4">
                  <Button
                    className="w-60"
                    color="danger"
                    variant="ghost"
                    onPress={handleReset}
                  >
                    Reset
                  </Button>
                </div>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </div>
  );
}

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  Image,
  Link,
  Tooltip,
  Avatar,
  AvatarGroup,
  RangeCalendar,
  Skeleton,
} from "@nextui-org/react";
import "./styles.css";
import { RiArrowRightDoubleLine } from "react-icons/ri";
import { getMonthName } from "../../utils/MonthUtils";
import { parseDate } from "@internationalized/date";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useEffect, useState } from "react";

export default function MapDrawer({ isOpen, onOpenChange, marker }) {
  const [visitors, setVisitors] = useState([]);
  const [isLoadingVisitors, setIsLoadingVisitors] = useState(false);

  useEffect(() => {
    const fetchReferencedVisitors = async () => {
      if (!marker || !marker.data || !marker.data.visitors) {
        setVisitors([]);
        setIsLoadingVisitors(false);
        return;
      }

      setIsLoadingVisitors(true);
      const visitors = marker.data.visitors;
      const visitorsWithDetails = [];

      for (const visitor of visitors) {
        if (visitor && typeof visitor === "object" && "_path" in visitor) {
          try {
            const userId =
              visitor._path.segments[visitor._path.segments.length - 1];
            const userDoc = await getDoc(doc(db, "users", userId));

            if (userDoc.exists()) {
              visitorsWithDetails.push({
                id: userDoc.id,
                name: userDoc.data().name,
                url: userDoc.data().url,
                isReference: true,
              });
            }
          } catch (error) {
            console.error("Error fetching user:", error);
          }
        } else if (typeof visitor === "string") {
          visitorsWithDetails.push({
            name: visitor,
            isReference: false,
          });
        }
      }

      setVisitors(visitorsWithDetails);
      setIsLoadingVisitors(false);
    };

    if (isOpen && marker) {
      fetchReferencedVisitors();
    }
  }, [marker, isOpen]);

  if (!marker) {
    return null;
  }

  return (
    <div className="drawer-container">
      <Drawer
        hideCloseButton
        backdrop="blur"
        classNames={{
          base: "sm:data-[placement=right]:m-2 sm:data-[placement=left]:m-2  rounded-medium",
        }}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="absolute top-0 inset-x-0 z-50 flex flex-row gap-2 px-2 py-2 border-b border-default-200/50 justify-between bg-content1/50 backdrop-saturate-150 backdrop-blur-lg">
                <Tooltip content="Close">
                  <Button
                    isIconOnly
                    className="text-default-400"
                    size="sm"
                    variant="light"
                    onPress={onClose}
                  >
                    <RiArrowRightDoubleLine size={24} />
                  </Button>
                </Tooltip>
              </DrawerHeader>
              <DrawerBody className="pt-16">
                <div className="flex flex-col gap-2">
                  <h1 className="text-2xl font-bold leading-7">
                    {marker.title}
                  </h1>
                  <div className="flex flex-row justify-between w-100 gap-1">
                    <p className="text-md text-default-500">
                      {marker.location.state}, {marker.location.country}
                    </p>
                    <p className="text-md text-default-500">
                      {getMonthName(marker.data.date.month)},{" "}
                      {marker.data.date.year}
                    </p>
                  </div>
                </div>
                <div className="image-container">
                  <Image
                    isBlurred
                    isZoomed
                    alt="Event image"
                    className="aspect-square w-full hover:scale-110"
                    height={300}
                    src={marker.imageUrl}
                  />
                </div>

                <div className="flex flex-col gap-2 py-4">
                  <h1 className="text-2xl font-bold leading-7">
                    Datos del viaje
                  </h1>
                  <div className="flex flex-col pl-4 gap-1">
                    <span className="text-medium font-medium">
                      Persona: {marker.data.visitor}
                    </span>
                  </div>
                  <div className="flex w-full justify-center items-center pt-4">
                    {marker.data.date?.startDate &&
                      marker.data.date?.endDate && (
                        <RangeCalendar
                          color="warning"
                          isReadOnly
                          aria-label="Date (Read Only)"
                          value={{
                            start: parseDate(marker.data.date.startDate),
                            end: parseDate(marker.data.date.endDate),
                          }}
                        />
                      )}
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col mt-4 gap-3 items-start">
                      <span className="text-medium font-medium">
                        Descripción del viaje
                      </span>
                      <div className="text-medium text-default-500 flex flex-col gap-2 pl-4">
                        <p className="text-justify">
                          {marker.data.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col mt-4 gap-3 items-start">
                      <span className="text-medium font-medium">
                        Visitantes
                      </span>
                      <div className="flex gap-2 pl-4 items-center min-h-8">
                        {isLoadingVisitors ? (
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full border-2 border-warning border-t-transparent animate-spin"></div>
                            <span className="text-default-400 text-sm">
                              Cargando visitantes...
                            </span>
                          </div>
                        ) : visitors.length > 0 ? (
                          <AvatarGroup
                            max={10}
                            isBordered
                            classNames={{
                              base: "pl-2",
                              count:
                                "text-default-500 text-tiny bg-default-100",
                            }}
                            size="sm"
                          >
                            {visitors.map((visitor, index) => (
                              <Tooltip key={index} content={visitor.name}>
                                <Avatar
                                  color="warning"
                                  className="data-[hover=true]:translate-x-0!"
                                  name={visitor.name}
                                  src={visitor.url}
                                />
                              </Tooltip>
                            ))}
                          </AvatarGroup>
                        ) : (
                          <span className="text-default-400 text-sm">
                            No hay visitantes registrados
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </DrawerBody>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </div>
  );
}

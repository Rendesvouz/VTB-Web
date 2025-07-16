import React, { useEffect, useRef, useState } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
  MarkerClustererF,
  Polyline,
} from "@react-google-maps/api";
import styled from "styled-components";

const containerStyle = {
  width: "100%",
  height: "600px",
};

const defaultCenter = {
  lat: 6.5244, // Lagos latitude
  lng: 3.3792, // Lagos longitude
};

const dummyTrucks = [
  {
    id: "truck1",
    name: "Truck A",
    driverName: "John Doe",
    status: "In Transit",
    latitude: 6.5244,
    longitude: 3.3792,
    history: [
      { lat: 6.52, lng: 3.37 },
      { lat: 6.5225, lng: 3.375 },
      { lat: 6.5244, lng: 3.3792 },
    ],
  },
  {
    id: "truck2",
    name: "Truck B",
    driverName: "Jane Smith",
    status: "Idle",
    latitude: 6.6,
    longitude: 3.4,
    history: [
      { lat: 6.598, lng: 3.39 },
      { lat: 6.599, lng: 3.395 },
      { lat: 6.6, lng: 3.4 },
    ],
  },
];

const Container = styled.div`
  padding-top: 130px;
  padding-left: 40px;
  padding-right: 40px;
  padding-bottom: 60px;
  align-content: center;
  padding: auto;

  @media screen and (max-width: 768px) {
    padding-top: 70px;
    margin-bottom: 0px;
    height: auto;
  }
`;

const TruckLocationMap = () => {
  const mapRef = useRef(null);

  const [truckLocations, setTruckLocations] = useState([]);
  const [selectedTruck, setSelectedTruck] = useState(null);

  const keyyy = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  console.log("GOOGLE_MAPS_API_KEY", keyyy);

  const getTruckIcon = (status) => {
    return {
      url: status === "In Transit" ? "/src/assets/2.jpg" : "/src/assets/1.jpg",
      scaledSize: new window.google.maps.Size(40, 40),
    };
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDZpLMKhwoa0H5EnhFWjnNVuafQw0KHDDk",
  });

  // Auto fit to truck locations
  useEffect(() => {
    if (mapRef.current && dummyTrucks.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      dummyTrucks.forEach((truck) =>
        bounds.extend({ lat: truck.latitude, lng: truck.longitude })
      );
      mapRef.current.fitBounds(bounds);
    }
  }, [isLoaded]);

  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <>
      <div className="flex justify-between items-center 500 mt-5 mb-2">
        <h1 className="text-2xl font-bold text-gray-900">Vehicles Tracking</h1>
      </div>

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={defaultCenter}
        zoom={6}
      >
        <MarkerClustererF>
          {(clusterer) =>
            dummyTrucks.map((truck) => (
              <Marker
                key={truck.id}
                position={{ lat: truck.latitude, lng: truck.longitude }}
                icon={getTruckIcon(truck.status)}
                clusterer={clusterer}
                onClick={() => setSelectedTruck(truck)}
              />
            ))
          }
        </MarkerClustererF>

        {selectedTruck && (
          <InfoWindow
            position={{
              lat: selectedTruck.latitude,
              lng: selectedTruck.longitude,
            }}
            onCloseClick={() => setSelectedTruck(null)}
          >
            <div>
              <strong>{selectedTruck.name}</strong>
              <br />
              Driver: {selectedTruck.driverName}
              <br />
              Status: {selectedTruck.status}
            </div>
          </InfoWindow>
        )}

        {dummyTrucks.map((truck) =>
          truck.history ? (
            <Polyline
              key={`line-${truck.id}`}
              path={truck.history}
              options={{
                strokeColor:
                  truck.status === "In Transit" ? "#007bff" : "#ff9900",
                strokeOpacity: 0.8,
                strokeWeight: 3,
              }}
            />
          ) : null
        )}
      </GoogleMap>
    </>
  );
};

export default TruckLocationMap;

import React, { useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYW5odHJhbjAyMiIsImEiOiJja3lxYTNjeTAwaTN4MnJtbXF3MWVtYnM0In0.QA6XD9XrmsSG7ULdNNuQkA";

interface CampgroundLocation {
  latitude: number;
  longitude: number;
}

interface MapProps {
  campgroundLocation: CampgroundLocation;
}

const Map: React.FC<MapProps> = ({ campgroundLocation }) => {
  const [map, setMap] = useState<mapboxgl.Map | null>(null);

  useEffect(() => {
    const newMap = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/dark-v10",
      center: [campgroundLocation.longitude, campgroundLocation.latitude],
      zoom: 9,
    });
    new mapboxgl.Marker()
      .setLngLat([campgroundLocation.longitude, campgroundLocation.latitude])
      .setPopup(
        new mapboxgl.Popup({ offset: 25 }).setHTML(
          `<h3>VietNam</h3><p>Vietanm</p>`
        )
      )
      .addTo(newMap);
    if (!map) {
      setMap(newMap);
    }
  }, [map, campgroundLocation]);

  return <div id="map" style={{ width: "100%", height: "500px" }} />;
};

export default Map;

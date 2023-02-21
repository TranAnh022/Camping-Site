import React, { useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import { useSelector } from "react-redux";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYW5odHJhbjAyMiIsImEiOiJja3lxYTNjeTAwaTN4MnJtbXF3MWVtYnM0In0.QA6XD9XrmsSG7ULdNNuQkA";

interface CampgroundLocation {
  latitude: number;
  longitude: number;
}

interface MapProps {
  campgroundLocation: CampgroundLocation;
}

const Mapbox: React.FC<MapProps> = ({ campgroundLocation }) => {
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const { campsites } = useSelector((state:any) => state.campsites);

  useEffect(() => {
    const newMap = new mapboxgl.Map({
      container: "mapbox",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [campgroundLocation.longitude, campgroundLocation.latitude],
      zoom: 9,
    });
    newMap.on("load", () => {
      newMap.addSource("campgrounds", {
        type: "geojson",
        data: campsites,
        cluster: true,
        clusterMaxZoom: 14, // Max zoom to cluster points on
        clusterRadius: 50, // Radius of each cluster when clustering points (defaults to 50)
      });

      newMap.addLayer({
        id: "clusters",
        type: "circle",
        source: "campgrounds",
        filter: ["has", "point_count"],
        paint: {
          "circle-color": [
            "step",
            ["get", "point_count"],
            "#51bbd6",
            5,
            "#f1f075",
            10,
            "#f28cb1",
          ],
          "circle-radius": ["step", ["get", "point_count"], 20, 5, 30, 10, 40],
        },
      });

      newMap.addLayer({
        id: "cluster-count",
        type: "symbol",
        source: "campgrounds",
        filter: ["has", "point_count"],
        layout: {
          "text-field": "{point_count_abbreviated}",
          "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
          "text-size": 12,
        },
      });

      newMap.addLayer({
        id: "unclustered-point",
        type: "circle",
        source: "campgrounds",
        filter: ["!", ["has", "point_count"]],
        paint: {
          "circle-color": "#11b4da",
          "circle-radius": 4,
          "circle-stroke-width": 1,
          "circle-stroke-color": "#fff",
        },
      });
      newMap.addControl(new mapboxgl.NavigationControl());

      // When a click event occurs on a feature in
      // the unclustered-point layer, open a popup at
      // the location of the feature, with
      // description HTML from its properties.
      newMap.on("mouseenter", "clusters", () => {
        newMap.getCanvas().style.cursor = "pointer";
      });
      newMap.on("mouseleave", "clusters", () => {
        newMap.getCanvas().style.cursor = "";
      });
    });

    if (!map) {
      setMap(newMap);
    }
  }, [map, campgroundLocation]);

  return <div id="mapbox" style={{ width: "100%", height: "500px" }} />;
};

export default Mapbox;

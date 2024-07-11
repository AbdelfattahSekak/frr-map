"use client";
import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import dynamic from "next/dynamic";
import MapMenu from "./MapMenu";
import { signal } from "@preact/signals-react";
import { mapRef } from "./signals";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAP_BOX_TOKEN;

const Mapbox = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (mapContainerRef.current) {
      if (!MAPBOX_TOKEN) {
        throw new Error("Mapbox token is not set");
      }
      mapboxgl.accessToken = MAPBOX_TOKEN;

      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [2.2137, 46.2276], // Centered on France
        zoom: 5, // Adjusted zoom level for a country-wide view
      });
      mapRef.value = map;
      map.on("load", () => {
        map.addSource("frr", {
          type: "geojson",
          data: process.env.NEXT_PUBLIC_MAP_GEOJSON_URL as string,
        });
        map.addLayer({
          id: "maine",
          type: "fill",
          source: "frr",
          layout: {},
          paint: {
            "fill-color": "#0080ff",
            "fill-opacity": 0.5,
          },
        });

        map.addLayer({
          id: "outline",
          type: "line",
          source: "frr",
          layout: {},
          paint: {
            "line-color": "#000",
            "line-width": 3,
          },
        });
      });

      map.on("click", "maine", (e) => {
        new mapboxgl.Popup()
          .setLngLat(e.lngLat)
          .setHTML(
            `${e.features[0].properties.nom} (${e.features[0].properties.code})`
          )
          .addTo(map!);
      });

      // Change the cursor to a pointer when
      // the mouse is over the states layer.
      map.on("mouseenter", "maine", () => {
        map.getCanvas().style.cursor = "pointer";
      });

      // Change the cursor back to a pointer
      // when it leaves the states layer.
      map.on("mouseleave", "maine", () => {
        map.getCanvas().style.cursor = "";
      });

      return () => {
        mapRef.value?.remove();
      };
    }
  }, []);

  return (
    <div className="flex flex-col h-full w-full relative">
      {isLoading && (
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      )}
      <MapMenu />
      <div
        ref={mapContainerRef}
        role="region"
        className="h-screen w-screen"
        tabIndex={0}
        aria-label="Map of France showing rural revitalization areas"
      />
    </div>
  );
};

export default dynamic(() => Promise.resolve(Mapbox), {
  ssr: false,
});

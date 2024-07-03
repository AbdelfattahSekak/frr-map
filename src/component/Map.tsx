"use client";
import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";

const fetchMapData = async () => {
  const response = await fetch(
    "https://eqxmclqai0svoets.public.blob.vercel-storage.com/frr-map.json"
  );
  return await response.json();
};

const Component = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMapData().then((data) => {
      setIsLoading(false);
      console.log(data);
      L.geoJSON(data as any, {
        style: () => ({ color: "green" }),
      })
        .bindPopup((layer: any) => {
          return `${layer.feature.properties.nom} (${layer.feature.properties.code})`;
        })
        .addTo(mapRef.current!);
    });
  }, []);
  useEffect(() => {
    if (mapContainerRef.current !== null) {
      mapRef.current = L.map(mapContainerRef.current, {}).setView(
        [46.2276, 2.2137],
        6
      );

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current);

      return () => {
        mapRef.current?.remove();
      };
    }
  }, []);

  return (
    <div className="flex flex-col h-full w-full">
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

export default dynamic(() => Promise.resolve(Component), {
  ssr: false,
});

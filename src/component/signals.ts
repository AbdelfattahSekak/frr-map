import { effect, signal } from "@preact/signals-react";

import mapboxgl from "mapbox-gl";

export const DEPARTMENTS_OPTIONS = [
  { name: "France métropolitaine", center: [2.2137, 46.2276], zoom: 6 },
  { name: "Guadeloupe", center: [-61.551, 16.265], zoom: 9 },
  { name: "Martinique", center: [-61.0242, 14.6415], zoom: 9 },
  { name: "French Guiana", center: [-53.1258, 3.9339], zoom: 7 },
  { name: "Réunion", center: [55.5364, -21.1151] },
  { name: "Mayotte", center: [45.166244, -12.8275], zoom: 9 },
];

export const mapRef = signal<mapboxgl.Map | undefined>(undefined);
export const selectedDepartment = signal(DEPARTMENTS_OPTIONS[0]);

effect(() => {
  if (mapRef.value) {
    console.log(selectedDepartment.value);
    mapRef.value.flyTo({
      center: selectedDepartment.value.center,
      zoom: selectedDepartment.value.zoom,
    });
  }
});

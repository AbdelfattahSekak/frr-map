export const fetchMapData = async () => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_MAP_GEOJSON_URL as string
  );
  return await response.json();
};

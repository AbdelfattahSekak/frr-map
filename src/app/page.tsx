import Map from "@/component/Map";
import Mapbox from "@/component/Mapbox";
export const dynamic = "force-dynamic";
export default function Home() {
  return (
    <main className="flex h-screen w-screen flex-col items-center justify-between">
      <Mapbox />
    </main>
  );
}

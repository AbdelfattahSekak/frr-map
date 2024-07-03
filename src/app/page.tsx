import Map from "@/component/Map";
export const dynamic = "force-dynamic";
export default function Home() {
  return (
    <main className="flex h-screen w-screen flex-col items-center justify-between">
      <Map />
    </main>
  );
}

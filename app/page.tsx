import Hero from "@/components/Hero";
import PredictImage from "@/components/PredictImage";
import Image from "next/image";

export default function Home() {
  return (
    <main className="grid w-full place-content-center gap-10 overflow-hidden">
      <Hero />
      <PredictImage />
    </main>
  );
}

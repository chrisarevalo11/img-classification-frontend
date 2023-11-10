import PredictImage from "@/components/PredictImage";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="grid place-content-center w-full max-w-6xl h-full">
        <PredictImage />
      </div>
    </main>
  );
}

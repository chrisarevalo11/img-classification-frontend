import { agbalumo } from "@/ui/fonts";
import Image from "next/image";

export default function Hero(): React.ReactElement {
  return (
    <section className="w-screen md:w-[95vw] mx-auto max-w-[1200px] min-h-[70vh] flex flex-col justify-center items-center bg-orange-500 rounded-3xl px-5 md:px-10 py-8 md:py-16 relative mt-10 gap-5 ">
      <h1
        className={`text-[3rem] md:text-[5rem] ${agbalumo.className} md:px-5 text-white mt-14 text-center`}
      >
        Vehicle Image Classification
      </h1>
      <h2 className="text-white text-xl md:text-3xl text-center md:w-[80%] font-bold">
        Give us an image of a vehicle (van, car, motorcycle or bicycles only for
        now) and our Machine Learning model will tell you what it thinks it is
      </h2>
      <a
        href="#model"
        className="text-white font-bold bg-green-600 py-4 md:py-5 px-8 md:px-10 text-xl rounded-full my-5 hover:scale-105 transition-all"
      >
        Test it
      </a>
      <div className="flex gap-4 md:gap-8 my-5 items-center">
        <Image
          src={"/bicycle.svg"}
          alt={"bicycle"}
          width={150}
          height={150}
          className="w-[60px] md:w-[150px]"
        />
        <Image
          src={"/car.svg"}
          alt={"car"}
          width={150}
          height={150}
          className="w-[60px] md:w-[150px]"
        />
        <Image
          src={"/bike.svg"}
          alt={"bike"}
          width={150}
          height={150}
          className="w-[60px] md:w-[150px]"
        />
        <Image
          src={"/van.svg"}
          alt={"van"}
          width={150}
          height={150}
          className="w-[60px] md:w-[150px]"
        />
      </div>
    </section>
  );
}

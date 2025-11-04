import family from "@/assets/png/family.png";
import handshake from "@/assets/png/handshake.png";
import handshake2 from "@/assets/png/handshake2.png";
import spark from "@/assets/png/spark.png";
import Image from "next/image";
import { Button } from "../ui/button";
export default function Struggle() {
  return (
    <section className="container">
      <div className="flex justify-between items-center mt-8">
        <div>
          <h1 className="text-4xl font-bold">
            {" "}
            Want to hear from more speakers?
          </h1>
          <p className="text-lg mt-4">
            Discover voices of wisdom and guidance to strengthen your marriage
            and elevate your home.
          </p>
        </div>
        <Button className="rounded-xl px-8 py-2 text-base">
          Discover More
        </Button>
      </div>
      <div className="mt-20 grid grid-cols-[2fr_3fr]">
        <div className="max-w-[250px]">
          <h3 className="text-4xl font-semibold">From Struggle to Strength</h3>
          <p className="mt-4 mb-8 text-xl">
            With wisdom, empathy, and Torah-based guidance, Ohel Miriam empowers
            couples to build marriages of peace, holiness, and joy.
          </p>
          <Button className="rounded-xl px-8 py-2">Discover More</Button>
        </div>
        <div className="space-y-2">
          <div className="bg-[#f9e1ef] py-2 px-10 flex items-center gap-x-5">
            <Image src={handshake} width={100} height={100} alt="handshake" />

            <p>Compassionate, discreet support for sensitive struggles</p>
          </div>
          <div className="bg-[#f9e1ef] py-2 px-10 flex items-center gap-x-5">
            <Image src={spark} width={100} height={100} alt="spark" />

            <p>Trusted rabbinic and professional guidance with proven tools</p>
          </div>
          <div className="bg-[#f9e1ef] py-2 px-10 flex items-center gap-x-5">
            <Image src={family} width={100} height={100} alt="family" />

            <p>A home transformed into a place of peace, holiness, and joy</p>
          </div>
          <div className="bg-[#f9e1ef] py-2 px-10 flex items-center gap-x-5">
            <Image src={handshake2} width={100} height={100} alt="handshake2" />

            <p>Intimacy restored as a source of closeness and connection</p>
          </div>
        </div>
      </div>
    </section>
  );
}

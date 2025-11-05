import { coupleFacesData } from "@/constants/home";
import { Icon } from "@iconify/react";

export default function CoupleFaced() {
  return (
    <section className="mt-20">
      <div className="container my-20">
        <div className="text-center max-w-[1080px] mx-auto">
          <h1 className="font-bold text-4xl">
            You want a home filled with peace, connection, and holiness.
          </h1>
          <p className="mt-4 mb-14 text-lg">
            But when challenges arise in marriage — especially in the private
            areas of life — it can feel overwhelming. Many couples don t know
            where to turn for discreet, Torah-true guidance. You re not alone.
            Ohel Miriam exists to give you the tools and knowledge to build a
            marriage that truly thrives
          </p>
        </div>
      </div>
      <div className="container bg-ligtGray py-14">
        <div className="text-center">
          <h1 className="font-bold text-4xl">
            The Challenge Every Couple Faces
          </h1>
          <p className="mt-4 mb-14 text-lg">
            When struggles go unresolved, distance and frustration can quietly
            grow.
          </p>
        </div>
        <div className="flex flex-wrap gap-8 justify-center text-white">
          {coupleFacesData.map((data) => (
            <div
              key={data.id}
              className="bg-teal p-10 flex flex-col justify-center items-center text-center min-w-[350px]  rounded-sm basis-1"
            >
              <Icon
                icon="fluent-emoji-high-contrast:broken-heart"
                width="50"
                height="50"
              />
              <p className="text-lg mt-5">{data.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

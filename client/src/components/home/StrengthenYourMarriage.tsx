import { strengthenYourMarriageData } from "@/constants/home";

export default function StrengthenYourMarriage() {
  return (
    <section className="mt-20 bg-lightRed py-10">
      <div className="container">
        <div className="text-center max-w-[700px] mx-auto">
          <h1 className="text-3xl font-bold text-teal">
            Strengthen Your Marriage, Inside & Out
          </h1>
          <p className="text-lg mt-4">
            Explore our services designed to guide Orthodox couples toward
            deeper connection, harmony, and kedushah in the home.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-x-5 gap-y-16 mt-14">
          {strengthenYourMarriageData.map((data) => (
            <div key={data.id} className="border border-teal p-8 relative">
              <h1 className="text-2xl font-medium bg-teal px-8 py-0.5 absolute w-full top-[-10%] left-0 text-white font-mono">
                {data.category}
              </h1>
              <h2 className="font-bold text-lg">{data.title}</h2>
              <p>{data.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

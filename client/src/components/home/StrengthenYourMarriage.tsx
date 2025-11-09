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
        <div className="grid sm:grid-cols-2 gap-6 lg:gap-8  xl:gap-10 mt-14">
          {strengthenYourMarriageData.map((data) => (
            <div
              key={data.id}
              className="border border-teal rounded overflow-hidden"
            >
              <h1 className="text-2xl font-medium bg-teal px-8 py-0.5 w-full left-0 text-white font-mono border-x-4 border-teal">
                {data.category}
              </h1>
              <div className="p-8">
                <h2 className="font-bold text-lg">{data.title}</h2>
                <p>{data.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

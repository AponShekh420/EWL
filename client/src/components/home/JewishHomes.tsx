import { Button } from "../ui/button";

export default function JewishHomes() {
  return (
    <section className="bg-[url('/images/home/sky-bg.webp')] bg-center bg-cover bg-no-repeat h-[350px] mb-58 py-12 mt-10">
      <div className="container">
        <div className="text-center max-w-[700px] mx-auto">
          <h1 className="text-3xl font-bold">
            Together, We Can Strengthen Jewish Homes
          </h1>
          <p className="text-lg mt-4">
            Your time and support make it possible for Ohel Miriam to guide more
            couples toward harmony, intimacy, and thriving marriages
          </p>
        </div>
        <div className="grid grid-cols-2 gap-x-32 mt-10">
          <div className="bg-white p-10 rounded-4xl shadow-lg">
            <h1 className="text-xl font-bold">Give With Impact</h1>
            <p className="mt-4 mb-8">
              Your donation fuels our work — from courses to resources to
              guidance for couples in need. Every gift helps more families
              thrive with shalom bayis and kedushas habayis.
            </p>
            <Button className="px-20 bg-teal rounded-4xl block w-fit mx-auto">
              Donate
            </Button>
          </div>
          <div className="bg-white p-10 rounded-4xl shadow-lg">
            <h1 className="text-xl font-bold"> Make a Difference</h1>
            <p className="mt-4 mb-8">
              Join our mission by volunteering your skills, time, or energy.
              Whether behind the scenes or directly supporting our programs,
              your contribution helps Jewish homes grow stronger.
            </p>
            <Button className="px-20 bg-teal rounded-4xl block w-fit mx-auto">
              Volunteer
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

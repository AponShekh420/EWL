"use client";
import SearchBox from "@/components/common/SearchBox";
import SelectBox from "@/components/common/SelectBox";
import Link from "next/link";
const paidHotlines = [
  {
    id: 1,
    givenBy: "Alisa Avruch",
    title: "On hotline menu category Shalom Bayis press 17",
    topic:
      "3 Astonishingly Simple Ways To Deepen Your Connection To Your Husband",
    category: "Category A",
    desc: `Practical, hands-on tools and "magic phrases" that will bring you and your husband closer and deepen your connection.`,
    email: "aavruch@gmail.com",
  },
  {
    id: 2,
    givenBy: "Daniel Cohen",
    title: "Building Trust After Conflict",
    topic: "How To Rebuild Emotional Safety In Marriage",
    category: "Category B",
    desc: "Learn effective communication techniques to rebuild trust after misunderstandings and emotional distance.",
    email: "daniel.cohen@gmail.com",
  },
  {
    id: 3,
    givenBy: "Sarah Levin",
    title: "Parenting With Peace",
    topic: "Raising Children Without Constant Stress",
    category: "Category A",
    desc: "Simple parenting strategies to create a calm and respectful home environment.",
    email: "slevin@yahoo.com",
  },
  {
    id: 4,
    givenBy: "Michael Rosen",
    title: "Financial Harmony",
    topic: "How Couples Can Talk About Money Without Fighting",
    category: "Category C",
    desc: "Practical budgeting and mindset tools to reduce money-related tension in relationships.",
    email: "mrosen@outlook.com",
  },
  {
    id: 5,
    givenBy: "Rachel Friedman",
    title: "Emotional Awareness",
    topic: "Understanding Your Partner’s Emotional Language",
    category: "Category B",
    desc: "Discover how emotional needs differ and how to respond with empathy.",
    email: "rfriedman@gmail.com",
  },
  {
    id: 6,
    givenBy: "Jacob Stein",
    title: "Healthy Boundaries",
    topic: "Setting Limits Without Guilt",
    category: "Category C",
    desc: "Learn how to say no respectfully while maintaining strong relationships.",
    email: "jstein@gmail.com",
  },
  {
    id: 7,
    givenBy: "Leah Gold",
    title: "Daily Connection Habits",
    topic: "Small Actions That Strengthen Love Every Day",
    category: "Category A",
    desc: "Daily routines that create lasting emotional intimacy between spouses.",
    email: "leah.gold@gmail.com",
  },
  {
    id: 8,
    givenBy: "Aaron Weiss",
    title: "Conflict Resolution",
    topic: "Turning Arguments Into Understanding",
    category: "Category B",
    desc: "Step-by-step methods to resolve conflicts without blame or resentment.",
    email: "aweiss@yahoo.com",
  },
  {
    id: 9,
    givenBy: "Naomi Klein",
    title: "Self-Care For Caregivers",
    topic: "Avoiding Burnout While Caring For Others",
    category: "Category C",
    desc: "Essential self-care practices for people who give too much of themselves.",
    email: "nklein@gmail.com",
  },
  {
    id: 10,
    givenBy: "Benjamin Adler",
    title: "Respectful Communication",
    topic: "Speaking So Your Partner Truly Listens",
    category: "Category A",
    desc: "Communication tips that reduce defensiveness and increase understanding.",
    email: "badler@outlook.com",
  },
  {
    id: 11,
    givenBy: "Tamar Bloom",
    title: "Managing Expectations",
    topic: "Letting Go Of Unrealistic Relationship Standards",
    category: "Category B",
    desc: "How expectations shape relationships and how to reset them healthily.",
    email: "tbloom@gmail.com",
  },
  {
    id: 12,
    givenBy: "Eli Schwartz",
    title: "Marriage Mindset",
    topic: "Thinking As A Team, Not As Opponents",
    category: "Category A",
    desc: "Shift your mindset to create partnership instead of power struggles.",
    email: "eschwartz@gmail.com",
  },
  {
    id: 13,
    givenBy: "Hannah Pearl",
    title: "Emotional Healing",
    topic: "Recovering From Past Relationship Wounds",
    category: "Category C",
    desc: "Guidance on healing emotional scars that affect present relationships.",
    email: "hpearl@yahoo.com",
  },
  {
    id: 14,
    givenBy: "Samuel Brooks",
    title: "Long-Term Love",
    topic: "Keeping Romance Alive After Many Years",
    category: "Category A",
    desc: "Proven ideas to maintain romance and appreciation over time.",
    email: "sbrooks@gmail.com",
  },
];

export default function PaidHotline() {
  return (
    <main>
      <section className="hero-banner grid place-items-center">
        <h1 className="text-white font-extrabold text-3xl sm:text-4xl lg:text-5xl text-center">
          Paid Hotline
        </h1>
      </section>
      <section className="container my-20">
        <div className=" border flex items-center p-1.5 rounded-md justify-between sm:flex-row gap-4">
          <SearchBox
            placeholder="Search..."
            onChange={(e) => console.log(e.target.value)}
          />
          <div className="flex gap-4 items-center">
            <span className="hidden sm:block">Sort By: </span>
            <SelectBox
              name="status"
              label=""
              value={""}
              className={`w-[150px] `}
              placeholder="Default"
              onChange={(val) => console.log(val)}
              options={[
                { label: "Default", value: "default" },
                { label: "Category", value: "category" },
                { label: "Speaker Name", value: "speaker-name" },
                { label: "Title", value: "title" },
              ]}
            />
          </div>
        </div>

        <div className="bg-[#ecedef] p-4 rounded-md my-4">
          <Link
            href="/paid-hotline-sign-up"
            className="text-center hover:text-teal font-bold text-xl sm:text-2xl hover:underline block"
          >
            Sign up for Paid Hotline
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8 mt-8">
          {paidHotlines.map((hotline) => (
            <div
              key={hotline.id}
              className="border  p-6 rounded-md bg-[#ecedef] space-y-4 relative"
            >
              <h2 className="font-bold text-lg">
                Given By: <br />
                <span className="text-2xl sm:text-3xl text-slate-800">
                  {hotline.givenBy}
                </span>
              </h2>
              <p className="mt-2 font-medium">Topic: {hotline.topic}</p>
              <h5 className="font-bold text-sm text-teal">{hotline.title}</h5>

              <p className="mt-2">{hotline.desc}</p>
              <div className="h-6"></div>
              <p className="mt-2 hover:underline cursor-pointer hover:text-teal font-medium absolute bottom-6">
                {hotline.email}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

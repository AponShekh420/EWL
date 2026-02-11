const infolines = [
  {
    id: 1,
    press: "Press 4 ",
    description: "FREE Women's Infoline",
    color: "#f5f5f5",
  },
  {
    id: 2,
    press: "Press 5",
    description: "FFREE Men’s Infoline",
    color: "#f5f5f5",
  },
  { id: 3, press: "", description: "", color: "white" },
  {
    id: 4,
    press: "Press 1 → 1",
    description: "Women’s Infoline Registration",
    color: "#eef4fb",
  },
  {
    id: 5,
    press: "Press 1 → 2",
    description: "Men’s Infoline Registration",
    color: "#eef4fb",
  },
  { id: 6, press: "Press 1 → 3 ", description: "Contact Me", color: "#eef4fb" },
  { id: 7, press: "", description: "", color: "white" },
  {
    id: 8,
    press: "Press 1 → 5",
    description: "Add to Notification List",
    color: "#f6f0f8",
  },
  {
    id: 9,
    press: "Press 1 → 6 ",
    description: "Remove from Notification List",
    color: "#f6f0f8",
  },
];
const FAQ = [
  {
    id: 1,
    question: "Can I call from any phone, or do I need a smartphone?",
    answer:
      "You can call from any phone. The infoline is entirely menu-driven and does not require internet access, a smartphone, or any visuals.",
  },
  {
    id: 2,
    question: "Is the infoline anonymous?",
    answer:
      "The infoline is private and discreet, but registration is required. Caller information is collected solely to protect the sensitivity of the content and to ensure responsible access.",
  },
  {
    id: 3,
    question: "Who is this infoline for?",
    answer:
      "The infoline is for women and men seeking discreet, Torah-aligned guidance on marital harmony, intimacy, and related relationship topics. It offers fully menu-driven access to speaker content and practical tools, with separate content tracks for women and for men",
  },
  {
    id: 4,
    question: "Can anyone call in, or is registration required?",
    answer:
      "Registration is required. Because the infoline includes sensitive and personal material, access is limited to registered callers. Registration is free and completed through the phone system",
  },
  {
    id: 5,
    question: "How do I receive updates by email or text?",
    answer:
      "To receive email updates, please subscribe on the website. To receive text updates, call the infoline and press 1 (Infoline Information), then press 5. To remove yourself, press 1 and then press 6.",
  },
  {
    id: 6,
    question: "Is there a cost to use the infoline?",
    answer:
      "The infoline includes both free and membership-based options. The free infoline provides sample content and course previews. Membership offers more extensive access to recorded guidance from experienced coaches, therapists, and other trained professionals. Payment can be handled by phone",
  },
  {
    id: 7,
    question: "What types of topics are covered on the infoline?",
    answer:
      "The infoline covers marital harmony, emotional connection, intimacy, and related topics of married life. Free access includes introductory content, while membership provides broader and more in-depth recorded teachings from trained professionals, presented in a respectful and Torah-aligned manner",
  },
  {
    id: 8,
    question: "Is this a live infoline or recorded content?",
    answer:
      "The infoline is fully menu-driven and provides access to recorded talks and resources, allowing callers to listen privately and at their own pace.",
  },
  {
    id: 9,
    question: "Can I access courses or make purchases without going online?",
    answer:
      "Yes. Courses and products can be accessed and purchased entirely by phone. No internet access is required.",
  },
  {
    id: 10,
    question:
      "I don’t live in the United States. Is there a local number for my country?",
    answer:
      "At this time, the infoline is available only through the U.S. number. Ohel Miriam operates with limited resources, and international dial-in access is not yet available. Those who have a passion to see Ohel Miriam grow, expand, and strengthen its services for the Yiddishe olam are invited to visit the Donate page.",
  },
];
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
export default function page() {
  return (
    <main>
      <section className="hero-banner grid place-items-center">
        <h1 className="text-white font-extrabold text-3xl sm:text-4xl lg:text-5xl text-center">
          InfoLine
        </h1>
      </section>
      <section className="container my-20">
        <div className="wrapper">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-teal">
              Call the Ohel Miriam Infoline
            </h2>
            <p className="font-bold text-lg  sm:text-xl mt-6">(845) 414-8016</p>
          </div>
          <div className="mt-10">
            <div>
              {infolines.map((line) => (
                <div
                  style={{ backgroundColor: line.color }}
                  key={line.id}
                  className={`grid grid-cols-[1fr_2fr] border-x border-t h-14 ${line.id === infolines.length ? "border-b" : ""}`}
                >
                  <h3 className="text-base sm:text-xl flex items-center justify-center font-medium mb-2 border-r text-center py-1">
                    {line.press}
                  </h3>
                  <p className="text-base sm:text-xl font-medium flex items-center pl-4 py-1">
                    {line.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="sm:text-xl font-medium mt-8 sm:mt-14">
              Review this menu before calling. This visual guide is designed to
              make the infoline easy to follow, especially when calling from a
              non-smartphone.
            </p>
          </div>
        </div>
      </section>
      <section className="container my-20">
        <div className="wrapper">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
            Frequently Asked Questions (FAQ)
          </h1>
          <div className="mt-8">
            <Accordion type="single" collapsible defaultValue="faq-1">
              {FAQ.map((faq) => (
                <AccordionItem key={faq.id} value={`faq-${faq.id}`}>
                  <AccordionTrigger className="text-lg sm:text-xl md:text-2xl ">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-base sm:text-lg">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </main>
  );
}

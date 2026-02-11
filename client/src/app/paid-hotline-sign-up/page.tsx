import { getAllPaidSpeaker } from "@/actions/paidHotline";
import SpeakerGallerySlider from "@/components/paid-hotline-signup/SpeakerGallerySlider";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function PaidHotlineSignup() {
  const { data: speakers } = await getAllPaidSpeaker();
  return (
    <main>
      <section className="hero-banner grid place-items-center">
        <h1 className="text-white font-extrabold text-3xl sm:text-4xl lg:text-5xl text-center">
          Paid Hotline Signup
        </h1>
      </section>
      <SpeakerGallerySlider speakers={speakers} />
      <section className="container text-center my-32">
        <h2 className="text-3xl font-bold text-teal">
          Intimacy (Before & After Menopause), Shalom Bayis, Taharas Hamispacha,
        </h2>
        <div className="mt-8 text-teal">
          <h3 className="text-3xl font-medium">and much much more!</h3>
          <p className="text-2xl leading-15 font-medium mt-8">
            Get access to all the lectures that were previously aired. <br />
            Receive a wealth of information on marital harmony at your
            fingertips. <br /> Communication, gender differences, managing
            finances, relinquish control & more. <br /> All this for
          </p>
          <h5 className="text-3xl italic mt-8">ONLY $25.00 A MONTH!</h5>
          <p className="text-2xl leading-15 font-medium mt-8">
            You can cancel anytime. <br />
            Call 845-400-9559. Press 1 and have your credit card handy. <br />
            Monthly fee auto renews until cancelled.
            <br />
            Remember the date you joined. The month you want to cancel, call
            845-400-9559 (from the same phone number you used to join) and press
            2. <br />
            Cancellations <strong>WILL NOT</strong> be accepted retroactively.
          </p>
          <Link href="/paid-hotline">
            <Button className="bg-teal mt-10 text-base">
              View/Search for Speaker/Topic
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}

import "@/app/home.css";
import About from "@/components/home/About";
import CoupleFaced from "@/components/home/CoupleFaced";
import Hero from "@/components/home/Hero";
import JewishHomes from "@/components/home/JewishHomes";
import StrengthenYourMarriage from "@/components/home/StrengthenYourMarriage";
import Struggle from "@/components/home/Struggle";
import StuggleToStrength from "@/components/home/StuggleToStrength";
import Testimonials from "@/components/home/testimonials/Testimonials";
import Upcoming from "@/components/home/Upcoming";
export default function Home() {
  return (
    <main>
      <Hero />
      <CoupleFaced />
      <Upcoming />
      <Struggle />
      <StuggleToStrength />
      <Testimonials />
      <About />
      <StrengthenYourMarriage />
      <JewishHomes />
    </main>
  );
}

import "@/app/home.css";
// import About from "@/components/home/About";
import Counter from "@/components/home/Counter";
import CoupleFaced from "@/components/home/CoupleFaced";
import Hero from "@/components/home/Hero";
import JewishHomes from "@/components/home/JewishHomes";
import StrengthenYourMarriage from "@/components/home/StrengthenYourMarriage";
import Struggle from "@/components/home/Struggle";
// import StuggleToStrength from "@/components/home/StuggleToStrength";
import Testimonials from "@/components/home/testimonials/Testimonials";
import Upcoming from "@/components/home/Upcoming";
import Welcome from "@/components/home/Welcome";
import { getSession } from "@/lib/authLib";
export default async function Home() {
  const user = await getSession();
  console.log("Home User:", user);
  
  return (
    <main>
      <Hero />
      <Welcome/>
      <Counter/>
      <CoupleFaced />
      <Upcoming />
      <Struggle />
      {/* <StuggleToStrength /> */}
      <Testimonials />
      {/* <About /> */}
      <StrengthenYourMarriage />
      <JewishHomes />
    </main>
  );
}

import FadeInSection from "@/components/common/FadeInSection";
import TestimonialsSlider from "./TestimonialsSlider";

const Testimonials = () => {
  return (
    <div className="bg-ligtGray py-14 mt-20">
      <div className="container">
        <FadeInSection
          initial={{ opacity: 0, y: 50 }}
          scrollTop={{ opacity: 1, y: 0 }}
          scrollBottom={{ opacity: 0, y: 50 }}
          margin="40px 0px -40px 0px"
        >
          <h3 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3">
            {" "}
            Testimonials
          </h3>
        </FadeInSection>

        {/* slider */}
        <div>
          <TestimonialsSlider/>
        </div>


      </div>
    </div>
  );
}

export default Testimonials;
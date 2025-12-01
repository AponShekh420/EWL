import TestimonialsSlider from "./TestimonialsSlider";

const Testimonials = () => {
  return (
    <div className="bg-ligtGray py-14">
      <div className="container">
         <h3 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3">
          {" "}
          Testimonials
        </h3>

        {/* slider */}
        <div>
          <TestimonialsSlider/>
        </div>


      </div>
    </div>
  );
}

export default Testimonials;
const Counter = () => {
  return (
    <div className="mt-20">
      <div className="container">
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-x-3 gap-y-15">

          {/* grid 1 */}
          <div className="flex items-center flex-col">
            <p className="text-teal font-bold text-5xl">6,000</p>
            <p className="font-semibold text-teal text-lg mt-2 text-center">Couples</p>
            <p className="text-md text-[#333333] text-center">Who really want to know!</p>
          </div>

          {/* grid 2 */}
          <div className="flex items-center flex-col">
            <p className="text-teal font-bold text-5xl">15</p>
            <p className="font-semibold text-teal text-lg mt-2 text-center">Courses</p>
            <p className="text-md text-[#333333] text-center">Comprehensive In-depth information</p>
          </div>

          {/* grid 3 */}
          <div className="flex items-center flex-col">
            <p className="text-teal font-bold text-5xl">45</p>
            <p className="font-semibold text-teal text-lg mt-2 text-center">Speakers</p>
            <p className="text-md text-[#333333] text-center">Professionals in the field</p>
          </div>

          {/* grid 4 */}
          <div className="flex items-center flex-col">
            <p className="text-teal font-bold text-5xl">90</p>
            <p className="font-semibold text-teal text-lg mt-2 text-center">Lectures</p>
            <p className="text-md text-[#333333] text-center">Answers to questions you’re embarrassed to ask.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Counter;
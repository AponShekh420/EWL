const Upcoming = () => {
  return (
    <section className="mt-20">
     <div className="container">
      <h3 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3">
        {" "}
        Upcoming conferences
      </h3>
     </div>
     <div className="bg-ligtGray py-14">
        <div className="container">

          {/* event 1 */}
          <div className="flex md:flex-row flex-col border-b-2 border-gray-300">

            {/* date */}
            <div className="flex sm:flex-row flex-col gap-x-6 items-center h-fit md:py-6 sm:pr-10 ">
              <div className="flex flex-col gap-y-2 sm:h-full sm:justify-between items-center sm:items-start">
                <p className="text-[#270034] lg:text-xl md:text-lg text-xl font-semibold">Jul</p>
                <h3 className="text-[#270034] md:text-5xl lg:text-6xl text-6xl font-bold">23</h3>
              </div>
              <div className="flex flex-col items-center sm:items-start ">
                <p className="text-[#270034] md:text-md lg:text-lg text-lg font-medium mb-2">Wednesday 9:00pm EST</p>
                <div className="flex gap-x-2 justify-center sm:justify-start">
                  <div className="py-1 md:px-2 lg:px-3 px-4 bg-white rounded-2xl items-center justify-center flex flex-col">
                    <p className="font-medium md:text-lg lg:text-xl text-xl">00</p>
                    <p className="font-medium  md:text-md lg:text-lg text-lg -mt-1 capitalize">day</p>
                  </div>
                  <div className="py-1 md:px-2 lg:px-3 px-4 bg-white rounded-2xl items-center justify-center flex flex-col">
                    <p className="font-medium md:text-lg lg:text-xl text-xl">00</p>
                    <p className="font-medium  md:text-md lg:text-lg text-lg -mt-1 capitalize">Hours</p>
                  </div>
                  <div className="py-1 md:px-2 lg:px-3 px-4 bg-white rounded-2xl items-center justify-center flex flex-col">
                    <p className="font-medium md:text-lg lg:text-xl text-xl">00</p>
                    <p className="font-medium  md:text-md lg:text-lg text-lg -mt-1 capitalize">Minutes</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between w-full items-center">
              {/* info */}
              <div className="py-5">
                <div className="md:border-l-2 md:border-gray-300 h-full md:px-5 flex flex-col justify-center">
                  <h3 className="lg:text-3xl text-lg sm:text-xl text-[#270034] lg:font-semibold md:font-medium font-semibold">Spearker: <span className="text-[#0F75BC]">Mindy Wiesner</span></h3>
                  <h3 className="lg:mt-3 md:mt-2 lg:text-3xl text-lg sm:text-xl text-[#270034] lg:font-semibold md:font-medium font-semibold">Lecture: <span className="text-[#0F75BC]">Elevate Your 9 Days</span></h3>
                </div>
              </div>
              
              {/* button */}
              <div className="">
                <button className="bg-[#270034] sm:px-5 px-3 py-2 flex items-center justify-center sm:h-9 h-8 border-2 border-[#0F75BC] rounded-full font-medium text-white text-[13px] sm:text-sm text-nowrap shadow-[2px_2px_20px_0px_#2700346c] hover:bg-[#0F75BC] transition-all duration-150">Read More</button>
              </div>
            </div>
          </div>


          {/* event 2 */}
          <div className="flex md:flex-row flex-col border-b-2 border-gray-300 mt-10 sm:mt-6 md:mt-0">

            {/* date */}
            <div className="flex sm:flex-row flex-col gap-x-6 items-center h-fit md:py-6 sm:pr-10 ">
              <div className="flex flex-col gap-y-2 sm:h-full sm:justify-between items-center sm:items-start">
                <p className="text-[#270034] lg:text-xl md:text-lg text-xl font-semibold">Jul</p>
                <h3 className="text-[#270034] md:text-5xl lg:text-6xl text-6xl font-bold">23</h3>
              </div>
              <div className="flex flex-col items-center sm:items-start ">
                <p className="text-[#270034] md:text-md lg:text-lg text-lg font-medium mb-2">Wednesday 9:00pm EST</p>
                <div className="flex gap-x-2 justify-center sm:justify-start">
                  <div className="py-1 md:px-2 lg:px-3 px-4 bg-white rounded-2xl items-center justify-center flex flex-col">
                    <p className="font-medium md:text-lg lg:text-xl text-xl">00</p>
                    <p className="font-medium  md:text-md lg:text-lg text-lg -mt-1 capitalize">day</p>
                  </div>
                  <div className="py-1 md:px-2 lg:px-3 px-4 bg-white rounded-2xl items-center justify-center flex flex-col">
                    <p className="font-medium md:text-lg lg:text-xl text-xl">00</p>
                    <p className="font-medium  md:text-md lg:text-lg text-lg -mt-1 capitalize">Hours</p>
                  </div>
                  <div className="py-1 md:px-2 lg:px-3 px-4 bg-white rounded-2xl items-center justify-center flex flex-col">
                    <p className="font-medium md:text-lg lg:text-xl text-xl">00</p>
                    <p className="font-medium  md:text-md lg:text-lg text-lg -mt-1 capitalize">Minutes</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between w-full items-center">
              {/* info */}
              <div className="py-5">
                <div className="md:border-l-2 md:border-gray-300 h-full md:px-5 flex flex-col justify-center">
                  <h3 className="lg:text-3xl text-lg sm:text-xl text-[#270034] lg:font-semibold md:font-medium font-semibold">Spearker: <span className="text-[#0F75BC]">Rabbi Yehoshua Berman</span></h3>
                  <h3 className="lg:mt-3 md:mt-2 lg:text-3xl text-lg sm:text-xl text-[#270034] lg:font-semibold md:font-medium font-semibold">Lecture: <span className="text-[#0F75BC]">Intimacy Challenges, Solutions and Enhancements</span></h3>
                </div>
              </div>
              
              {/* button */}
              <div className="">
                <button className="bg-[#270034] sm:px-5 px-3 py-2 flex items-center justify-center sm:h-9 h-8 border-2 border-[#0F75BC] rounded-full font-medium text-white text-[13px] sm:text-sm text-nowrap shadow-[2px_2px_20px_0px_#2700346c] hover:bg-[#0F75BC] transition-all duration-150">Read More</button>
              </div>
            </div>
          </div>

        </div>
     </div>
    </section>
  );
}

export default Upcoming;
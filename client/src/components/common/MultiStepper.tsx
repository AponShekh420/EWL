"use client";
import {
  activeStep,
  nextStep,
  prevStep,
} from "@/redux/features/stepper/stepperSlice";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";

export default function MultiStepper({
  children,
  className,
  totalStep = 2,
}: {
  children: React.ReactNode;
  className?: string;
  totalStep: number;
}) {
  const dispatch = useDispatch();
  const { step } = useSelector((state: RootState) => state.stepper);
  return (
    <div className={`mt-8 ${className}`}>
      <div className="mb-10 lg:mb-20">
        <div className="flex">
          {Array.from({ length: totalStep }).map((_, index) => (
            <div
              onClick={() => dispatch(activeStep(index + 1))}
              className={`flex-1 flex items-center before:absolute  before:size-4 before:rounded-full before:z-10 before:top-9 before:left-0 relative ${
                index < step ? "before:bg-blue-500" : "before:bg-gray-300"
              }`}
              key={index}
            >
              <button
                style={{
                  clipPath:
                    "polygon(50% 0%, 100% 0, 100% 73%, 50% 100%, 1% 73%, 0 0)",
                }}
                className={`text-sm  px-2  pb-1.5 pt-0.5 rounded-t-md ${
                  index < step ? "bg-blue-600 text-white" : "bg-gray-200"
                }`}
              >
                {index + 1}
              </button>
              <span
                className={`capitalize text-sm font-bold px-2  pb-2 pt-1 rounded-t-md cursor-pointer ${
                  index < step ? "text-blue-600" : "text-black"
                }`}
              >
                step
              </span>
            </div>
          ))}
        </div>
        <div
          className={`bg-gray-200 h-2 w-full  mt-2 relative overflow-hidden rounded-full`}
        >
          {" "}
          <span
            style={{ width: `${(step / totalStep) * 100 + 1}%` }}
            className={`bg-blue-500 h-full w-full absolute top-0 left-0 rounded-r-full`}
          ></span>
        </div>
      </div>
      {children}
      <div className="flex justify-end gap-4 mt-2 mb-20 capitalize">
        {step > 1 && (
          <Button onClick={() => dispatch(prevStep())} variant="outline">
            Prev
          </Button>
        )}
        {step < totalStep && (
          <Button onClick={() => dispatch(nextStep())} variant="blue">
            Next
          </Button>
        )}
      </div>
    </div>
  );
}

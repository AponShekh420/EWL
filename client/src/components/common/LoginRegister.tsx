import { Icon } from "@iconify/react";
import { Dispatch, SetStateAction } from "react";
import Register from "./Register";
import Login from "./Login";
const LoginRegister = ({
  authToggle,
  setAuthToggle,
}: {
  authToggle: boolean | string;
  setAuthToggle: Dispatch<SetStateAction<boolean | string>>;
}) => {
  return (
    <div className="w-full fixed h-full top-0 z-50 bg-black/50 flex items-center justify-center py-30">

      <div className="relative p-[3px] rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">

        {/* Popup box inside the border */}
        <div className="sm:w-[600px] sm:max-h-[90vh] sm:h-fit h-screen w-screen bg-white rounded-2xl overflow-hidden flex flex-col">

          {/* Close button */}
          <div className="w-full flex justify-end p-6 flex-shrink-0">
            <Icon
              icon="maki:cross"
              width="27"
              height="27"
              className="cursor-pointer text-[#0F75BC]  hover:text-[#270034] duration-150"
              onClick={() => setAuthToggle(false)}
            />
          </div>


          <div className="w-full flex items-center justify-center">
            <div className="h-8 w-48 shadow-inner shadow-gray-700 rounded-full flex justify-between relative overflow-hidden">

              {/* Sliding background */}
              <div
                className={`
                  bg-gradient-to-r from-teal via-purple-500 to-pink-500 
                  w-1/2 h-full z-0 rounded-full absolute 
                  transition-all duration-300 
                  ${authToggle === "login" ? "translate-x-0" : "translate-x-full"}
                `}
              ></div>

              {/* Login button */}
              <button
                className={`
                  z-10 w-1/2 font-medium flex items-center justify-center 
                  transition-all duration-300
                  ${authToggle === "login" ? "text-white" : "text-black"}
                `}
                onClick={() => setAuthToggle("login")}
              >
                Login
              </button>

              {/* Register button */}
              <button
                className={`
                  z-10 w-1/2 font-medium flex items-center justify-center 
                  transition-all duration-300
                  ${authToggle === "register" ? "text-white" : "text-black"}
                `}
                onClick={() => setAuthToggle("register")}
              >
                Register
              </button>

            </div>
          </div>


          {/* Scrollable Register form */}
          <div className="max-h-[75vh] overflow-y-auto px-8 pb-8">
            {authToggle == "register" && <Register setAuthToggle={setAuthToggle}/>}
            {authToggle == "login" && <Login setAuthToggle={setAuthToggle}/>}
          </div>

        </div>
      </div>

    </div>
  );
}

export default LoginRegister;
"use client";
import { logout, setCredentials } from "@/redux/auth/userSlice";
import { BASE_URL } from "@/utils/envVariable";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const getUser = async () => {
    try {
      const res = await fetch(
        `${BASE_URL}/api/auth/login/success`,
        {
          credentials: "include",
        }
      );
      const data = await res.json();
      if (data?.user) {
        dispatch(setCredentials(data?.user));
      } else {
        dispatch(logout());
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message)
      }
    }
  };

  useEffect(() => {
    getUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (<>{children}</>);
};

export default Wrapper;

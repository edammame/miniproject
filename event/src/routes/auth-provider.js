"use client";
import { keepLogin } from "@/redux/middleware/user";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Loading from "@/components/loading";

function AuthProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(keepLogin());
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);
  return (
    <div>
      {isLoading ? (
        <>
          <Loading />
        </>
      ) : (
        children
      )}
    </div>
  );
}
export default AuthProvider;

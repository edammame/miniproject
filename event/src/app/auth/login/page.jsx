"use client";
import { userLogin } from "@/redux/middleware/user";
import { useDispatch } from "react-redux";
import Link from "next/link";
function Page() {
  const dispatch = useDispatch();

  const login = () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    dispatch(userLogin({ email, password }));
  };

  return (
    <>
      <div
        className="flex justify-center items-center min-h-screen 
       text-sm p-3"
      >
        <div className="flex flex-col max-w-[440px] ">
          <h1 className=" text-3xl font-semibold">Enter Your Account</h1>
          <p className="  text-[#989898] text-[13px]">Let's get started</p>

          <div className=" font-bold mt-5">Email</div>
          <input
            className=" p-3 bg-[#F3F4F6] rounded-lg border-none"
            placeholder="enter email"
            id="email"
            type="email"
          ></input>

          <div className=" font-bold mt-5">Password</div>
          <input
            className=" p-3 bg-[#F3F4F6] rounded-lg border-none"
            placeholder="enter password"
            id="password"
            type="password"
          ></input>

          <div className=" mt-4 text-xs ">
            belum punya account?{" "}
            <Link
              href="/auth/customerRegister"
              className="text-[#4F46E5] font-bold"
            >
              Register
            </Link>
          </div>
          <button
            className="  rounded-lg mt-2 text-white bg-[#4F46E5] h-16"
            onClick={login}
          >
            Masuk
          </button>
        </div>
      </div>
    </>
  );
}
export default Page;

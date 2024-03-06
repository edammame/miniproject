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
      <div>
        <a href={"/"} className="m-3">
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="black"
              class="w-10 h-10 opacity-20"
            >
              <path
                fill-rule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-4.28 9.22a.75.75 0 0 0 0 1.06l3 3a.75.75 0 1 0 1.06-1.06l-1.72-1.72h5.69a.75.75 0 0 0 0-1.5h-5.69l1.72-1.72a.75.75 0 0 0-1.06-1.06l-3 3Z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </a>
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
      </div>
    </>
  );
}
export default Page;

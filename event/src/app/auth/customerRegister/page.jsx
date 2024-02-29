"use client";
import * as Yup from "yup";
import YupPassword from "yup-password";
import { useEffect } from "react";
import { axiosInstance } from "@/axios/axios";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();

  YupPassword(Yup);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      role: "customer",
      inputRefCode: "",
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().required(),
      email: Yup.string().required().email("bukan email"),
      password: Yup.string().required().min(8),
    }),
    onSubmit: () => {
      register();
    },
  });
  const register = () => {
    const user = formik.values;
    console.log(user);
    if (user.username && user.email && user.password) {
      axiosInstance()
        .post("/users", user)
        .then((res) => {
          alert("register berhasil");

          router.push("/auth/login");
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    console.log(formik.values);
  }, [formik.values]);

  return (
    <>
      <div
        className="flex justify-center items-center min-h-screen 
       text-sm p-3"
      >
        <div className="flex flex-col max-w-[440px] ">
          <h1 className=" text-3xl font-semibold">Make Your Account</h1>

          <div className=" font-bold mt-5">Username</div>
          <input
            className=" p-3 bg-[#F3F4F6] rounded-lg "
            placeholder="Username"
            onChange={(e) => formik.setFieldValue("username", e.target.value)} //panggil function inputHandler otomatis kirim event
            id="username"
            value={formik.values.username}
          ></input>
          <div className=" my-1 text-red-500">{formik.errors.username}</div>

          <div className=" font-bold mt-5">Email</div>
          <input
            type="email"
            className="p-3  bg-[#F3F4F6] rounded-lg border-none"
            placeholder="enter your email"
            onChange={formik.handleChange}
            id="email"
            value={formik.values.email}
          ></input>
          <div className=" my-1 text-red-500">{formik.errors.email}</div>

          <div className=" font-bold mt-5">Password</div>
          <input
            type="password"
            placeholder="enter password"
            className="p-3 bg-[#F3F4F6] rounded-lg border-none"
            onChange={formik.handleChange}
            id="password"
            value={formik.values.password}
          ></input>
          <div className=" my-1 text-red-500">{formik.errors.password}</div>

          <div className=" font-bold mt-5">Referal Code</div>
          <input
            className=" p-3 bg-[#F3F4F6] rounded-lg "
            placeholder="#1234567"
            id="referalcode"
          ></input>

          <p className=" mt-3 text-[#989898] text-[13px]">
            I Agree With The Terms of Service & Privacy Policy
          </p>
          <button
            type="submit"
            className={` rounded-lg mt-6 text-white bg-[#4F46E5] h-16`}
            onClick={formik.handleSubmit}
          >
            Register
          </button>

          <div className="flex justify-center mt-2 text-xs">
            sudah punya account?{" "}
            <Link href="/auth/login" className="text-[#4F46E5] font-bold">
              Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
export default Page;

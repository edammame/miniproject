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
      role: "organizer",
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
    if (user.email && user.username && user.password) {
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
      <main className="flex min-h-screen">
        <section className="grid items-center bg-pink-200 w-[60%]">
          <article className="ml-20 -translate-y-48" id="myoe">
            <p className="text-6xl font-semibold">Make your</p>
            <p className="text-6xl font-semibold">Own Event!</p>
          </article>
        </section>
        <section
          className="flex justify-center items-center w-full
       text-sm p-3"
        >
          <div className="flex flex-col max-w-[440px]">
            <div className=" font-bold mt-5">Name / Company Name</div>
            <input
              className=" p-3 bg-[#F3F4F6] rounded-lg"
              placeholder="enter name"
              onChange={(e) => formik.setFieldValue("username", e.target.value)} //panggil function inputHandler otomatis kirim event
              id="name"
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
              className="p-3 bg-[#F3F4F6] rounded-lg border-none"
              placeholder="enter password"
              onChange={formik.handleChange}
              id="password"
              value={formik.values.password}
            ></input>
            <div className=" my-1 text-red-500">{formik.errors.password}</div>

            <p className=" mt-3 text-[#989898] text-[13px]">
              I Agree With The Terms of Service & Privacy Policy
            </p>

            <button
              type="submit"
              className={`rounded-lg mt-6 text-white bg-[#4F46E5] h-16`}
              onClick={formik.handleSubmit}
            >
              Register As Organizer
            </button>

            <div className="flex justify-center mt-2 text-xs">
              sudah punya account?
              <Link href="/auth/login" className="text-[#4F46E5] font-bold">
                Login
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
export default Page;

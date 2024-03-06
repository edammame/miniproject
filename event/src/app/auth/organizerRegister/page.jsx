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
                onChange={(e) =>
                  formik.setFieldValue("username", e.target.value)
                } //panggil function inputHandler otomatis kirim event
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
      </div>
    </>
  );
}
export default Page;

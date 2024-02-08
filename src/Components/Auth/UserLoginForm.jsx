import React from "react";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userLogin } from "../../Api/UserApi";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { userDetails } from "../../Redux/UserSlice";
import Oauth from "../../Firebase/Oauth";

function UserLoginForm() {
  const schema = z.object({
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z.string().min(5, { message: "Password must be at least 5 characters" }).max(10, { message: "Password cannot exceed 10 characters" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitData = async (formData) => {
    try {
      const { email, password } = formData;
      const response = await userLogin({ email, password });

      if (response.data.status) {
        localStorage.setItem("token", response.data.token);
        const { newUser } = response.data;

        dispatch(userDetails(newUser));
        toast.success(response.data.alert);
        navigate("/");
      } else {
        toast.error(response.data.alert);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="w-full flex  flex-col justify-center items-center py-2">
      <form
        onSubmit={handleSubmit(submitData)}
        className="flex flex-col justify-center w-10/12"
      >
        <input
          type="text"
          {...register("email")}
          placeholder="Enter your email"
          className="h-8 w-full rounded-[4px]  shadow-md text-center mb-2  border border-slate-300 placeholder:italic"
        />
        {errors.email && <span className="text-red">{errors.email.message}</span>}
        <input
          type="password"
          {...register("password")}
          placeholder="Enter your password"
          className="h-8 w-full rounded-[4px] shadow-md text-center  mb-2 mt-2 border border-slate-300 placeholder:italic"
        />
        {errors.password && (
          <span className="text-red">{errors.password.message}</span>
        )}
        <button
          type="submit"
          className="h-9 w-full rounded-[4px] text-white bg-[#22092C] font-semibold shadow-md text-center mt-2 border border-slate-300"
        >
          Sign In
        </button>
      </form>
      <div className="flex-col justify-center items-center text-center py-2">
        <div>
          <Link to="/signup" className="text-[#872341] px-2">
            Don't have an account?
          </Link>
        </div>
        OR
        <Oauth />
        <div>
          <Link to="/vendor/login">
            <button className="h-9 w-full rounded-[4px] text-white bg-blue-800 font-semibold shadow-md text-center mt-2 border border-slate-300">
              SignIn As VENDOR
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UserLoginForm;

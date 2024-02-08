import React from "react";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { vendorDetails } from "../../Redux/VendorSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { vendorlogin } from "../../Api/VendorApi";

function VendorLoginForm() {
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(5).max(10),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitData = async (Fdata) => {
    try {
      const { email, password } = Fdata;
      const response = await vendorlogin({ email, password });
      if (response.data.status) {
        localStorage.setItem("token", response.data.token);
        const { newVendor } = response.data;

        dispatch(vendorDetails(newVendor));
        toast(response.data.alert);
        navigate("/vendor/studio");
      } else {
        toast(response.data.alert);
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
          className="h-8 w-full rounded-[4px]  shadow-md text-center mb-2  border border-slate-300 "
        />
        {errors.email && (
          <span className="text-red">{errors.email.message}</span>
        )}
        <input
          type="password"
          {...register("password")}
          placeholder="Enter your password"
          className="h-8 w-full rounded-[4px] shadow-md text-center  mb-2 mt-2 border border-slate-300 "
        />
        {errors.password && (
          <span className="text-red">{errors.password.message}</span>
        )}
        <button
          type="submit"
          className="h-8 w-full rounded-[4px] text-white bg-[#22092C] font-semibold shadow-md text-center mt-2 border border-slate-300"
        >
          Sign In
        </button>
      </form>
      <div className="flex-col justify-center items-center text-center py-2">
        <div>
          <Link to="/vendor/signup" className="text-[#872341] px-2">
            Don't have an Account?
          </Link>
        </div>
      </div>
      <Link to={"/"}>
        <h1>Back to home</h1>
      </Link>
    </div>
  );
}

export default VendorLoginForm;

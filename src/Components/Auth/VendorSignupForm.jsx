import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from "zod"
import { Link, useNavigate } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { vendorDetails } from '../../Redux/VendorSlice'
import { vendorSignup } from '../../Api/VendorApi'

function VendorSignupForm() {
    const schema = z.object({
        name:z.string().min(2).max(20),
        number: z.string().refine((value) => /^\d{10}$/g.test(value), {
          message: 'Invalid phone number. It should be 10 digits long.',
        }),
        email:z.string().email(),
        password: z
          .string()
          .min(8, 'Password must be at least 8 characters long.')
          .max(20, 'Password cannot be more than 20 characters long.')
          .refine((value) => /^(?=.*[a-zA-Z])(?=.*\d).+$/g.test(value), {
            message: 'Password must contain at least one letter and one digit.',
          }),
        confirmPassword:z.string().min(5).max(10)
      }).refine((data)=>data.password === data.confirmPassword, {
        message:"password do not match",
        path:["confirmPassword"]
      })
    
      const{ register, handleSubmit , formState:{errors}} = useForm({resolver:zodResolver(schema)})
    
      const dispatch = useDispatch()
      const navigate = useNavigate()

      const submitData = async(data)=>{
        const{name, number, email, password } = data
        const response = await vendorSignup({name, number, email, password});
        if (response.data.status) {
          localStorage.setItem("token",response.data.token)
          const {newVendor} = response.data
          dispatch(
            vendorDetails(newVendor)
          )
            navigate("/vendor/login")
        } else {
          toast(response.data.alert)
        }
      }
    
      return (
        <div className='w-full flex  flex-col justify-center items-center py-2'>
        <form 
        onSubmit={handleSubmit(submitData)}
        className='flex flex-col justify-center w-10/12'>
          <input
            type='text' {...register("name")}
            placeholder='Enter your name'
            className='h-8 w-full rounded-[4px] shadow-md text-center  mb-2 mt-2 border border-slate-300 placeholder:italic'
          />
           {errors.name && <span className='text-red-950'> {errors.name.message} </span>}
    
          <input
            type='text' {...register("number")}
            placeholder='Enter your contact number'
            className='h-8 w-full rounded-[4px] shadow-md text-center  mb-2 mt-2 border border-slate-300 placeholder:italic'
          />
           {errors.number && <span className='text-red-950'> {errors.number.message} </span>}
    
          <input
            type='text' {...register("email")}
            placeholder='Enter your email'
            className='h-8 w-full rounded-[4px]  shadow-md text-center mb-2 mt-2 border border-slate-300 placeholder:italic'
          />
           {errors.email && <span className='text-red-950'> {errors.email.message} </span>}
          
          <input
            type='password' {...register("password")}
            placeholder='Enter your password'
            className='h-8 w-full rounded-[4px] shadow-md text-center  mb-2 mt-2 border border-slate-300 placeholder:italic'
          />
           {errors.password && <span className='text-red-950'> {errors.password.message} </span>}
    
          <input
            type='password' {...register("confirmPassword")}
            placeholder='Confirm your password'
            className='h-8 w-full rounded-[4px] shadow-md text-center  mb-2 mt-2 border border-slate-300 placeholder:italic'
          />
           {errors.confirmPassword && <span className='text-red-950'> {errors.confirmPassword.message} </span>}
    
          <button
          type='submit'
          className='h-8 w-full rounded-[4px] text-white bg-[#22092C] font-semibold shadow-md text-center mt-2 border border-slate-300'
          >
              Register
          </button>
        </form>
        <div className='flex-row justify-center text-center pt-3'>    
            <Link to="/vendor/login"><p className='text-red-800' >already have an account</p></Link>
        </div>
      </div>
      )
    }
    

export default VendorSignupForm

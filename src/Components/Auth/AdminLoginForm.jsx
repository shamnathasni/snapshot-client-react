import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch } from 'react-redux'
import { Link, useNavigate  } from 'react-router-dom'
import { z } from 'zod'
import { loginDetails } from '../../Redux/AdminSlice';
import { adminLogin } from '../../Api/AdminApi';
import { toast } from 'react-toastify';

function AdminLoginForm() {
  const schema = z.object({
    email:z.string().email(),
    password:z.string().min(5).max(10)
  })

  const {register, handleSubmit, formState:{errors}} = useForm({resolver:zodResolver(schema)})

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submitData = async(formData) => {
    try {
      const{ email, password } = formData
      const response = await adminLogin({email, password})
      if (response.data.status) {
        localStorage.setItem("token",response.data.token)
        const{ newAdmin } = response.data
        console.log(newAdmin,"nnn");
        dispatch(
          loginDetails(newAdmin)
        )
        navigate("/admin/dashboard")
      } else {
        toast(response.data.alert)
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className='w-full flex flex-col items-center justify-center py-2'>
      <form 
      onSubmit={handleSubmit(submitData)}
      className='flex flex-col justify-center w-10/12'>
        <input
          type='text' {...register("email")}
          placeholder='Enter your email'
          className='h-8 w-full rounded-[4px]  shadow-md text-center mb-2  border border-slate-300 placeholder:italic'
        />
        {errors.email&&<span className='text-red'>errors.email.message</span>}
        <input
          type='password' {...register("password")}
          placeholder='Enter your password'
          className='h-8 w-full rounded-[4px] shadow-md text-center  mb-2 mt-2 border border-slate-300 placeholder:italic'
        />
        {errors.password&&<span className='text-red'>errors.password.message</span>}
        <button
        type='submit'
        className='h-8 w-full rounded-[4px] text-white bg-[#872341] font-semibold shadow-md text-center mt-2 border border-slate-300'
        >
            Register
        </button>
      </form> 
      <div className='py-4'>
      <Link className='text-[#F05941]'>Forget Password</Link>
      </div>     
    </div>
  )
}

export default AdminLoginForm

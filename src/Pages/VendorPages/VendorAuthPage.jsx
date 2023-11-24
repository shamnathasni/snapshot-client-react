import React from 'react'
import VendorLoginForm from '../../Components/Auth/VendorLoginForm'
import VendorSignupForm from '../../Components/Auth/VendorSignupForm'

function VendorAuthPage({form}) {
  return (
    <div>
    <div className='w-full h-screen bg-vendor-authentication-background bg-cover flex justify-center items-center'>
      <div className='w-8/12 h-5/6 bg-[#fcf5ff] shadow-lg rounded-[4px] grid grid-cols-2'>

        <div
          style={
            form === "login"
              ? { backgroundImage: "url(/Authentication/vendorlogin.jpg)", backgroundSize: "cover" }
              : { backgroundImage: "url(/Authentication/vendorsignup.jpg)", backgroundSize: "cover" }
          }
          className='rounded-l-[4px]'
        >
        </div>
        <div className='flex justify-center items-center flex-col'>
          <div>
            <header className='font-bold text-3xl pb-5'>
             { form === "login"
              ? "Sign in"
              : "Sign up"}
            </header>
          </div>
          {form === "login"
            ? <VendorLoginForm />
            : <VendorSignupForm />
          }
        </div>
      </div>
    </div>
  </div>
  )
}

export default VendorAuthPage


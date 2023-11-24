import React from 'react';
import { Link } from "react-router-dom"
import UserLoginForm from '../../Components/Auth/UserLoginForm';
import UserSignupForm from '../../Components/Auth/UserSignupForm';

function UserAuthPage({ form }) {
  return (
      <div >
      <div className='w-full h-screen bg-authentication-background bg-cover flex justify-center items-center'>
        <div className='w-8/12 h-5/6 bg-[#fcf5ff] shadow-lg rounded-[4px] grid grid-cols-2'>

          <div
            style={
              form === "login"
                ? { backgroundImage: "url(/Authentication/userLogin.jpg)", backgroundSize: "cover" }
                : { backgroundImage: "url(/Authentication/userSignup.jpg)", backgroundSize: "cover" }
            }
            className='rounded-l-[4px]'
          >
          </div>
          <div className='w-full flex  flex-col justify-center items-center py-2'>
            <div>
              <header className='font-bold text-3xl pb-5'>
               { form === "login"
                ? "Sign in"
                : "Sign up"}
              </header>
            </div>
            <div className='flex justify-center items-center py-2 w-full'>
            {form === "login"
              ? <UserLoginForm />
              : <UserSignupForm />
            }
            </div>           
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserAuthPage;

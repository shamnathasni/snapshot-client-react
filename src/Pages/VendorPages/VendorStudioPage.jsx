import React from 'react'
import VendorNavbar from '../../Components/Layouts/VendorNavbar'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';


function VendorStudioPage() {
  return (
    <>
      <VendorNavbar/>
      <div className='h-[90vh] w-full grid justify-center items-center grid-cols-2' style={{backgroundImage:"url(/Navbar/S.jpg)"  , backgroundSize:"cover" }}>
       <div className='w-full md:block hidden'></div>
       <div className='w-full md:w-1/2  pl-10 md:p-0  flex flex-col justify-start md:justify-center'>
        <p className='text-center text-xl font-normal font-MyFont'>welcome to</p>
        <h1 className='font-extrabold font-serif text-center text-7xl text-[#872341]'>STUDIO</h1>
       </div>
      </div>
      <div className="flex justify-center items-center h-[50vh]">
        <div className="h-30 flex flex-row items-center py-10">
        <Link to={"/vendor/createStudio"}>
          <div className='flex flex-row'>
        <FontAwesomeIcon icon={faFolderPlus} className='text-3xl py-2'  />
          <h3 className="font-bold text-4xl mx-3">
            Create studio
          </h3>
          </div>
        </Link>
        </div>
      </div>
    </>
  )
}

export default VendorStudioPage

import React, { useState } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogout } from "../../Redux/UserSlice";
import Modal from "../Modal";


export function StickyNavbar() {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 10 && setOpenNav(false)
    );
  }, []);

  const token = localStorage.getItem("token")

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      ><Link to={"/userStudio" }>
        <div className="flex items-center font-semibold text-[#872341]">
          Studios
        </div>
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
        >
        {token && (  
        <a href="/profile" className="flex items-center font-semibold text-[#872341]">
          Profile
        </a>
        )}
      </Typography>
    </ul>
  );
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogout = async()=>{
    localStorage.removeItem("token")
    dispatch(userLogout())
    navigate("/")
    setShowModal(false);
  }
  const confirmLogout = () => {
    setShowModal(true);
  };

  const cancelLogout = () => {
    // Cancel the logout action
    setShowModal(false);
  };

  return (
    <div className=" max-h-[768px] w-[98-vh] flex justify-center mb-0.5 items-center ">
      <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Typography
            as="a"
            href="#"
            className="mr-4 cursor-pointer py-1.5  text-[#22092C] font-extrabold text-[28px] flux items-center font-MyFont"
          >
            SnapShot
          </Typography>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
            <div className="flex items-center gap-x-1">
              <Button
                variant="gradient"
                size="sm"
                className="hidden lg:inline-block bg-[#e5bac7]"
              >
                {token?( 
                 <div>          
                <span className="text-[#872341]" onClick={confirmLogout}>Log out</span>  
                
                   {showModal && (
                      <Modal onClose={() => setShowModal(false)}>
                        <div className="p-4">
                          <p className="mb-4 text-black">Are you sure you want to logout?</p>
                          <div className="flex justify-center">
                            <Button variant="outlined" size="sm" className="ml-2 bg-[#872341] text-white"  onClick={cancelLogout}>
                              Cancel
                            </Button>
                            <Button variant="outlined" size="sm" className="ml-2 bg-[#872341] text-white" onClick={handleLogout}>
                              Confirm
                            </Button>
                          </div>
                        </div>
                      </Modal>
                    )}
                </div>  

            ):(
              <Link to={"/login"}>
                <span className="text-[#872341] ">Log in</span>
              </Link>
            )}
              </Button>
            </div>
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <MobileNav open={openNav}>
          {navList}
          <div className="flex items-center gap-x-1">
            <Button fullWidth variant="gradient" size="sm" clStickyNavbarassName="">
            {token?(            
                <span className="text-[#872341]" onClick={handleLogout}>Log out</span>                
            ):(
              <Link to={"/login"}>
                <span className="text-[#872341] ">Log in</span>
              </Link>
            )}
            </Button>
          </div>
        </MobileNav>
      </Navbar>
    </div>
  );
}

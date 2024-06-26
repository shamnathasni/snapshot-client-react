import React from "react";
import "../../index.css";

import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  IconButton,
  //   Collapse,
  Collapse,
  Navbar,
  Typography,
} from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logoutDetails } from "../../Redux/VendorSlice";
import { toast } from "react-toastify";

function AdminNavbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const admin = useSelector((state) => state.User.admin);
  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logoutDetails());
    toast("You have successfully logged out!");
    console.log("Dispatched logout action.");
    navigate("/admin/login");
  };

  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);
  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 ">
      <Typography as="li" variant="small" color="blue-gray">
        <Link to={"/admin/dashboard"} className="flex items-center">
          <h3
            className={
              location.pathname === "/admin/dashboard"
                ? "p-1 text-xl font-semibold navlist"
                : "p-1 font-normal"
            }
          >
            Dashboard
          </h3>
        </Link>
      </Typography>
      <Typography as="li" variant="small" color="blue-gray">
        <Link to={"/admin/categorylist"} className="flex items-center">
          <h3
            className={
              location.pathname === "/admin/categorylist"
                ? "p-1 text-xl font-semibold navlist"
                : "p-1 font-normal"
            }
          >
            Category
          </h3>
        </Link>
      </Typography>
      <Typography as="li" variant="small">
        <Link to={"/admin/userlist"} className="flex items-center">
          <h3
            className={
              location.pathname === "/admin/userlist"
                ? "p-1 text-xl font-semibold navlist "
                : "p-1 font-normal"
            }
          >
            Users
          </h3>
        </Link>
      </Typography>
      <Typography as="li" variant="small" color="blue-gray">
        <Link to={"/admin/vendorlist"} className="flex items-center">
          <h3
            className={
              location.pathname === "/admin/vendorlist"
                ? "p-1 text-xl font-semibold navlist "
                : "p-1 font-normal"
            }
          >
            Vendors
          </h3>
        </Link>
      </Typography>

      <div className="flex gap-5">
        <Button
          variant="gradient"
          size="sm"
          className="hidden lg:inline-block "
          onClick={handleLogout}
        >
          <span>Logout</span>
        </Button>
      </div>
    </ul>
  );
  return (
    <div className="w-full ">
      <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none py-2 px-4 bg-[#22092C] lg:px-8 lg:py-4">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Typography
            as="a"
            href="/"
            className="mr-4 cursor-pointer py-1.5 font-medium"
          >
            Admin Panel
          </Typography>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
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
        <Collapse open={openNav}>
          {navList}
          <Button
            variant="gradient"
            size="sm"
            fullWidth
            className="mb-2"
            onClick={handleLogout}
          >
            <span>Logout</span>
          </Button>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default AdminNavbar;

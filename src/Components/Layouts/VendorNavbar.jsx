import { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { logoutDetails } from "../../Redux/VendorSlice";
import Modal from "../Modal";
import { Button } from "@material-tailwind/react";

export default function VendorNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.removeItem("token");
    dispatch(logoutDetails());
    navigate("/vendor/login");
    setShowModal(false);
  };
  const cancelLogout = () => {
    setShowModal(false);
  };
  const confirmLogout = () => {
    setShowModal(true);
  };

  return (
    <header className="bg-">
      <nav
        className=" w-screen mx-auto flex max-w-7xl items-center justify-between p-6 text-[#872341] lg:px-8 shadow-md"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link to={"/"}>
          <a href="#" className="-m-1.5 p-1.5">
            <span className="font-MyFont text-[#872341] text-3xl font-bold">
              SnapShot
            </span>
          </a>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          <Link
            to="/vendor/profile"
            className="text-base font-bold leading-6 text-[#872341]"
          >
            profile
          </Link>
          <Link
            to="/vendor/studio"
            className="text-base font-bold leading-6 text-[#872341]"
          >
            studio
          </Link>
          <Link
            to="/vendor/profile"
            className="text-base font-bold leading-6 text-[#872341]"
          ></Link>
        </Popover.Group>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {location.pathname !== "/vendor/profile" && (
            <a
              href="#"
              onClick={confirmLogout}
              className="text-base font-bold leading-6 text-[#872341]"
            >
              Log out <span aria-hidden="true">&rarr;</span>
            </a>
          )}
          <div>
            {showModal && (
              <Modal onClose={() => setShowModal(false)}>
                <div className="p-4">
                  <p className="mb-4 text-black">
                    Are you sure you want to logout?
                  </p>
                  <div className="flex justify-center">
                    <Button
                      variant="outlined"
                      size="sm"
                      className="ml-2 bg-[#872341] text-white"
                      onClick={cancelLogout}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="outlined"
                      size="sm"
                      className="ml-2 bg-[#872341] text-white"
                      onClick={handleLogout}
                    >
                      Confirm
                    </Button>
                  </div>
                </div>
              </Modal>
            )}
          </div>
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="font-MyFont text-3xl text-[#872341]">
                SnapShot
              </span>
              <img className="h-8 w-auto" alt="" />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Link
                  to="/vendor/profile"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-bold leading-7 text-[#872341] hover:bg-gray-50"
                >
                  profile
                </Link>
                <Link
                  to="/vendor/studio"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-bold leading-7 text-[#872341] hover:bg-gray-50"
                >
                  studio
                </Link>
              </div>
              <div className="py-6">
                {localStorage.getItem("token") && (
                  <span
                    onClick={handleLogout}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-bold leading-7 text-[#872341] hover:bg-gray-50"
                  >
                    LOG OUT
                  </span>
                )}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}

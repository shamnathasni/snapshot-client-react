import React, { useEffect, useState } from "react";
import { StickyNavbar } from "../../Components/Layouts/Navbar";
import { SimpleCard } from "../../Components/Home/Cards";
import CategoryCard from "../../Components/Home/CategoryCard";
import Footer from "../../Components/Layouts/Footer";
import { categoryList } from "../../Api/UserApi";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

function UserHomePage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const message = searchParams.get("message");
  const [category, setCategory] = useState([]);
  useEffect(() => {
    categoryList()
      .then((response) => {
        const categoryData = response.data.categoryData;
        setCategory(categoryData);
      })
      .catch((err) => console.log(err.message));
  }, []);
  useEffect(() => {
    if (message) {
      toast(message);
    }
  });
  return (
    <>
      <StickyNavbar />
      <div
        className="w-56 md:w-full h-56 md:h-screen overflow-hidden "
        style={{
          backgroundImage:"url(/Navbar/home.jpg)",
          backgroundSize: "cover",
        }}
      >
        <div className="flex flex-col justify-center items-center">
          <h4 className="text-[#22092C] text-4xl py-4 font-serif font-extrabold ">
            WELCOME TO <span className="font-MyFont ">SnapShot</span>
          </h4>
          <p className="text-[#872341] font-MyFont ">
            Welcome to a day where each frame tells a story, and where every
            smile captured becomes a cherished treasure.
          </p>
        </div>
      </div>
      {/* body */}
      <div className="bg-slate-100 w-full h-full flex flex-col px-10">
        <h2 className="text-[40px] font-bold px-3 text-[#872341]">
          Explore{" "}
          <span className="font-MyFont font-normal text-[#22092C] ">
            SnapShot
          </span>{" "}
        </h2>
        <div className=" flex-col justify-evenly flex  md:flex-row ">
          <SimpleCard
            heading="WEDDING FUNCTIONS"
            para='"Capture the magic of your special day with our expert wedding photography services. Every love story deserves a beautiful frame."'
          />
          <SimpleCard
            heading="EVENTS AND PARTIES"
            para='"Lights, camera, celebration! Our event photography team is here to document the joy, the surprises, and the heartwarming moments at your next special occasion."'
          />
          <SimpleCard
            heading="CONCERTS AND PERFORMANCES"
            para='"Capture the energy and passion of your live performances with our concert photography. We specialize in freezing the magic of the stage in every frame."'
          />
        </div>
        <hr className="mt-28 bg-slate-400 will-change-auto h-[2px] shadow-lg "></hr>
      </div>
      {category ? (
        category.map((value, index) => (
          <div
            key={index}
            className="bg-slate-100 w-full h-full flex flex-col px-10 py-7 "
          >
            <h6 className="text-[#872341] font-serif  text-[30px]">
              Plan your {value.name}
            </h6>
            <div className=" flex flex-row overflow-x-auto no-scrollbar py-8 ">
              {value.subcategory.map((e) => (
                <CategoryCard category={e.name} imageurl={`${e.image}`} />
              ))}
            </div>
            <hr className="mt-28 bg-slate-400 will-change-auto h-[2px] shadow-lg "></hr>
          </div>
        ))
      ) : (
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#872341]"></div>
        </div>
      )}

      <div className="w-full h-full bg-slate-100 py-10 flex items-center">
        <Footer />
      </div>
    </>
  );
}

export default UserHomePage;

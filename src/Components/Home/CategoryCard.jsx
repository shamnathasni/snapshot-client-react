import React from "react";
import { Link } from "react-router-dom";

function CategoryCard(props) {
  const { category, imageurl } = props;

  return (
    <div
      className=" hover:scale-105 ease-in-out duration-300 w-60 h-60 justify-center items-end flex rounded-lg px-5 mx-4"
      style={{ backgroundImage: `url(${imageurl})`, backgroundSize: "cover" }}
    >
      <Link to={`/categoryStudio/${category}`}>
        <button
          className="bg-white w-44 rounded-lg h-12 mb-[-22px]  text-[#872341] z-40 "
          style={{ right: "-18px" }}
        >
          {category}
        </button>
      </Link>
    </div>
  );
}

export default CategoryCard;

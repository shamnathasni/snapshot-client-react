import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userImage } from "../../Api/UserApi";
import { userDetails, userLogout } from "../../Redux/UserSlice";
import { useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUserSecret } from "@fortawesome/free-solid-svg-icons";

const UserProfile = () => {
  const [images, setImage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const user = useSelector((state) => state.User.user);

  // Destructure the properties after defining 'user'
  const { id, name, number, email, image } = user;

  const handleUpdateImage = async (event) => {
    try {
      const file = event.target.files && event.target.files[0];
      if(file) {
        setImage(file)
      const response = await userImage(id, file);
      if (response.data.updated) {
        // Assuming you have a response variable from somewhere
        const { _id, name, number, email, image } = response.data.data;
        dispatch(
          userDetails(response.data.data)
        );
      }
    }

    } catch (error) {
      console.log(error.message);
    }
  };

  const handleLogout = async()=>{
    localStorage.removeItem("token")
    dispatch(
      userLogout()
    )
    navigate("/")
  }
  return (
    <section className="pt-16 bg-blueGray-50">
      <div className="w-full lg:w-4/12 px-4 mx-auto">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
          <div className="px-6">
            <div className="flex flex-wrap justify-center">
              <div className="w-full px-4 flex justify-center">
                <div className="relative">
                <label htmlFor="fileInput" className="cursor-pointer w-4/5">
                  {/* <FontAwesomeIcon icon={faUserSecret} onClick={handleUpdateImage} /> */}
                  <img
                    src={
                      image
                        ? `../../../../../SnapShot-server/Public/Images/1700800807172-TAH-5.jpg`
                        : "https://th.bing.com/th/id/OIP.puMo9ITfruXP8iQx9cYcqwHaGJ?pid=ImgDet&rs=1"
                    }
                    alt="card-image"
                    className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                  />
            
                  </label>
                  <input
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleUpdateImage}
                 />
                </div>
              </div>
              {/* {image && (
                <img src="" alt="" srcset="" />
              )} */}
              <div className="w-full px-4 text-center mt-20">
                <div className="flex justify-center py-4 lg:pt-4 pt-8">
                  <div className="mr-4 p-3 text-center">
                    <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                      09/12/2023
                    </span>
                    <span className="text-[15px] text-blueGray-400">
                      joinedDate
                    </span>
                  </div>
                  <div className="mr-4 p-3 text-center">
                    <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                      10
                    </span>
                    <span className="text-[15px] text-blueGray-400">
                      Date of Birth
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center mt-12">
              <h3 className="text-xl font-semibold leading-normal  text-blueGray-700 mb-2">
                {name}
              </h3>
              <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                {email}
              </div>
              <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                {number}
              </div>
              <div className="mb-2 text-blueGray-600 mt-10">
                <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                Solution Manager - Creative Tim Officer
              </div>
              <div className="mb-2 text-blueGray-600">
                <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                University of Computer Science
              </div>
            </div>
            <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
              <div className="flex flex-wrap justify-center">
                <div className="w-full lg:w-9/12 px-4">
                  <div
                    className="font-normal text-pink-500"
                  >
                    <h6 onClick={handleLogout}>Logout</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;

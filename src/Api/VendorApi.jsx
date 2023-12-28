import axios from "axios";
import axiosInstance from "./Axios";

export const vendorSignup = async(signupData) => {
    try {
        const data = await axiosInstance.post("/vendor/signup",signupData)
        return data
    } catch (error) {
       console.log(error.message); 
    }
}

export  const vendorlogin = async(loginData) => {
    try {
        const data = await axiosInstance.post("/vendor/login",loginData)
        return data
    } catch (error) {
        console.log(error.message);  
    }
}

export const VendorImage = async (id,images) =>{
    try {
      const data = new FormData()
      data.append('image',images)
      data.append('vendorId',id)
      const response = await axiosInstance.post('/vendor/profileImage',data)
      return response;
    } catch (error) {
      console.log(error.message);
    }
  }

export const StudioFormApi = async (formData)=>{
    try {
      
        const config = {
            headers: {
              'content-type': 'multipart/form-data',
            },
            withCredentials: true,
          };
       const data = await axiosInstance.post("/vendor/studioform",formData,config) 
       console.log(data,"data");
       return data
    } catch (error) {
      console.log(error.message); 
    }
}

export const studioList = async(vendorsId)=>{
  try {
    const data = await axiosInstance.get(`/vendor/studio?id=${vendorsId}`)
    console.log(data,"data");
    return data
  } catch (error) {
    console.log(error.message); 
  }
}

export const vendorCategory = async()=>{
  try {
    const data = await axiosInstance.get("/vendor/vendorcategory")
    return data
  } catch (error) {
    console.log(error.message); 
  }
}

export const packageList = async () => {
  try {
    const data = await axiosInstance.get("/vendor/packageList");
    console.log(data, "data");
    return data  // Add this line
  } catch (error) {
    console.error(error.message);
  }
};
export const AddPackage = async (localState) => {
  try {
    const data = await axiosInstance.post("/vendor/addPackage", localState);
    console.log(data, "datappp");
    return data  // Add this line
  } catch (error) {
    console.error(error.message);
  }
};

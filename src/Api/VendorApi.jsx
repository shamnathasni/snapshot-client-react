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
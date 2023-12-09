import axiosInstance from "../Api/Axios"

export const userSignup = async (signupData) => {
    try {
        const data = await axiosInstance.post("/signup",signupData)
        console.log(data);
        return data
    } catch (error) {
      console.log(error.message);  
     }
}

export const verifyOtp = async(otp, userData)=>{
  try {
    const data =await axiosInstance.post("/verifyOtp",{otp, userData})
    return data
  } catch (error) {
    console.log(error.message); 
  }
}

export const resendOTP = async(userData)=>{
  try {
    const data = await axiosInstance.post("/resendOtp",{userData})
    return data
  } catch (error) {
    console.log(error.message);
  }
}

export const userLogin = async (loginData) => {
  try {
    const data = await axiosInstance.post("/login",loginData)
    return data 
  } catch (error) {
    console.log(error.message);  
  }
}
export const userImage = async (image) =>{
  try {
    const response = await axiosInstance.post('/profileImage',{image})
    return response;
  } catch (error) {
    console.log(error.message);
  }
}
import axiosInstance from "../Api/Axios"

export const userSignup = async (signupData) => {
    try {
        const data = await axiosInstance.post("/signup",signupData)
        return data
    } catch (error) {
      console.log(error);  
    }
}

export const userLogin = async (loginData) => {
  try {
    const data = await axiosInstance.post("/login",loginData)
    return data 
  } catch (error) {
    console.log(error);  
  }
}
export const userImage = async (id,images) =>{
  try {
    const data = new FormData()
    data.append('image',images)
    data.append('userId',id)
    const response = await axiosInstance.post('/profileImage',data)
    return response;
  } catch (error) {
    console.log(error.message);
  }
}
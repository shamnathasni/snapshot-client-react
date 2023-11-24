import axiosInstance from "./Axios";

export const adminLogin = async(loginData) => {
    try {
        const data = await axiosInstance.post("/admin/login",loginData)
        return data
    } catch (error) {
       console.log(error.message); 
    }
}

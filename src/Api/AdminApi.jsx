import axiosInstance from "./Axios";

export const adminLogin = async(loginData) => {
    try {
        const data = await axiosInstance.post("/admin/login",loginData)
        return data
    } catch (error) {
       console.log(error.message); 
    }
}

export const adminUserlist = async()=>{
    try {
        const data = axiosInstance.post("/admin/userlist");
        return data;
    } catch (error) {
        console.log(error.message);
    }
}

export const blockUser = async (userId)=>{
    try {
        const data = axiosInstance.patch(`admin/blockUser?id=${userId}`)
        return data
    } catch (error) {
        console.log(error.message); 
    }
}
export const unblockUser = async (userId)=>{
    try {
        const data = axiosInstance.patch(`admin/unblockUser?id=${userId}`)
        return data
    } catch (error) {
        console.log(error.message); 
    }
}


export const adminVendorlist = async()=>{
    try {
        const data = axiosInstance.post("/admin/vendorlist");
        return data;
    } catch (error) {
        console.log(error.message);
    }
}
export const blockVendor = async (vendorId)=>{
    try {
        const data = axiosInstance.patch(`admin/blockvendor?id=${vendorId}`)
        return data
    } catch (error) {
        console.log(error.message); 
    }
}
export const unblockVendor = async (vendorId)=>{
    try {
        const data = axiosInstance.patch(`admin/unblockvendor?id=${vendorId}`)
        return data
    } catch (error) {
        console.log(error.message); 
    }
}
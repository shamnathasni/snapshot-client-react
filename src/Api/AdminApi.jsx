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



export const adminCategorylist = async()=>{
    try {
        const data = axiosInstance.get("/admin/categorylist");
        return data;
    } catch (error) {
        console.log(error.message);
    }
}

export const addCategory = async ({category}) => {
    try {
        const data = axiosInstance.post("admin/addcategory",{category})
        return data;
    } catch (error) {
        console.log(error.message);  
    }
}

export const subCategoryList = async ({categoryId}) =>{
    try {
        console.log(categoryId, 'caid');
         const data = axiosInstance.get(`/admin/subcategorylist/${categoryId}`,)
        // const data = axiosInstance.get("/admin/subcategorylist",{categoryId})
        console.log(data,"data");
        return data;
    } catch (error) {
        console.log(error.message);  
    }
}

export const addsubCategory = async ({formData, categoryId}) => {
    try {
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
        withCredentials: true,
      };
  
      const data = await axiosInstance.post(`/admin/addsubCategory/${categoryId}`,formData,config);
      console.log(data, '==data');
      return data;
    } catch (error) {
      console.log(error.message);
    }
  };
  

  export const unlistCategory = async(id)=>{
    try {
        const data = await axiosInstance.patch(`/admin/categoryunlist?Id=${id}`)
        return data
    } catch (error) {
        console.log(error.message); 
    }
  }

  export const listCategory = async(id)=>{
    try {
        const data = await axiosInstance.patch(`/admin/categorylist?Id=${id}`)
        return data
    } catch (error) {
        console.log(error.message); 
    }
  }


  export const configureBooking = async(packageId)=>{
    try {
        console.log(packageId,"packageId000");
        const data = await axiosInstance.post("/configureBooking",packageId)
        console.log(data,"dta");
        return data
    } catch (error) {
        console.log(error.message); 
    }
  }
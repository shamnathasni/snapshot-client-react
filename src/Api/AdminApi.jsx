import axiosInstance from "./Axios";

export const adminLogin = async (loginData) => {
  try {
    const data = await axiosInstance.post("/admin/login", loginData);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const adminUserlist = async () => {
  try {
    const data = axiosInstance.post("/admin/userlist");
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const blockUser = async (userId) => {
  try {
    const data = axiosInstance.patch(`admin/blockUser?id=${userId}`);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};
export const unblockUser = async (userId) => {
  try {
    const data = axiosInstance.patch(`admin/unblockUser?id=${userId}`);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const adminStudiolist = async () => {
  try {
    const data = axiosInstance.post("/admin/studiolist");
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const BookingDetails = async (studioId) => {
  try {
    const data = axiosInstance.get(`/admin/bookinglist?studioid=${studioId}`);
    console.log(data, "data");
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const adminVendorlist = async () => {
  try {
    const data = axiosInstance.post("/admin/vendorlist");
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const blockVendor = async (vendorId) => {
  try {
    const data = axiosInstance.patch(`admin/blockvendor?id=${vendorId}`);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};
export const unblockVendor = async (vendorId) => {
  try {
    const data = axiosInstance.patch(`admin/unblockvendor?id=${vendorId}`);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const adminCategorylist = async () => {
  try {
    const data = axiosInstance.get("/admin/categorylist");
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const addCategory = async ({ category }) => {
  try {
    const data = axiosInstance.post("admin/addcategory", { category });
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const subCategoryList = async ({ categoryId }) => {
  try {
    const data = axiosInstance.get(`/admin/subcategorylist/${categoryId}`);
    // const data = axiosInstance.get("/admin/subcategorylist",{categoryId})

    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const addsubCategory = async ({ formData, categoryId }) => {
  try {
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
      withCredentials: true,
    };

    const data = await axiosInstance.post(
      `/admin/addsubCategory/${categoryId}`,
      formData,
      config
    );

    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const unlistCategory = async (id) => {
  try {
    const data = await axiosInstance.patch(`/admin/categoryunlist?Id=${id}`);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const listCategory = async (id) => {
  try {
    const data = await axiosInstance.patch(`/admin/categorylist?Id=${id}`);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};


export const MonthlyGraph = async () => {
  try {
    const data = await axiosInstance.post("/admin/bookings-by-month");

    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const VendorGraphData = async () => {
  try {
    const data = await axiosInstance.post("/admin/vendorgraph");

    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const userGraphData = async () => {
  try {
    const data = await axiosInstance.post("/admin/usergraph");

    return data;
  } catch (error) {
    console.log(error.message);
  }
};

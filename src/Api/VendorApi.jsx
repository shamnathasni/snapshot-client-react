import axios from "axios";
import axiosInstance from "./Axios";

export const vendorSignup = async (signupData) => {
  try {
    const data = await axiosInstance.post("/vendor/signup", signupData);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const vendorlogin = async (loginData) => {
  try {
    const data = await axiosInstance.post("/vendor/login", loginData);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const VendorImage = async (id, images) => {
  try {
    const data = new FormData();
    data.append("image", images);
    data.append("vendorId", id);
    const response = await axiosInstance.post("/vendor/profileImage", data);
    return response;
  } catch (error) {
    console.log(error.message);
  }
};

export const StudioFormApi = async (formData) => {
  try {
    // const config = {
    //   headers: {
    //     "content-type": "multipart/form-data",
    //   }
    // };
    const data = await axiosInstance.post(
      "/vendor/studioform",
      formData,
      // config
    );

    return data;
  } catch (error) {
    console.log(error, "err");
  }
};

export const studioList = async (vendorsId) => {
  try {
    const data = await axiosInstance.get(`/vendor/studio?id=${vendorsId}`);

    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const uploadStudioImages = async (image,studioId) => {
  try {
    const data = await axiosInstance.post("/vendor/uploadstudioimage", { image ,studioId});
    
    return data;
  } catch (error) {
    console.log(error.message);
  }
};


export const vendorCategory = async () => {
  try {
    const data = await axiosInstance.get("/vendor/vendorcategory");
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const packageList = async (vendorsId) => {
  try {
    const data = await axiosInstance.get(`/vendor/packageList?vendorId=${vendorsId}`);
    return data; // Add this line
  } catch (error) {
    console.error(error.message);
  }
};

export const AddPackage = async (localState,vendorsId) => {
  try {
    const data = await axiosInstance.post("/vendor/addPackage", {localState,vendorsId});
    return data; // Add this line
  } catch (error) {
    console.error(error.message);
  }
};

export const confirmBooking = async (Id) => {
  try {
    const data = await axiosInstance.post(
      `/vendor/confirmbooking?bookingId=${Id}`
    );

    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const rejectBooking = async (Id) => {
  try {
    const data = await axiosInstance.post(
      `/vendor/rejectbooking?bookingId=${Id}`
    );

    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const bookingDetails = async (id) => {
  try {
    const data = await axiosInstance.get(`/vendor/bookingdetails?Id=${id}`);

    return data; // Add this line
  } catch (error) {
    console.error(error.message);
  }
};

export const VendorChat = async (bookingId) => {
  try {
    const data = await axiosInstance.get(`/vendor/vendorchat?Id=${bookingId}`);

    return data;
  } catch (error) {}
};

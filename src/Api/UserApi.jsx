import axiosInstance from "../Api/Axios";

export const userSignup = async (signupData) => {
  try {
    const data = await axiosInstance.post("/signup", signupData);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const verifyOtp = async (otp, userData) => {
  try {
    const data = await axiosInstance.post("/verifyOtp", { otp, userData });
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const resendOTP = async (userData) => {
  try {
    const data = await axiosInstance.post("/resendOtp", { userData });
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const userLogin = async (loginData) => {
  try {
    const data = await axiosInstance.post("/login", loginData);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};
export const userImage = async (image) => {
  try {
    const response = await axiosInstance.post("/profileImage", { image });
    return response;
  } catch (error) {
    console.log(error.message);
  }
};

export const categoryList = async () => {
  try {
    const data = await axiosInstance.get("/categorylist");
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const studioList = async () => {
  try {
    const data = await axiosInstance.get("/studiolist");
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const categoryStudioList = async(subCategory) => {
  try {
    console.log(subCategory,"subCategory");
    const data = await axiosInstance.get(`/categoryStudioList?subCategory=${subCategory}`);
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

export const singleStudio = async (studioId) => {
  try {
    console.log(studioId, "api");
    const data = await axiosInstance.get(`/singleStudio?id=${studioId}`);
    console.log(data, "data1");
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const studioPackages = async (studioIds) => {
  try {
    const data = await axiosInstance.get(`/studioPackages?id=${studioIds}`);
  
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const bookingData = async ( bookingType, selectedDate, id, studioId) => {
  try {
    const data = await axiosInstance.post("/bookingData", {
      ...bookingType,
      date: selectedDate,
      Id: id,
      studioId:studioId,
      
    });
    console.log(bookingType, "bookingType");
    console.log(data, "data1");
    return data;
  } catch (error) {
    console.log(error.message);
  }
};



export const isBookedDate = async (formattedDate,studioId,subcategory) => {
  try {
    console.log(formattedDate,studioId,subcategory,"f");
    const data = await axiosInstance.post("/isBookedDate",{formattedDate,studioId,subcategory})
    return data
  } catch (error) {
    console.log(error.message);
  }
}

export const bookedDates = async (studioId,subcategory) => {
  try {
    console.log(studioId,"studioId");
    const data = await axiosInstance.post("/bookedates",{studioId,subcategory})
    return data
  } catch (error) {
    console.log(error.message);
  }
}

export const confirmPayment = async (packageId) => {
  try {
    console.log(packageId,"packageId");
    const data = await axiosInstance.get(`/confirmpayment?id=${packageId}`)
    return data
  } catch (error) {
    console.log(error.message);
  }
}

export const BookingDetails = async (userId) => {
  try {
    const data = await axiosInstance.get(`/bookingdetails?id=${userId}`)
    return data
  } catch (error) {
    console.log(error.message);
  }
}

export const chatDetails = async (bookingId) => {
  try {
    const data = await axiosInstance.get(`/chatdetails?id=${bookingId}`)
    return data
  } catch (error) {
    console.log(error.message);
  }
}


export const searchStudio = async (searchQuery) => {
  try {
    const data = await axiosInstance.get(`/search?data=${searchQuery}`)
    return data
  } catch (error) {
    console.log(error.message);
  }
}

export const submitRating = async (packageId, rating) => {
  try {
    console.log(rating,"rating");
    const data = await axiosInstance.post("/rating",{packageId, rating})
    return data
  } catch (error) {
    console.log(error.message);
  }
}
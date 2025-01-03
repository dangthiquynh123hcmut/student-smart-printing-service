import { api } from "./baseURL";
import axios from "axios";

export const postNewPrinterApi = (token, newPrinter) => {
  return api.post("/printers/add-printer", JSON.stringify(newPrinter), {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createStaff = (token, newStaff) => {
  //console.log(JSON.stringify(newStaff))
  return api.post("/users/createAdmin", JSON.stringify(newStaff), {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
const API_URL = process.env.REACT_APP_DB_URL;
export const GetAllReportWarranty = async (token, page) => {
  try {
    const response = await axios.get(`${API_URL}/reportWarranty`, {
      params: { page },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    //console.log("get all",response.data)
    return response.data.result;
  } catch (error) {
    //console.error("Error fetching files:", error);
    throw error;
  }
};

export const GetReportWarrantyByMachineID = async (token, id, page) => {
  try {
    const response = await axios.get(`${API_URL}/reportWarranty/${id}`, {
      params: { page },
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    //console.log("Data fetched successfully api:", response.data.result);
    return response.data.result;
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      if (status === 404 && data.code === 1013) {
        //console.error("Machine ID not found:", data.message);
        throw new Error(data.message); // Thông báo lỗi cụ thể
      }
    } else {
      //console.error("Unexpected error:", error.message);
      throw new Error("Đã xảy ra lỗi không mong muốn, vui lòng thử lại sau.");
    }
  }
};

export const getPricePaper = (token) => {
  return api.get("/settingPrice", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createNewPrice = (token, newPrice) => {
  return api.post("/settingPrice/createPrice", newPrice, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const editPricePaper = (token, editPrice) => {
  return api.post("/settingPrice", editPrice, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const editPrinterInfo = (token, id, status) => {
  return api.post(
    "/printers/changestatus",
    { id, status },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const deletePrinter = (token, id) => {
  return api.delete(`/printers/delete-printer?id=${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const addPrinterMaterial = (token, data) => {
  return api.post("/printers/add-material", JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAllPrinter = (token) => {
  return api.get("/printers/all-printers", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAllUsers = (token, page, size) => {
  return api.get("/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      page: page,
      size: size,
    },
  });
};

export const deleteUserById = (token, id) => {
  return api.delete(`/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

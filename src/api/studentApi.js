import axios from "./axiosConfig"; // Đảm bảo đã cấu hình axios

export const GetAvailablePrinters = (token, coSo, toaNha, floorNumber) => {
  return axios.get(
    `http://localhost:8080/printers/availableprinters?base=${coSo}&building=${toaNha}&floor=${floorNumber}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );
};


export const uploadFile = async (token, file) => {
  try {
    
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post(
      "http://localhost:8080/files/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data", 
          Authorization: `Bearer ${token}`, 
        },
      }
    );
    console.log(response)

    return response.result; 
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error; 
  }
};

export const getAllFile = async (token) => {
  try {
    const response = await axios.get("http://localhost:8080/files/get-all", {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    console.log("get all",response)
    return response.result.content; 
  } catch (error) {
    console.error("Error fetching files:", error);
    throw error; 
  }
};

export const deleteFile = async (token, id) => {
  try {
    const response = await axios.delete(`http://localhost:8080/files/delete`, {
      headers: {
        Authorization: `Bearer ${token}`, 
        "Content-Type": "application/json", 
      },
      data: {
        id: id, 
      },
    });
    console.log("File deleted successfully:", response.data);
    return response.data; 
  } catch (error) {
    console.error(`Error deleting file with id ${id}:`, error);
    throw error; 
  }
};


export const implementPrint = async (printData, token) => {
  try {
      const response = await axios.post(`http://localhost:8080/printers/implementprint`, printData, {
          headers: {
              Authorization: `Bearer ${token}`, 
          },
      });
      return response.message;
  } catch (error) {
      console.error("Error while sending print data:", error);
      throw error;
  }
};
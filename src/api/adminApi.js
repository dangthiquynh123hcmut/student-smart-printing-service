import axios from "./axiosConfig";

export const postNewPrinterApi = (token, newPrinter) => {
    return (
        axios.post('http://localhost:8080/printers/add-printer', JSON.stringify(newPrinter), {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        })
    );
}

export const GetAllReportWarranty = async (token) => {
    try {
      const response = await axios.get("http://localhost:8080/reportWarranty", {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      console.log("get all",response)
      return response.result; 
    } catch (error) {
      console.error("Error fetching files:", error);
      throw error; 
    }
  };

 export const GetReportWarrantyByMachineID = async (token, id) => {
  try {
    const response = await axios.get(`http://localhost:8080/reportWarranty/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log("Data fetched successfully:", response.result);
    return response.result; 
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      if (status === 404 && data.code === 1013) {
        console.error("Machine ID not found:", data.message);
        throw new Error(data.message); // Thông báo lỗi cụ thể
        
      }
    } else {
     
      console.error("Unexpected error:", error.message);
      throw new Error("Đã xảy ra lỗi không mong muốn, vui lòng thử lại sau.");
    }
  }
};

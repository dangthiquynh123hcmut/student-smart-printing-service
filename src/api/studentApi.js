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

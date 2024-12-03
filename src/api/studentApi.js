import axios from "./axiosConfig"; // Đảm bảo đã cấu hình axios
import { api, localApi } from "./baseURL";

export const GetAvailablePrinters = (token, coSo, toaNha, floorNumber) => {
  return api.get(
    `/printers/availableprinters?base=${coSo}&building=${toaNha}&floor=${floorNumber}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

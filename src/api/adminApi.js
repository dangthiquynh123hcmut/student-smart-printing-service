import axios from "./axiosConfig";

export const postNewPrinterApi = (token, newPrinter) => {
    return (
        axios.post('https://projectprintmachine-backend.onrender.com/printers/add-printer', JSON.stringify(newPrinter), {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        })
    );
}
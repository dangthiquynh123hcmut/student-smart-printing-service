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
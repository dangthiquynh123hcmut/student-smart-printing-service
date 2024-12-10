import { api, localApi } from "./baseURL";

export const postNewPrinterApi = (token, newPrinter) => {
    return api.post(
        "/printers/add-printer",
        JSON.stringify(newPrinter),
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        }
    );
};

export const getPricePaper = (token) => {
    return api.get("/settingPrice", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const createNewPrice = (token, newPrice) => {
    return api
        .post(
            "/settingPrice/createPrice",
            newPrice,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        )
}

export const editPricePaper = (token, editPrice) => {
    return api.post(
        "/settingPrice",
        editPrice,
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        }
    )
}

export const editPrinterInfo = (token, id, status) => {
    return api.post("/printers/changestatus", { id, status }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}

export const deletePrinter = (token, id) => {
    return api.delete(`/printers/delete-printer?id=${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

export const addPrinterMaterial = (token, data) => {
    return api.post('/printers/add-material', JSON.stringify(data), {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
    })
}

export const getAllPrinter = (token) => {
    return api.get("/printers/all-printers", {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}
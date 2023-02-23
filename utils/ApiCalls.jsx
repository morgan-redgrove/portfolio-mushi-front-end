import axios from "axios"

const apiCaller = axios.create({
    baseURL: "https://mushroom-app-tya4.onrender.com/api/",
})

export const getReports = () => {
    return apiCaller.get("/reports")
        .then((response) => {
            return response.data.reports
        })
}
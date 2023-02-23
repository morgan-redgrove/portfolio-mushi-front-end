import axios from "axios";

const apiCaller = axios.create({
  baseURL: "https://mushroom-app-tya4.onrender.com/api",
});

export const getReports = () => {
  return apiCaller.get("/reports").then((response) => {
    // console.log(response.data, "<<<<<RES");
    return response.data.reports;
  });
};

export const getReportById = (id) => {
    return apiCaller.get(`/reports/${id}`).then((response) => {
      return response.data.report[0];
    });
  };
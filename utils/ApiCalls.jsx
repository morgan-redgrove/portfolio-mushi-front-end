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

export const getMushrooms = () => {
  return apiCaller.get("/mushrooms").then((response) => {
    return response.data.mushrooms;
  });
};

export const postReport = (
  location,
  img_url,
  username,
  time_stamp,
  species
) => {
  const report = {
    location: location,
    img_url: img_url,
    username: username,
    time_stamp: time_stamp,
    species: species,
  };
  console.log(report, "<<< Poseted report");
  return apiCaller.post("/report", report).then((response) => {
    return response.data.report;
  });
};

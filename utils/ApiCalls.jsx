import axios from "axios";

const apiCaller = axios.create({
  baseURL: "https://mushroom-app-tya4.onrender.com/api",
});

export const getReports = () => {
  return apiCaller.get("/reports").then((response) => {
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

export const postReport = (location, img_url, username, species, note) => {
  const time_stamp = new Date().toString();
  const report = {
    location,
    img_url,
    username,
    time_stamp,
    species: { species, votes: 0 },
    notes: note,
  };
  console.log(report, "<<< report to be posted");
  return apiCaller.post("/reports", { report }).then((response) => {
    console.log("Post report sucsessfull");
    return response.data.report;
  });
};

export const getMushroomByCommonName = (commonName) => {
  return apiCaller.get(`/mushrooms/${commonName}`).then((response) => {
    return response.data.mushrooms[0];
  });
};

export const  patchReportById = (id, suggestedSpecies) => {
  return apiCaller.patch(`/reports/${id}`, {suggestedSpecies}).then((response) => {
    return response.data.report;
  });
};
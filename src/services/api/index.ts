import APIService, { ApiRequest } from "./apiService";

const apiService = new APIService("http://localhost:7003/api/");
// const apiService = new APIService('https://api.freshfocuz.tech/api/');

const requestBackServer = async (request: ApiRequest) => {
  return await apiService.send<any>(request);
};

export default requestBackServer;


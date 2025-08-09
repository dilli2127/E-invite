import APIService, { ApiRequest } from "./apiService";

// const apiService = new APIService("http://localhost:8247/");
const apiService = new APIService('https://www.freshfocuzstudio.com/api/');

const requestBackServer = async (request: ApiRequest) => {
  return await apiService.send<any>(request);
};

export default requestBackServer;


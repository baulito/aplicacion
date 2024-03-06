import httpService from "../http/http.service";
import UserConstants from "./constants";

export const getUser = async () => {
  try {
    const url = process.env.REACT_APP_API_URL ?? "https://api.togroow.com/api/";
    const endPoint = url + UserConstants.USER_SERVCE;
    const response =  await httpService(endPoint, "GET");
    return response;    
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export const updateUser = async (dataform: {}) => {
  try {
    const url = process.env.REACT_APP_API_URL ?? "https://api.togroow.com/api/";
    const endPoint = url + UserConstants.UPDATE_USER;
    const response =  await httpService(endPoint, "PUT", JSON.stringify(dataform));
    return response;
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export const updatePassword = async (dataform: {}) => {
  try {
    const url = process.env.REACT_APP_API_URL ?? "https://api.togroow.com/api/";
    const endPoint = url + UserConstants.UPDATE_PASSWORD;
    const response =  await httpService(endPoint, "PUT", JSON.stringify(dataform));
    return response;
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export const restorePassword = async (datau: {}) => {
    const url = process.env.REACT_APP_API_URL ?? "https://api.togroow.com/api/";
    const endPoint = url + UserConstants.RESTORE_PASSWORD;
    const response =  await httpService(endPoint, "PUT", JSON.stringify(datau));
    return response;
}
export const codeChangePassword = async (datau: {}) => {
    const url = process.env.REACT_APP_API_URL ?? "https://api.togroow.com/api/";
    const endPoint = url + UserConstants.CHANGE_PASSWORD_WITH_CODE;
    const response =  await httpService(endPoint, "POST", JSON.stringify(datau));
    return response;
}

import { LoginResponse } from "../model/auth.model";

export const loginService = async (credentials: {
  email: string;
  password: string;
}): Promise<LoginResponse> => {
  const url = process.env.REACT_APP_API_URL ?? "https://api.baulito.co/api/";
  console.log(url);
  const endPoint = url + "usuarios/login";
  const settings = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  };
  const data = await fetch(endPoint, settings);
  return await data.json();
};

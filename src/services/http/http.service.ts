import { getToken } from "../../utils/token.util";

export interface RequestOptions {
  requestCache?:
    | "default"
    | "force-cache"
    | "no-cache"
    | "no-store"
    | "only-if-cached"
    | "reload";
  requestCredentials?: "include" | "omit" | "same-origin";
  requestMode?: "cors" | "navigate" | "no-cors" | "same-origin";
  requestRedirect?: "error" | "follow" | "manual";
}

const httpService = async (
  url: string,
  method: string,
  body?: any,
  params?: any,
  qs?: any,
  options?: RequestOptions
) => {
  try {
    const token = getToken();
    let settings = {
      method: method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "",
      },
      body,
    };
    if (token && token !== "" && settings?.headers) {
      settings.headers["Authorization"] += `Bearer ${token}`;
    }
    if (typeof params !== "undefined" && params) url = `${url}/${params}`;
    if (typeof qs !== "undefined" && qs) url = `${url}${qs}`;
    const response = await fetch(url, settings);
    return await response.json();
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export default httpService;

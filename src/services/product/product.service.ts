import httpService from "services/http/http.service";
import ProducConstants from "./constants";

export interface SearchParams {
  categoria?: number;
  negocio?: number;
  page?: number;
  busqueda?: string;
  agotado?: number;
  promocion?: number;
}

export const searchProduct = async (params: SearchParams) => {
  const url = process.env.REACT_APP_API_URL ?? "https://api.baulito.co/api/";
  const endPoint = url + ProducConstants;
  try {
    let variables = "";
    if (typeof params.categoria !== "undefined") {
      if (variables === "") {
        variables = "?";
      } else {
        variables = variables + "&";
      }
      variables = variables + "category=" + params!.categoria;
    }
    if (typeof params.page !== "undefined") {
      if (variables === "") {
        variables = "?";
      } else {
        variables = variables + "&";
      }
      variables = variables + "page=" + params!.page;
    }
    if (typeof params.busqueda !== "undefined") {
      if (variables === "") {
        variables = "?";
      } else {
        variables = variables + "&";
      }
      variables = variables + "busqueda=" + params!.busqueda;
    }
    if (typeof params.agotado !== "undefined") {
      if (variables === "") {
        variables = "?";
      } else {
        variables = variables + "&";
      }
      variables = variables + "out=" + params!.agotado;
    }
    if (typeof params.promocion !== "undefined") {
      if (variables === "") {
        variables = "?";
      } else {
        variables = variables + "&";
      }
      variables = variables + "sale=" + params!.promocion;
    }

    const response = await httpService(endPoint, "GET",null,null, variables);
    return response;
  } catch (e) {
    console.error(e);
    return null;
  }
};

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
  const url = process.env.REACT_APP_API_URL ?? "https://api.togroow.com/api/";
  const endPoint = url + ProducConstants;
  try {
    let variables = "";
    if (typeof params.categoria !== "undefined") {
      if (variables === "") {
        variables = "?";
      } else {
        variables = variables + "&";
      }
      variables = variables + "categoria=" + params!.categoria;
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
    if (typeof params.negocio !== "undefined") {
      if (variables === "") {
        variables = "?";
      } else {
        variables = variables + "&";
      }
      variables = variables + "negocio=" + params!.negocio;
    }
    if (typeof params.agotado !== "undefined") {
      if (variables === "") {
        variables = "?";
      } else {
        variables = variables + "&";
      }
      variables = variables + "agotado=" + params!.agotado;
    }
    if (typeof params.promocion !== "undefined") {
      if (variables === "") {
        variables = "?";
      } else {
        variables = variables + "&";
      }
      variables = variables + "promocion=" + params!.promocion;
    }

    const response = await httpService(endPoint, "GET",null,null, variables);
    return response;
  } catch (e) {
    console.error(e);
    return null;
  }
};

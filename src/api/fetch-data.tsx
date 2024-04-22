import type { Carrito} from "../models/carrito";
import { Capacitor } from '@capacitor/core';
import { getToken } from "../utils/token.util";
const url = process.env.REACT_APP_API_URL ?? "https://api.baulito.co/api/";
//const url = "https://apitesting.togroow.com/api/";

export const apiService = async (datos: { categoria?: number, negocio?: number, page?: number, busqueda?: string, agotado?: number, promocion?: number }) => {
    try {
        let variables = '';
        if (typeof datos.categoria !== "undefined") {
            if (variables === '') {
                variables = "?";
            } else {
                variables = variables + "&";
            }
            variables = variables + "category=" + datos!.categoria;
        }
        if (typeof datos.page !== "undefined") {
            if (variables === '') {
                variables = "?";
            } else {
                variables = variables + "&";
            }
            variables = variables + "page=" + datos!.page;
        }
        if (typeof datos.busqueda !== "undefined") {
            if (variables === '') {
                variables = "?";
            } else {
                variables = variables + "&";
            }
            variables = variables + "search=" + datos!.busqueda;
        }
        if (typeof datos.agotado !== "undefined") {
            if (variables === '') {
                variables = "?";
            } else {
                variables = variables + "&";
            }
            variables = variables + "out=" + datos!.agotado;
        }
        if (typeof datos.promocion !== "undefined") {
            if (variables === '') {
                variables = "?";
            } else {
                variables = variables + "&";
            }
            variables = variables + "sale=" + datos!.promocion;
        } 
        const baseAPI = url + 'product' + variables;
        const data = await fetch(baseAPI, {
            method: 'GET',
        });
        return await data.json();
    } catch (e) {
        console.error(e);
        return null
    }
}
export const getProducto = async (id = 0) => {
    try {
        console.log(id);
        const baseAPI = url + 'product/detail/' + id;
        const data = await fetch(baseAPI, {
            method: 'GET',
        });
        return await data.json();
    } catch (e) {
        console.error(e);
        return null
    }
}
export const serviceBanner = async () => {
    const endPoint = url + 'banner';
    const data = await fetch(endPoint, {
        method: 'GET',
    });
    return await data.json();
}


export const getCiudades = async () => {
    const endPoint = url + 'envio/ciudades';
    const settings = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    };
    const data = await fetch(endPoint, settings);
    return await data.json();
}

export const getCategorias = async () => {
    const endPoint = url + 'categories';
    const settings = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    };
    const data = await fetch(endPoint, settings);
    return await data.json();
}

export const validarCarrito = async (carrito: Carrito) => {
    console.log(carrito);
    const endPoint = url + 'compra/validar';
    const token = getToken();
    const post = {carrito :carrito}
    if (token !== '') {
        var settings = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: "",
            },
            body: JSON.stringify(post)
        };
        if (token && token !== "" && settings?.headers) {
            settings.headers["Authorization"] += `Bearer ${token}`;
          }
        try {
            const data = await fetch(endPoint, settings);
            const res = await data.json();
            console.log(res);
            return res;
        } catch (error) {
            throw new Error('Desc Error');
        }
        
    } else {
        return '{}';
    }
    
}


export const pagarCompra = async (carrito:Carrito,opcionespago:{}) => {
    const endPoint = url + 'compra/checkoutpagar';
    const token = getToken();
    const body:any = {};
    body['carrito'] = carrito;
    body['opcionespago'] = opcionespago;
    body['pagodesde'] = Capacitor.isNativePlatform() ? 1: 0;
    
    if (token !== '') {
        console.log(body);
        const settings = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
            body: JSON.stringify(body)
        };
        try {
            const data = await fetch(endPoint, settings);
            return await data.json();
        } catch (error) {
            console.log(error);
        }
    } else {
        return '{}';
    }
}

export const detalleCompra = async (idc:number) => {
    try {
        const endPoint = url + 'compra/detallecompra/'+idc;
        const settings = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        };
        const data = await fetch(endPoint, settings);
        return await data.json();
       
    } catch (e) {
        console.error(e);
        return null
    }
}

export const getMercadopagopublicKey = async () => {
    const endPoint = url + 'mercadopago/getpublickey';
    const settings = {                                                                
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    };
    const data = await fetch(endPoint, settings);
    return await data.json();
}

export const miscompras = async (negocio:any = '') => {
    try {
        const token = getToken();
        let endPoint = url + 'usuarios/miscompras';
        if(negocio !== ''){
            endPoint = endPoint+"?negocio="+negocio;
        }
        const settings = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        };
        const data = await fetch(endPoint, settings);
        return await data.json();
       
    } catch (e) {
        console.error(e);
        return null
    }
}

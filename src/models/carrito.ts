import type { Negocio, Puntoventa } from "./business";

export interface Items {
    id: number;
    imagen?: string;
    nombre?: string;
    cantidad:number;
    valor?:number;
    valorantes?:string;
    etiqueta?:string;
    negocio?:number;
    caracteristica?:string;
    disponibilidad?:number;
    tienda?:string
}


export interface CarritoNegocios {
    negocio?:number; // Id Negocio
    Items?:Items[]; // Productos
    cantidad?:number; // Cantidad actual
    infonegocio?:Negocio; // Información del Negocio
    valorenvio?:number; // Valor de Envío
    tipoenvio?:number;   // TODO: Convertir a enum
    error?:number; 
    puntoventa?:Puntoventa; // Punto de Recogida
    sindireccion?:number // Si el usuario no tiene dirección registrada
}
// In order to support more than one cart on different stores
export interface Carrito {
    CarritoNegocios?:CarritoNegocios[];
    cantidad?:number;
}

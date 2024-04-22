import type { Campus, Negocio, Puntoventa } from "./business";

export interface Items {
    id: number;
    imagen?: string;
    nombre?: string;
    cantidad:number;
    valor?:number;
    valorantes?:string;
    etiqueta?:string;
    disponibilidad?:number;
    tienda?:string
}

// In order to support more than one cart on different stores
export interface Carrito {
    id?:number;
    Items?:Items[]; // Productos
    cantidad?:number;
    valortotal?:number;
    valorenvio?:number; 
    tipoenvio?:number;
    campus?:Campus;
    sindireccion?:number;
    error?:number;
}

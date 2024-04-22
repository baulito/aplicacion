export interface Bannernegocio {
    id: number;
    title: string;
    image: string;
    image_url:string;
    oreder:number;
    created_at: Date;
    updated_at: Date;
}

export interface Negocio {
    registro_id: number;
    registro_nombre: string;
    registro_imagen: string;
    registro_fondo: string;
    registro_video: string;
    registro_introduccion: string;
    registro_descripcion: string;
    registro_categoria: number;
    registro_sitio?: number;
    registro_tags: string;
    registro_pais: string;
    registro_otropais: string;
    registro_ciudad: string;
    registro_sector: string;
    registro_pagina: string;
    registro_direccion: string;
    registro_fecha: string;
    registro_contacto_georeferenciacion: string;
    registro_contacto_nombre: string;
    registro_contacto_correo: string;
    registro_contacto_telefono: string;
    registro_contacto_cargo: string;
    registro_contacto_datos: string;
    registro_contacto_celular: string;
    registro_contacto_horario: string;
    registro_usuario: number;
    registro_fecha_edicion: string;
    registro_eliminado?: any;
    registro_identificador?: any;
    registro_tour: number;
    registro_aliado?: any;
    registro_envio: number;
    registro_plantienda: number;
    registro_planmarketing: number;
    impresiones?: any;
    clicks?: any;
    impresiones_anual?: any;
    clicks_anual?: any;
    reporte_mensual?: any;
}

export interface Puntoventa{
    id: number;
    negocio: number;
    nombre: string;
    pais: string;
    ciudad: string;
    ciudadnombre: string;
    direccion: string;
    adicional: string;
    telefono1: string;
    telefono2: string;
}

export interface Campus{
    id: number;
    name?: string;
    country?: string;
    city?: string;
    cityname?: string;
    address?: string;
    additional?: string;
    phone1?: string;
    description?: string;
}
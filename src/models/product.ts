import type { Negocio,Puntoventa } from "./business";

export interface Categoria {
    store_categoria_id: number;
    store_categoria_titulo: string;
    store_categoria_imagen?: string;
    store_categoria_descripcion?: string;
    store_categoria_padre?: number;
    store_categoria_tipo?: number;
    store_categoria_idcontenido?: number;
    store_categoria_icono?: string;
    store_categoria_google?: any;
    orden?: any;
}

export type Categories = Categoria[];




export interface Valores {
    etkcolor: string;
    etktexto: string;
    etk: number;
    valor: string;
    value?:number;
}
export interface Idopciones {
   id:string
}
export interface Cantidades {
    id_opciones: Idopciones[];
    cantidad: number;
}

export interface Opciones {
    id: number;
    caracteristica: number;
    nombre: string;
    orden: number;
}

export interface Caracteristicas{
    id: number;
    nombre: string;
    negocio?: any;
    tipo: number;
    orden: number;
    opciones: Opciones[];
}

export interface Inventario {
    cantidades: Cantidades[];
    caracteristicas: Caracteristicas[];
}

export interface Product {
    store_producto_id?: number;
    store_producto_nombre?: string;
    store_producto_imagen?: string;
    store_producto_imagen2?: string;
    store_producto_imagen3?: string;
    store_producto_imagen4?: string;
    store_producto_imagen5?: string;
    store_producto_imagen6?: string;
    store_producto_imagen7?: string;
    store_producto_imagen8?: string;
    store_producto_imagen9?: string;
    store_producto_video?: string;
    store_producto_descripcion?: string;
    store_producto_valor?: number;
    store_producto_moneda?: number;
    store_producto_cantidad?: number;
    store_producto_negocio?: number;
    store_producto_categoria?: number;
    store_producto_subcategoria?: number;
    store_producto_subcategoria2?: number;
    store_producto_fecha?: string;
    store_producto_estado?: number;
    store_producto_sku?: string;
    store_producto_promocion?: number;
    store_producto_promocion_tipo?: number;
    store_producto_promocion_valor?: number;
    store_producto_promocion_inicio?: string;
    store_producto_promocion_fin?: string;
    store_producto_promocion_texto?: string;
    store_producto_etiqueta?: string;
    store_producto_etiqueta_color?: string;
    store_producto_tags?: string;
    store_producto_archivo_digital?: string;
    store_producto_sugeridos?: string;
    store_producto_negocio_categoria?: number;
    store_producto_negocio_subcategoria?: number;
    store_producto_tipo?: number;
    store_producto_tipoproducto?: number;
    store_producto_enlace_digital?: string;
    store_producto_tienda?: number;
    store_producto_envio_peso?: string;
    store_producto_envio_dimenciones?: string;
    store_producto_envio_tipo?: number;
    store_producto_envio_local?: string;
    store_producto_envio_nacional?: string;
    store_producto_envio_internacional?: string;
    store_producto_envio_empresa?: number;
    store_producto_correo_cotizacion?: string;
    store_producto_caracteristicas?: number;
    store_producto_caracteristicas_id?: string;
    store_producto_caracteristicas_opciones?: string;
    store_producto_nuevo?: number;
    store_producto_devolucion?: number;
    miniatura?: string;
    categoria?: Categoria;
    subcategoria?: Categoria;
    subcategoria2?: Categoria;
    negocio?: Negocio;
    caracteristicas?: any[];
    valores?: Valores;
    inventario?: Inventario;
    puntoventa?:Puntoventa;
}

export interface Link {
    url: string;
    label: string;
    active: boolean;
}

export interface ProductResponse {
    current_page: number;
    data: Product[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Link[];
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url?: any;
    to: number;
    total: number;
}

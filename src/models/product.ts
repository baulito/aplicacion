import type { Campus } from "./business";

export interface Categoria {
    id: number;
    title: string;
    image_url?: string;
    name?: string;
    order?: any;
}

export type Categories = Categoria[];

export interface Product {
    id?: number;
    state?: number;
    sku?: string;
    name?: string;
    category?: number;
    categorydetail?: Categoria;
    description?: string;
    image_1?: string;
    image_2?: string;
    image_3?: string;
    image_4?: string;
    image_5?: string;
    image_6?: string;
    image_7?: string;
    image_8?: string;
    image_9?: string;
    tags?: string;
    product_status?: number;
    productstatus?:string;
    wheight?: number;
    height?: number;
    long?: number;
    width?: number;
    campus?: number;
    campusdetail?: Campus;
    amount?: number;
    value: number;
    old_value?: number;
    created_at?: string;
    updated_at?: string;
    thumbnail?: string;
    url?: string;
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


export interface Address {
    id: number;
    usuario: number;
    nombre: string;
    documento?: any;
    telefono: string;
    pais: string;
    ciudad: string;
    ciudadnombre: string;
    barrio: string;
    direccion: string;
    adicional: string;
    principal: number;
}

export interface User  {
    user_id?: number;
    user_names?: string;
    user_lastnames?: string;
    user_email?: string;
    user_typepople?: any;
    user_typeid?: any;
    user_idnumber?: string;
    user_city?: string;
    user_country?: string;
    user_phone?: string;
    user_address?: string;
    user_level?: number;
    user_state?: number;
    user_code?: string; 
    user_informacion?: string;
    user_foto?: string;
    user_fondo?: string;
    address?: Address[];
}

export type UserContextType = {
    UserContext:User
    setUserContext:(value:User) => void;
}


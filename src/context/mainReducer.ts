import { Categories } from "../models/product";
import { Carrito } from "../models/carrito";
import { Cities } from "../models/cities";
import { AppContext } from "../models/context";
import { User } from "../models/user";
import { Campuss } from "models/business";

import { ACTIONS } from "./actions";

type MainAction = 
    |{type:ACTIONS.LOGIN_USER,payload:{user:User}}
    |{type:ACTIONS.UPDATE_CARRITO,payload:{carrito:Carrito}}
    |{type:ACTIONS.SET_CITIES,payload:{cities:Cities}}
    |{type:ACTIONS.SET_LOADING,payload:{isLoading:boolean}}
    |{type:ACTIONS.SET_CATEGORIES,payload:{categories:Categories}}
    |{type:ACTIONS.SET_CAMPUSS,payload:{campuss:Campuss}};

export const mainReducer = (state:AppContext,action:MainAction) =>{
    switch (action.type) {
        case 'loginUser':
            return  {
                ...state,
                user: action.payload.user
            }
        case 'updateCarrito':
            return  {
                ...state,
                carrito: action.payload.carrito
            }
        case 'setCities':
            return  {
                ...state,
                cities: action.payload.cities
            }
        case 'setLoading':
            return {
                ...state,
                isLoading: action.payload.isLoading
            }
        case 'setCategories':
            return {
                ...state,
                categories: action.payload.categories
            }
        case 'setCampuss':
            return {
                ...state,
                campuss: action.payload.campuss
            }
        default:
            return state;
    }
}
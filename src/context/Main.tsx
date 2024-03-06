import React, { createContext, ReactNode, useContext, useReducer } from "react";
import { AppContext } from "../models/context";
import { mainReducer } from "./mainReducer";
import { ACTIONS } from "./actions";
import { User } from "../models/user";
import { Carrito } from "../models/carrito";
import { Cities } from "../models/cities";
import { Categories } from "models/product";


export interface ApplicationContextProps  {
  mainState: AppContext;
  loginUser: (user: User) => void;
  updateCarrito: (carrito: Carrito) => void;
  setCities: (cities: Cities) => void;
  setLoading: (isLoading: boolean) => void;
  setCategories: (categories: Categories ) => void;
};


export const GlobalApplicationContext = createContext<ApplicationContextProps>({} as ApplicationContextProps );

const INITIAL_STATE: AppContext = {
  user: {
    user_id: 0,
  },
  carrito: {
    CarritoNegocios: [],
    cantidad: 0,
  },
  isLoading: true
};

interface Props {
  children?: ReactNode;
}

export function GlobalProvider({ children }: Props) {
  const [mainState, dispatch] = useReducer(mainReducer, INITIAL_STATE);

  const loginUser = (user: User) => {
    if (user) {
      dispatch({ type: ACTIONS.LOGIN_USER, payload: { user } });
    }
  };

  const updateCarrito = (carrito: Carrito) => {
    if (carrito) {
      dispatch({ type: ACTIONS.UPDATE_CARRITO, payload: { carrito } });
    }
  };

  const setCities = (cities: Cities) => {
    if (cities) {
      dispatch({ type: ACTIONS.SET_CITIES, payload: { cities } });
    }
  };

  const setLoading = (isLoading: boolean) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: { isLoading } });
  };

  const setCategories = (categories: Categories) => {
    if (categories) {
      dispatch({ type: ACTIONS.SET_CATEGORIES, payload: { categories } });
    }
  };

  return (
    <GlobalApplicationContext.Provider
      value={{
        mainState,
        loginUser,
        updateCarrito,
        setCities,
        setLoading,
        setCategories
      }}
    >
      {children}
    </GlobalApplicationContext.Provider>
  );
}

export function useGlobalContext(): ApplicationContextProps {
  const context = useContext(GlobalApplicationContext) as ApplicationContextProps;
  return context;
}

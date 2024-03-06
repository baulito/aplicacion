import { useEffect } from "react";
import { useGlobalContext } from "../../context/Main";
import { getCategorias, getCiudades } from "../../api/fetch-data";
import { getUser } from "../../services/user/user.service";
import { Carrito } from "../../models/carrito";
import Loader from "components/loader/Loader";
import { Categories } from "../../models/product";

export function InitElement() {
  const { loginUser, updateCarrito, setCities,setLoading, setCategories} = useGlobalContext();

  const getCities = async () => {
    const cities = await getCiudades();
    setCities(cities);
  }
  const getCategories = async () => {
    const categories = await getCategorias();
    if(categories.categorias){
      setCategories(categories.categorias);
    }
  }

  const validarusuario = async () => {
    setLoading(true);
    const user = await getUser();
    if(user && user !== undefined) {
      loginUser(user);
    } 
    setLoading(false);
  }

  useEffect(() => {
    const token = localStorage.getItem("myToken");
    const carritoinfo = localStorage.getItem("carrito");
    let carritog: Carrito;
    if (carritoinfo !== null) {
      carritog = JSON.parse(carritoinfo);
      if (carritog?.CarritoNegocios) {
        updateCarrito(carritog);
      } else {
        window.localStorage.removeItem("carrito");
      }
    }

    /*if (token !== "") {
      validarusuario();
    } else {
      window.setTimeout(() => {
        let token2 = localStorage.getItem("myToken");
        if (token2 !== "") {
          validarusuario();
        } else {
         setLoading(false);
        }
      }, 2000);
    }*/
    if (token !== "") {
      validarusuario();
    }
    getCities();
    getCategories();
  }, []);

  return (
    <Loader/>
  );
}

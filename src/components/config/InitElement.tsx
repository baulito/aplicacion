import  { ReactNode } from "react";
import { useEffect } from "react";
import { useGlobalContext } from "../../context/Main";
import { getCategorias, getCiudades,getCampuss} from "../../api/fetch-data";
import { getUser } from "../../services/user/user.service";
import { Carrito } from "../../models/carrito";
import Loader from "components/loader/Loader";
import { Categories } from "../../models/product";

interface Props {
  children?: ReactNode;
}
export function InitElement({ children }: Props) {

  const { mainState ,loginUser, updateCarrito, setCities,setLoading, setCategories,setCampuss} = useGlobalContext();

  const getCities = async () => {
    const cities = await getCiudades();
    setCities(cities);
  }
  const getCategories = async () => {
    const categories = await getCategorias();
    //console.log(categories);
    if(categories){
      setCategories(categories);
    }
  }

  const getCampus = async () => {
    const campus = await getCampuss();
    console.log(campus);
    if(campus){
      setCampuss(campus);
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
      if (carritog) {
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
    getCampus();
  }, []);

    return (
      <>
        <Loader/>
        {children}
      </>
    );
}

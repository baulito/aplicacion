import { useGlobalContext } from "../../context/Main";
import "./Header.css";
import Logo from "../../elements/images/logo-blanco.png";
import fotoperfil from "../../elements/images/perfil.jpg";
import { ListAddress } from "../address/ListAddress";
import { toast } from "react-toastify";
import { Categoria } from "models/product";
// TODO: Separar arte de logo y titulo.
// TODO: Separar arte de logo y titulo.
// TODO: Manejar estado de página seleccionada en navbar.
// TODO: Implementar Header con NavBar
export const Header = () => {
  const { mainState, loginUser, updateCarrito } = useGlobalContext();

  function Logout() {
    loginUser({});
    warnLogout();
    updateCarrito({});
    window.localStorage.removeItem("myToken");
    window.localStorage.removeItem("carrito");
  }

  function warnLogout() {
    toast.warn("Sesión Cerrada", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      theme: "colored",
    });
  }
  // TODO: Separar header y search component.
  // Search debe ser independiente para poderlo llamar desde cualquier lado
  const btnsearch = (e: any) => {
    e.preventDefault();
    // TODO: Agregar onChange al input de búsqueda para elimianr esta línea.
    const busqueda = (document.getElementById("search") as HTMLInputElement)
      .value;
    if (busqueda !== "") {
      window.location.href = "/search/" + busqueda;
    }
    return false;
  };

  return (
    <>
      <header>
        <div className=" ml-2 mr-2 mt-2 md:container md:mx-auto">
          <div className="grid grid-cols-3 items-center  md:navbar pr-0 ">
            <div className=" text-left order-1 md:flex-1 lg:flex-none flex-wrap md:flex-nowrap ">
              <a href="/">
                <img
                  alt="El Baulito - Ropa Usada"
                  className="logo"
                  src={Logo}
                />
              </a>
            </div>
            <div className="  col-span-2 text-right order-3 md:flex-none ">
              <a href="/nosotros" className={"btn btn-sm btn-header"}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z"
                  />
                </svg>
                <span className={"ml-1 hidden lg:inline-block"}>Nosotros</span>
              </a>
              {mainState.user?.user_id && mainState.user?.user_id > 0 ? (
                <div className="dropdown dropdown-end items-center align-top">
                  <label tabIndex={0} className="avatar">
                    <div className="rounded-full">
                      <img
                        src={
                          mainState.user?.user_foto &&
                          mainState.user?.user_foto !== ""
                            ? mainState.user?.user_foto
                            : fotoperfil
                        }
                        alt=""
                      />
                    </div>
                  </label>
                  <ul
                    tabIndex={0}
                    className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
                  >
                    <li>
                      <a href="/profile" className="justify-between">
                        Mi Perfil
                      </a>
                    </li>
                    <li>
                      <a href="/mypurchases">Mis Compras</a>
                    </li>
                    <li>
                      <a href="/contactenos">Contáctenos</a>
                    </li>
                    <li>
                      <a href="/ayuda">Ayuda</a>
                    </li>
                    <li>
                      <a href="/mediosdepago">Medios de pago</a>
                    </li>
                    <li>
                      <a href="/terminosycondiciones">Terminos y condiciones</a>
                    </li>
                    <li style={{ display: "none" }}>
                      <a href="/favorites">Mis Favoritos</a>
                    </li>
                    <li>
                      <span onClick={Logout}>Cerrar Sesión</span>
                    </li>
                  </ul>
                </div>
              ) : (
                <>
                  <a className={"btn btn-sm btn-header"} href="/register">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z"
                      />
                    </svg>
                    <span className={"ml-1 hidden lg:inline-block"}>
                      REGISTRATE
                    </span>
                  </a>
                  <a className={"btn btn-sm btn-header"} href="/login">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                      />
                    </svg>
                    <span className={"ml-1 hidden lg:inline-block"}>
                      INGRESA
                    </span>
                  </a>
                </>
              )}

              <a className="btn btn-sm btn-header " href="/cart">
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  {mainState?.carrito &&
                  mainState.carrito?.cantidad !== undefined &&
                  mainState.carrito?.cantidad > 0 ? (
                    <span className="badge  badge-xs indicator-item">
                      {mainState.carrito.cantidad}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              </a>
            </div>
            <div className=" col-span-3 order-4 md:order-2 md:flex-1  mt-2 md:mt-0  md:ml-10 md:mr-0 ">
              <div className="form-control w-full">
                <form
                  onSubmit={(e) => {
                    btnsearch(e);
                  }}
                >
                  <div className="input-group input-group-sm w-full">
                    <input
                      type="text"
                      placeholder="Buscar…"
                      id="search"
                      className=" w-full input input-bordered  block input-sm "
                    />
                    <button className="btn btn-buscador btn-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          {
            // TODO: Menú de categorías. Crear modelo de categorías e iterar sobre el
            // Manejarlo como un componente
          }

          <div className="grid grid-cols-7  lg:grid-cols-5  items-center gap-4 mt-2 md:mt-0">
            <div className={"text-left lg:col-span-3 lg:order-2 "}>
              <div className="max-lg:dropdown">
                <label
                  tabIndex={1}
                  className="btn btn-sm btn-ghost lg:hidden btn-menu"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h8m-8 6h16"
                    />
                  </svg>
                </label>
                <ul
                  tabIndex={1}
                  className=" botonera-opt max-lg:menu max-lg:menu-compact dropdown-content max-lg:mt-3 max-lg:p-2 max-lg:shadow max-lg:bg-base-100 max-lg:rounded-box max-lg:w-52"
                >
                  { mainState.categories && mainState.categories.length > 0  ? (
                    <>
                      {
                        mainState.categories?.map((category: Categoria) => {
                          return(
                          <li key={"headercategory_"+category.id}>
                            <a href={ '/category/'+category.id }>{ category.name }</a>
                          </li>)
                        })
                      } 
                  </>
                  ) : ("") }
                </ul>
              </div>
            </div>
            <div className={"col-span-3 lg:col-span-1 lg:order-1"}>
              <label
                htmlFor="modal-envios"
                className="btn btn-sm btn-block btn-header btn-header-envio"
              >
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                  </svg>
                  <span className={"ml-2"}>Enviar a: </span>
                  {mainState.user?.user_id &&
                  mainState.user?.user_id > 0 &&
                  mainState.user?.address &&
                  mainState.user?.address.length > 0 ? (
                    <span className="span-address">
                      {mainState.user?.address[0].direccion}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              </label>
            </div>
            <div className={" col-span-3   lg:col-span-1 text-right order-3"}>
              <a href="/vendeturopa" className={"btn-vendeturopa"}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#FFF"
                  className="play"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  id="Layer_1"
                  x="0px"
                  y="0px"
                  viewBox="0 0 64 64"
                  enableBackground="new 0 0 64 64"
                  className={"camisa"}
                >
                  <path
                    fill="none"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                    d="    M57.508,46.645c0,0,0.639,1.795,1.094,3.652l-5.732,0.975c0,0-0.602-1.793-1.102-3.346h0.006L45.59,28.749l0.901,22.521    c-2.767,3.541-13.655,3.691-13.655,3.691C21.12,55.32,19.261,51.27,19.261,51.27l0.821-22.521l-6.184,19.176    c-0.501,1.552-1.104,3.345-1.104,3.345l-5.748-0.974c0.455-1.856,1.095-3.651,1.095-3.651l8.528-30.702l8.833-3.084l1.185-2.883    c0,0,5.616-2.596,12.836,0l1.181,2.883L49,15.943l8.527,30.702H57.508L57.508,46.645z"
                  />
                  <path
                    fill="none"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                    d="    M26.689,9.977c0,0,5.616-2.596,12.836,0L36.1,14.041l-1.535,0.784l0.156,1.632l-1.563,4.122l-2.059-4.122l0.013-1.632    l-0.995-0.784L26.689,9.977z"
                  />
                  <path
                    fill="none"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                    d="    M34.76,45.18c0,0.096-0.08,0.178-0.178,0.178c-0.1,0-0.18-0.082-0.18-0.178c0-0.102,0.08-0.181,0.18-0.181    C34.68,45,34.76,45.078,34.76,45.18z"
                  />
                  <path
                    fill="none"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                    d="    M34.831,38.713c0,0.098-0.078,0.178-0.179,0.178c-0.098,0-0.178-0.08-0.178-0.178c0-0.102,0.08-0.179,0.178-0.179    C34.753,38.535,34.831,38.611,34.831,38.713z"
                  />
                  <circle
                    fill="none"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                    cx="34.725"
                    cy="33.135"
                    r="0.179"
                  />
                  <path
                    fill="none"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                    d="    M35.152,26.67c0,0.096-0.079,0.177-0.178,0.177c-0.098,0-0.18-0.081-0.18-0.177c0-0.101,0.082-0.181,0.18-0.181    C35.073,26.49,35.152,26.569,35.152,26.67z"
                  />
                  <path
                    fill="none"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                    d="    M35.509,20.631c0,0.099-0.079,0.179-0.178,0.179s-0.179-0.081-0.179-0.179c0-0.102,0.08-0.178,0.179-0.178    S35.509,20.529,35.509,20.631z"
                  />
                  <path
                    fill="none"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                    d="    M13.899,47.925c-0.501,1.552-1.104,3.345-1.104,3.345l-5.748-0.974c0.455-1.856,1.095-3.651,1.095-3.651L13.899,47.925z"
                  />
                  <path
                    fill="none"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                    d="    M51.768,47.925c0.5,1.552,1.102,3.345,1.102,3.345l5.732-0.974c-0.455-1.856-1.094-3.651-1.094-3.651L51.768,47.925z"
                  />
                  <polygon
                    fill="none"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                    points="    26.689,9.977 25.504,12.86 27.977,19.703 30.116,14.041   "
                  />
                  <polygon
                    fill="none"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                    points="    39.525,9.977 40.712,12.86 38.24,19.703 36.1,14.041   "
                  />
                  <path
                    fill="none"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                    d="    M33.311,54.949c2.121-0.078,10.76-0.58,13.182-3.678L45.59,28.749l6.184,19.176h-0.006c0.5,1.552,1.102,3.345,1.102,3.345    l5.732-0.974c-0.455-1.856-1.094-3.651-1.094-3.651h0.021l-8.527-30.702l-8.296-3.084l-1.181-2.883L36.1,14.041l-1.535,0.784    l0.156,1.632l-1.563,4.122C33.156,20.579,32.228,48.828,33.311,54.949z"
                  />
                  <path
                    fill="none"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                    d="    M33.311,54.949c-1.083-6.121-0.153-34.37-0.153-34.37l-2.059-4.122l0.013-1.632l-0.995-0.784L26.69,9.977l-1.185,2.883    l-8.833,3.084L8.143,46.645c0,0-0.641,1.795-1.095,3.652l5.748,0.975c0,0,0.603-1.793,1.104-3.346l6.184-19.176l-0.821,22.521    c0,0,1.859,4.049,13.575,3.69C32.836,54.961,32.855,54.968,33.311,54.949z"
                  />
                  <path
                    fill="none"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                    d="    M39.525,9.977c-7.22-2.596-12.836,0-12.836,0l1.38,1.636c1.898-0.544,5.592-1.204,10.044,0.034L39.525,9.977z"
                  />
                </svg>
                <h2>Vende Tu ropa Usada</h2>
                <hr />
                <h3>Como puedo vender mi ropa usada</h3>
              </a>
            </div>
          </div>
        </div>
      </header>

      <div className="espacioheader"></div>
      {
        // TODO: Convertir modal en componente, mandar por parámetro el
        // manejador de evento close del modal.
      }
      <input type="checkbox" id="modal-envios" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative max-w-3xl">
          <label
            htmlFor="modal-envios"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">Elige dónde recibir tus compras</h3>
          <div>
            Podrás ver costos y tiempos de entrega precisos en todo lo que
            busques.
          </div>
          <ListAddress />
        </div>
      </div>
    </>
  );
};

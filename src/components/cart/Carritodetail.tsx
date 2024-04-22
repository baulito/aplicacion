import {  useEffect, useState } from "react";
import { useGlobalContext } from "../../context/Main";
import { pagarCompra } from "../../api/fetch-data";
import { validarCarrito } from "../../api/fetch-data";
import { Items } from "../../models/carrito";
import { Browser } from "@capacitor/browser";
import { CurrentAddress } from "../address/CurrentAddress";

export const Carritodetail = () => {
  const { mainState, updateCarrito, setLoading } = useGlobalContext();
  const [carritoglobal, setcarritoglobal] = useState(mainState.carrito);
  const [tipoenvio, setTipoenvio] = useState(0);
  let total = 0;
  let valorp = 0;
  let valoru = 0;

  const onDeleteItem = async (itemdelete: Items, negocio: any) => {
    let carritonegocio = carritoglobal;
      if (carritonegocio !== undefined) {
        const result = carritonegocio.Items;
        if (result !== undefined && result.length > 0) {
          carritonegocio.Items = [];
          let cantidadnegocio = 0;
          result.map((item) => {
            if ( item.id === itemdelete.id ) {
                return true;
            } else {
                if (carritonegocio !== undefined) {
                  carritonegocio.Items?.push(item);
                  cantidadnegocio = cantidadnegocio + item?.cantidad;
                }
                return true;
            }
          });
          carritonegocio.cantidad = cantidadnegocio;
        }
        console.log(carritonegocio);
        setcarritoglobal(carritonegocio);
        
        try {
          await validateCart();
        } catch (error) {
          console.log(
            "Error al actualizar el carrito despues de un error en la creacion del token"
          );
          console.log(error);
          throw new Error(
            "Error al actualizar el carrito despues de un error en la creacion del token"
          );
        }
      }
  };
  const validateCart = async () => {
    try {
      if (carritoglobal !== undefined) {
        const carrito = await validarCarrito(carritoglobal);
        
        if(carritoglobal !== undefined && carritoglobal?.cantidad && carritoglobal?.cantidad > 0){
          setcarritoglobal(carrito);
          updateCarrito(carritoglobal);
          window.localStorage.setItem("carrito", JSON.stringify(carritoglobal));
        } else {
          setcarritoglobal({cantidad:0});
          updateCarrito({cantidad:0});
          window.localStorage.setItem("carrito", JSON.stringify({cantidad:0}));
        }
      }
    } catch (error) {
      console.log(
        "Error al actualizar el carrito despues de un error en la creacion del token"
      );
      console.log(error);
      throw new Error(
        "Error al actualizar el carrito despues de un error en la creacion del token"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const validate = async () => {
      await validateCart();
    };
    validate().catch(console.error);
  }, []);

  const openCapacitorSite = async (urlp: any, redirect: any) => {
    await Browser.open({ url: urlp });
    Browser.addListener("browserFinished", () => {
      window.location.href = redirect;
    });
  };
  
  function pagar() {
    if (carritoglobal !== undefined) {
      setLoading(true);
      const carritopagar = carritoglobal;
      if (
        carritopagar &&
        carritopagar.error === 0 &&
        ((carritopagar.sindireccion === 0 && tipoenvio === 0) ||
          tipoenvio === 1)
      ) {
        const infopago: any = {};
        infopago["tipopago"] = 0;
        infopago["tipoenvio"] = tipoenvio;
        pagarCompra(carritopagar, infopago)
          .then(
            async (res: any) => {
              console.log(res);
              if (res.id && res.id > 0) {
                if (res.url !== null) {
                  if (
                    navigator.userAgent.match(/Android/i) ||
                    navigator.userAgent.match(/webOS/i) ||
                    navigator.userAgent.match(/iPhone/i) ||
                    navigator.userAgent.match(/iPad/i) ||
                    navigator.userAgent.match(/iPod/i) ||
                    navigator.userAgent.match(/BlackBerry/i) ||
                    navigator.userAgent.match(/Windows Phone/i)
                  ) {
                    openCapacitorSite(res.url, "/mypurchases/" + res.id);
                  } else {
                    window.location.href = res.url;
                  }
                } else {
                  window.location.href = "/mypurchases/" + res.id;
                }
              } else if (res.error === 1) {
                console.log("error");
                if (carritoglobal !== undefined) {
                  try {
                    await validateCart();
                  } catch (error) {
                    console.log(
                      "Error al actualizar el carrito despues de un error en la creacion del token"
                    );
                    console.log(error);
                    throw new Error(
                      "Error al actualizar el carrito despues de un error en la creacion del token"
                    );
                  } finally {
                    setLoading(false);
                  }
                }
                setLoading(false);
              }
            },
            (rejected) => {
              console.log(rejected);
              setLoading(false);
            }
          )
          .catch((error) => {
            console.log(error);
            setLoading(false);
          });
        console.log(infopago);
      } else {
        const element = document.getElementById(
          "ver-direcciones"
        ) as HTMLElement | null;
        if (element !== null) {
          element.click();
        }
        setLoading(false);
      }
    } else {
      console.log("ir pagar");
    }
  }

  function volver() {
    if ("referrer" in document) {
      window.location.href = document.referrer;
    } else {
      window.history.back();
    }
  }

  return (
    <div className={"caja-carrito shadow-xl"}>
      <h1>Carrito</h1>
      <div>
        {carritoglobal !== undefined && carritoglobal?.cantidad && carritoglobal?.cantidad > 0  ?
                <div key={"carrito"}>
                  <div className={" titulos-carrito hidden md:block"}>
                    <div
                      className={
                        "grid grid-cols-2  md:grid-cols-8 gap-4 items-center text-center"
                      }
                    >
                      <div className={" col-span-2 md:col-span-5"}>
                        <strong>Producto</strong>
                      </div>
                      <div className="hidden md:inline-grid">
                        <strong>V. Unitario</strong>
                      </div>
                      <div>
                        <strong>Cantidad</strong>
                      </div>
                      <div>
                        <strong>V.Total</strong>
                      </div>
                    </div>
                  </div>
                  {carritoglobal.Items?.map((item) => {
                    valoru = 0;
                    if (item.valor && item.valor > 0) {
                      valoru = item.valor;
                      valorp = item.valor * item.cantidad;
                      total = total + valorp;
                    }
                    return (
                      <div key={item.id} className={"producto-carrito"}>
                        <div
                          className={
                            "grid grid-cols-3 md:grid-cols-10 gap-4 items-center"
                          }
                        >
                          <div className="col-span-3 md:col-span-1 text-left ">
                            <button
                              onClick={() =>
                                onDeleteItem(item,0)
                              }
                              className={
                                "btn  btn-sm md:btn-md btn-circle  btn-error"
                              }
                            >
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
                                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                />
                              </svg>
                            </button>
                          </div>
                          <div className={"text-center"}>
                            <img src={item.imagen} alt="" />
                          </div>
                          <div className={" col-span-2 md:col-span-5"}>
                            <h2>{item.nombre}</h2>
                            {item.disponibilidad === 0 ? (
                              <div className="error-disponibilidad">
                                Ya no esta disponible
                              </div>
                            ) : (
                              ""
                            )}
                            <div className="ubicacion-carrito">
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: "" + item.tienda,
                                }}
                              ></span>
                            </div>
                          </div>
                          <div className="hidden md:inline-grid">
                            $
                            {valoru.toLocaleString("en-us", {
                              minimumFractionDigits: 0,
                            })}
                          </div>
                          <div>
                            <strong className="md:hidden">Cantidad: </strong>
                            {item.cantidad}
                          </div>
                          <div
                            className={"text-right  col-span-2 md:col-span-1"}
                          >
                            $
                            {valorp.toLocaleString("en-us", {
                              minimumFractionDigits: 0,
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div
                    className={
                      "grid grid-cols-3 md:grid-cols-10 gap-4 items-center"
                    }
                  >
                    <div
                      className={"col-span-2 md:col-span-9 text-right totales"}
                    >
                      Sub Total
                    </div>
                    <div className={"text-right"}>
                      $
                      {total.toLocaleString("en-us", {
                        minimumFractionDigits: 0,
                      })}
                    </div>
                    <div
                      className={"col-span-2 md:col-span-9 text-right totales"}
                    >
                      Envio
                    </div>
                    <div className={"text-right"}>
                      $
                      {carritoglobal?.valorenvio !== undefined && tipoenvio !== 1
                        ? carritoglobal?.valorenvio.toLocaleString("en-us", {
                            minimumFractionDigits: 0,
                          })
                        : 0}
                    </div>
                    <div
                      className={"col-span-2 md:col-span-9 text-right totales"}
                    >
                      Total
                    </div>
                    <div className={"text-right"}>
                      $
                      {carritoglobal.valorenvio !== undefined && tipoenvio !== 1
                        ? (total + carritoglobal.valorenvio).toLocaleString(
                            "en-us",
                            { minimumFractionDigits: 0 }
                          )
                        : total.toLocaleString("en-us", {
                            minimumFractionDigits: 0,
                          })}
                    </div>
                  </div>
                  <br />
                  <hr />
                  <br />
                  <div>
                    {carritoglobal.tipoenvio && carritoglobal.tipoenvio !== 2 ? (
                      <div>
                        <h2>Tipo de Envío</h2>
                        <div className="grid  grid-cols-1  md:grid-cols-2 gap-4">
                          <div>
                            <label
                              htmlFor="domicilio"
                              className="label-mediopago"
                              onClick={() => setTipoenvio(0)}
                            >
                              <input
                                type="radio"
                                name="tipoenvio"
                                id="domicilio"
                                value={1}
                                defaultChecked={true}
                              />
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
                                <span>Envio a domicilio</span>
                              </div>
                            </label>
                          </div>
                          <div>
                            <label
                              htmlFor="tienda"
                              className="label-mediopago"
                              onClick={() => setTipoenvio(1)}
                            >
                              <input
                                type="radio"
                                name="tipoenvio"
                                id="tienda"
                                value={2}
                              />
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
                                    d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                                  />
                                </svg>
                                <span>Retiro en tienda</span>
                              </div>
                            </label>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <h2>Tipo de Envío</h2>
                        <div className="grid  grid-cols-1  md:grid-cols-2 gap-4">
                          <div>
                            <label
                              htmlFor="domicilio"
                              className="label-mediopago"
                            >
                              <input
                                type="radio"
                                name="tipoenvio"
                                id="domicilio"
                                value={1}
                                defaultChecked={true}
                              />
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
                                <span>Envio a domicilio</span>
                              </div>
                            </label>
                          </div>
                          <div className="producto-nodisponible">
                            Retiro en tienda no disponible ya que tienes
                            productos de diferentes tiendas
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  {tipoenvio === 1 ? (
                    <div className="info-paquete-ubicacion">
                      <h3>
                        Tienda de Recepción
                      </h3>
                      <div className="text-left">
                      <div>
                        <strong>Tienda:</strong>{" "}
                        <span
                          dangerouslySetInnerHTML={{
                            __html: "" + carritoglobal.campus?.name,
                          }}
                        ></span>
                      </div>
                      <div>
                        <strong>Ubicación:</strong>{" "}
                        {carritoglobal.campus?.address}
                      </div>
                      <div>
                        <strong>Ciudad:</strong>{" "}
                        {carritoglobal.campus?.cityname}
                      </div>
                      </div>
                    </div>
                  ) : (
                    <div className="info-envio-carrito">
                      <CurrentAddress />
                    </div>
                  )}
                  {carritoglobal.sindireccion === 1 && tipoenvio !== 1 ? (
                    <div>
                      <br />
                      <div className="alert alert-error text-center">
                        <input type="hidden" id="nopago-direccion" value="1" />
                        Para poder enviar tu producto debes tener una dirección
                        asignada.
                      </div>
                    </div>
                  ) : (
                    ""
                  )}

                  <br />
                  {carritoglobal.error  !== 1 ?
                  <div className="text-right">
                    <button className="btn btn-succes" onClick={pagar}>
                      Ir a Pagar
                    </button>
                  </div>
                  : ""}
                </div>
          : ""}
        <input type="hidden" id="proceso-pago" value="1" />
      </div>

      {carritoglobal !== undefined && carritoglobal.cantidad === 0 ? (
        <div>
          <div>No tienes productos agregados a tu carrito</div>
          <br />
          <div className="text-center">
            <button className="btn btn-sm btn-info" onClick={volver}>
              Seguir comprando
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

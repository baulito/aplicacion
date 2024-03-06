import { useEffect, useState } from "react";
import { LayoutGeneral } from "../components/layout/General";
import { useParams } from "react-router-dom";
import { Compra } from "../models/compra";
import { detalleCompra } from "../api/fetch-data";

export const MyPurchasesDetail = () => {
  let params = useParams();
  let idc = 0;
  if (params.id) {
    idc = parseInt(params.id);
  }
  
  let payments = '';
  if(params.payments){
    payments = params.payments;
  }
  const [compra, setCompra] = useState<Compra>();

  useEffect(() => {
    detalleCompra(idc).then((res: Compra) => {
      setCompra(res);
      if(compra?.negocio_compra_estado === 1){
          window.localStorage.removeItem("carrito");
      }
      if (res.negocio_compra_estado === 0 || res.negocio_compra_estado === 3) {
        setTimeout(() => {
          window.location.reload();
        }, 20000);
      }
    });
  }, []);

  if (compra?.negocio_compra_id) {
    let datet = "";
    let date = new Date(
      compra.negocio_compra_fecha + " " + compra.negocio_compra_hora
    );
    datet = date.toLocaleString();
    return (
      <LayoutGeneral>
        <div className=" pl-5 pr-5 sm:container sm:mx-auto">
          <div className="detalle-compra shadow-xl">
            <div className="text-right">
              <a href="/mypurchases" className="btn btn-sm btn-info">
                Ir a mis compras
              </a>
            </div>
            
            {compra.negocio_compra_estado === 1 ? (
              <div>
                <h1>Gracias por su compra</h1>
                <div className="pagoaprobado">Tu pago fue Aprobado</div>
              </div>
            ) : compra.negocio_compra_estado === 2 ? (<div>
                <div className="pagorechazado">Tu pago fue Rechazado</div>
                <div className="text-center">
                  <a className="btn btn-sm btn-info"  href="/cart" >Reintentar Pago</a> 
                </div>
              </div>
            ) : (
              <div className="pagopendiente">
                Tu pago se encuentra pendiente de aprobación
              </div>
            )}
            <div
              className={"grid grid-cols-1   lg:grid-cols-3 text-left gap-5"}
            >
              <div className={"col-span-2"}>
                <h2>Información de compra</h2>
                <div className={"  titulos-carrito  hidden md:block"}>
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
                {compra?.items.map((item) => {
                  return (
                    <div className={"caja-producto-detalle"}>
                      <div
                        className={
                          "grid grid-cols-2  md:grid-cols-8 gap-4 items-center"
                        }
                      >
                        <div className={" col-span-2 md:col-span-5"}>
                          <h3>{item.negocio_compra_item_nombre}</h3>
                          {item.caracteristicastxt ? (
                            <div
                              style={{ fontSize: "12px" }}
                              dangerouslySetInnerHTML={{
                                __html: "" + item.caracteristicastxt,
                              }}
                            ></div>
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="hidden md:inline-grid">
                          $
                          {item.negocio_compra_item_valor.toLocaleString(
                            "en-us",
                            { minimumFractionDigits: 0 }
                          )}
                        </div>
                        <div>
                          <strong className="md:hidden">Cantidad: </strong>
                          {item.negocio_compra_item_cantidad}
                        </div>
                        <div className={"text-right"}>
                          $
                          {(
                            item.negocio_compra_item_valor *
                            item.negocio_compra_item_cantidad
                          ).toLocaleString("en-us", {
                            minimumFractionDigits: 0,
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
                <hr />
                <br />
                <div
                  className={
                    "grid grid-cols-3 md:grid-cols-10 gap-4 items-center mr-3"
                  }
                >
                  <div
                    className={"col-span-2 md:col-span-9 text-right totales"}
                  >
                    Sub Total
                  </div>
                  <div className={"text-right"}>
                    $
                    {compra.negocio_compra_subtotal.toLocaleString("en-us", {
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
                    {compra.negocio_compra_valor_envio !== undefined
                      ? compra.negocio_compra_valor_envio.toLocaleString(
                          "en-us",
                          { minimumFractionDigits: 0 }
                        )
                      : 0}
                  </div>
                  <div
                    className={"col-span-2 md:col-span-9 text-right totales"}
                  >
                    Total
                  </div>
                  <div className={"text-right"}>
                    $
                    {parseInt(compra.negocio_compra_valor).toLocaleString(
                      "en-us",
                      { minimumFractionDigits: 0 }
                    )}
                  </div>
                </div>
              </div>
              <div className="text-left">
                <h2>Información de pago</h2>
                <div>
                  <strong>Estado pago:</strong>{" "}
                  {compra.negocio_compra_estado_texto}
                </div>
                {compra.infopago && compra.infopago.tipo ? (
                  <div>
                    <div>
                      <strong>Pagado con:</strong> {compra.infopago.tipo}
                    </div>
                    <div>
                      <strong>Medio de pago:</strong> {compra.infopago.entidad}{" "}
                    </div>
                    <div>
                      <strong>Fecha de pago:</strong> {compra.infopago.fecha}{" "}
                    </div>
                  </div>
                ) : (
                  <div>
                    <strong>Medio pago:</strong> Mercado pago
                  </div>
                )}
                {compra.negocio_compra_estado === 0 &&
                compra.negocio_compra_tipopago === 3 ? (
                  <a
                    className="btn btn-sm btn-info"
                    href={compra.negocio_compra_urlefecty}
                  >
                    Tiket de pago
                  </a>
                ) : (
                  ""
                )}
                <div className="datosconfidenciales">
                  El Baulito.co no almacena datos de medios de pago.
                </div>
                <br />

                <h2>Información de Envio</h2>
                <div>
                  <strong>Nombre: </strong>
                  {compra.negocio_compra_nombre}
                </div>
                <div>
                  <strong>Correo: </strong>
                  {compra.negocio_compra_correo}
                </div>
                <div>
                  <strong>Dirección: </strong>
                  {compra.negocio_compra_direccion}
                </div>

                {compra.informacionenvio && compra.informacionenvio.tracking ? (
                  <div>
                    <br />
                    <h2>Estado de tu envio</h2>
                    <div className="estadoenvio">
                      <h3>Envio en preparación</h3>
                      <div>{datet}</div>
                    </div>
                    {compra.informacionenvio.tracking.map((traking) => {
                      if (traking.updateState !== "Envío pendiente por pago") {
                        let datet = "";
                        if (traking.date) {
                          let date = new Date(traking.date);
                          datet = date.toLocaleString();
                        }

                        return (
                          <div className="estadoenvio">
                            <h3>{traking.updateState}</h3>
                            <div>{datet}</div>
                          </div>
                        );
                      }
                    })}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </LayoutGeneral>
    );
  } else {
    return <LayoutGeneral />;
  }
};

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useGlobalContext } from "../../context/Main";
import { validarCarrito } from "../../api/fetch-data";
import { NewAddress } from "./NewAddress";
import { User } from "../../models/user";
import { EditAddress } from "./EditAddress";
import {
  deleteAddress,
  updateUserMainAddress,
} from "./services/address.service";


export const ListAddress = () => {
  const { mainState, loginUser, updateCarrito } = useGlobalContext();
  const [newdireccion, setNewdireccion] = useState({ new: 0 });
  const idpage = Math.random().toString(16).slice(2);
  const [procesopago, setProcesopago] = useState(0);
  const [sindireccion, setSindireccion] = useState(0);
  const [mainAddress, setMainAddress] = useState(0);

  const showToast = (title: string, type: string = "alert-success") => {
    const toastArea: HTMLDivElement = document.getElementById(
      "toast-area"
    ) as HTMLDivElement;
    toastArea.innerHTML = `<div class="toast-baulito toast toast-top toast-end">
                <div class="alert ${type}">
                  <span>${title}</span>
                </div>
                </div>`;
    setTimeout(() => {
      toastArea.innerHTML = "";
    }, 3500);
  };
  const editAdress = (id: number) => {
    (
      document.getElementById(idpage + "editaddress" + id) as HTMLDivElement
    ).style.display = "block";
    (
      document.getElementById(idpage + "detailaddress" + id) as HTMLDivElement
    ).style.display = "none";
  };

  const handleChangeMainAddress = (id: any) => {
    console.log(id);
    setMainAddress(parseInt(id));
    console.log(mainAddress);
  };

  const deleteAdressuser = (id: number) => {
    deleteAddress(id).then((response) => {
      if (mainState.user) {
        const usuario: User = mainState.user;
        if (
          response.length > 0 &&
          response !== undefined &&
          mainState.user?.address !== undefined
        ) {
          usuario.address = response;
          loginUser(usuario);
        } else {
          usuario.address = [];
          loginUser(usuario);
        }
      }
    });
  };

  const cambiarDireccionP = () => {
    updateUserMainAddress(mainAddress).then((response: any) => {
      if (
        response !== undefined &&
        response.length > 0 &&
        mainState.user?.address !== undefined
      ) {
        const usuario: User = mainState.user;
        usuario.address = response;
        loginUser(usuario);
        const carritoglobal = mainState.carrito;
        if (carritoglobal !== undefined) {
          validarCarrito(carritoglobal).then((carrito) => {
            updateCarrito(carrito);
            window.localStorage.setItem(
              "carrito",
              JSON.stringify(carritoglobal)
            );
            toast.success("Dirección Actualizada Correctamente", {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: false,
              theme: "light",
            });
          });
        }
      }
    });
  };

  useEffect(() => {
    let pagos = document.getElementById(
      "proceso-pago"
    ) as HTMLInputElement | null;
    if (pagos !== null) {
      setProcesopago(1);
    }
    let direcionp = document.getElementById(
      "nopago-direccion"
    ) as HTMLInputElement | null;
    if (direcionp !== null) {
      setSindireccion(1);
    }
    if (
      mainState.user &&
      mainState.user?.address &&
      mainState.user?.address?.length > 0
    ) {
      const addresses = mainState.user.address;
      const findMainAddress = addresses.find((address) => {
        if (address?.principal && address.principal === 1) {
          return address;
        }
      });
      if (findMainAddress) {
        setMainAddress(findMainAddress.id);
      }
    }
  }, []);

  return (
    <>
      {sindireccion === 1 ? (
        <div className="alert  alert-error">
          Para poder Realizar la compra con envío a domicilio debes de tener
          asignada una dirección.
        </div>
      ) : (
        ""
      )}
      <div className={"text-right"}>
        {newdireccion.new === 0 ? (
          <div>
            <br />
            <button
              className={"btn btn-sm"}
              onClick={() => setNewdireccion({ new: 1 })}
            >
              Agregar Dirección
            </button>
          </div>
        ) : (
          <div>
            <br />
            <button
              className={"btn btn-sm btn-warning"}
              onClick={() => setNewdireccion({ new: 0 })}
            >
              Cancelar
            </button>
            <NewAddress />
          </div>
        )}
      </div>
      <br />
      {mainState.user &&
        mainState.user?.address &&
        mainState.user?.address?.length > 0 ? (
        mainState.user?.address.map((address) => {
          if (address?.id > 0) {
            let csscaja = "caja-direccion";
            if (address?.principal === 1) {
              csscaja = "caja-direccion principal";
            }
            return (
              <div key={"addres" + address?.id}>
                <div id={idpage + "detailaddress" + address.id}>
                  <label
                    className={csscaja}
                    form={"direccion-principal" + address.id}
                  >
                    {address?.principal === 1 ? (
                      <input
                        type="radio"
                        name="direccion-principal"
                        id={"direccion-principal" + address.id}
                        value={address.id}
                        defaultChecked={true}
                        onChange={(e) =>
                          handleChangeMainAddress(e.target.value)
                        }
                      />
                    ) : (
                      <input
                        type="radio"
                        name="direccion-principal"
                        id={"direccion-principal" + address.id}
                        value={address.id}
                        defaultChecked={false}
                        onChange={(e) =>
                          handleChangeMainAddress(e.target.value)
                        }
                      />
                    )}

                    <h5>
                      {address?.direccion},{address?.adicional}
                    </h5>
                    <div>
                      {address?.ciudadnombre}, {address?.barrio}
                      <span className={"persona"}>
                        {" "}
                        {address?.nombre} - {address?.telefono}
                      </span>
                    </div>
                    <div className={"text-right"}>
                      <button
                        className={"btn btn-success btn-sm"}
                        onClick={() => editAdress(address.id)}
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
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                          />
                        </svg>
                      </button>
                      <button
                        className={"btn btn-warning btn-sm ml-2"}
                        onClick={() => deleteAdressuser(address.id)}
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
                  </label>
                </div>
                <div
                  style={{ display: "none" }}
                  id={idpage + "editaddress" + address.id}
                >
                  <EditAddress address={address} idpage={idpage} />
                </div>
              </div>
            );
          } else {
            return true;
          }
        })
      ) : (
        <div>
          <p>Aún no has registrado ninguna dirección.</p>
          <p>
            <strong>
              Recuerda registrar una dirección para completar tus compras
            </strong>
          </p>
        </div>
      )}

      {mainState.user &&
        mainState.user?.address &&
        mainState.user?.address?.length > 1 ? (
        <div>
          <button
            className="btn btn-success"
            onClick={() => cambiarDireccionP()}
          >
            Guardar dirección principal
          </button>
        </div>
      ) : (
        <div></div>
      )}

      {procesopago === 1 ? (
        <div>
          <label htmlFor="modal-envios" className="btn btn-success btn-block">
            Seguir en proceso de pago
          </label>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

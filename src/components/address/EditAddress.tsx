import { useContext, useEffect, useState } from "react";
import { useGlobalContext } from "../../context/Main";
import { updateAddress } from "./services/address.service";
import { Address } from "../../models/user";

interface Props {
  address?: Address;
  idpage?: any;
}

export const EditAddress = ({ address, idpage }: Props) => {
  const { mainState } = useGlobalContext();
  const [direccion, setDireccion] = useState<Address>();

  useEffect(() => {
    if (address !== undefined && address) {
      setDireccion(address);
    }
  }, []);

  const canceleditAdress = () => {
    const id = address?.id;
    (
      document.getElementById(idpage + "editaddress" + id) as HTMLDivElement
    ).style.display = "none";
    (
      document.getElementById(idpage + "detailaddress" + id) as HTMLDivElement
    ).style.display = "block";
  };

  const submitForm = (e: any) => {
    e.preventDefault();
    const dataform = direccion;
    if (dataform !== undefined) {
      updateAddress(dataform).then(() => {
        window.location.reload();
      });
    }
    return false;
  };

  if (address) {
    return (
      <form
        id={"editar-direccion-" + address.id}
        className={"text-left nueva-direccion"}
        onSubmit={(e) => submitForm(e)}
      >
        <h3>Editar Dirección</h3>
        <input type="hidden" name="id" defaultValue={direccion?.id} />
        <div className={"grid md:grid-cols-3 gap-4"}>
          <div className={"md:col-span-2"}>
            <div>
              <label htmlFor="">Nombre y Apellido</label>
              <input
                type="text"
                name="nombre"
                className={"input input-sm input-bordered w-full"}
                required
                defaultValue={direccion?.nombre}
                onChange={(e) => {
                  if (direccion && direccion.nombre) {
                    let newd: Address = direccion;
                    newd.nombre = e.target.value;
                    setDireccion(newd);
                  }
                }}
              />
            </div>
          </div>
          <div>
            <div>
              <label htmlFor="">No. Documento</label>
              <input
                type="text"
                name="documento"
                className={"input input-sm input-bordered w-full"}
                required
                defaultValue={direccion?.documento}
                onChange={(e) => {
                  if (direccion && direccion.documento) {
                    let newd: Address = direccion;
                    newd.documento = e.target.value;
                    setDireccion(newd);
                  }
                }}
              />
            </div>
          </div>
        </div>
        <input type="hidden" name="pais" defaultValue={"CO"} />
        <div className={"grid md:grid-cols-2 gap-4"}>
          <div>
            <div className={"form-group"}>
              <label htmlFor="">Telefono</label>
              <input
                type="number"
                name="telefono"
                className={"input input-sm input-bordered w-full"}
                required
                defaultValue={direccion?.telefono}
                onChange={(e) => {
                  if (direccion && direccion.telefono) {
                    let newd: Address = direccion;
                    newd.telefono = e.target.value;
                    setDireccion(newd);
                  }
                }}
              />
            </div>
          </div>
          <div>
            <div className={"form-group"}>
              <p>{parseInt(address?.ciudad)}</p>
              <label htmlFor="">Ciudad</label>
              { mainState.cities !== undefined ? 
              <select
                data-te-select-init
                data-te-select-filter="true"
                name="ciudad"
                className={"input input-sm input-bordered w-full"}
                onChange={(e) => {
                  if (direccion && direccion.ciudad) {
                    let newd: Address = direccion;
                    newd.ciudad = e.target.value;
                    setDireccion(newd);
                  }
                }}
                defaultValue={address?.ciudad}
              >
                <option value="">Seleccione</option>
                {
                  mainState.cities.map((ciudad) => {
                        if (ciudad.locationCode === address?.ciudad) {
                          return (
                            <option
                              key={
                                direccion?.id + "-ciudad-" + ciudad.locationCode
                              }
                              value={ciudad.locationCode}
                              selected
                            >
                              {ciudad?.locationName},
                              {ciudad.departmentOrStateName},
                            </option>
                          );
                        } else {
                          return (
                            <option
                              key={
                                direccion?.id + "-ciudad-" + ciudad.locationCode
                              }
                              value={ciudad.locationCode}
                            >
                              {ciudad?.locationName},
                              {ciudad.departmentOrStateName}
                            </option>
                          );
                        }
                      })
                }
              </select>
              : ""
                }
            </div>
          </div>
        </div>
        <div className={"grid md:grid-cols-3 gap-4"}>
          <div className={"md:col-span-2"}>
            <div className={"form-group"}>
              <label htmlFor="">Direccion</label>
              <input
                type="text"
                name="direccion"
                className={"input input-sm input-bordered w-full"}
                required
                defaultValue={direccion?.direccion}
                onChange={(e) => {
                  if (direccion && direccion.direccion) {
                    let newd: Address = direccion;
                    newd.direccion = e.target.value;
                    setDireccion(newd);
                  }
                }}
              />
            </div>
          </div>
          <div>
            <div className={"form-group"}>
              <label htmlFor="">Barrio</label>
              <input
                type="text"
                name="barrio"
                className={"input input-sm input-bordered w-full"}
                defaultValue={direccion?.barrio}
                onChange={(e) => {
                  if (direccion && direccion.barrio) {
                    let newd: Address = direccion;
                    newd.barrio = e.target.value;
                    setDireccion(newd);
                  }
                }}
              />
            </div>
          </div>
          <div>
            <div>
              <label htmlFor="">Adicional</label>
              <input
                type="text"
                name="adicional"
                placeholder="Casa,Apto"
                className={"input input-sm input-bordered w-full"}
                defaultValue={direccion?.adicional}
                onChange={(e) => {
                  if (direccion && direccion.adicional) {
                    let newd: Address = direccion;
                    newd.adicional = e.target.value;
                    setDireccion(newd);
                  }
                }}
              />
            </div>
          </div>
          <div className={"md:col-span-2 text-right"}>
            <label>
              <br></br>
            </label>
            <button type="submit" className={"btn btn-sm btn-success"}>
              Guardar
            </button>
            <button
              type="button"
              className={"btn btn-sm btn-warning  ml-2"}
              onClick={canceleditAdress}
            >
              Cancelar
            </button>
          </div>
        </div>
      </form>
    );
  } else {
    return <div>Cargando</div>;
  }
};

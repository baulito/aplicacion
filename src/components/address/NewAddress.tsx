import { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/Main";
import { saveAddress } from "./services/address.service";
import { Cities } from "../../models/cities";

export const NewAddress = () => {
  const { mainState } = useGlobalContext();
  const [ciudades, setCiudades] = useState<Cities>();
  const Submitform = (e: any) => {
    e.preventDefault();
    const form = document.getElementById("nueva-direccion") as HTMLFormElement;
    const data = new FormData(form);
    const dataform = {
      nombre: data.get("nombre") as string,
      documento: data.get("documento") as string,
      telefono: data.get("telefono") as string,
      pais: data.get("pais") as string,
      ciudad: data.get("ciudad") as string,
      barrio: data.get("barrio") as string,
      direccion: data.get("direccion") as string,
      adicional: data.get("adicional") as string,
    };
    //console.log(dataform);
    saveAddress(dataform).then(() => {
      window.location.reload();
    });
    return false;
  };

  useEffect(() => {
    if (mainState.cities) {
      setCiudades(mainState.cities);
    }
  }, [mainState.cities]);

  if (ciudades !== undefined) {
    return (
      <form
        id="nueva-direccion"
        className={"text-left nueva-direccion mt-3"}
        onSubmit={(e) => Submitform(e)}
      >
        <h3>Nueva Dirección</h3>
        <div className={"grid md:grid-cols-3 gap-4"}>
          <div className={"md:col-span-2"}>
            <div>
              <label htmlFor="">Responsable*</label>
              <input
                type="text"
                placeholder="Nombre y Apellido"
                name="nombre"
                className={"input input-sm input-bordered w-full"}
                required
              />
            </div>
          </div>
          <div>
            <div>
              <label htmlFor="">Documento*</label>
              <input
                type="text"
                placeholder="Número Identificación"
                name="documento"
                className={"input input-sm input-bordered w-full"}
                required
              />
            </div>
          </div>
        </div>
        <input type="hidden" name="pais" value={"CO"} />
        <div className={"grid md:grid-cols-2 gap-4"}>
          <div>
            <div className={"form-group"}>
              <label htmlFor="">Telefono*</label>
              <input
                type="number"
                placeholder="Número de Teléfono"
                name="telefono"
                className={"input input-sm input-bordered w-full"}
                required
              />
            </div>
          </div>
          <div>
            <div className={"form-group"}>
              <label htmlFor="">Ciudad*</label>
              <select
                data-te-select-init
                data-te-select-filter="true"
                name="ciudad"
                className={"input input-sm input-bordered w-full"}
              >
                {ciudades !== undefined
                  ? ciudades.map((ciudad) => {
                      return (
                        <option key={ciudad.locationCode} value={ciudad.locationCode}>
                          {ciudad?.locationName},{ciudad.departmentOrStateName}
                        </option>
                      );
                    })
                  : ""}
              </select>
            </div>
          </div>
        </div>
        <div className={"grid md:grid-cols-3 gap-4"}>
          <div className={"md:col-span-2"}>
            <div className={"form-group"}>
              <label htmlFor="">Direccion*</label>
              <input
                type="text"
                placeholder="Dirección completa"
                name="direccion"
                className={"input input-sm input-bordered w-full"}
                required
              />
            </div>
          </div>
          <div>
            <div>
              <label htmlFor="">Adicional</label>
              <input
                type="text"
                name="adicional"
                placeholder="p.e: Casa, Apto, Int"
                className={"input input-sm input-bordered w-full"}
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
              />
            </div>
          </div>
          
          <div className={"md:col-span-2 text-right"}>
            <label> </label>
            <button type="submit" className={"btn btn-sm btn-success"}>
              Guardar
            </button>
          </div>
        </div>
      </form>
    );
  } else {
    return <div>Cargando</div>;
  }
};

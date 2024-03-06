import {  useEffect, useState } from "react";
import { useGlobalContext } from "../../context/Main";
import { Address } from "models/user";


export const CurrentAddress = () => {
  const { mainState } = useGlobalContext();
  const [mainAddress, setMainAddress ] = useState<Address>();
  
  const verifyUserAddress = () => {
    return mainState.user?.address && 
           mainState.user?.address.length > 0;
  }

  useEffect(()=>{
    if(verifyUserAddress()){
      const main = mainState.user?.address?.find((p) => p.principal === 1);
      if(main) setMainAddress(main);
      console.log('Changing');
    } 
  },[mainState]);

  return (
    <div className={"caja-direccion-compra shadow-xl"}>
      <h3>Dirección de envío</h3>
      {
        mainAddress
         ? (
          <div className="text-left">
            <h4>
              <strong>Dirección:</strong> {mainAddress.direccion}, {mainAddress.adicional}
            </h4>
            <div>
            <strong>Ciudad:</strong> {mainAddress.ciudadnombre}, {mainAddress.pais}
            </div>
            <div>
            <strong>Recibe:</strong> {mainAddress.nombre}</div>
            <div>
            <strong>Teléfono:</strong> {mainAddress.telefono}</div>
            <br />
            <div className={"text-center"}>
              <label htmlFor="modal-envios" className="btn">
                Cambiar Dirección
              </label>
            </div>
          </div>
        ) : (
          <>
            <br />
            <label className="btn" htmlFor="modal-envios" id="ver-direcciones">
              Agregar Dirección
            </label>
          </>
        )
      }
    </div>
  );
};

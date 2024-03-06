import { useContext, useEffect, useState } from 'react';
import { useGlobalContext } from '../../context/Main';
import { pagarCompra } from '../../api/fetch-data';
import { validarCarrito } from '../../api/fetch-data';
declare global {
    interface Window {
        MercadoPago: any
    }
}

export const Paymentefecty = ({publickey}:any) => {
    const { mainState, updateCarrito } = useGlobalContext();
    const [carritoglobal] = useState(mainState.carrito);
    const mp = new window.MercadoPago(publickey, {
        locale: "es-CO",
      });

    function createSelectOptions(elem: any, options: any, labelsAndKeys = { label: "name", value: "id" }) {
        const { label, value } = labelsAndKeys;

        elem.options.length = 0;

        const tempOptions = document.createDocumentFragment();

        options.forEach((option: any) => {
            const optValue = option[value];
            const optLabel = option[label];

            const opt = document.createElement('option');
            opt.value = optValue;
            opt.textContent = optLabel;

            tempOptions.appendChild(opt);
        });

        elem.appendChild(tempOptions);
    }

    // Get Identification Types
    async function getIdentificationTypes() {
        try {
            const identificationTypes = await mp.getIdentificationTypes();
            const docTypeElement = document.getElementById('docType2');

            createSelectOptions(docTypeElement, identificationTypes)
        } catch (e) {
            return console.error('Error getting identificationTypes: ', e);
        }
    }


    useEffect(() => {
        getIdentificationTypes();

    }, [])

    function subirform(event: any){
        event.preventDefault();
        if (carritoglobal !== undefined) {
            const carritopagar = carritoglobal.CarritoNegocios?.find(carritonegocio => carritonegocio.negocio === 1384);
            if (carritopagar && carritopagar.error === 0 ) {
                const form = (document.querySelector('form.formpaymendefecty') as HTMLFormElement);
                const data = new FormData(form);
                const infopago: any = {};
                infopago['tipopago'] = 3;
                infopago['identificationType'] = data.get("identificationType");
                infopago['identificationNumber'] = data.get("identificationNumber");
                infopago['entity_type'] = data.get("personType");
                infopago['email'] = data.get("email");
                pagarCompra(carritopagar,infopago).then((res:any) => {
                    if(res.id && res.id  > 0 ){
                        window.localStorage.removeItem("carrito");
                        window.location.href = "/mypurchases/"+res.id; 
                    } else if(res.error === 1){
                    console.log("error");
                    if(carritoglobal !== undefined ){
                        // validarCarrito(carritoglobal).then((carrito)=>{
                        //     carritoglobal.CarritoNegocios = carrito.CarritoNegocios;
                        //     updateCarrito(carritoglobal);
                        //     window.localStorage.setItem("carrito", JSON.stringify(carritoglobal));
                        // }); 
                    } 
                    } 
                });
                console.log(infopago);
            } else {
                console.log("no puede pagar");
            } 
        }
      }
    return (
        <div className="">
            <h3>Efecty</h3>
            <form id="form-checkout" onSubmit={(e)=>subirform(e)} method="post" className='formpaymendefecty'>
                <div className={"grid grid-cols-1 md:grid-cols-3 gap-4"}>
                    <div>
                        <label htmlFor="payerFirstName">Nombre</label>
                        <input id="form-checkout__payerFirstName" name="payerFirstName" type="text" className={'input  input-bordered w-full input-sm'} required  />
                    </div>
                    <div>
                        <label htmlFor="payerLastName">Apellido</label>
                        <input id="form-checkout__payerLastName" name="payerLastName" type="text" className={'input  input-bordered w-full input-sm'} required />
                    </div>
                    <div>
                        <label htmlFor="email">E-mail</label>
                        <input id="form-checkout__email" name="email" type="text" className={'input  input-bordered w-full input-sm'} required />
                    </div>
                    <div>
                        <label htmlFor="identificationType">Tipo de documento</label>
                        <select id="docType2" name="identificationType" className={'input  input-bordered w-full input-sm'} ></select>
                    </div>
                    <div>
                        <label htmlFor="identificationNumber">Número del documento</label>
                        <input id="form-checkout__identificationNumber" name="identificationNumber" type="text" className={'input  input-bordered w-full input-sm'} required />
                    </div>
                    <div></div>
                </div>

                <div>
                    <div className="text-right">
                        <button type="submit" className=" btn btn-success">Pagar</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
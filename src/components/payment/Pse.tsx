import { useContext, useEffect, useState } from 'react';
import { useGlobalContext } from '../../context/Main';
import { Browser } from '@capacitor/browser';
import { pagarCompra } from '../../api/fetch-data';
import { validarCarrito } from '../../api/fetch-data';
declare global {
    interface Window {
        MercadoPago: any
    }
}

export const Paymentpse = ({publickey,banks}:any) => {
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
            const docTypeElement = document.getElementById('docType');

            createSelectOptions(docTypeElement, identificationTypes)
        } catch (e) {
            return console.error('Error getting identificationTypes: ', e);
        }
    }


    useEffect(() => {
        getIdentificationTypes();

    }, [])

    const openCapacitorSite = async (urlp:any,redirect:any) => {
        try {
            await Browser.open({ url: urlp });
            Browser.addListener('browserFinished', () => {
                window.location.href = redirect; 
              });
           // window.location.href = redirect;             
        } catch (error) {
            console.log(error);
            throw Error(`Error abriendo mercadopago`);
        }

      };

    function subirform(event: any){
        event.preventDefault();
        if (carritoglobal !== undefined) {
            const carritopagar = carritoglobal.CarritoNegocios?.find(carritonegocio => carritonegocio.negocio === 1384);
            if (carritopagar && carritopagar.error === 0 ) {
                const form = (document.querySelector('form.formpaymendpse') as HTMLFormElement);
                const data = new FormData(form);
                const infopago: any = {};
                infopago['tipopago'] = 2;
                infopago['identificationType'] = data.get("identificationType");
                infopago['identificationNumber'] = data.get("identificationNumber");
                infopago['entity_type'] = data.get("personType");
                infopago['financial_institution'] = data.get("bank");
                infopago['email'] = data.get("email");
                //console.log(infopago);
                pagarCompra(carritopagar,infopago).then((res:any) => {
                    if(res.id && res.id  > 0 ){
                        window.localStorage.removeItem("carrito");
                        openCapacitorSite(res.url,"/mypurchases/"+res.id);
                    } else if(res.error === 1){
                        console.log("error");
                        if(carritoglobal !== undefined ){
                            //validarCarrito(carritoglobal).then((carrito)=>{
                              //  carritoglobal.CarritoNegocios = carrito.CarritoNegocios;
                              //  updateCarrito(carritoglobal);
                              //  window.localStorage.setItem("carrito", JSON.stringify(carritoglobal));
                            // }); 
                        } 
                    }
                });
                
            } else {
                console.log("no puede pagar");
            } 
        }
      }
    return (
        <div className="">
            <h3>PSE</h3>
            <form id="form-checkout" onSubmit={(e) => subirform(e)} method="post" className='formpaymendpse'>
                <div className={"grid grid-cols-1  md:grid-cols-3 gap-4"}>
                    <div>
                        <label htmlFor="payerFirstName">Nombre</label>
                        <input id="form-checkout__payerFirstName" name="payerFirstName" type="text" className={'input  input-bordered w-full input-sm'}  />
                    </div>
                    <div>
                        <label htmlFor="payerLastName">Apellido</label>
                        <input id="form-checkout__payerLastName" name="payerLastName" type="text" className={'input  input-bordered w-full input-sm'}  />
                    </div>
                    <div>
                        <label htmlFor="email">E-mail</label>
                        <input id="form-checkout__email" name="email" type="text" className={'input  input-bordered w-full input-sm'}  />
                    </div>
                    <div>
                        <label htmlFor="identificationType">Tipo de documento</label>
                        <select id="docType" name="identificationType" className={'input  input-bordered w-full input-sm'} ></select>
                    </div>
                    <div>
                        <label htmlFor="identificationNumber">Número del documento</label>
                        <input id="form-checkout__identificationNumber" name="identificationNumber" type="text" className={'input  input-bordered w-full input-sm'} />
                    </div>
                    <div></div>
                    <div>
                        <label htmlFor="personType">Tipo de Persona</label>
                        <select id="personType" name="personType" className={'input  input-bordered w-full input-sm'} >
                            <option value="individual">Natural</option>
                            <option value="association">Juridica</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="bank">Banco</label>
                        <select id="bank" name="bank" className={'input  input-bordered w-full input-sm'} defaultValue={''} >
                            <option value="">Seleccione</option>
                            {
                               
                               Object.keys(banks).map((key:any)=>{
                                    return(
                                        <option value={parseInt(key)} >{banks[key]}</option>
                                    )
                                })
                
                            }
                        </select>
                    </div>
                    <div></div>
                </div>

                <div>
                    <div>
                        <div>
                            <div className="text-right">
                                <button type="submit" className=" btn btn-success">Pagar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
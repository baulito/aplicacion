import { useContext, useEffect, useState } from 'react';
import { useGlobalContext } from '../../context/Main';
import { pagarCompra } from '../../api/fetch-data';
import { validarCarrito } from '../../api/fetch-data';

declare global {
  interface Window {
    MercadoPago: any
  }
}

export const Paymentcard = ({ publickey }: any) => {
  const { mainState, updateCarrito } = useGlobalContext();
  const [carritoglobal] = useState(mainState.carrito);
  let total = 0;
  let valorp = 0;
  let valorpagar = 0;
  if (carritoglobal !== undefined) {
      var cnegocio = carritoglobal;
      valorp = 0;
      total = 0;
      cnegocio.Items?.map((item) => {
        if (item.valor && item.valor > 0) {
          valorp = item.valor * item.cantidad;
          total = total + valorp;
        }
      if (cnegocio.valorenvio !== undefined) {
        valorpagar = total + cnegocio.valorenvio;
      } else {
        valorpagar = total;
      }

    })
  }

  console.log("esta es l public key " + publickey)
  const mp = new window.MercadoPago(publickey, {
    locale: "es-CO",
  });

  //inicializar campos tarjeta

  const cardNumberElement = mp.fields.create('cardNumber', {
    placeholder: "Número de la tarjeta"
  }).mount('form-checkout__cardNumber');
  mp.fields.create('expirationDate', {
    placeholder: "MM/YY",
  }).mount('form-checkout__expirationDate');
  const securityCodeElement = mp.fields.create('securityCode', {
    placeholder: "Código de seguridad"
  }).mount('form-checkout__securityCode');

  //tipos de identificación
  async function getIdentificationTypes() {
    try {
      const identificationTypes = await mp.getIdentificationTypes();
      const identificationTypeElement = (document.querySelector('#form-checkout__identificationType') as HTMLSelectElement);
      createSelectOptions(identificationTypeElement, identificationTypes);
    } catch (e) {
      return console.error('Error getting identificationTypes: ', e);
    }
  }

  function createSelectOptions(elem: HTMLSelectElement, options: any, labelsAndKeys = { label: "name", value: "id" }) {
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

  //metodos de pago

  let paymentMethodElement: HTMLInputElement;
  let issuerElement: HTMLSelectElement;
  let installmentsElement: HTMLSelectElement;
  const issuerPlaceholder = "Banco emisor";
  const installmentsPlaceholder = "Cuotas";

  let currentBin: any;
  cardNumberElement.on('binChange', async (data: any) => {
    const { bin } = data;
    paymentMethodElement = document.querySelector('#paymentMethodId') as HTMLInputElement;
    issuerElement = document.querySelector('#form-checkout__issuer') as HTMLSelectElement;
    installmentsElement = document.querySelector('#form-checkout__installments') as HTMLSelectElement;
    try {
      if (!bin && paymentMethodElement && paymentMethodElement.value) {
        clearSelectsAndSetPlaceholders();
        paymentMethodElement.value = "";
      }

      if (bin && bin !== currentBin && paymentMethodElement) {
        const { results } = await mp.getPaymentMethods({ bin });
        const paymentMethod = results[0];

        paymentMethodElement.value = paymentMethod.id;

        updatePCIFieldsSettings(paymentMethod);
        updateIssuer(paymentMethod, bin);
        updateInstallments(paymentMethod, bin);
      }

      currentBin = bin;
    } catch (e) {
      console.error('error getting payment methods: ', e)
    }
  });

  function clearSelectsAndSetPlaceholders() {
    clearHTMLSelectChildrenFrom(issuerElement);
    createSelectElementPlaceholder(issuerElement, issuerPlaceholder);

    clearHTMLSelectChildrenFrom(installmentsElement);
    createSelectElementPlaceholder(installmentsElement, installmentsPlaceholder);
  }

  function clearHTMLSelectChildrenFrom(element: any) {
    const currOptions = [...element.children];
    currOptions.forEach(child => child.remove());
  }

  function createSelectElementPlaceholder(element: any, placeholder: any) {
    const optionElement = document.createElement('option');
    optionElement.textContent = placeholder;
    optionElement.setAttribute('selected', "");
    optionElement.setAttribute('disabled', "");

    element.appendChild(optionElement);
  }

  // Este paso mejora las validaciones de cardNumber y securityCode
  function updatePCIFieldsSettings(paymentMethod: any) {
    const { settings } = paymentMethod;

    const cardNumberSettings = settings[0].card_number;
    cardNumberElement.update({
      settings: cardNumberSettings
    });

    const securityCodeSettings = settings[0].security_code;
    securityCodeElement.update({
      settings: securityCodeSettings
    });
  }

  async function updateIssuer(paymentMethod: any, bin: any) {
    const { additional_info_needed, issuer } = paymentMethod;
    let issuerOptions = [issuer];

    if (additional_info_needed.includes('issuer_id')) {
      issuerOptions = await getIssuers(paymentMethod, bin);
    }

    createSelectOptions(issuerElement, issuerOptions);
  }

  async function getIssuers(paymentMethod: any, bin: any) {
    try {
      const { id: paymentMethodId } = paymentMethod;
      return await mp.getIssuers({ paymentMethodId, bin });
    } catch (e) {
      console.error('error getting issuers: ', e)
    }
  };

  async function updateInstallments(paymentMethod: any, bin: any) {
    try {
      const installments = await mp.getInstallments({
        amount: (document.querySelector('#transactionAmount') as HTMLInputElement).value,
        bin,
        paymentTypeId: 'credit_card'
      });
      const installmentOptions = installments[0].payer_costs;
      const installmentOptionsKeys = { label: 'recommended_message', value: 'installments' };
      createSelectOptions(installmentsElement, installmentOptions, installmentOptionsKeys);
    } catch (error) {
      console.error('error getting installments: ', error)
    }
  }

  async function createCardToken() {
    try {
      const tokenElement = document.getElementById('token') as HTMLInputElement;
        const token = await mp.fields.createCardToken({
          cardholderName: (document.getElementById('form-checkout__cardholderName') as HTMLInputElement).value,
          identificationType: (document.getElementById('form-checkout__identificationType') as HTMLInputElement).value,
          identificationNumber: (document.getElementById('form-checkout__identificationNumber') as HTMLInputElement).value,
        });
        tokenElement.value = token.id;
        irapagar();
    } catch (e) {
      if(document.getElementById('error-tarjeta')){
        const diverror = (document.getElementById('error-tarjeta') as HTMLElement);
        diverror.style.display = "inline-grid";
        setTimeout(() => {
          diverror.style.display = "none";
        }, 5000);
      }
      console.error('error creating card token: ', e)
    }
  }

  function irapagar() {
    if (carritoglobal !== undefined) {
      const carritopagar = carritoglobal;
      if (carritopagar && carritopagar.error === 0 ) {
        const form = (document.querySelector('form.formpaymendcard') as HTMLFormElement);
        const data = new FormData(form);
        const infopago: any = {};
        infopago['tipopago'] = 1;
        infopago['token'] = data.get("token");
        infopago['installments'] = data.get("installments");
        infopago['paymentMethodId'] = data.get("paymentMethodId");
        infopago['issuer'] = data.get("issuer");
        infopago['identificationType'] = data.get("identificationType");
        infopago['identificationNumber'] = data.get("identificationNumber");
        infopago['email'] = data.get("email");
        console.log(infopago);
        pagarCompra(carritopagar,infopago).then(async (res:any) => {
          if(res.id && res.id  > 0 ){
            window.localStorage.removeItem("carrito");
            window.location.href = "/mypurchases/"+res.id; 
          } else if(res.error === 1){
            console.log("error");
            if(carritoglobal !== undefined ){
              try {
                const carrito = await validarCarrito(carritoglobal);
                updateCarrito(carrito);
                window.localStorage.setItem("carrito", JSON.stringify(carritoglobal));
              }catch(error) {
                console.log("Error al actualizar el carrito despues de un error en la creacion del token")   ;
                console.log(error);
                throw new Error("Error al actualizar el carrito despues de un error en la creacion del token");
              }
            } 
          } 
          
        });
      } else {
          console.log("no puede pagar");
      } 
    }
  }

  const subirform = (event: any) => {
    createCardToken();
    event.preventDefault();
  }



  useEffect(() => {
    getIdentificationTypes();
  }, []);
  
  return (
    <div className="">
      <h3>Tarjeta Credito o Debito</h3>
      <form id="form-checkout" onSubmit={(e) => subirform(e)} method="POST" className=" formpaymendcard w-full">
        <div className={"grid grid-cols-1  md:grid-cols-4 gap-4"}>
          <div className={'md:col-span-4'}>
            <h4>Detalles del comprador</h4>
          </div>
          <div className={'md:col-span-2'}>
            <div className={'form-group'}>
              <label htmlFor="">E-mail</label>
              <input required type="email" id="form-checkout__email" name="email" placeholder="" className={'input  input-bordered w-full input-sm'} />
            </div>
          </div>
          <div className={'md:col-span-2'}>
            <div className={'grid  grid-cols-1  md:grid-cols-3 gap-4'}>
              <div>
                <div className={'form-group'}>
                  <label htmlFor="">Tipo</label>
                  <select required id="form-checkout__identificationType" name="identificationType" className={'input input-sm  input-bordered w-full'} defaultValue={''}>

                  </select>
                </div>
              </div>
              <div className={'md:col-span-2'} >
                <div className={'form-group'}>
                  <label htmlFor="">Número de documento</label>
                  <input required className={'input input-sm  input-bordered w-full'} type="text" id="form-checkout__identificationNumber" name="identificationNumber" placeholder="" />
                </div>
              </div>
            </div>
          </div>
          <div className={'md:col-span-4'}>
            <h4>Detalles de la tarjeta</h4>
          </div>
          <div className={'md:col-span-4'}>
            <div className={'form-group'}>
              <label htmlFor="">Titular de la tarjeta</label>
              <input type="text" id="form-checkout__cardholderName" placeholder="" className={'input  input-bordered w-full input-sm'} />
            </div>
          </div>
          <div className={'md:col-span-2'}>
            <div className={'form-group'}>
              <label htmlFor="">Numero de tarjeta</label>
              <div id="form-checkout__cardNumber" className={'input  input-bordered w-full input-sm'}></div>
            </div>
          </div>
          <div >
            <div className={'form-group'}>
              <label htmlFor="">Vencimiento</label>
              <div id="form-checkout__expirationDate" className={'input  input-bordered w-full input-sm'}></div>
            </div>
          </div>
          <div >
            <div className={'form-group'}>
              <label htmlFor="">CVV</label>
              <div id="form-checkout__securityCode" className={'input  input-bordered w-full input-sm'}></div>
            </div>
          </div>
          <div className={'md:col-span-4'} id='error-tarjeta' style={{display:'none'}}>
            <div className="alert alert-error shadow-lg">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>La información de la tarjeta es requerida</span>
              </div>
            </div>
          </div>
          <div >
            <div className={'form-group'}>
              <label htmlFor="">Banco emisor</label>
              <select id="form-checkout__issuer" name="issuer" defaultValue={''} className={'input  input-bordered w-full input-sm'}>
                <option value="" disabled selected></option>
              </select>
            </div>
          </div>
          <div >
            <div className={'form-group'}>
              <label htmlFor="">No. de Cuotas</label>
              <select id="form-checkout__installments" name="installments" defaultValue={''} className={'input  input-bordered w-full input-sm'}>
                <option value="" disabled selected></option>
              </select>
            </div>
          </div>
          <div></div>
        </div>
        <input id="token" name="token" type="hidden" />
        <input id="paymentMethodId" name="paymentMethodId" type="hidden" />
        <input id="transactionAmount" name="transactionAmount" type="hidden" value={valorpagar} />
        <input id="description" name="description" type="hidden" value="venta de productos" />
        <div>
          <div className="text-right">
            <button type="submit" className=" btn btn-success">Pagar</button>
          </div>
        </div>
      </form>
    </div>
  )
}
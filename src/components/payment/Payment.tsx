import { useContext, useEffect, useState } from "react";
import { getMercadopagopublicKey } from "../../api/fetch-data";
import { Paymentcard } from "./Card";
import { Paymentpse } from "./Pse";
import { Paymentefecty } from "./Efecty";
import { useGlobalContext } from "../../context/Main";

declare global {
    interface Window {
        MercadoPago: any
    }
}

export const Paymentmeacadopago = () => {

    const [publickey, setPublickey] = useState(null);
    const [pseBank, setPseBank] = useState(null)
    const [mediopago, setMediopago] = useState(0)
    const {mainState} = useGlobalContext();
    const [carderror,setError] = useState(0);

    
    useEffect(() => {
        getMercadopagopublicKey().then((pk: any) => {
            setPseBank(pk.PSE_BANK);
            if (pk.PUBLIC_KEY) {
                setPublickey(pk.PUBLIC_KEY);
            }

        });
       
    }, [])
    useEffect(()=>{
        if(mainState.carrito){
            const carritopagar = mainState.carrito;
            if(carritopagar?.error === 1){
                setError(1);
            } else {
                setError(0);
            }
        }
    },[ mainState])

    if (publickey) {
        if(carderror === 0){
            return (
                <div className={"caja-carrito shadow-xl"}>
                   
                    <h2>Medio de pago</h2>
                    <div className="grid  grid-cols-1  md:grid-cols-3 gap-4">
                        <div>
                            <label htmlFor="tarjeta" className="label-mediopago">
                                <input type="radio" name='mediopago' id='tarjeta' value={1} onChange={() => setMediopago(1)} />
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                                    </svg>
                                    <span>Tarjeta débito o credito</span>
                                </div>
                            </label>
                        </div>
                        <div>
                            <label htmlFor="pse" className="label-mediopago">
                                <input type="radio" name='mediopago' id='pse' value={2} onChange={() => setMediopago(2)} />
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
                                    </svg>
                                    <span>Transferencia PSE</span>
                                </div>
                            </label>
                        </div>
                        <div>
                            <label htmlFor="efectivo" className="label-mediopago" style={{"display":"none"}}>
                                <input type="radio" name='mediopago' id='efectivo' value={3} onChange={() => setMediopago(3)} />
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                                    </svg>
                                    <span>Pago en efectivo con Efecty</span>
                                </div>
                            </label>
                        </div>
                    </div>
                    <div className={mediopago === 1 ? 'mediopago-box' : 'd-none'}>
                        <Paymentcard publickey={publickey} />
                    </div>
                    <div className={mediopago === 2 ? 'mediopago-box' : 'd-none'}>
                        <Paymentpse publickey={publickey} banks={pseBank} />
                    </div>
                    <div className={mediopago === 3 ? 'mediopago-box' : 'd-none'} >
                        <Paymentefecty publickey={publickey} />
                    </div>
                </div>
            )
        } else {
            return(
                <div className={"caja-carrito shadow-xl"}>
                    <h2>Medio de pago</h2>
                    <div>Valide la disponibilidad de los productos para poder realizar el pago</div>
                </div>
            )
        }
    } else {
        return (
            <div>Cargando  Medios de pago</div>
        )
    }


}
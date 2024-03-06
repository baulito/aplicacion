import React from 'react'
import { LayoutGeneral } from '../components/layout/General';
export const   PaymentMethods = () => {
    return (
        <LayoutGeneral>     
           <div className=" pl-5 pr-5 sm:container sm:mx-auto">
                <div className="shadow-xl caja-contenidos ">
                    <h1>¿Qué medios de pago puedo usar para pagar mis compras?</h1>
                    <div className="text-justify">
                        <div>Todas las compras se realizaran atravez de la paltaforma de mercadopago</div>
                        <p><strong><span style={{fontSize:'24px'}}>Tarjeta de crédito en hasta 48 cuotas</span></strong></p>
                        <p>Ingresas los datos de tu tarjeta de crédito al pagar y listo. La próxima vez que quieras utilizar esa tarjeta, solo te pediremos el código de seguridad.</p>
                        <p className="highlight-green"><em className="ch-icon-time">&nbsp;</em>Aprobación inmediata.</p>
                        <p className="highlight-green"><span  style={{fontWeight:'400'}}>Tarjetas aceptadas:</span></p>
                        <ul>
                            <li className="paymentmethod-visa paymentmethod-large">Visa</li>
                            <li className="paymentmethod-amex paymentmethod-large">American Express</li>
                            <li className="paymentmethod-master paymentmethod-large">Mastercard</li>
                            <li className="paymentmethod-diners paymentmethod-large">Diners</li>
                            <li className="paymentmethod-codensa paymentmethod-large">Codensa</li>
                        </ul>
                        <div className="ch-box-icon ch-box-info"><span className="ch-icon-info-sign">&nbsp;</span>El banco incluirá los intereses de las cuotas en el resumen de tu tarjeta.</div>
                        <p><strong><span style={{fontSize:'24px'}}>Tarjeta débito</span></strong></p>
                        <ul>
                            <li className="paymentmethod-master paymentmethod-large">Mastercard</li>
                            <li className="paymentmethod-visa paymentmethod-large">Visa</li>
                        </ul>
                        <p><strong><span style={{fontSize:'24px'}}>Servicio de pago en línea</span></strong></p>
                        <p>Al momento de pagar te diremos cómo hacerlo desde tu banco.</p>
                        <ul>
                            <li className="paymentmethod-pse paymentmethod-large">PSE - Desde tu banco en línea.</li>
                        </ul>
                        <p className="highlight-green"><em className="ch-icon-time">&nbsp;</em>Acreditación instantánea.</p>
                        <p><span className="highlight-green"><em className="ch-icon-ok">&nbsp;</em> Sin costo adicional.</span></p>
                        <p>&nbsp;</p>
                        <p><span className="highlight-green"><em>S</em>e acreditará apenas pagues.&nbsp;</span><span className="highlight-green">Sin costo adicional.</span></p>
                        <p><strong>No pagues un cupón enviado por un vendedor.&nbsp;</strong></p>
                        <p>&nbsp;</p>
                        <p><span style={{fontSize:'24px'}}><strong>Dinero en Mercado Pago</strong></span></p>
                        <p><span style={{fontWeight:'400'}}>Usa el dinero disponible de tu cuenta de Mercado Pago para pagar tus compras y obtén una aprobación inmediata sin costo adicional..</span></p>
                        <p>&nbsp;</p>
                    </div>
                </div>
            </div>
        </LayoutGeneral>
    );
 }
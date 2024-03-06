import React from 'react'
import { LayoutGeneral } from '../components/layout/General';
export const   Sell = () => {
    return (
        <LayoutGeneral>        
            <div className=" pl-5 pr-5 sm:container sm:mx-auto">
                <div className="shadow-xl caja-contenidos ">
                    <h1>VENDE TU ROPA</h1>
                    <div className={'descripcion'}>
                        Estamos felices de tu aporte al medio ambiente por el hecho de reciclar y reutilizar la ropa que ya no usas, por eso te invitamos a revisar tu closet, quizás tengas prendas que no utilices y estén dentro de las que si compramos o recibimos como parte de pago y puedas recibir dinero o flexibilizar tu compra.
                    </div>
                    <div className={'descripcion'}>
                        Temporalmente recibimos solo ropa sport de caballero, que se encuentre en buen estado, si tienes prendas de DAMA la puedes vender en nuestra tienda aliada Boutique internacional en la CALLE 66 12 13 Chapinero, Bogotá - Contacto: 3170210000.
                    </div>
                </div>
                <div className={"grid  grid-cols-1 lg:grid-cols-2 gap-5"}>
                    <div className="shadow-xl caja-contenidos ">
                        <h2>NO RECIBIMOS PRENDAS</h2>
                        <h3>Sucias, con manchas, motosas, muy desteñidas o rotas.</h3>
                        <div className={"grid  grid-cols-1 md:grid-cols-2 gap-5"}>
                            <div className={'border-right'}>
                                <h4>¿Qué recibimos?</h4>
                                <div>Calzado Sport y Zapatillas.</div>
                                <div>Chaquetas, Buzos de Capota, Camisas y Camisetas</div>
                                <div>Sudaderas Sport</div>
                                <div>Pantalones Jeans, Drill y Cargos</div>
                                <div>Botas de trabajo Punteras</div>
                                <div>Overoles Enterizos de Hombre</div>
                            </div>
                            <div>
                                <h4>¿Qué no recibimos?</h4>
                                <div>Ropa de Niño, de Bebé y Dama.</div>
                                <div>Vestidos de Paño, Sastre y Corbata.</div>
                                <div>Ropa de Oficina y Fiesta.</div>
                                <div>Dísfraces, Pijamas y Sombreros.</div>
                                <div>Tacones y Botas Largas.</div>
                                <div>Ropa de Colegios o con Marquillas de Empresas o de Equipos de Fútbol no reconocidos</div>
                            </div>
                        </div>
                        <h5>Trae tu ropa a la tienda sin compromiso</h5>
                    </div>
                    <div className="shadow-xl caja-contenidos ">
                        <h2>IMPORTANTE:</h2>
                        <ul>
                            <li>La ropa debe estar en perfecto estado.</li>
                            <li>La recibimos lavada, sin manchas.</li>
                            <li>Si tiene cremalleras, compruebe previamente que funcionan.</li>
                            <li>Sin motas.</li>
                            <li>Sin desgaste de color.</li>
                            <li>Sin ajustes de talla.</li>
                            <li>Sin rotos y descosidos.</li>
                        </ul>
                    </div>
                </div>
                <div className="shadow-xl caja-contenidos ">
                    <h2>TRAE TUS PRENDAS SIN NINGÚN COMPROMISO A</h2>
                    <div>Sede 1: Avenida Caracas #65a - 66 Local 1 - 2 <br></br>
                            Horario de compra: Lunes a viernes de 10:00 am a 06:00pm - Domingos y festivos 10:00 am a 04:00 pm 
                    </div>
                    <h5>Importante venir con disponibilidad de tiempo, se revisará prenda por prenda, y si hay más personas esperar el turno.</h5>
                </div>
                <div className="shadow-xl caja-contenidos ">
                    <h2>¿NO PUEDO LLEVAR LAS PRENDAS A LA TIENDA?</h2>
                    <h4>Para enviar tus prendas sigue los siguientes pasos:</h4>
                    <br />
                    <div className={'text-justify'}>
                    <div>1. Escribe en una hoja, FECHA, NOMBRE, NÚMERO DEL WHATSAPP O CELULAR Y CORREO ELECTRÓNICO, y número de prendas a enviar.</div>
                    <div>2. Tómale una foto a la hoja y graba un video de las prendas, luego envíalo al correo elbaulitodemrbean@gmail.com o al whatsapp 3182050000</div>
                    <div>3. Envuelve tus prendas lo más pequeño posible y coloca la hoja dentro de la bolsa.</div>
                    <div>4. Acércate a la empresa de envios mas cercana, preferiblemente (INTERRAPIDISIMO O ENVÍA) el costo del envío se asume por mitad; mitad el vendedor y mitad la tienda, que podrás enviar con pago contra entrega, y cuando se haga la negociación se le descontará la parte del costo del envio asumido.</div>
                    <div  className={'ml-10'}>
                        <h4>DATOS PARA EL ENVÍO:</h4>
                        <div><strong>Dirección:</strong> Av caracas # 65a 66 lc 1 y 2 Chapinero, Bogota D.C.</div>
                        <div><strong>A NOMBRE:</strong> JUAN CAMILO, TIENDA DE ROPA EL BAULITO </div>
                        <div><strong>CELULAR:</strong> 3182050000 - 3112964991</div>
                        <div><strong>CC/NIT: </strong> 1076666311</div>
                    </div>
                    <div>5. Envía la foto de la guía para rastrear al correo elbaulitodemrbean@gmail.com o al whatsapp 3182050000.</div>
                    <div>6. El día de la recepción de las prendas recibirá una llamada para hacer una negociación de las prendas y llegar a un acuerdo. </div>
                    <div>7. Le solicitaremos el número de la cuenta para transferir el dinero acordado y el soporte se enviará al correo electrónico  y whatsapp registrado.</div>
                    <div>8. En caso de no llegar a un acuerdo le pediremos los datos para enviar de nuevo tus prendas a tu domicilio, y el costo del envío lo asume el vendedor que se enviará con pago contra entrega. También podría pasar a recogerlas en la tienda.</div>
                    </div>
                </div>
            </div>
        </LayoutGeneral>
    );
 }
import React from 'react'
import { LayoutGeneral } from '../components/layout/General';
import { Sedes } from '../components/Sedes/Sedes';
export function ContactUs() {
    return (
        <LayoutGeneral>
            <div className=" pl-5 pr-5 sm:container sm:mx-auto">
                <div className="shadow-xl caja-contenidos ">
                    <h1>Contáctenos</h1>
                    <div className={'grid grid-cols-1 md:grid-cols-2 gap-5 mt-10'}>
                        <div>
                            <form className={'form-contacto'}>
                                <div>
                                    <label htmlFor="nombre">Nombre:</label>
                                    <input type="text" id="nombre" name="nombre" className="input input-bordered w-full  input-sm " required />
                                </div>
                                <div>
                                    <label htmlFor="email">Email:</label>
                                    <input type="email" id="email" name="email" className="input input-bordered w-full  input-sm " required />
                                </div>
                                <div>
                                    <label htmlFor="telefono">Teléfono:</label>
                                    <input type="number" id="telefono" name="telefono" className="input input-bordered w-full  input-sm " required />
                                </div>
                                <div>
                                    <label htmlFor="mensaje">Mensaje:</label>
                                    <textarea id="mensaje" name="mensaje" className="textarea textarea-bordered w-full " required></textarea>
                                </div>
                                <div className={'text-right'}>
                                    <input type="submit" className={'btn btn-success'} value="Enviar" />
                                </div>

                            </form>
                        </div>
                        <div>
                            <h4>Líneas de atención Whatsapp </h4>
                            <br />
                            <div>
                                <div>Asesor 1:  +57 3138080119</div>
                                <div>Asesor 2:  +57 3182050000</div>
                                <div>Administracion: +57 3112964991</div>
                            </div>
                            <br />
                            <h4>Correo de Contacto</h4>
                            <br />
                            <div>elbaulitodemrbean@gmail.com</div>
                        </div>
                    </div>
                </div>
                <Sedes />
            </div>
        </LayoutGeneral>
    );
}
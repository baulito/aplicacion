import React from 'react'
import Logo from "../elements/images/logo-blanco.png";
export const   Maintenance = () => {
    return (
        <div className='mantemiento'>
            <img src={Logo} alt="" />
            <div>
                Tienda en Mantenimiento <br />
                pronto volveremos
            </div>
        </div>
    );
 }
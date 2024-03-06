import { useContext } from 'react';
import { LayoutGeneral } from '../components/layout/General';
import { useGlobalContext } from '../context/Main';
import { Carritodetail } from '../components/cart/Carritodetail';

export const Cart = () => {
    const {mainState} = useGlobalContext();

    if(mainState.user && mainState.user?.user_id !== undefined && mainState.user?.user_id > 0){
        return(
            <LayoutGeneral>
                <div className="  pl-5 pr-5 sm:container sm:mx-auto">
                    <Carritodetail />
                </div>
            </LayoutGeneral>
        )
    } else {
        return(
            <LayoutGeneral>
                <div className={"text-center"}>
                    <div className={"sinlogin-compra shadow-xl"}>
                        <h3>Para poder realizar la compra debes de ingresar a tu cuenta</h3>
                        <div className={'grid grid-cols-2 gap-4'}>
                            <div>
                                <a href='/register' className={"btn btn-pricipal btn-block"}>Soy Nuevo</a>
                            </div>
                            <div>
                                <a href='/login' className={"btn btn-pricipal btn-block"}>Ya tengo una cuenta</a>
                            </div>
                        </div>

                    </div>
                </div>
                </LayoutGeneral>
        )
    }
}
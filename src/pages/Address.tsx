import { LayoutGeneral } from '../components/layout/General';
import { ButtonBar } from '../components/profile/ButtonBar';
import { useContext} from 'react';
import { useGlobalContext } from '../context/Main'; 
import { ListAddress } from '../components/address/ListAddress';
export const Address = () => {
    const {mainState} = useGlobalContext();
    if(mainState.user && mainState.user.user_id ){
        return (
            <LayoutGeneral>
                <div className={"pl-5 pr-5 sm:container sm:mx-auto mt-5 "}>
                    <div className={"grid md:grid-cols-4 items-start gap-5"}>
                        <div>
                            <ButtonBar />
                        </div>
                        <div className={"md:col-span-3"}>
                            <div className="shadow-xl caja-data ">
                                <h1>Direcciones de envío</h1>
                                <ListAddress />
                                <div className='datosconfidenciales'>Todos tus datos son confidenciales.</div>
                            </div>
                        </div>

                    </div>
                </div>
            </LayoutGeneral>
        );
    } else{
        return <div>Cargando</div>
    }
 }
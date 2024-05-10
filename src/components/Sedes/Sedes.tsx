import Sede1 from '../../elements/images/negocio1.jpg';
import Sede2 from '../../elements/images/negocio2.jpg';
import Sede3 from '../../elements/images/negocio3.jpg';
import Sede4 from '../../elements/images/negocio4.jpg';

import { useGlobalContext } from "../../context/Main";

export const Sedes = ()=>{
    const { mainState } = useGlobalContext();
    if(mainState.campuss && mainState.campuss?.length > 0){
        return(
            <div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10'}>
                { mainState.campuss?.map((cmp:any) => {
                    return(
                        <div className="card card-side bg-base-100 shadow-xl">
                            <figure ><img src={cmp.image_url} alt='' /></figure>
                            <div className="card-body ">
                                <div className={'ancho-card-sede'}>
                                    <h2>{cmp?.name}</h2> 
                                    <div className="text-justify" dangerouslySetInnerHTML={{__html:""+cmp.description}} />
                                </div>
                            </div>
                        </div>
                    )
                })}
                
            </div>
        )
    } else {
        return (<div></div>)
    }
}
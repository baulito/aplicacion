import { useContext} from 'react';
import { useGlobalContext } from '../../context/Main';
import fotoperfil from "../../elements/images/perfil.jpg";

export const ButtonBar = ()=>{
    const {mainState} = useGlobalContext();

    if(mainState.user){
        return(
            <div className={'botonera-perfil shadow-xl'}>
                <div className={'encabezado'}>
                    <div className='avatar'>
                        <div className="w-24 rounded-full">
                            <img src={mainState.user.user_foto && mainState.user.user_foto !== '' ? mainState.user.user_foto : fotoperfil} alt="" />
                        </div>
                    </div>
                    <h2>{mainState.user.user_names} {mainState.user.user_lastnames}</h2>
                </div>
                <ul>
                    <li><a href="/profile">Perfíl de usuario</a></li>
                    <li><a href="/address">Direcciones de Envío</a></li>
                    <li><a href="/mypurchases">Mis Compras</a></li>
                    <li style={{"display":'none'}}><a href="/favorites">Favoritos</a></li>
                </ul>
            </div>
        )
    } else {
        return <div>Cargando</div>;
    }
}
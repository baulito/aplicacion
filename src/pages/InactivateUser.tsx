import { useContext} from 'react';
import { useGlobalContext } from '../context/Main'; 
import { LayoutGeneral } from '../components/layout/General';
import { ButtonBar } from '../components/profile/ButtonBar';

export const InactivateUser = () => {
    const {mainState,loginUser} = useGlobalContext();
    const cambiodelete = ()=>{
        const value = (document.getElementById("delete") as HTMLInputElement).value ;
        if(value.toLowerCase() === 'borrar'){
            (document.getElementById("btn-borrar") as HTMLButtonElement).disabled = false;
        } else {
            (document.getElementById("btn-borrar") as HTMLButtonElement).disabled = true;
        }
    }
    const Submitform = (e:any)=>{
        e.preventDefault();
        const value = (document.getElementById("delete") as HTMLInputElement).value ;
        if(value.toLowerCase() === 'borrar'){
            loginUser({});
            window.localStorage.removeItem("myToken");
        }
    }
   
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
                                <div id='information-profile'>
                                    <h1>Desactivar Cuenta</h1>
                                    <div>Si haces esto, tu información ya no aparecerá disponible en nuestro sistema.</div>
                                    <div>Si está seguro, digite la palabra BORRAR.</div>
                                    <br />
                                    <form onSubmit={(e) => {Submitform(e)}}  >
                                        <input required type="text" placeholder='Borrar' className="input input-bordered w-full text-center " id="delete" name="delete" aria-describedby="emailHelp" onChangeCapture={cambiodelete} />
                                        <br/><br />
                                        <button type="submit" id='btn-borrar' className="btn btn-sm btn-success" disabled>
                                            <span>Confirmar</span>
                                        </button>
                                    </form>
                                </div>
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
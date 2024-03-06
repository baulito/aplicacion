import { useContext} from 'react';
import { useGlobalContext } from '../../context/Main';
import { updateUser } from '../../services/user/user.service';

export const EditProfile = ()=>{
    const {mainState,loginUser} = useGlobalContext();

    const Submitform = (e:any)=>{
        e.preventDefault();
        const form = (document.querySelector('#formperfil') as HTMLFormElement);
        const data = new FormData(form);
        const dataform = {
            document:data.get('document') as string,
            names:data.get('names') as string,
            lastnames:data.get('lastnames') as string,
            phone:data.get('phone') as string,
            city:data.get('city') as string,
            address:data.get('address') as string 
        };
        updateUser(dataform).then((user)=>{
            if(user.user_id){
                loginUser(user);
                (document.getElementById("information-profile") as HTMLElement).style.display = "block";
                (document.getElementById("edit-profile") as HTMLElement).style.display = "none";
                document.getElementById("alert-success-data")!.innerHTML = 'Se han actualizado tus datos';
                    document.getElementById("alert-success")!.style.display = "block";
                    setTimeout(()=>{document.getElementById("alert-success")!.style.display = "none";},6000);
            }
        })
    }
    const cancelarclick = ()=>{
        (document.getElementById("information-profile") as HTMLElement).style.display = "block";
        (document.getElementById("edit-profile") as HTMLElement).style.display = "none";
    }
    if(mainState.user){
        return(
            <div>
                <form id='formperfil'  onSubmit={(e)=>Submitform(e)} className='form-edit-perfil'>
                    <div className='grid md:grid-cols-2 gap-5'>
                        <div className='md:col-span-2'>
                            <h2>Datos personales</h2>
                        </div>
                        <div >
                            <label htmlFor="">Nombres</label>
                            <input type="text" name='names' className="input input-bordered input-sm w-full " defaultValue={mainState.user.user_names} />
                        </div>
                        <div >
                            <label htmlFor="">Apellidos</label>
                            <input type="text" name='lastnames' className="input input-bordered input-sm w-full " defaultValue={mainState.user.user_lastnames} />
                        </div>
                        <div >
                            <label htmlFor="">No. Documento</label>
                            <input type="text" name='document' className="input input-bordered input-sm w-full " defaultValue={mainState.user.user_idnumber} />
                        </div>
                        <div >
                            <label htmlFor="">Telefono</label>
                            <input type="text" name='phone' className="input input-bordered input-sm w-full " defaultValue={mainState.user.user_phone} />
                        </div>
                        <div >
                            <label htmlFor="">Correo</label>
                            <input type="text" name='email' disabled className="input input-bordered input-sm w-full " defaultValue={mainState.user.user_email} />
                        </div>
                        <div >
                            <label htmlFor="">Ciudad</label>
                            <input type="text" name='city' className="input input-bordered input-sm w-full " defaultValue={mainState.user.user_city} />
                        </div>
                        <div className='md:col-span-2' >
                            <label htmlFor="">Dirección</label>
                            <input type="text" name='address' className="input input-bordered input-sm w-full " defaultValue={mainState.user.user_address} />
                        </div>
                        <div className='md:col-span-2 text-right' >
                            <button type='submit' className='btn btn-sm btn-success'>Guardar</button>
                            <button type='button' onClick={()=>{cancelarclick()}} className='btn btn-sm btn-warning'>Cancelar</button>
                           
                        </div>
                    </div>
                </form>
            </div>
        )
    } else {
        return(<div></div>)
    }
}
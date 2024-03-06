import { useState } from "react"
import { codeChangePassword, restorePassword } from "../../services/user/user.service";


export const OldPassword = () =>{
    const [formulario, setFormulario] = useState({numero:0,email:''});

    const viewPassword =()=>{
        if(document.getElementById("password")!.getAttribute('type') === 'password' ){
            document.getElementById("password")!.setAttribute('type','text');
            document.getElementById("repassword")!.setAttribute('type','text');
        } else {
            document.getElementById("password")!.setAttribute('type','password');
            document.getElementById("repassword")!.setAttribute('type','password');
        }
    }

    const Submitform = (e:any)=>{
        e.preventDefault();
        const form = ( document.getElementById('form-email') as HTMLFormElement);
        const data = new FormData(form);
        restorePassword({email:data.get('email') as string}).then((res)=>{
            if(parseInt(res.status) !== 1){
                document.getElementById("alerta")!.innerHTML = 'Correo no encontrado';
                document.getElementById("alert-form")!.style.display = "block";
                setTimeout(()=>{document.getElementById("alert-form")!.style.display = "none";},6000);
            } else {
                setFormulario({numero:1,email:""+data.get('email')})
            }   
        });
        return false;
    }

    const Resendcode =()=>{
        const miemail = (document.getElementById("emailcode") as HTMLInputElement).value;
        restorePassword({email:miemail as string}).then((res)=>{
            console.log(res);
        });
        return false;
    }
    const Submitformcode =(e:any)=>{
        e.preventDefault();
        const form = ( document.getElementById('form-change') as HTMLFormElement);
        const data = new FormData(form);
        if(data.get('password') === data.get('repassword')){
            codeChangePassword({email:data.get('emailcode'),code:data.get('code'),password:data.get('password')}).then((res)=>{
                if( parseInt(res.status) === 1 ){
                    setFormulario({numero:2,email:""+data.get('emailcode')})
                } else {
                    document.getElementById("alerta")!.innerHTML = res.message;
                    document.getElementById("alert-form")!.style.display = "block";
                    setTimeout(()=>{document.getElementById("alert-form")!.style.display = "none";},6000);
                }
            });
        } else {
            document.getElementById("alerta")!.innerHTML = 'Las dos contraseñas deben ser iguales ';
            document.getElementById("alert-form")!.style.display = "block";
            setTimeout(()=>{document.getElementById("alert-form")!.style.display = "none";},6000);
        }
        return false;
    }

    return(
        <div className="caja-login p-6 rounded-lg shadow-lg bg-white max-w-sm">
            
        {
            formulario.numero === 0 ?
            <>
                <h1>Olvidaste tu contraseña:</h1>
                <div>Por favor ingrese su dirección de correo electrónico.</div>
                <form onSubmit={(e)=>Submitform(e)} id='form-email' >
                    <div className="form-group mb-6">
                        <label htmlFor="email" >Correo</label>
                        <input required type="email" className="input input-bordered w-full " id="email" name="email" aria-describedby="emailHelp" />
                    </div>
                    <button type="submit" className="btn btn-sm btn-success">
                        <span className="mr-5">Recuperar Contraseña</span>
                    </button>
                </form>
            </>
            :
                formulario.numero === 1 ?
                <>
                    <h1>Codigo de verificación</h1>
                    <div>Se ha enviado un codigo a tu correo para poder cambiar la contraseña</div>
                    <form onSubmit={(e)=>Submitformcode(e)} id='form-change' >
                        <input type="hidden" name='emailcode' id='emailcode' value={formulario.email} />
                        <div className="form-group mb-6">
                            <label htmlFor="code" >Codigo</label>
                            <input required type="text" className="input input-bordered w-full " id="code" name="code"/>
                            <div className={'link-form-right'}><span onClick={()=>Resendcode()}>Reenviar Codigo</span></div>
                        </div>
                        
                        
                        <div className="form-group">
                            <label htmlFor="password" >Contraseña</label>
                            <div className="input-group mb-6">
                            <input type="password" className="input input-bordered  w-full" id='password' name="password" autoComplete={'new-password'} />
                            <button className="btn btn-outline" type='button' onClick={viewPassword}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                                <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clipRule="evenodd" />
                                </svg>
                            </button>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" >Repetir contraseña</label>
                            <div className="input-group mb-6">
                            <input type="password" className="input input-bordered  w-full" id='repassword' name="repassword" />
                            <button className="btn btn-outline" type='button' onClick={viewPassword}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                                <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clipRule="evenodd" />
                                </svg>
                            </button>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-sm btn-success">
                            <span className="mr-5">Cambiar Contraseña</span>
                        </button>
                    </form>
                    
                </>
                :
                <>
                    <h1>Tu contraseña ha sido cambiada correctamente</h1>
                    <div>Ya puedes ingresar con tu nueva contraseña</div>
                    <div className={'text-center'}>
                        <a href="/login" className="btn btn-outline">Iniciar sesión</a>
                    </div>
                </>
            
        }
         <div className="alert alert-error shadow-lg mt-5" style={{display:'none'}}   id="alert-form">
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span id='alerta'></span>
            </div>
        </div>
    </div>    
    )
}
import { loginService } from "./services/login.service";
import { LoginResponse, ErrorLoginResponse, SuccessLoginResponse } from './model/auth.model';
import { useState } from "react";
import { toast } from "react-toastify";
import { useGlobalContext } from "context/Main";

export const Loginform = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { setLoading } = useGlobalContext();

  const viewPassword = () => {
    setPasswordVisible(!passwordVisible);
  };
  const submitForm = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const form  = new FormData(e.target as HTMLFormElement);
    try {
      const loginResult: LoginResponse = await loginService({
        email: form.get("email") as string,
        password: form.get("password") as string,
      });  
      if(loginResult && (((loginResult as ErrorLoginResponse)?.error) 
                     || (loginResult as ErrorLoginResponse)?.message)) {
        let msg = '';
        if((loginResult as ErrorLoginResponse)?.error) {
          msg =(loginResult as ErrorLoginResponse)?.error ?? '';
        } else {
          msg =(loginResult as ErrorLoginResponse)?.message ?? '';
        } 
        setLoading(false);
        toast.error(msg, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          theme: "colored",
        });
      } else {
        const token = (loginResult as SuccessLoginResponse).access_token;
        window.localStorage.setItem("myToken", token);
        toast.success('Autenticación Exitosa!', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          theme: "colored",
        });
        setTimeout(()=>{
          setLoading(false);
          const prevUrl = document.referrer;
          if (prevUrl.indexOf(window.location.host) !== -1) {
            if ("referrer" in document) {
              window.location.href = document.referrer;
            } else {
              window.location.href = "/";
            }
          } else {
            window.location.href = "/";
          }
        },1000);
        
      }
    } catch (error) {
      setLoading(false);
      toast.error('Error Desconocido', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        theme: "colored",
      });
    }
    return false;
  };
  return (
    <div className="caja-login p-6 rounded-lg shadow-lg bg-white max-w-sm">
      <h1>Iniciar sesión:</h1>
      <form
        onSubmit={(e) => {
          submitForm(e);
        }}
      > 
        <div className="form-group mb-6">
          <label htmlFor="email">Correo</label>
          <input
            required
            type="email"
            className="input input-bordered w-full "
            id="email"
            name="email"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <div className="input-group mb-6">
            <input
              type={passwordVisible ? "text" : "password"}
              className="input input-bordered  w-full"
              id="password"
              name="password"
            />
            <button
              className="btn btn-outline"
              type="button"
              onClick={viewPassword}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                <path
                  fillRule="evenodd"
                  d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center mb-6">
          <div className="form-group form-check">
            <input
              type="checkbox"
              id="exampleCheck2"
              className="checkbox checkbox-sm"
            />
            <label className="label-check" htmlFor="exampleCheck2">
              Recordarme
            </label>
          </div>
          <a href="/forgotpassword">Olvidé mi contraseña</a>
        </div>
        <button type="submit" className="btn btn-sm btn-success">
          <span className="mr-5">Entrar</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
            />
          </svg>
        </button>
        <hr className="mt-5 mb-5" />
        <div className="text-center">
          ¡No me he registrado, quiero una cuenta
        </div>
        <a href="/register">REGISTRARSE</a>
      </form>
    </div>
  );
};

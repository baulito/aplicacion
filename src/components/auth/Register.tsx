import { useState } from "react";
import { registerService } from "./services/register.service";
import { useGlobalContext } from "context/Main";

export const Registerform = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [rePasswordVisible, setRepasswordVisible] = useState(false);
  const { setLoading } = useGlobalContext();
  // Let's view the entered password
  const viewPassword = (isConfirm:boolean = false) => {
    if(isConfirm)  setRepasswordVisible(!rePasswordVisible);
    else setPasswordVisible(!passwordVisible);
  };

  let enviando = 0;

  const submitForm = (e: any) => {
    e.preventDefault();
    if (enviando === 0) {
      setLoading(true);
      enviando = 1;
      const form = new FormData(e.target as HTMLFormElement);
      if ( form.get("password") && form.get("repassword") && form.get("password") === form.get("repassword") ) {
        console.log(form);
        const dataForm = {
          email: form.get("email") as string,
          password: form.get("password") as string,
          names: form.get("names") as string,
          lastnames: form.get("lastnames") as string,
          phone: form.get("phone") as string
        };
        const loginres = registerService(dataForm);
        loginres.then((res) => {
          console.log(res);
          if (res.error) {
            setLoading(false);
            enviando = 0;
            document.getElementById("alerta")!.innerHTML = res.message;
            document.getElementById("alert-form")!.style.display = "block";
            setTimeout(() => {
              document.getElementById("alert-form")!.style.display = "none";
            }, 6000);
          } else {
            const token = res.access_token;
            window.localStorage.setItem("myToken", token);
             const prevUrl = document.referrer;
           if (prevUrl.indexOf(window.location.host) !== -1) {
              // Ir a la página anterior
              window.setTimeout(() => {
                if ("referrer" in document) {
                  window.location.href = document.referrer;
                } else {
                  window.history.back();
                }
              }, 2000);
            } else {
              window.setTimeout(() => {
                window.location.href = "/";
              }, 2000);
            }
          }
        });
      } else {
        document.getElementById("alerta")!.innerHTML =
          "Las dos contraseñas deben ser iguales ";
        document.getElementById("alert-form")!.style.display = "block";
        setTimeout(() => {
          document.getElementById("alert-form")!.style.display = "none";
        }, 6000);
      }
    }
    return false;
  };

  return (
    <div className="caja-registro p-6 rounded-lg shadow-lg bg-white max-w-sm">
      <h1>Registrate:</h1>
      <br />
      <form onSubmit={(e) => submitForm(e)}>
        <div className={"grid grid-cols-1 md:grid-cols-2 gap-6"}>
          <div className="form-group ">
            <label htmlFor="names">Nombres</label>
            <input
              required
              type="text"
              className="input input-bordered w-full "
              id="names"
              name="names"
            />
          </div>
          <div className="form-group ">
            <label htmlFor="lastnames">Apellidos</label>
            <input
              required
              type="text"
              className="input input-bordered w-full "
              id="lastnames"
              name="lastnames"
            />
          </div>
          
        </div>
        <div className="form-group mb-6 mt-6">
            <label htmlFor="phone">Telefono</label>
            <input
              required
              type="number"
              className="input input-bordered w-full "
              id="phone"
              name="phone"
            />
        </div>
        <div className="form-group mb-6">
          <label htmlFor="email">Correo</label>
          <input
            required
            type="email"
            className="input input-bordered w-full "
            id="email"
            name="email"
          />
        </div>
        <div className={"grid grid-cols-1 md:grid-cols-2 gap-6"}>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <div className="input-group mb-6">
              <input
                type={passwordVisible ? "text" : "password"}
                className="input input-bordered  w-full"
                id="password"
                name="password"
                autoComplete={"new-password"}
              />
              <button
                className="btn btn-outline"
                type="button"
                onClick={()=>viewPassword()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                  <path
                    fill-rule="evenodd"
                    d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="password">Repetir contraseña</label>
            <div className="input-group mb-6">
              <input
                type={rePasswordVisible ? "text" : "password"}
                className="input input-bordered  w-full"
                id="repassword"
                name="repassword"
              />
              <button
                className="btn btn-outline"
                type="button"
                onClick={()=>viewPassword(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                  <path
                    fill-rule="evenodd"
                    d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="form-group form-check mb-6">
          <input
            type="checkbox"
            id="exampleCheck2"
            required
            className="checkbox checkbox-sm"
          />
          <label className="label-check" htmlFor="exampleCheck2">
            Acepto Términos y condiciones
          </label>
        </div>

        <button type="submit" className="btn btn-sm btn-success">
          <span className="mr-5">Registro</span>
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
        <div
          className="alert alert-error shadow-lg mt-5"
          style={{ display: "none" }}
          id="alert-form"
        >
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current flex-shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span id="alerta"></span>
          </div>
        </div>
        <hr className="mt-5 mb-5" />
        <div className="text-center">Ya tengo una cuenta</div>
        <a href="/login">INGRESA</a>
      </form>
    </div>
  );
};

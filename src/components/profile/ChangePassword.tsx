import { useContext } from "react";
import { useGlobalContext } from "../../context/Main";
import { updatePassword } from "../../services/user/user.service";

export const ChangePassword = () => {
  const { mainState } = useGlobalContext();
  const viewPassword = () => {
    if (
      document.getElementById("password")!.getAttribute("type") === "password"
    ) {
      document.getElementById("currentpassword")!.setAttribute("type", "text");
      document.getElementById("password")!.setAttribute("type", "text");
      document.getElementById("repassword")!.setAttribute("type", "text");
    } else {
      document
        .getElementById("currentpassword")!
        .setAttribute("type", "password");
      document.getElementById("password")!.setAttribute("type", "password");
      document.getElementById("repassword")!.setAttribute("type", "password");
    }
  };
  const submitForm = (e: any) => {
    e.preventDefault();
    const form = document.querySelector("#formpassword") as HTMLFormElement;
    const data = new FormData(form);
    if (data.get("password") === data.get("repassword")) {
      const dataform = {
        password: data.get("password") as string,
        currentpassword: data.get("currentpassword") as string,
      };
      updatePassword(dataform).then((res) => {
        if (res.status === 1) {
          (
            document.getElementById("information-profile") as HTMLElement
          ).style.display = "block";
          (
            document.getElementById("edit-password") as HTMLElement
          ).style.display = "none";
          document.getElementById("alert-success-data")!.innerHTML =
            "Se ha actualizado la contraseña";
          document.getElementById("alert-success")!.style.display = "block";
          setTimeout(() => {
            document.getElementById("alert-success")!.style.display = "none";
          }, 6000);
        } else {
          document.getElementById("alerta")!.innerHTML = res.message;
          document.getElementById("alert-form")!.style.display = "block";
          setTimeout(() => {
            document.getElementById("alert-form")!.style.display = "none";
          }, 6000);
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
  };
  const cancelarclick = () => {
    (
      document.getElementById("information-profile") as HTMLElement
    ).style.display = "block";
    (document.getElementById("edit-password") as HTMLElement).style.display =
      "none";
  };
  if (mainState.user) {
    return (
      <div>
        <form
          id="formpassword"
          onSubmit={(e) => submitForm(e)}
          className="form-edit-perfil"
        >
          <div>
            <div>
              <h2>Cambiar contraseña</h2>
            </div>
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
            <div className="form-group">
              <label htmlFor="currentpassword">Contraseña Actual</label>
              <div className="input-group mb-6">
                <input
                  type="password"
                  className="input input-bordered  w-full"
                  id="currentpassword"
                  name="currentpassword"
                  autoComplete={"new-password"}
                  required
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
            <div className={"grid grid-cols-1 md:grid-cols-2 gap-6"}>
              <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <div className="input-group mb-6">
                  <input
                    type="password"
                    className="input input-bordered  w-full"
                    id="password"
                    name="password"
                    autoComplete={"new-password"}
                    required
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
              <div className="form-group">
                <label htmlFor="password">Repetir contraseña</label>
                <div className="input-group mb-6">
                  <input
                    type="password"
                    className="input input-bordered  w-full"
                    id="repassword"
                    name="repassword"
                    required
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
            </div>

            <div className="md:col-span-2 text-right">
              <button type="submit" className="btn btn-sm btn-success">
                Cambiar
              </button>
              <button
                type="button"
                onClick={() => {
                  cancelarclick();
                }}
                className="btn btn-sm btn-warning"
              >
                Cancelar
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  } else {
    return <div></div>;
  }
};

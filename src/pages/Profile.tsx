import { LayoutGeneral } from "../components/layout/General";
import { ButtonBar } from "../components/profile/ButtonBar";
import { useContext } from "react";
import { useGlobalContext } from "../context/Main";
import { EditProfile } from "../components/profile/EditProfile";
import { ChangePassword } from '../components/profile/ChangePassword';

export const Profile = () => {
  const { mainState } = useGlobalContext();
  const editarprofile = () => {
    (
      document.getElementById("information-profile") as HTMLElement
    ).style.display = "none";
    (document.getElementById("edit-profile") as HTMLElement).style.display =
      "block";
  };
  const editarpass = () => {
    (
      document.getElementById("information-profile") as HTMLElement
    ).style.display = "none";
    (document.getElementById("edit-password") as HTMLElement).style.display =
      "block";
  };
  if (mainState.user && mainState.user.user_id) {
    return (
      <LayoutGeneral>
        <div className={"pl-5 pr-5 sm:container sm:mx-auto mt-5 "}>
          <div className={"grid md:grid-cols-4 items-start gap-5"}>
            <div>
              <ButtonBar />
            </div>
            <div className={"md:col-span-3"}>
              <div className="shadow-xl caja-data ">
                <div id="information-profile">
                  <h1>Perfíl de usuario</h1>
                  <div
                    className="alert alert-success shadow-lg mt-5"
                    style={{ display: "none" }}
                    id="alert-success"
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
                      <span id="alert-success-data"></span>
                    </div>
                  </div>
                  <h2>Datos personales</h2>
                  <div className="text-right">
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() => editarprofile()}
                    >
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
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className={"grid md:grid-cols-2 text-left"}>
                    <div>
                      <strong>Nombres:</strong> {mainState.user.user_names}
                    </div>
                    <div>
                      <strong>Apellidos:</strong>{" "}
                      {mainState.user.user_lastnames}
                    </div>
                    <div>
                      <strong>No Documento:</strong>{" "}
                      {mainState.user.user_idnumber}
                    </div>
                    <div>
                      <strong>Teléfono:</strong> {mainState.user.user_phone}
                    </div>
                    <div>
                      <strong>Correo:</strong> {mainState.user.user_email}
                    </div>
                    <div>
                      <strong>Ciudad:</strong>{" "}
                      <span
                        dangerouslySetInnerHTML={{
                          __html: "" + mainState.user.user_city,
                        }}
                      ></span>
                    </div>
                    <div>
                      <strong>Dirección:</strong> {mainState.user.user_address}
                    </div>
                  </div>
                  <h2>Seguridad</h2>
                  <div className={"grid md:grid-cols-2 text-left"}>
                    <div>
                      <strong>Usuario:</strong> {mainState.user.user_email}
                    </div>
                    <div>
                      <a
                        onClick={() => editarpass()}
                        className="btn btn-success btn-xs"
                      >
                        Cambiar Contraseña
                      </a>
                    </div>
                  </div>
                  <br />
                  <div className="text-right">
                    <a
                      href="/inactivateuser"
                      className="btn  btn-xs btn-warning"
                    >
                      Desactivar cuenta
                    </a>
                  </div>
                  <div className="datosconfidenciales">
                    Todos tus datos son confidenciales.
                  </div>
                </div>
                <div id="edit-profile" style={{ display: "none" }}>
                  <EditProfile />
                </div>
                <div id="edit-password" style={{ display: "none" }}>
                  <ChangePassword />
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutGeneral>
    );
  } else {
    return <div>Cargando</div>;
  }
};

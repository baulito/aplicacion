import "./Footer.css";
import Logo from "../../elements/images/logo-blanco.png";

export const Footer = () => {
  return (
    <>
      <footer className="bg-neutral-900 text-center text-white  mt-20">
        <div className="container  mx-auto pt-10">
          <div className={"grid grid-cols-1 md:grid-cols-3 gap-5"}>
            <div>
              <ul>
                <li>
                  <a href="/vendeturopa">Vende tu ropa</a>
                </li>
                <li>
                  <a href="/nosotros">¿Quíenes somos?</a>
                </li>
                <li>
                  <a href="/ayuda">Ayuda</a>
                </li>
                <li>
                  <a href="/contactenos">Contáctenos</a>
                </li>
                <li>
                  <a href="/mediosdepago">Medios de pago</a>
                </li>
                <li>
                  <a href="/terminosycondiciones">Terminos y condiciones</a>
                </li>
              </ul>
            </div>
            <div>
              <h4>Líneas de atención Whatsapp </h4>
              <div>
                <div>Asesor 1: +57 3138080119</div>
                <div>Asesor 2: +57 3182050000</div>
                <div>Administracion: +57 3112964991</div>
              </div>
            </div>
            <div className={"text-center"}>
              <img src={Logo} alt="logo" className={"logo-footer"} />
              <h4>Siguenos </h4>
              <div className="redes">
                <a
                  href="https://www.facebook.com/ventaderopausadachapinero?mibextid=ZbWKwL"
                  target={"_blank"}
                  rel="nofollow noopener noreferrer"
                >
                  <svg
                    className="h-5 w-5"
                    fill="#FFF"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                </a>
                <a
                  href="https://instagram.com/ventaropausadaelbaulito?igshid=YmMyMTA2M2Y="
                  target={"_blank"}
                  rel="nofollow noopener noreferrer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="#FFF"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
                  </svg>
                </a>
                <a
                  href="https://www.youtube.com/@tiendadeventaderopausadael9443"
                  target={"_blank"}
                  rel="nofollow noopener noreferrer"
                >
                  <svg
                    className="h-5 w-5"
                    fill="#FFF"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                  </svg>
                </a>
                <a
                  href="https://www.tiktok.com/@ventaropausadaelbaulito?_t=8b56opne7jK&_r=1"
                  target={"_blank"}
                  rel="nofollow noopener noreferrer"
                >
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 448 512"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"
                      fill="#FFF"
                    />
                  </svg>
                </a>
                <a
                  href="https://kwai-video.com/u/@Tienda-de-ropa-usada/CgjbhW4c"
                  target={"_blank"}
                  rel="nofollow noopener noreferrer"
                >
                  <svg
                    className={"h-5 w-5"}
                    viewBox="0 0 666.66669 666.66669"
                    id="svg2"
                    version="1.1"
                  >
                    <defs id="defs6">
                      <clipPath id="clipPath18" clipPathUnits="userSpaceOnUse">
                        <path id="path16" d="M 0,500 H 500 V 0 H 0 Z" />
                      </clipPath>
                    </defs>
                    <g
                      transform="matrix(1.3333333,0,0,-1.3333333,0,666.66667)"
                      id="g10"
                    >
                      <g id="g12">
                        <g clipPath="url(#clipPath18)" id="g14">
                          <g transform="translate(374.874,388.022)" id="g20">
                            <path
                              id="path22"
                              style={{
                                fill: "#FFF",
                                fillOpacity: 1,
                                fillRule: "nonzero",
                                stroke: "none",
                              }}
                              d="m 0,0 c -19.687,-8.096 -29.157,-31.876 -25.871,-52.011 2.658,-18.821 19.029,-37.194 39.344,-34.624 27.275,3.704 41.496,36.446 32.772,60.853 C 41.077,-6.722 19.567,8.873 0,0 m -170.253,41.914 c -46.306,-15.087 -57.419,-83.439 -22.854,-115.763 15.504,-15.117 40.838,-18.702 59.539,-7.379 32.832,18.671 43.019,65.723 23.661,97.509 -11.472,20.554 -37.373,33.011 -60.346,25.633 m -11.98,58.374 h 13.802 c 49.143,-3.316 90.25,-43.199 100.676,-90.4 11.083,13.892 25.752,25.304 42.93,30.502 26.408,8.693 57.149,1.135 76.776,-18.462 32.892,-30.383 38.03,-86.875 9.351,-121.708 -15.864,-19.538 -40.928,-29.516 -65.604,-30.95 -56.761,-3.764 -113.522,-7.737 -170.313,-11.203 -36.507,-1.403 -71.459,18.851 -91.983,48.456 -32.145,45.17 -30.293,111.969 6.363,154.032 19.299,23.063 47.978,37.791 78.002,39.733"
                            />
                          </g>
                          <g transform="translate(220.9917,227.1191)" id="g24">
                            <path
                              id="path26"
                              style={{
                                fill: "#FFF",
                                fillOpacity: 1,
                                fillRule: "nonzero",
                                stroke: "none",
                              }}
                              d="m 0,0 c 39.016,4.183 78.121,7.229 117.167,11.173 29.724,3.943 59.808,-0.568 89.144,-5.078 16.61,-6.603 12.488,-27.246 12.787,-41.407 -23.84,-6.363 -48.396,-9.739 -72.565,-14.698 -10.815,-2.33 -25.452,-2.24 -29.725,-14.787 -3.137,-17.597 -0.686,-35.7 -1.493,-53.505 -1.076,-8.216 3.465,-18.672 13.204,-17.746 12.637,1.644 25.243,4.123 37.283,8.365 -0.03,5.557 -0.059,11.144 -0.12,16.701 -10.456,-1.763 -20.583,-5.737 -31.307,-5.587 0.597,14.25 -1.106,28.619 0.925,42.75 27.366,7.528 55.806,11.203 83.618,17.208 0.449,-25.453 0.359,-50.936 0.12,-76.389 0.298,-13.832 -11.86,-24.378 -24.586,-26.947 -33.4,-7.677 -66.859,-15.236 -100.258,-22.913 -15.027,-3.616 -30.831,-7.738 -46.216,-3.555 -11.023,3.196 -21.599,7.737 -32.115,12.248 9.052,12.278 18.403,24.378 27.275,36.805 5.647,7.23 3.526,16.849 3.944,25.303 -0.658,12.219 3.046,26.917 -7.111,36.328 C 20.494,-56.074 1.314,-36.118 -18.164,-16.49 -14.549,-8.992 -9.112,-0.776 0,0"
                            />
                          </g>
                          <g transform="translate(80.4331,183.8018)" id="g28">
                            <path
                              id="path30"
                              style={{
                                fill: "#FFF",
                                fillOpacity: 1,
                                fillRule: "nonzero",
                                stroke: "none",
                              }}
                              d="m 0,0 c -2.091,-4.69 -4.033,-9.59 -4.033,-14.818 -1.703,-26.767 -1.464,-53.654 0.717,-80.392 0.478,-6.393 2.271,-13.443 8.484,-16.64 20.554,-11.023 43.945,-15.953 66.889,-19 6.871,-1.941 12.099,4.601 11.77,10.905 2.599,31.726 3.496,63.781 -0.358,95.448 -0.568,7.887 -8.604,11.472 -15.206,13.443 C 46.036,-4.811 23.153,-0.18 0,0 m -30.113,18.791 c 3.466,11.771 15.684,18.88 27.634,17.954 26.08,-1.673 51.771,-7.08 77.374,-12.188 11.621,-2.361 24.049,-4.811 32.951,-13.325 17.118,-15.594 32.742,-32.742 49.771,-48.396 5.377,-5.467 13.175,-10.694 12.368,-19.418 -0.359,-11.083 2.987,-24.139 -5.109,-33.28 -18.91,-23.959 -37.343,-48.307 -56.223,-72.296 -8.276,-11.501 -24.079,-11.083 -36.477,-8.334 -19.717,4.421 -39.195,10.067 -58.225,16.879 -16.819,6.064 -36.835,12.636 -43.676,31.039 -5.855,18.701 -4.302,38.717 -5.616,58.046 v 30.59 c 1.225,17.596 0.149,35.701 5.228,52.729"
                            />
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <hr />
          <h4>Nuestras Sedes</h4>
          <div className={"grid grid-cols-1 md:grid-cols-2 gap-5"}>
            <div className={"box-sede"}>
              <div>
                <strong>Sede 1:</strong>Avenida Caracas #65a - 66 Local 1 - 2
                Chapinero, Bogota
              </div>
              <div>
                <strong>Horario:</strong> Lunes a sábado de 10:00am a 6:30pm -
                Domingos y festivos: 10:30 a 4:00pm
              </div>
            </div>
            <div className={"box-sede"}>
              <div>
                <strong>Sede 2:</strong> Calle 66 #13 - 45 Local 5 Chapinero,
                Bogotá
              </div>
              <div>
                <strong>Horario:</strong> Lunes a sábado de 10:00am a 6:30pm -
                Domingos y festivos: 10:30 a 4:00pm
              </div>
            </div>
            <div className={"box-sede"}>
              <div>
                <strong>Sede 3:</strong> Ubaté Cundinamarca
              </div>
              <div>
                <strong>Horario:</strong> Lunes a domingo de 10:00am a 7:00pm
              </div>
            </div>
            <div className={"box-sede"}>
              <div>
                <strong>Sede aliada Boutique Internacional:</strong>Calle 66 12
                13 Chapinero, Bogotá - Compra y venta de ropa de dama.
              </div>
              <div>
                <strong>Horario:</strong> Lunes a sábado de 10:00am a 6:30pm -
                Domingos y festivos: 10:30 a 4:00pm
              </div>
            </div>
          </div>
        </div>
        <div
          className="p-4 text-center mt-5"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          ©2023{" "}
          <a className="text-white" href="https://baulito.co">
            Baulito.co
          </a>
        </div>
      </footer>
    </>
  );
};

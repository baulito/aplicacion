import React from "react";
import { LayoutGeneral } from "../components/layout/General";
import { Medios } from "../components/medios/Medios";
export const Help = () => {
  return (
    <LayoutGeneral>
      <div className=" pl-5 pr-5 sm:container sm:mx-auto">
        <div className="shadow-xl caja-contenidos ">
          <h1>¿En qué podemos ayudarte?</h1>
          <div id="accordionAyuda">
            <div className="rounded-t-lg border border-t-0 border-l-0 border-r-0 border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800">
              <h2 className="mb-0" id="headingOne5">
                <button
                  className="group relative flex w-full items-center rounded-t-[15px] border-0 bg-white py-4 px-5 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white [&amp;:not([data-te-collapse-collapsed])]:bg-white [&amp;:not([data-te-collapse-collapsed])]:text-primary [&amp;:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:[&amp;:not([data-te-collapse-collapsed])]:bg-neutral-800 dark:[&amp;:not([data-te-collapse-collapsed])]:text-primary-400 dark:[&amp;:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]"
                  type="button"
                  data-te-collapse-init=""
                  data-te-target="#collapseayuda1"
                  aria-expanded="false"
                  aria-controls="collapseayuda1"
                  data-te-collapse-collapsed=""
                >
                  ¿Qué es una pasarela de pagos?
                  <span className="ml-auto -mr-1 h-5 w-5 shrink-0 rotate-[-180deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:mr-0 group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none dark:fill-blue-300 dark:group-[[data-te-collapse-collapsed]]:fill-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      ></path>
                    </svg>
                  </span>
                </button>
              </h2>
              <div
                id="collapseayuda1"
                className="!visible hidden"
                aria-labelledby="headingOne5"
                data-te-collapse-item=""
              >
                <div className="py-4 px-5">
                  <div className="text-justify">
                    Una pasarela de pagos es la encargada de procesar pagos
                    realizados mediante tarjetas de crédito y débito o
                    consignación en efectivo en canales como Baloto o efecty. Se
                    tratan de empresas especializadas en brindar estos
                    servicios.
                  </div>
                </div>
              </div>
            </div>
            <div className="border border-t-0 border-l-0 border-r-0 border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800">
              <h2 className="mb-0" id="headingTwo5">
                <button
                  className="group relative flex w-full items-center rounded-none border-0 bg-white py-4 px-5 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white [&amp;:not([data-te-collapse-collapsed])]:bg-white [&amp;:not([data-te-collapse-collapsed])]:text-primary [&amp;:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:[&amp;:not([data-te-collapse-collapsed])]:bg-neutral-800 dark:[&amp;:not([data-te-collapse-collapsed])]:text-primary-400 dark:[&amp;:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]"
                  type="button"
                  data-te-collapse-init=""
                  data-te-target="#collapseayuda2"
                  aria-expanded="false"
                  aria-controls="collapseayuda2"
                  data-te-collapse-collapsed=""
                >
                  ¿Qué tarjetas aceptan?
                  <span className="ml-auto -mr-1 h-5 w-5 shrink-0 rotate-[-180deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:mr-0 group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none dark:fill-blue-300 dark:group-[[data-te-collapse-collapsed]]:fill-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      ></path>
                    </svg>
                  </span>
                </button>
              </h2>
              <div
                id="collapseayuda2"
                className="!visible hidden"
                aria-labelledby="headingTwo5"
                data-te-collapse-item=""
              >
                <div className="py-4 px-5">
                  <div className="detalle-pregunta">
                    <div>
                      <h3>
                        <strong>
                          ¡PAGA COMO QUIERAS!&nbsp;Con la seguridad de Mercado
                          Pago, Compra lo que te guste con el medio de pago que
                          más te convenga, puedes usar tus tarjetas.
                        </strong>
                      </h3>
                      <p>
                        <strong>
                          VISA MASTER CARD, AMERICAN EXPRESS, DINERS, CODENSA,
                          PSE, MERCADO PAGO
                        </strong>
                      </p>
                    </div>
                    <br />
                    <div className="text-center">
                      <Medios />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="border border-t-0 border-l-0 border-r-0 border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800">
              <h2 className="mb-0" id="headingTree">
                <button
                  className="group relative flex w-full items-center rounded-none border-0 bg-white py-4 px-5 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white [&amp;:not([data-te-collapse-collapsed])]:bg-white [&amp;:not([data-te-collapse-collapsed])]:text-primary [&amp;:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:[&amp;:not([data-te-collapse-collapsed])]:bg-neutral-800 dark:[&amp;:not([data-te-collapse-collapsed])]:text-primary-400 dark:[&amp;:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]"
                  type="button"
                  data-te-collapse-init=""
                  data-te-target="#collapseayuda3"
                  aria-expanded="false"
                  aria-controls="collapseayuda3"
                  data-te-collapse-collapsed=""
                >
                  ¿Cuándo y dónde me devuelven el dinero de una compra
                  cancelada?
                  <span className="ml-auto -mr-1 h-5 w-5 shrink-0 rotate-[-180deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:mr-0 group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none dark:fill-blue-300 dark:group-[[data-te-collapse-collapsed]]:fill-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      ></path>
                    </svg>
                  </span>
                </button>
              </h2>
              <div
                id="collapseayuda3"
                className="!visible hidden"
                aria-labelledby="headingTree"
                data-te-collapse-item=""
              >
                <div className="py-4 px-5">
                  <div className="detalle-pregunta text-left">
                    <div>
                      <p>
                        Los plazos de devolución y el lugar donde se acreditará
                        el reembolso dependen del medio que hayas elegido para
                        hacer el pago.
                      </p>
                      <p>
                        <strong>Importante leer primero:</strong>
                      </p>
                      <ul>
                        <li>
                          Cuando compras y pagas en Togroow lo haces mediante la
                          pasarela Mercado Pago.&nbsp;
                          <a href="http://www.mercadopago.com/">
                            www.mercadopago.com
                          </a>
                          &nbsp;y&nbsp;
                          <strong>
                            <u>
                              Mercado Pago crea una cuenta automáticamente para
                              ti al momento de pagar.
                            </u>
                          </strong>
                        </li>
                        <li>
                          La cuenta de Mercado Pago que se genera
                          automáticamente cuando pagas se crea con el correo
                          electrónico que registraste en Togroow al momento de
                          pagar.
                          <a href="http://www.mercadopago.com/">
                            www.mercadopago.com
                          </a>
                          &nbsp;
                        </li>
                        <li>
                          Si el dinero de las devoluciones
                          <strong>
                            <u>&nbsp;no llega</u>
                          </strong>
                          <u>&nbsp;</u>a tu tarjeta de crédito, débito o si
                          pagaste con otro medio, este dinero lo encontraras en
                          tu cuenta de Mercado Pago.
                          <a href="http://www.mercadopago.com/">
                            www.mercadopago.com
                          </a>
                          &nbsp; debes ingresar con el correo que registraste al
                          momento de la compra
                        </li>
                      </ul>
                      <p>
                        <strong>
                          Pagué con saldo en cuenta de Mercado Pago:
                        </strong>
                      </p>
                      <p>
                        Tendrás tu dinero&nbsp;
                        <strong>
                          disponible automáticamente en tu cuenta de Mercado
                          Pago
                        </strong>
                        &nbsp;una vez que el vendedor te confirme que te hizo la
                        devolución.&nbsp;
                      </p>
                      <ul>
                        <li>
                          Cuando compras y pagas en Togroow lo haces mediante la
                          pasarela Mercado Pago.&nbsp;
                          <a href="http://www.mercadopago.com/">
                            www.mercadopago.com
                          </a>
                          &nbsp;y&nbsp;
                          <strong>
                            <u>
                              Mercado Pago crea una cuenta automáticamente para
                              ti al momento de pagar.
                            </u>
                          </strong>
                        </li>
                        <li>
                          La cuenta de Mercado Pago que se genera
                          automáticamente cuando pagas se crea con el correo
                          electrónico que registraste en Togroow al momento de
                          pagar.
                          <a href="http://www.mercadopago.com/">
                            www.mercadopago.com
                          </a>
                          &nbsp;
                        </li>
                        <li>
                          Si el dinero de las devoluciones
                          <strong>
                            <u>&nbsp;no llega</u>
                          </strong>
                          <u>&nbsp;</u>a tu tarjeta de crédito, débito o si
                          pagaste con otro medio, este dinero lo encontraras en
                          tu cuenta de Mercado Pago.
                          <a href="http://www.mercadopago.com/">
                            www.mercadopago.com
                          </a>
                          &nbsp; debes ingresar con el correo que registraste al
                          momento de la compra
                        </li>
                      </ul>
                      <p>&nbsp;</p>
                      <p>
                        <strong>
                          Pagué con tarjeta de crédito o débito (Visa,
                          Mastercard, American Express, Dinners Club, Codensa):
                        </strong>
                      </p>
                      <p>
                        Cuando el vendedor te devuelve el pago, pedimos
                        inmediatamente la cancelación del cargo para que tu
                        banco te devuelva el dinero. Ten en cuenta que el plazo
                        de acreditación dependerá de tu tarjeta&nbsp;y&nbsp;
                        <strong>puede demorar</strong>&nbsp;
                        <strong>
                          hasta 15&nbsp;días hábiles desde la cancelación de la
                          compra.&nbsp;
                        </strong>
                        Te recomendamos comunicarte con el banco emisor para que
                        puedan darte información más detallada sobre este plazo
                        según tu caso.
                      </p>
                      <p>
                        Si pagaste con tarjeta de crédito, una vez acreditado,
                        podrás ver tu dinero en el resumen de tu tarjeta. Si
                        pagaste con tarjeta de débito, lo verás en los
                        movimientos de tu cuenta bancaria.&nbsp;&nbsp;
                      </p>
                      <p>&nbsp;</p>
                      <p>
                        <strong>
                          Ya se cumplieron los plazos mencionados y aún no veo
                          el reembolso acreditado
                        </strong>
                      </p>
                      <p>
                        En esos casos puedes comunicarte con nosotros y te
                        ayudaremos a solucionarlo.&nbsp;
                        <a href="http://www.mercadopago.com/">
                          www.mercadopago.com
                        </a>
                      </p>
                      <p>&nbsp;</p>
                      <p>&nbsp;</p>
                      <p>Actualizado:&nbsp;V552023</p>
                      <p>&nbsp;</p>
                      <p>
                        Por&nbsp;favor&nbsp;no&nbsp;dude&nbsp;en&nbsp;comunicarse&nbsp;con&nbsp;nosotros&nbsp;si&nbsp;hay&nbsp;algo&nbsp;en&nbsp;lo&nbsp;que&nbsp;podamos&nbsp;ayudarle.
                      </p>
                      <p>
                        Si&nbsp;la&nbsp;siguiente&nbsp;información&nbsp;no&nbsp;fue&nbsp;suficiente&nbsp;para&nbsp;que&nbsp;solucionaras&nbsp;tu&nbsp;necesidad,&nbsp;por&nbsp;favor&nbsp;contáctanos&nbsp;en&nbsp;
                        <a href="/sistem/paginaweb/detalle/199/contacto/">
                          CONTACTO
                        </a>
                        &nbsp;o&nbsp;escríbenos&nbsp;en&nbsp;el&nbsp;chat&nbsp;que&nbsp;encontrarás&nbsp;en&nbsp;la&nbsp;plataforma.&nbsp;
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="border border-t-0 border-l-0 border-r-0 border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800">
              <h2 className="mb-0" id="headingTree">
                <button
                  className="group relative flex w-full items-center rounded-none border-0 bg-white py-4 px-5 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white [&amp;:not([data-te-collapse-collapsed])]:bg-white [&amp;:not([data-te-collapse-collapsed])]:text-primary [&amp;:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:[&amp;:not([data-te-collapse-collapsed])]:bg-neutral-800 dark:[&amp;:not([data-te-collapse-collapsed])]:text-primary-400 dark:[&amp;:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]"
                  type="button"
                  data-te-collapse-init=""
                  data-te-target="#collapseayuda4"
                  aria-expanded="false"
                  aria-controls="collapseayuda4"
                  data-te-collapse-collapsed=""
                >
                    Política de devoluciones y reembolsos
                  <span className="ml-auto -mr-1 h-5 w-5 shrink-0 rotate-[-180deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:mr-0 group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none dark:fill-blue-300 dark:group-[[data-te-collapse-collapsed]]:fill-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      ></path>
                    </svg>
                  </span>
                </button>
              </h2>
              <div
                id="collapseayuda4"
                className="!visible hidden"
                aria-labelledby="headingTree"
                data-te-collapse-item=""
              >
                <div className="py-4 px-5">
                  <div className="detalle-pregunta text-left">
                    <p>
                      La Satisfacci&oacute;n de nuestros clientes es el objetivo
                      principal de nuestras tiendas, por tal motivo, ofrecemos
                      cambio dentro de los primeros 3 d&iacute;as h&aacute;biles
                      de tu compra. &nbsp;Si han transcurrido 4 d&iacute;as
                      desde tu compra, no se te ofrecer&aacute; un cambio de
                      ning&uacute;n tipo.
                    </p>
                    <p>&nbsp;</p>
                    <p>
                      <strong>Condiciones para la devoluci&oacute;n:</strong>
                    </p>
                    <ul>
                      <li>
                        El art&iacute;culo debe estar sin usar y en las mismas
                        condiciones en que lo recibi&oacute;.
                      </li>
                      <li>
                        Para completar tu devoluci&oacute;n, requerimos un
                        recibo o comprobante de compra.
                      </li>
                    </ul>
                    <ul>
                      <li>
                        Solo reemplazamos los art&iacute;culos si est&aacute;n
                        defectuosos o da&ntilde;ados.
                      </li>
                      <li>
                        Si necesitas cambiarlo, env&iacute;anos un email a{" "}
                        <a href="mailto:elbaulitodemrbean@gmail.com">
                          elbaulitodemrbean@gmail.com
                        </a>{" "}
                        o escribir al WhatsApp 3182050000 para gestionar tu
                        solicitud.
                      </li>
                    </ul>
                    <ul >
                      <li>
                        Los costos de env&iacute;o no son reembolsables. Si
                        recibes un reembolso, el costo del env&iacute;o de
                        devoluci&oacute;n se deducir&aacute; de tu reembolso.
                      </li>
                    </ul>
                    <p>&nbsp;</p>
                    <p>
                      <strong>C&oacute;mo lo realizo:</strong>
                    </p>
                    <ul >
                      <li>
                        Acercarse a alguna de nuestras tiendas, en el caso de
                        que la compra haya sido en nuestras instalaciones.
                      </li>
                    </ul>
                    <ul>
                      <li>
                        Una vez que se reciba e inspeccione tu devoluci&oacute;n
                        en las tiendas, se te notificar&aacute; la
                        aprobaci&oacute;n o el rechazo de tu reembolso.
                      </li>
                      <li>
                        Si la compra se realiz&oacute; online, enviar al correo{" "}
                        <a href="mailto:elbaulitodemrbean@gmail.com">
                          elbaulitodemrbean@gmail.com
                        </a>
                        , con la solicitud de devoluci&oacute;n y una vez que se
                        reciba e inspeccione tu devoluci&oacute;n, te enviaremos
                        un email para notificarte que hemos recibido tu
                        art&iacute;culo devuelto. Tambi&eacute;n te
                        notificaremos la aprobaci&oacute;n o el rechazo de tu
                        reembolso.
                      </li>
                      <li>
                        Al llevar el producto al almac&eacute;n para el
                        reembolso de tu dinero, inicialmente se realizar&aacute;
                        un estudio y an&aacute;lisis de cada caso en particular
                        y de darse la devoluci&oacute;n se har&aacute; por medio
                        de un bono canjeable para cambiarlo por otro
                        art&iacute;culo de la tienda, en caso de tratarse de
                        otros medios como transferencia a cuenta bancaria
                        ser&aacute; m&aacute;ximo de 7 d&iacute;as
                        h&aacute;biles, para el caso de reversiones a tarjetas
                        de cr&eacute;dito depender&aacute; del banco y
                        podr&aacute; ser de aproximadamente 15 d&iacute;as
                        h&aacute;biles.
                      </li>
                    </ul>
                    <ul >
                      <li>
                        Para el caso de env&iacute;os, usted ser&aacute;
                        responsable de pagar sus propios costos de env&iacute;o
                        para devolver su art&iacute;culo.
                      </li>
                      <li>
                        Los costos de env&iacute;o no son reembolsables. Si
                        recibes un reembolso, el costo del env&iacute;o de
                        devoluci&oacute;n se deducir&aacute; de tu reembolso.
                      </li>
                      <li>
                        Dependiendo de d&oacute;nde vivas, el tiempo que tarde
                        tu producto cambiado en llegar a ti puede variar.
                      </li>
                    </ul>
                    <p>&nbsp;</p>
                    <p>
                      <strong>
                        Los siguientes bienes est&aacute;n exentos de
                        reembolsos:
                      </strong>
                    </p>
                    <p>
                      <strong>&nbsp;</strong>
                    </p>
                    <ul >
                      <li>
                        Cualquier art&iacute;culo que no se encuentre en su
                        estado original, est&eacute; da&ntilde;ado o falte una
                        parte por razones que no se debieron a nuestro error.
                      </li>
                      <li>
                        Cualquier art&iacute;culo que se devuelva m&aacute;s de
                        4 d&iacute;as despu&eacute;s de la entrega.
                      </li>
                    </ul>
                    <p>&nbsp;</p>
                    <p>
                      <strong>Derecho De Retracto</strong>
                    </p>
                    <p>&nbsp;</p>
                    <p>
                      El t&eacute;rmino m&aacute;ximo para ejercer el derecho de
                      retracto ser&aacute; de cinco (5) d&iacute;as
                      h&aacute;biles contados a partir de la entrega del bien o
                      de la celebraci&oacute;n del contrato en caso de la
                      prestaci&oacute;n de servicios. Art&iacute;culo 47. LEY
                      1480 DE 2011.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutGeneral>
  );
};

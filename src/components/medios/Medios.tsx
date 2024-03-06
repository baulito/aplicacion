import { ReactComponent as Amex } from "../../elements/icons/amex.svg";
import { ReactComponent as Visa } from "../../elements/icons/visa.svg";
import { ReactComponent as Mastercard } from "../../elements/icons/mastercard.svg";
import { ReactComponent as Mercadopagos } from "../../elements/icons/mercado-pago.svg";
import { ReactComponent as Pse } from "../../elements/icons/pse.svg";
import { ReactComponent as Nequi } from "../../elements/icons/nequi.svg";
import { ReactComponent as Daviplata } from "../../elements/icons/daviplata.svg";

export const Medios = () => {
  return (
    <div className="imagenes-medios">
      <Amex />
      <Visa />
      <Mastercard />
      <Pse />
      <Nequi className="pequenio" />
      <Daviplata className="pequenio" />
      <Mercadopagos />
    </div>
  );
};

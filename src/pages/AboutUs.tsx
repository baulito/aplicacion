import { LayoutGeneral } from "../components/layout/General";
import baul from "../elements/images/baul.png";
import { Sedes } from "../components/Sedes/Sedes";
export const AboutUs = () => {
  return (
    <LayoutGeneral>
      <div className=" pl-5 pr-5 sm:container sm:mx-auto">
        <div className="shadow-xl caja-contenidos ">
          <h1>¿QUIÉNES SOMOS?</h1>
          <div className={"grid items-center grid-cols-1 lg:grid-cols-3"}>
            <div>
              <img src={baul} alt="" />
            </div>
            <div className={"lg:col-span-2"}>
              <div className={"descripcion"}>
                Somos una tienda dedicada a promover la reutilización y
                reciclaje del textil, con el objetivo de darle una segunda vida
                a las prendas que las personas dejan de usar, evitando que se
                desechen, contribuyendo enormemente a la protección del medio
                ambiente.
              </div>
              <div className={"descripcion"}>
                Hacemos campañas por medio de nuestras redes sociales sobre la
                moda sostenible y de segunda mano, logrando que las personas
                vean como una opción traer sus prendas a vender o darlas como
                parte de pago, generando un ahorro y flexibilidad de compra,
                incentivando a los jóvenes entre los 18 y 35 años.
              </div>
              <div className={"descripcion"}>
                Se realiza un proceso de selección de muy buenas prendas, que
                estén limpias, sin rotos, manchas, motas y en buen estado,
                listas para su próximo uso.
              </div>
              <div className={"descripcion"}>
                Como resultado se comercializan más de 150.000 prendas,
                aproximadamente 70 toneladas de textil usado al año, brindando
                un servicio a más de 5.000 personas todos los meses.
              </div>
              <div className={"descripcion"}>
                La tienda se fundó en el año 2019 por el joven campesino y hoy
                propietario Juan Camilo de 23 años, Colombiano que llegó del
                municipio de Ubaté a la capital sin nada, con mucho esfuerzo,
                trabajo, dedicación y una campaña en redes sociales, logró un
                gran crecimiento generando empleo a más de 30 personas directa e
                indirectamente, estando al servicio diariamente y creando un
                nuevo concepto sobre la ropa de segunda mano.
              </div>
              <div className={"descripcion"}>
                Son varias sedes ubicadas en la localidad de Chapinero en
                Bogotá, Colombia y se preparan para abrir nuevas sedes.
              </div>
            </div>
          </div>
        </div>

        <Sedes />
      </div>
    </LayoutGeneral>
  );
};

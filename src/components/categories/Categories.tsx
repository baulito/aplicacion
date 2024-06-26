import { ReactComponent as Calzado } from "../../elements/icons/calzado.svg";
import { ReactComponent as Chaqueta } from "../../elements/icons/chaquetas.svg";
import { ReactComponent as Pantalon } from "../../elements/icons/pantalones.svg";
import { ReactComponent as Buzo } from "../../elements/icons/buzos.svg";
import { ReactComponent as Camiseta } from "../../elements/icons/camiseta.svg";
import { ReactComponent as Camisa } from "../../elements/icons/camisa.svg";
import { ReactComponent as Pantaloneta } from "../../elements/icons/pantaloneta.svg";
import { ReactComponent as Accesorio } from "../../elements/icons/accesorio.svg";

export const Categories = () => {
  return (
    <div>
        <h2 className="subtitulos">Categorías</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <a href="/category/2" className="box-categories shadow-xl">
            <Calzado />
            <div>Calzado</div>
          </a>
        </div>
        <div>
          <a href="/category/1" className="box-categories shadow-xl">
            <Chaqueta />
            <div>Chaquetas</div>
          </a>
        </div>
        <div>
          <a href="/category/3" className="box-categories shadow-xl">
          <Pantalon />
            <div>Pantalones</div>
          </a>
        </div>
        <div>
          <a href="/category/4" className="box-categories shadow-xl">
            <Buzo />
            <div>Buzos</div>
          </a>
        </div>
        <div>
          <a href="/category/5" className="box-categories shadow-xl">
            <Camiseta />
            <div>Camisetas</div>
          </a>
        </div>
        <div>
          <a href="/category/6" className="box-categories shadow-xl">
            <Camisa />
            <div>Camisas</div>
          </a>
        </div>
        <div>
          <a href="/category/7" className="box-categories shadow-xl">
            <Pantaloneta />
            <div>Pantalonetas</div>
          </a>
        </div>
        <div>
          <a href="/category/9" className="box-categories shadow-xl">
            <Accesorio />
            <div>Accesorios</div>
          </a>
        </div>
      </div>
    </div>
  );
};

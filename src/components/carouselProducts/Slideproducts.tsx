import { Product } from "../../models/product";
import { Boxproduct } from "../products/Boxproduct";
export const Slideproducts = ({ productos }: any) => {
    let contador = 0;
    return (
        <div className="grid grid-cols-2  md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-3 md:gap-5 pt-8  pb-8 mt-0">
            {productos.map((product: Product) => {
                if (product) {
                    const producto: Product = product;
                    contador++;
                    return (
                        <div key={"boxproduct"+producto.store_producto_id} className={contador >=5 ? "hidden xl:inline-grid" : ""}>
                            <Boxproduct producto={producto} />
                        </div>
                    );
                } else {
                    return "";
                }
            })}
        </div>
    );
};

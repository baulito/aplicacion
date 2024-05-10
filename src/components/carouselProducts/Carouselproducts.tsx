import { useEffect, useState } from "react";
import { apiService } from "../../api/fetch-data";
import { Product } from "../../models/product";
import { Slideproducts } from "./Slideproducts";
import { Carousel, initTE } from "tw-elements";

export const Carouselproducts = ({
    titulo,
    categoria,
    negocio,
    agotado,
}: any) => {
    const idcarousel = "Carrousel" +Math.random().toString(16).slice(2);
    const [productos, setProductos] = useState<Product[]>([]);
    useEffect(() => {
        apiService({ categoria, negocio, agotado }).then((res) => {
            setProductos(res.data);
        });
        initTE({ Carousel });
    }, []);
    if (productos.length > 0) {
        let contador = 0;
        const datos = [];
        let array = [];
        let producto: Product;
        for (let index = 0; index < productos.length; index++) {
            if (contador === 6) {
                datos.push(array);
                contador = 0;
                array = [];
            }
            producto = productos[index];
            array.push(producto);
            contador++;
        }
        datos.push(array);
        contador = 0;
        return (
            <div className={" pl-2 pr-2 sm:pl-5 sm:pr-5 md:pl-0 md:pr-0"}>
                { categoria && categoria!=undefined?
                    <a href={"/category/"+categoria} className="subtitulos">{titulo} <span>Ver todos</span></a>
                :
                    <div className="subtitulos">{titulo}</div>
                }
                <div
                    id={idcarousel}
                    className="relative slide-products"
                    data-te-carousel-init
                    data-te-carousel-slide
                    data-te-interval="false"
                >
                    <div className="relative w-full overflow-hidden after:clear-both after:block after:content-['']">
                        {datos.map((parry) => {
                            //console.log(parry);
                            if (contador === 0) {
                                contador ++;
                                return (
                                    <div
                                        key={"slide"+contador}
                                        className="relative float-left -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
                                        data-te-carousel-item
                                        data-te-carousel-active
                                        style={{ backfaceVisibility: "hidden" }}
                                    >
                                        <Slideproducts productos={parry} />
                                    </div>
                                );
                            } else {
                                contador ++;
                                return (
                                    <div
                                        key={"slide"+contador}
                                        className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
                                        data-te-carousel-item
                                        style={{ backfaceVisibility: "hidden" }}
                                    >
                                        <Slideproducts productos={parry} />
                                    </div>
                                );
                            }
                        })}
                    </div>

                    <button className="carousel-control-prev" type="button" data-te-target={"#"+idcarousel} data-te-slide="prev">
                        <span className="inline-block h-10 w-10">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-8 w-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>
                        </span>
                        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-te-target={"#"+idcarousel} data-te-slide="next">
                        <span className="inline-block h-8 w-8">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-8 w-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </span>
                        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Next</span>
                    </button>
                </div>
            </div>
        );
    } else {
        return <></>;
    }
};

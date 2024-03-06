import { useEffect, useState } from 'react';
import { Compra } from '../models/compra';
import { LayoutGeneral } from '../components/layout/General';
import { miscompras } from '../api/fetch-data';
import { ButtonBar } from '../components/profile/ButtonBar';


export function MyPurchases() {
    const [compras, setCompras] = useState<Compra[]>();

    useEffect(() => {
        miscompras(1384).then((res: Compra[]) => {
            setCompras(res);
        });
    }, []);
    if (compras && compras.length > 0) {
        console.log(compras);
        return (
            <LayoutGeneral>
                <div className={"pl-5 pr-5 sm:container sm:mx-auto mt-5 "}>
                    <div className={" grid md:grid-cols-4 items-start gap-5"}>
                        <div>
                            <ButtonBar />
                        </div>
                        <div className={"md:col-span-3"}>
                            <div className="shadow-xl caja-data ">
                                <h1>Mis Compras</h1>
                                {compras.map((compra: Compra) => {
                                    return (
                                        <div className='box-item-compra'>
                                            <div className='grid md:grid-cols-4 gap-5'>
                                                <div>
                                                    <h3>{compra.negocio_compra_estado_texto}</h3>
                                                    <div>{compra.negocio_compra_fecha}</div>
                                                    <div><strong>Valor:</strong> ${(parseInt(compra.negocio_compra_valor)).toLocaleString('en-us', { minimumFractionDigits: 0 })}</div>
                                                </div>
                                                <div className='md:col-span-2'>
                                                    {compra.items.map((item) => {
                                                        return (
                                                            <div>
                                                                <span dangerouslySetInnerHTML={{ __html: "" + item.negocio_compra_item_nombre }}></span> x {item.negocio_compra_item_cantidad}
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                                <div className='md:text-right'>
                                                    <a className='btn btn-info' href={'/mypurchases/' + compra.negocio_compra_id}>Detalle</a>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                    </div>
                </div>
            </LayoutGeneral>
        );
    } else {
        return (
            <LayoutGeneral>
                <div className={"pl-5 pr-5 sm:container sm:mx-auto mt-5 "}>
                    <div className={"grid md:grid-cols-4 items-start gap-5"}>
                        <div>
                            <ButtonBar />
                        </div>
                        <div className={"md:col-span-3"}>
                            <div className="shadow-xl caja-data ">
                                <h1>Mis Compras</h1>
                                <div>No ha realizado ninguna compra</div>
                            </div>
                        </div>

                    </div>
                </div>
            </LayoutGeneral>
        );
    }

}
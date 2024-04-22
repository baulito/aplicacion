import { useParams } from 'react-router-dom';
import { LayoutGeneral } from '../components/layout/General';
import { useContext, useEffect, useState } from 'react';
import { Product } from "../models/product";
import { getProducto, } from '../api/fetch-data';
import { Carouselproducts } from '../components/carouselProducts/Carouselproducts';
import { Imagesproduct } from '../components/Imagesproduct/Imagesproduct';
import { useGlobalContext } from '../context/Main';
import { Carrito,Items } from '../models/carrito';
import { Medios } from '../components/medios/Medios';

export const Productdetail = () => {
    let params = useParams();
    let idp = 0;
    if (params.id) {
        idp = parseInt(params.id);
    }
    const [producto, setProduct] = useState<Product>({value:1})
    const {mainState,updateCarrito} = useGlobalContext();

    const selected = (number = 0) => { 
        if (typeof window === "object") {
            const select = (document.getElementById('catidades-producto') as HTMLSelectElement);
            if(select){
                select.innerHTML = '';  
                if(number > 1){
                    for (let index = 1; index <= number; index++) {
                        const newOption = document.createElement('option');
                        const optionText = document.createTextNode(""+index);
                        newOption.appendChild(optionText);
                        newOption.setAttribute('value',""+index);
                        select.appendChild(newOption);
                        //cantidad = cantidad+ "<option value='" + index + "'>" + index + "</option>";
                    }
                } else if(number === 1){
                    const newOption = document.createElement('option');
                    const optionText = document.createTextNode("Unica Unidad");
                    newOption.appendChild(optionText);
                    newOption.setAttribute('value','1');
                    select.appendChild(newOption);
                }
            }
        }
    }
    useEffect(() => {
        getProducto(idp).then((res: Product) => {
            setProduct(res);
            setTimeout(()=>selected(res.amount),1000);
            
        });
    }, []);

    function productoencarro(){ 
        const negocioCarrito = mainState.carrito;
        var cantidadagregada = 0;
        if (negocioCarrito?.Items?.find((miitem:any) => miitem.id === producto.id && (miitem.caracteristica === null || miitem.caracteristica === '' ))) {
            const productoencarrito = negocioCarrito.Items.map((item:any) => item.id === producto.id && (item.caracteristica === null || item.caracteristica === '')  ? { ...item} : item);
            if(productoencarrito[0]){
                cantidadagregada =  productoencarrito[0].cantidad;
            }
        }
        return cantidadagregada;
    }
    const agregarProducto = () => {
        const cantidadagregada = productoencarro();
        //const carritoglobal = mainState.carrito;
        console.log(cantidadagregada);
            if(producto && producto?.amount !== undefined ){

                const cantidadmaxima = producto?.amount - cantidadagregada;
                if( cantidadmaxima > 0 ){
                    let cantidadp = parseInt((document.getElementById('catidades-producto') as HTMLInputElement ).value);
                        console.log(cantidadp);
                        if(cantidadp === undefined){
                            cantidadp = 0;
                        }
                    let negocioCarrito =  mainState.carrito;
                    if(negocioCarrito && negocioCarrito!==undefined){
                        console.log("entro carrito");
                        if(negocioCarrito.Items === undefined){
                            negocioCarrito.Items = [];
                        }
                        if (negocioCarrito?.Items?.find((miitem:any) => miitem.id === producto.id )) {
                            const products = negocioCarrito.Items.map((item:any) => item.id === producto.id &&  (item.cantidad + cantidadp) <= cantidadmaxima  ? { ...item, cantidad: item.cantidad + cantidadp } : item);
                            negocioCarrito.Items = products;
                        }else {
                            if (producto.id) {
                                console.log("entro carrito");
                                const item: Items = { id: 0, cantidad: 1 };
                                item.id = producto.id;
                                item.nombre = producto.name;
                                item.imagen = producto.image_1;
                                if(producto?.old_value && producto?.old_value > 0){
                                    item.valor = producto?.old_value;
                                } else {
                                    item.valor = producto?.value;
                                }
                                item.tienda = producto.campusdetail?.name;
                                console.log(item);
                                negocioCarrito.Items?.push(item);
                            }
                        }
                        let cantidad = 0;
                        if (negocioCarrito.Items && negocioCarrito.Items?.length > 0) {
                            negocioCarrito.Items?.map((item) => {
                                cantidad = cantidad + item.cantidad;
                            });
                            negocioCarrito.cantidad = cantidad;
                        }

                        
                        console.log("entro");
                        window.localStorage.setItem("carrito", JSON.stringify(negocioCarrito));
                        updateCarrito(negocioCarrito);
                    }
                
                }
            }
    }

    const comprarProducto = () => {
        agregarProducto();
        window.location.href = "/cart";
    }
    
    if (producto.id) {       
        const imagenes = [];
        if (producto.image_1 && producto.image_1 !== '') {
            imagenes.push(producto.image_1);
        }
        if (producto.image_2 && producto.image_2 !== '') {
            imagenes.push(producto.image_2);
        }
        if (producto.image_3 && producto.image_3 !== '') {
            imagenes.push(producto.image_3);
        }
        if (producto.image_4 && producto.image_4 !== '') {
            imagenes.push(producto.image_4);
        }
        if (producto.image_5 && producto.image_5 !== '') {
            imagenes.push(producto.image_5);
        }
        if (producto.image_6 && producto.image_6 !== '') {
            imagenes.push(producto.image_6);
        }
        if (producto.image_7 && producto.image_7 !== '') {
            imagenes.push(producto.image_7);
        }
        if (producto.image_8 && producto.image_8 !== '') {
            imagenes.push(producto.image_8);
        }
        if (producto.image_9 && producto.image_9 !== '') {
            imagenes.push(producto.image_9);
        }

        const fecha = new Date();
        const dias = 2; // Número de días a agregar
        fecha.setDate(fecha.getDate() + dias );
        const dia = fecha.getDate().toString().padStart(2, '0'); // Agrega un cero si es necesario
        const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Sumamos 1 porque los meses empiezan desde 0
        const año = fecha.getFullYear();
        
        const fechaenvio =`${dia}-${mes}-${año}`;


        

        return (
            <LayoutGeneral>
                <>
                    <div className=" pl-5 pr-5 sm:container sm:mx-auto">
                        <div className="text-sm breadcrumbs">
                            <ul>
                                <li><a href='/'>Inicio</a></li>
                                <li><a href={"/category/" + producto.categorydetail?.id}>{producto.categorydetail?.name}</a></li>
                            </ul>
                        </div>
                        <div className="detalle-producto shadow-xl">
                            <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-10 p-2 md:p-5">
                                <div className="">
                                    <div className={'block lg:hidden mb-5'}>
                                        <h1 >{producto.name}</h1>
                                        <div className="text-left"><strong>SKU</strong> {producto.sku} </div>
                                    </div>
                                    <div className="imagen-producto">
                                        <Imagesproduct imagenes={imagenes} />
                                    </div>
                                    <div className="text-left mt-5">
                                        <span className="mr-5 font-bold">Calificación</span>
                                        <div className="rating rating-md">
                                            <input type="radio" name="rating-6" className="mask mask-star-2 bg-orange-400" />
                                            <input type="radio" name="rating-6" className="mask mask-star-2 bg-orange-400" />
                                            <input type="radio" name="rating-6" className="mask mask-star-2 bg-orange-400" />
                                            <input type="radio" name="rating-6" className="mask mask-star-2 bg-orange-400" />
                                            <input type="radio" name="rating-6" className="mask mask-star-2 bg-orange-400" />
                                        </div>
                                    </div>
                                    <br />
                                    <div className='text-left'>
                                        <h3>Ubicacion del Producto:</h3>
                                        <div><strong>Tienda:</strong> <span dangerouslySetInnerHTML={{__html:""+producto.campusdetail?.name}}></span></div>
                                        <div><strong>Ubicación:</strong> {producto.campusdetail?.address}</div>
                                        <div><strong>Ciudad:</strong> {producto.campusdetail?.cityname}</div>
                                    </div>
                                    
                                    </div>
                                <div >
                                    <div className={'hidden lg:block'}>
                                        <h1 >{producto.name}</h1>
                                        <div className="text-left"><strong>SKU</strong> {producto.sku} </div>
                                    </div>
                                    <div className="carcteristicas">
                                        <div className=" text-left md:text-right pb-3">
                                            <label htmlFor="my-modal-4" className="btn btn-warning  btn-sm ">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                                    <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                                                    <path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                                </svg>
                                                <span className="ml-2"> Compra Protegida</span>
                                            </label>
                                        </div>
                                        <hr />
                                        <div className="grid sm:grid-cols-3 md:gap-5 p-2 md:p-5 items-center">
                                            <div className=" text-left md:text-right font-bold"  >Estado:</div>
                                            <div className="md:col-span-2 text-left">{producto.productstatus}</div>
                                        </div>
                                        <hr />
                                        <div className="grid sm:grid-cols-3 md:gap-5 p-2 md:p-5 items-center">
                                            <div className=" text-left md:text-right font-bold"  >Precio:</div>
                                            <div className="md:col-span-2 text-left ">
                                                { producto.old_value && producto?.old_value > 0 ? 
                                                    <div>
                                                        <div className="valorold">$ {producto.value.toLocaleString('es-ES')}</div>
                                                        <div className="valor">$ {producto.old_value.toLocaleString('es-ES')}</div>
                                                    </div>
                                                :(
                                                    <div className="valor">$ {producto.value.toLocaleString('es-ES')}</div>
                                                )}
                                            </div>
                                        </div>
                                        <hr />
                                                {producto.amount && producto.amount > 1
                                                    ?
                                                    <div className="grid sm:grid-cols-3 md:gap-5 p-2 md:p-5 items-center">
                                                        <div className=" text-left md:text-right font-bold"  >Cantidad</div>
                                                        <div className="md:col-span-2 text-left">
                                                            <select className="select select-bordered  max-w-xs catidades-producto" id={'catidades-producto'} >
                                                            </select>
                                                        </div>
                                                    </div>
                                                    :
                                                        producto.amount && producto.amount === 1 ?
                                                            <div className="grid sm:grid-cols-3 md:gap-5 p-2 md:p-5">
                                                                <div className=" text-left md:text-right font-bold">Cantidad:</div>
                                                                <input type="hidden" id={'catidades-producto'} value="1" />
                                                                <div className="md:col-span-2 text-left">Unica Unidad</div>
                                                            </div>
                                                            :
                                                            <div className="grid sm:grid-cols-3 md:gap-5 p-2 md:p-5">
                                                            <div className=" text-left md:text-right font-bold">Cantidad:</div>
                                                            <div className="md:col-span-2 text-left">Agotado</div>
                                                        </div>

                                            }
                                        <div>
                                            <a className="btn btn-primary  btn-xs sm:btn-sm mt-2 md:mt-4 sm:mr-4" onClick={()=>comprarProducto()}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                                                </svg>
                                                <span className="ml-4">Comprar Ahora</span>
                                            </a>
                                            <button className="btn btn-success btn-xs sm:btn-sm mt-2 md:mt-4 sm:mr-4" onClick={()=>agregarProducto()} >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                                </svg>
                                                <span className="ml-4">Agregar al Carrito</span>
                                            </button>
                                            <button className="btn btn-info btn-sm mt-4" style={{"display":'none'}} >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                                </svg>
                                                <span className="ml-4">Lista de deseos </span>
                                            </button>


                                        </div>

                                    </div>
                                    <div className={'text-left'} style={{"display":'none'}}><a>Promociones</a> | <a>Productos Relacionados</a></div>
                                    <div className="adicional-info-producto">
                                        <div className="grid sm:grid-cols-4 md:gap-5 p-2 md:p-5 items-center">
                                            <div className="text-left font-bold"  >Envio:</div>
                                            <div className="col-span-3 text-left ">
                                                <div>El envío se realizará con una de las principales transportadoras del país.</div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="grid sm:grid-cols-4 md:gap-5 p-2 md:p-5 items-center">
                                            <div className="text-left font-bold"  >Entrega</div>
                                            <div className="col-span-3 text-left ">
                                                <div>Fecha aproximada de entrega <strong>{fechaenvio}</strong> <br />
                                                    Los despachos a nivel nacional pueden variar uno o dos dias
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="grid sm:grid-cols-4 md:gap-5 p-2 md:p-5 items-center">
                                            <div className="text-left font-bold"  >Pagos</div>
                                            <div className="col-span-3 text-left ">
                                                <div><strong>¡PAGA COMO QUIERAS!</strong> Con la seguridad de Mercado Pago, Compra lo que te guste con el medio de pago que más te convenga, puedes usar tus TARJETAS débito o crédito, con PSE desde cualquier banco, Nequi o Daviplata.
                                                
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="grid sm:grid-cols-4 md:gap-5 p-2 md:p-5 items-center">
                                            <div className="text-left font-bold"  >Devoluciones</div>
                                            <div className="col-span-3 text-left ">
                                                <div>Si tienes un problema con el producto, para su devolución debes contactar al vendedor con los datos que recibiste en el momento de la compra.</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Carouselproducts titulo="Productos Relacionados" categoria={ producto?.category} agotado={1} />
                      
                        <div className="detalle-producto shadow-xl">
                            <h3>Descripcion</h3>
                            <div className="text-justify" dangerouslySetInnerHTML={{__html:""+producto?.description}} />

                        </div>
                    </div>

                    <input type="checkbox" id="my-modal-4" className="modal-toggle" />
                    <label htmlFor="my-modal-4" className="modal cursor-pointer">
                        <label className="modal-box relative" htmlFor="">
                            <h3 className="text-lg font-bold">PAGO Y ENVIÓ SEGURO CON NUESTROS ALIADOS PREMIUM</h3>
                            <div className="py-4">
                                <ul className="text-left">
                                    <li>Paga con todos los medios con la seguridad de Mercado Pago  </li>
                                    <li>Tus envíos con las mejores transportadoras del país, Mi paquete  </li>
                                    <li>La seguridad y robustes de Microsoft Azure y Goddady </li>
                                </ul>
                                <div>
                                    <Medios />
                                </div>
                            </div>
                        </label>
                    </label>
                </>

            </LayoutGeneral>

        );
    } else {
        return (
            <LayoutGeneral>
                <h1>El producto se borro o no existe</h1>
            </LayoutGeneral>
        )
    }

}
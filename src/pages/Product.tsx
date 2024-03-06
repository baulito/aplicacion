import { useParams } from 'react-router-dom';
import { LayoutGeneral } from '../components/layout/General';
import { useContext, useEffect, useState } from 'react';
import { Product,Cantidades } from "../models/product";
import { getProducto, } from '../api/fetch-data';
import { Carouselproducts } from '../components/carouselProducts/Carouselproducts';
import { Imagesproduct } from '../components/Imagesproduct/Imagesproduct';
import { useGlobalContext } from '../context/Main';
import { CarritoNegocios,Items } from '../models/carrito';
import { Medios } from '../components/medios/Medios';

export const Productdetail = () => {
    let params = useParams();
    let idp = 0;
    if (params.id) {
        idp = parseInt(params.id);
    }
    const [producto, setProduct] = useState<Product>({})
    const {mainState,updateCarrito} = useGlobalContext();

    const selected = (number = 0) => { 
        console.log(number);
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

    const retornarcantidad = (cantidades:Cantidades[],valores:number[])=>{
        let existe = 1;
        if(cantidades.length > 0){
            existe = 1;
            for (let index = 0; index < cantidades.length; index++) {
                const cantidad = cantidades[index];
                existe = 1;
                const valorbuscar = valores
                for (let index2 = 0; index2 < cantidad.id_opciones.length; index2++) {
                    const idopcion = parseInt(""+cantidad.id_opciones[index2]);
                    if(valorbuscar.indexOf(idopcion) === -1){
                        existe = 0;
                    }
                }
                if(existe === 1){
                    return cantidad.cantidad;
                }
            }
        }
        return 0;   

    }

    const cantidadProducto  = (prod:Product)=>{
        if(prod.inventario && prod.inventario?.caracteristicas.length > 0 ){
            const caracteristicas = prod.inventario.caracteristicas;
            const cantidades = prod.inventario.cantidades; 
            const values = [];
            const opciones = [];
            if(caracteristicas?.length > 0){
                for (let index = 0; index < caracteristicas.length; index++) {
                    if (typeof window === "object") {
                        const element = (document.getElementById('opcaracteristica'+caracteristicas[index].id) as HTMLInputElement).value;
                        values.push(parseInt(element));
                    }
                    opciones.push(caracteristicas[0].opciones[0].id);
                }
            }
            if(values.length > 0){
                return retornarcantidad(cantidades,values);
            } else if(opciones.length >0){
                return retornarcantidad(cantidades,opciones);
            } else {
                return 0;
            } 
        } else if(prod?.store_producto_cantidad  !== undefined && prod?.store_producto_cantidad > 0) {
            return prod?.store_producto_cantidad;
        } else {
            return 0;
        }
    }
    
    const cantidadescarcteristicas = (prod:Product)=>{ 
        if(prod !== undefined ){
            if(prod.inventario && prod.inventario?.caracteristicas.length > 0 ){
                let numero = cantidadProducto(prod);
                if(numero !== undefined){
                    selected(numero);
                }
            } else if(prod?.store_producto_cantidad  !== undefined && prod?.store_producto_cantidad > 0) {
                selected(prod.store_producto_cantidad);
            }
        }
        
    };
    useEffect(() => {
        getProducto(idp).then((res: Product) => {
            setProduct(res);
            setTimeout(()=>{cantidadescarcteristicas(res);},2000);
            
        });
    }, []);

    function productoencarro(){
        let idcaracteristicas = '';
        if(producto.inventario && producto.inventario.caracteristicas.length > 0){
            const caracteristicas = producto.inventario.caracteristicas;    
            for (let index = 0; index < caracteristicas.length; index++) {
                if (typeof window === "object") {
                    const element = (document.getElementById('opcaracteristica'+caracteristicas[index].id) as HTMLInputElement).value;
                    if(idcaracteristicas === ''){
                        idcaracteristicas = element;
                    } else {
                        idcaracteristicas =  idcaracteristicas+","+element;
                    }
                }
            }
        }
        const carritoglobal = mainState.carrito;
        let negocioCarrito: CarritoNegocios;
        const idnegocio = producto?.negocio?.registro_id;
        let cantidadagregada = 0;
        if (carritoglobal?.CarritoNegocios?.find(carritonegocio => carritonegocio.negocio === idnegocio)) {
            const negocioCarrito2 = carritoglobal.CarritoNegocios?.find(carritonegocio => carritonegocio.negocio === idnegocio);
            negocioCarrito = { negocio: idnegocio, Items: negocioCarrito2?.Items, infonegocio: producto?.negocio };
            if(idcaracteristicas === ""){
                if (negocioCarrito?.Items?.find((miitem:any) => miitem.id === producto.store_producto_id && (miitem.caracteristica === null || miitem.caracteristica === '' ))) {
                    const productoencarrito = negocioCarrito.Items.map((item:any) => item.id === producto.store_producto_id && (item.caracteristica === null || item.caracteristica === '')  ? { ...item} : item);
                    if(productoencarrito[0]){
                        cantidadagregada =  productoencarrito[0].cantidad;
                    }
                }
            } else {
                if (negocioCarrito?.Items?.find((miitem:any) => miitem.id === producto.store_producto_id && miitem.caracteristica === idcaracteristicas )) {
                    const productoencarrito = negocioCarrito.Items.map((item:any) => item.id === producto.store_producto_id && item.caracteristica === idcaracteristicas  ? { ...item} : item);
                    console.log(productoencarrito);
                    if(productoencarrito[0]){
                        cantidadagregada = productoencarrito[0].cantidad;
                    }
                }
            }
           
        }
        return cantidadagregada;

    }
    const agregarProducto = () => {
        const cantidadagregada = productoencarro();
        const carritoglobal = mainState.carrito;
        console.log(cantidadagregada);
        const cantidadmaxima = cantidadProducto(producto) - cantidadagregada;
            if(cantidadmaxima !== undefined && cantidadmaxima > 0  ){
                let idcaracteristicas = "";
                if(producto){
                    if(producto.inventario && producto.inventario.caracteristicas.length > 0){
                        const caracteristicas = producto.inventario.caracteristicas;    
                        for (let index = 0; index < caracteristicas.length; index++) {
                            if (typeof window === "object") {
                                const element = (document.getElementById('opcaracteristica'+caracteristicas[index].id) as HTMLInputElement).value;
                                if(idcaracteristicas === ''){
                                    idcaracteristicas = element;
                                } else {
                                    idcaracteristicas =  idcaracteristicas+","+element;
                                }
                            }
                        }
                    }

                
                    let cantidadp = parseInt((document.getElementById('catidades-producto') as HTMLInputElement ).value);
                    if(cantidadp === undefined){
                        cantidadp = 0;
                    }
                    console.log(cantidadp+" > "+cantidadmaxima);
                    let negocioCarrito: CarritoNegocios;
                    const idnegocio = producto?.negocio?.registro_id;
                    if (carritoglobal?.CarritoNegocios?.find(carritonegocio => carritonegocio.negocio === idnegocio)) {
                        const negocioCarrito2 = carritoglobal.CarritoNegocios?.find(carritonegocio => carritonegocio.negocio === idnegocio);
                        negocioCarrito = { negocio: idnegocio, Items: negocioCarrito2?.Items, infonegocio: producto?.negocio };
                    } else {
                        negocioCarrito = { negocio: idnegocio, Items: [], infonegocio: producto?.negocio };
                    }
                    let caracteristicaitem:any;
                    if(idcaracteristicas === ''){
                        caracteristicaitem = null; 
                    } else {
                        caracteristicaitem = idcaracteristicas;
                    }
                    if (negocioCarrito?.Items?.find((miitem:any) => miitem.id === producto.store_producto_id && miitem.caracteristica === caracteristicaitem )) {
                        const products = negocioCarrito.Items.map((item:any) => item.id === producto.store_producto_id && item.caracteristica === caracteristicaitem &&  (item.cantidad + cantidadp) <= cantidadmaxima  ? { ...item, cantidad: item.cantidad + 1 } : item);
                        negocioCarrito.Items = products;
                    }else {
                        if (producto.store_producto_id) {
                            const item: Items = { id: 0, cantidad: 1 };
                            item.id = producto.store_producto_id;
                            item.nombre = producto.store_producto_nombre;
                            item.imagen = producto.store_producto_imagen;
                            item.valor = producto.valores?.value;
                            item.etiqueta = producto.valores?.etktexto;
                            item.tienda = producto.puntoventa?.nombre;
                            item.caracteristica = idcaracteristicas;
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

                    if (carritoglobal?.CarritoNegocios?.find(carritonegocio => carritonegocio.negocio === idnegocio)) {
                        const key = carritoglobal?.CarritoNegocios?.findIndex(carritonegocio => carritonegocio.negocio === idnegocio);
                        if(carritoglobal?.CarritoNegocios){
                            if(carritoglobal?.CarritoNegocios[key]){
                                carritoglobal.CarritoNegocios[key] = negocioCarrito;
                            }
                        }               
                    } else {
                        carritoglobal?.CarritoNegocios?.push(negocioCarrito);
                    }
                    cantidad = 0;
                    if (carritoglobal?.CarritoNegocios && carritoglobal?.CarritoNegocios?.length > 0) {
                        carritoglobal?.CarritoNegocios?.map((cnegocio) => {
                            if (cnegocio.cantidad !== undefined) {
                                cantidad = cantidad + cnegocio.cantidad;
                            }
                        })
                    }
                    if(carritoglobal !== undefined){
                        if(carritoglobal !== undefined && carritoglobal.cantidad !== undefined && cantidad){
                            carritoglobal!.cantidad = cantidad;
                        }
                        window.localStorage.setItem("carrito", JSON.stringify(carritoglobal));
                        updateCarrito(carritoglobal);
                    }
                }
            }
    }

    const comprarProducto = () => {
        agregarProducto();
        window.location.href = "/cart"; 
    }
    

    if (producto.store_producto_id) {       
        const imagenes = [];
        if (producto.store_producto_imagen && producto.store_producto_imagen !== '') {
            imagenes.push(producto.store_producto_imagen);
        }
        if (producto.store_producto_imagen2 && producto.store_producto_imagen2 !== '') {
            imagenes.push(producto.store_producto_imagen2);
        }
        if (producto.store_producto_imagen3 && producto.store_producto_imagen3 !== '') {
            imagenes.push(producto.store_producto_imagen3);
        }
        if (producto.store_producto_imagen4 && producto.store_producto_imagen4 !== '') {
            imagenes.push(producto.store_producto_imagen4);
        }
        if (producto.store_producto_imagen5 && producto.store_producto_imagen5 !== '') {
            imagenes.push(producto.store_producto_imagen5);
        }
        if (producto.store_producto_imagen6 && producto.store_producto_imagen6 !== '') {
            imagenes.push(producto.store_producto_imagen6);
        }
        if (producto.store_producto_imagen7 && producto.store_producto_imagen7 !== '') {
            imagenes.push(producto.store_producto_imagen7);
        }
        if (producto.store_producto_imagen8 && producto.store_producto_imagen8 !== '') {
            imagenes.push(producto.store_producto_imagen8);
        }
        if (producto.store_producto_imagen9 && producto.store_producto_imagen9 !== '') {
            imagenes.push(producto.store_producto_imagen9);
        }
        const fecha = new Date();
        const dias = 2; // Número de días a agregar
        fecha.setDate(fecha.getDate() + dias);


        

        return (
            <LayoutGeneral>
                <>
                    <div className=" pl-5 pr-5 sm:container sm:mx-auto">
                        <div className="text-sm breadcrumbs">
                            <ul>
                                <li><a href='/'>Inicio</a></li>
                                <li><a href={"/category/" + producto.categoria?.store_categoria_id}>{producto.categoria?.store_categoria_titulo}</a></li>
                                <li><a href={"/category/" + producto.subcategoria?.store_categoria_id}>{producto.subcategoria?.store_categoria_titulo}</a></li>
                                <li><a href={"/category/" + producto.subcategoria2?.store_categoria_id}>{producto.subcategoria2?.store_categoria_titulo}</a></li>
                            </ul>
                        </div>
                        <div className="detalle-producto shadow-xl">
                            <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-10 p-2 md:p-5">
                                <div className="">
                                    <div className={'block lg:hidden mb-5'}>
                                        <h1 >{producto.store_producto_nombre}</h1>
                                        <div className="text-left"><strong>SKU</strong> {producto.store_producto_sku} </div>
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
                                        <div><strong>Tienda:</strong> <span dangerouslySetInnerHTML={{__html:""+producto.puntoventa?.nombre}}></span></div>
                                        <div><strong>Ubicación:</strong> {producto.puntoventa?.direccion}</div>
                                        <div><strong>Ciudad:</strong> {producto.puntoventa?.ciudadnombre}</div>
                                    </div>
                                    
                                    </div>
                                <div >
                                    <div className={'hidden lg:block'}>
                                        <h1 >{producto.store_producto_nombre}</h1>
                                        <div className="text-left"><strong>SKU</strong> {producto.store_producto_sku} </div>
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
                                            <div className="md:col-span-2 text-left">{producto.store_producto_nuevo !== 1 ? "Nuevo" : "Usado"}</div>
                                        </div>
                                        <hr />
                                        <div className="grid sm:grid-cols-3 md:gap-5 p-2 md:p-5 items-center">
                                            <div className=" text-left md:text-right font-bold"  >Precio:</div>
                                            <div className="md:col-span-2 text-left ">
                                                <div>{producto.valores?.valor}</div>
                                            </div>
                                        </div>
                                        <hr />
                                        {
                                            producto?.inventario && producto?.inventario.cantidades.length > 0 ?
                                                <>
                                                    {
                                                        producto?.inventario.caracteristicas.map((caracteristica) => {
                                                            return (
                                                                <>
                                                                    <div className="grid sm:grid-cols-3 md:gap-5 p-2 md:p-5 items-center">
                                                                        <div className=" text-left md:text-right font-bold"  >{caracteristica.nombre}</div>
                                                                        <div className="md:col-span-2 text-left">
                                                                            <select className="select select-bordered  max-w-xs" name={"opcaracteristica" + caracteristica.id} id={"opcaracteristica" + caracteristica.id} onChange={()=>cantidadescarcteristicas(producto)} >
                                                                                {
                                                                                    caracteristica?.opciones.map((opcion) => {
                                                                                        return (
                                                                                            <option value={opcion.id}>
                                                                                                {opcion.nombre}
                                                                                            </option>
                                                                                        )

                                                                                    })
                                                                                }
                                                                            </select>
                                                                        </div>
                                                                    </div>

                                                                </>
                                                            )

                                                        })
                                                    }

                                                    {
                                                        <div className="grid sm:grid-cols-3 md:gap-5 p-2 md:p-5 items-center">
                                                            <div className=" text-left md:text-right font-bold"  >Cantidad</div>
                                                            <div className="md:col-span-2 text-left">
                                                                <select className="select select-bordered  max-w-xs" id={'catidades-producto'} >
                                                                </select>
                                                            </div>
                                                        </div>
                                                    }
                                                </>

                                                :
                                                <>
                                                    {
                                                        producto.store_producto_cantidad && producto.store_producto_cantidad > 1
                                                            ?
                                                            <div className="grid sm:grid-cols-3 md:gap-5 p-2 md:p-5 items-center">
                                                                <div className=" text-left md:text-right font-bold"  >Cantidad</div>
                                                                <div className="md:col-span-2 text-left">
                                                                    <select className="select select-bordered  max-w-xs catidades-producto" id={'catidades-producto'} >
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            :
                                                            <div className="grid sm:grid-cols-3 md:gap-5 p-2 md:p-5">
                                                                <div className=" text-left md:text-right font-bold">Cantidad:</div>
                                                                <input type="hidden" id={'catidades-producto'} value="1" />
                                                                <div className="md:col-span-2 text-left">Unica Unidad</div>
                                                            </div>
                                                    }
                                                </>
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
                                                <div>Fecha aproximada de entrega <strong>{fecha.getDate() + "-" + fecha.getMonth() + "-" + fecha.getFullYear()}</strong> <br />
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
                        <Carouselproducts titulo="Productos Relacionados" categoria={ producto.store_producto_subcategoria2} negocio={1384} agotado={1} />
                      
                        <div className="detalle-producto shadow-xl">
                            <h3>Descripcion</h3>
                            <div className="text-justify" dangerouslySetInnerHTML={{__html:""+producto.store_producto_descripcion}} />

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
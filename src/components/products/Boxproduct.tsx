import './Boxproduct.css';

export const Boxproduct = ({producto}:any)=>{
    return(
        <a href={"/producto/"+producto.store_producto_id} className=" card-producto card">
                <div className="image-product" style={{ backgroundImage: `url(${producto.miniatura})` }}></div>
                <div className={'info-producto'} >
                    <h2 className="titulo-producto">{ producto.store_producto_nombre}</h2>
                    <div className="valor-producto">{producto.valores?.valor}</div>
                </div>
            
        </a>
    )
}
import './Boxproduct.css';

export const Boxproduct = ({producto}:any)=>{
    return(
        <a href={"/producto/"+producto.id} className=" card-producto card">
                <div className="image-product" style={{ backgroundImage: `url(${producto.thumbnail})` }}></div>
                <div className={'info-producto'} >
                    <h2 className="titulo-producto">{ producto.name}</h2>
                    { parseInt(producto.old_value) > 0 ? 
                        <div>
                            <div className="valor-antes">$ {producto.value.toLocaleString('es-ES')}</div>
                            <div className="valor-producto">$ {producto.old_value.toLocaleString('es-ES')}</div>
                        </div>
                    :(
                        <div className="valor-producto">${producto.value.toLocaleString('es-ES')}</div>
                    )}
                    
                </div>
            
        </a>
    )
}
import { useParams, useSearchParams } from 'react-router-dom';
import { LayoutGeneral } from '../components/layout/General';
import { useEffect, useState } from 'react';
import { apiService } from '../api/fetch-data';
import { Boxproduct } from '../components/products/Boxproduct';
import { Product,Categoria } from "../models/product";
import { useGlobalContext } from 'context/Main';
export const Search = () => {
    const { mainState } = useGlobalContext();
    const [searchParams] = useSearchParams();
    const [resultadosb, setBusqueda] = useState({categorias:[], productos:{data:[],last_page:0,current_page:0}});
    let params = useParams();
    let busqueda = '';
    if (params.id) {
        busqueda = params.id;
    }
    const agotado = 1;
    let page = 1;
    if(searchParams.get('page')){
        page = parseInt(""+searchParams.get('page'));
    }
    useEffect(() => {
        apiService({negocio:1384,page,busqueda,agotado}).then((res) => {
            setBusqueda(res);
        });
    }, []);

    const printpaginate = (fin:number,actual:number)=>{
        let paginate = "";
        if(fin > 1){
          let iniciop = 1;
          let finp = fin;
          if(fin > 10 ){
              if(actual > 5 && (actual+5) < fin ){
                  iniciop = actual-5;
                  finp = actual+5;
                  
              } else if(actual > 5 ){
                iniciop = 10 - (fin - actual);
              } else {
                finp = 10;
              }
          }
          paginate = '<div class="btn-group btn-group-paginate shadow-xl">';
          if(actual !== 1){
            paginate = paginate +'<a href="/search/'+busqueda+'?page='+(actual-1)+'" class="btn btn-paginate">«</a>';
          }
          for (let index = iniciop; index <= finp; index++) {
            if(index === actual){
              paginate = paginate +'<a class="btn btn-paginate btn-active">'+index+'</a>';
            } else {
              paginate = paginate +'<a class="btn btn-paginate" href="/search/'+busqueda+'?page='+index+'" >'+index+'</a>';
            }
          }
          if(finp < fin){
            paginate = paginate +'<a class="btn btn-paginate btn-disabled">...'+fin+'</a>';
          }
          if(actual !== fin){
            paginate = paginate +'<a class="btn btn-paginate" href="/search/'+busqueda+'?page='+(actual+1)+'">»</a>';
          }
          paginate = paginate +'</div>';
        }
        return paginate; 
      }
    
    return (
        <LayoutGeneral>
            <div className="pl-5 pr-5 sm:container sm:mx-auto mt-10 mb-10">
              <div className={' grid grid-cols-1 lg:grid-cols-4   gap-10'}>
                  <div className={'hidden lg:inline-grid'}>
                    <ul className="menu menu-compact  menu-categorias bg-base-100 w-full rounded-box  p-0 ml-0 pl-0 shadow-xl">
                      <li className="menu-title text-left">
                        <span>Categorias</span>
                      </li>
                      {
                        mainState.categories && mainState.categories.length > 0 ?
                        mainState.categories?.map((datacategoria: Categoria) => {
                          return (
                            <li className={"p-0"} key={datacategoria.store_categoria_id}>
                              <a
                                className={"text-left"}
                                href={"/category/" + datacategoria.store_categoria_id}
                              >
                                {datacategoria.store_categoria_titulo}
                              </a>
                            </li>
                          );
                        })
                        : ""
                      }
                      </ul>
                  </div>
                  <div className={"lg:col-span-3"}>
                    <h1 className='titulo-principal'>Resultado Busqueda :  <span>{busqueda}</span></h1>
                    <div className={' grid grid-cols-2  lg:grid-cols-3 xl:grid-cols-4  gap-5'}>
                      {
                        resultadosb.productos?.data.map((product:Product)=>{
                           return (
                              <Boxproduct key={product.store_producto_id} producto={product} />
                           )
                        })
                      }
                    </div>
                    <div className={"mt-10"} dangerouslySetInnerHTML={{__html:printpaginate(resultadosb.productos.last_page,resultadosb.productos.current_page)}} >
                        
                    </div>
                  </div>
                  
              </div>
          </div>
        </LayoutGeneral>
    )
}
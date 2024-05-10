import { Carouselproducts } from '../components/carouselProducts/Carouselproducts';
import { Categories } from '../components/categories/Categories';
import { LayoutGeneral } from '../components/layout/General';
import { Slider } from '../components/slider/Slider';
import Bannerpago from '../elements/images/banner-pago.jpg';
export const Home = () => {
       
        return (
            <LayoutGeneral>
                <div className={"grid grid-cols-1 sm:grid-cols-4 barra-texto-home items-center"}>
                <div className={"col-span-3 info-barra"}>
                    <div>
                        <span>Conoce nuestras increíbles promociones del mes</span>
                        <svg   xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className=" p-4 w-6 h-6 hidden sm:inline ">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                        </svg>

                    </div>
                </div>
                <div>
                    <a href="/offers" className={'btn-barra'}>Promociones</a>
                </div>
            </div>
                <Slider />
                <div className="  md:container mx-auto">
                    <Carouselproducts titulo="Ultimos Productos"  agotado={1} />
                    <Carouselproducts titulo="Chaquetas" categoria={1}  agotado={1} />
                    <Carouselproducts titulo="Zapatos" categoria={2}  agotado={1} />
                    <img src={Bannerpago} alt="" style={{"width":"100%"}} className='shadow-xl' />
                    <Carouselproducts titulo="Buzos , Hoodies y Sudaderas" categoria={4}  agotado={1} />
                    <Carouselproducts titulo="Camisas" categoria={6}  agotado={1} />
                    <Categories />
                    <Carouselproducts titulo="Camisetas" categoria={5}  agotado={1} />
                    <Carouselproducts titulo="Pantalones" categoria={3}  agotado={1} />
                    <Carouselproducts titulo="Accesorios" categoria={9}  agotado={1} />
                </div>
            </LayoutGeneral>
          
        );
 }
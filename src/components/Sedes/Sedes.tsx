import Sede1 from '../../elements/images/negocio1.jpg';
import Sede2 from '../../elements/images/negocio2.jpg';
import Sede3 from '../../elements/images/negocio3.jpg';
import Sede4 from '../../elements/images/negocio4.jpg';

export const Sedes = ()=>{
    return(
        <div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10'}>
                <div className="card card-side bg-base-100 shadow-xl">
                    <figure ><img src={Sede1} alt='' /></figure>
                    <div className="card-body ">
                        <div className={'ancho-card-sede'}>
                            <h2>Sede 1</h2> 
                            <div>Avenida Caracas #65a - 66 Local 1 - 2 Chapinero, Bogota</div>
                            <br />
                            <p>Horario: Lunes a sábado de 10:00am a 6:30pm - Domingos y festivos: 10:30 a 4:00pm</p>
                        </div>
                    </div>
                </div>
                <div className="card card-side bg-base-100 shadow-xl">
                    <figure><img src={Sede2} alt=''  /></figure>
                    <div className="card-body ">
                        <div className={'ancho-card-sede'}>
                            <h2>Sede 2</h2> 
                            <div>Calle 66 #13 - 45 Local 5 Chapinero, Bogotá</div>
                            <br />
                            <p>Horario: Lunes a sábado de 10:00am a 6:30pm - Domingos y festivos: 10:30 a 4:00pm</p>
                        </div>
                    </div>
                </div>
                <div className="card card-side bg-base-100 shadow-xl">
                    <figure><img src={Sede3} alt='' /></figure>
                    <div className="card-body">
                        <div className={'ancho-card-sede'}>
                            <h2>Sede 3</h2>
                            <div>Ubaté Cundinamarca</div>
                            <br />
                            <p>Horario: Lunes a domingo de 10:00am a 7:00pm</p>
                        </div>
                    </div>
                </div>
                <div className="card card-side bg-base-100 shadow-xl">
                    <figure><img src={Sede4} alt='' /></figure>
                    <div className="card-body">
                        <div className={'ancho-card-sede'}>
                            <h2>Sede aliada Boutique Internacional</h2>
                            <div>Calle 66 12 13 Chapinero, Bogotá - Compra y venta de ropa de dama.</div>
                            <br />
                            <p>Horario: Lunes a sábado de 10:00am a 6:30pm - Domingos y festivos: 10:30 a 4:00pm</p>
                        </div>
                    </div>
                </div>
                
            </div>
    )
}
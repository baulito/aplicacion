export interface Compra {
    negocio_compra_id: number
    negocio_compra_fecha: string
    negocio_compra_hora: string
    negocio_compra_usuario: number
    negocio_compra_estado: number
    negocio_compra_estado_texto: string
    negocio_compra_id_pago: any
    negocio_compra_tipodocumento: string
    negocio_compra_documento: string
    negocio_compra_razonsocial: string
    negocio_compra_nombre: string
    negocio_compra_correo: string
    negocio_compra_telefono: string
    negocio_compra_celular: string
    negocio_compra_direccion: string
    negocio_compra_ciudad: string
    negocio_compra_pais: string
    negocio_compra_observacion: any
    negocio_compra_lugar_envio: any
    negocio_compra_subtotal: number
    negocio_compra_valor_envio: number
    negocio_compra_valor: string
    negocio_compra_idpago: string
    negocio_compra_medio: number
    negocio_compra_negocio: any
    negocio_compra_url: string
    negocio_compra_mpcode: any
    negocio_compra_mipaquete: any
    negocio_compra_tipopago:number
    negocio_compra_urlefecty:string
    items: CompraItem[]
    infopago?:InfoPago
    informacionenvio?:InfoEnvio
  }
  
  export interface CompraItem {
    negocio_compra_item_id: number
    negocio_compra_item_compraid: number
    negocio_compra_item_idproducto: number
    negocio_compra_item_nombre: string
    negocio_compra_item_tienda: string
    negocio_compra_item_imagen: string
    caracteristicas?: string
    caracteristicastxt: string
    negocio_compra_item_cantidad: number
    negocio_compra_item_valor: number
    negocio_compra_item_moneda: string
    negocio_compra_item_valorenvio: number
    negocio_compra_item_mipaquete: number
    negocio_compra_item_enviotipo: number
  }

  export interface InfoPago {
    estado?: string
    tipo?: string
    entidad?: string
    fecha?: string
  }

  export interface InfoEnvio {
    pdfGuide?:[]
    tracking?:Traking[]
  }

  export interface Traking {
    updateState?: string
    date?: string
  }
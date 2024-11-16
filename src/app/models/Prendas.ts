import { Usuarios } from "./Usuarios"

export class Prendas{

      id_prenda:number=0
      id_usuario: Usuarios=new Usuarios();
      nombre_prenda:string=""
      tipo_prenda:string=""
      imagen: Uint8Array = new Uint8Array();
      fecha_creacion:Date=new Date(Date.now())
      fecha_modificacion:Date=new Date(Date.now())
}
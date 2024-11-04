import { Usuarios } from "./Usuarios"

export class Galerias{
    idGaleria:number=0

    nombreGaleria:String=""

    fechaCreacion:Date=new Date(Date.now())

    fechaModificacion:Date=new Date(Date.now())

    idUsuario:Usuarios= new Usuarios()

}
import { Usuarios } from "./Usuarios"

export class Galerias{
    idGaleria:number=0

    idUsuario:Usuarios= new Usuarios()

    nombreGaleria:String=""

    fechaCreacion:Date=new Date(Date.now())

    fechaModificacion:Date=new Date(Date.now())

}
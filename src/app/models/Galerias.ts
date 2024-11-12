import { Usuarios } from "./Usuarios"

export class galerias{
    idGaleria:number=0
    nombreGaleria:string=""
    fechaCreacion:Date=new Date(Date.now())
    fechaModificacionDate=new Date(Date.now())
    idUsuario: Usuarios =new Usuarios()
}
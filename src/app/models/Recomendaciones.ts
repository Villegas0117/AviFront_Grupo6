import { Tendencia } from "./Tendencia"
import { Usuarios } from "./Usuarios"

export class Recomendaciones{
    id_Recomendacion:number=0
    descripcion:string=""
    fecha_creacion:Date = new Date(Date.now())
    fecha_modificacion:Date=new Date(Date.now())
    id_Usuario:Usuarios= new Usuarios()    
    id_Tendencia:Tendencia= new Tendencia()
}
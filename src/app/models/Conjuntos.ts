import { galerias } from "./Galerias";
import { Usuarios } from "./Usuarios";

export class Conjuntos{
      id_Conjunto: number = 0;
      id_Usuario: Usuarios=new Usuarios();
      nombre_Conjunto: string = "";
      id_Galeria: galerias= new galerias();
      fecha_Creacion: Date = new Date(Date.now());
      fecha_Modificacion: Date = new Date(Date.now());
}
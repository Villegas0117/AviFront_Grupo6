
import { Conjuntos } from "./Conjuntos";
import { Usuarios } from "./Usuarios";

export class ConjuntoSemanal{
    id:number=0;
 
    id_Conjunto:Conjuntos= new Conjuntos();

    id_usuario: Usuarios= new Usuarios();


    fechaCreacion:Date=new Date(Date.now());


    diaDeSemana:Date=new Date(Date.now());

}
export class Usuarios{
      id:number=0
      username:string=""
      email:string=""
      password:string=""
      enabled:Boolean=false
      fecha_registro:Date = new Date(Date.now())
      fecha_modificacion:Date=new Date(Date.now())
  }
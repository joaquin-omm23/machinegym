import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Cliente } from '../models/cliente';
import { Inscripcion } from '../models/inscripcion';
import { Precio } from '../models/precio';
import { MensajeService } from '../services/mensaje.service';

@Component({
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.component.html',
  styleUrls: ['./inscripcion.component.scss']
})
export class InscripcionComponent implements OnInit {
  inscripcion: Inscripcion = new Inscripcion();
  clienteSeleccionado: Cliente = new Cliente();
  precioSeleccionado: Precio = new Precio();
  precios: Precio[] = new Array <Precio>();
  idPrecio : string = "null"; 
  constructor(private db: AngularFirestore, private msj: MensajeService) { }

  ngOnInit(): void {
    this.db.collection('precios').get().subscribe((resultado)=>{
      resultado.docs.forEach((item)=>{
        let precio: any = item.data();
        precio.id = item.id;
        precio.ref = item.ref;
        this.precios.push(precio);

      })
    })
  }

  asignarCliente(cliente : Cliente){
    this.inscripcion.cliente = cliente.ref;
    this.clienteSeleccionado = cliente;
  }

  eliminarCliente(){
    this.inscripcion.cliente = undefined;
  }

  guardar(){
    if(this.inscripcion.validar().esValido){
      let inscripcionAgregar = {
        fecha: this.inscripcion.fecha,
        fechaFinal: this.inscripcion.fechaFinal,
        cliente:this.inscripcion.cliente,
        precios: this.inscripcion.precios,
        subtotal : this.inscripcion.subtotal,
        igv: this.inscripcion.igv,
        total: this.inscripcion.total,
      }

      this.db.collection('inscripciones').add(inscripcionAgregar).then((resultado)=>{
        this.inscripcion = new Inscripcion();
        this.clienteSeleccionado = new Cliente();
        this.precioSeleccionado = new Precio();
        this.idPrecio = "null";
        this.msj.mensajeCorrecto("Guardado", "Se guardó correctamente");
      })
    }
    else{
      this.msj.mensajeAdvertencia("Advertencia",this.inscripcion.validar().mensaje);
    }
  }

  seleccionarPrecio(id: string){
    if(id != "null"){
      this.precioSeleccionado = this.precios.find(x=> x.id == id)
      this.inscripcion.precios = this.precioSeleccionado.ref;

      this.inscripcion.subtotal = this.precioSeleccionado.costo;
      this.inscripcion.igv = this.inscripcion.subtotal * 0.18;
      this.inscripcion.total = this.inscripcion.subtotal + this.inscripcion.igv;

      this.inscripcion.fecha = new Date();

    

      // Para el tipo dia
      if(this.precioSeleccionado.tipoDuracion == 1){
      let dias: number = this.precioSeleccionado.duracion;
      let fechaFinal = new Date(this.inscripcion.fecha.getFullYear(),this.inscripcion.fecha.getMonth(),this.inscripcion.fecha.getDate() + dias);
      this.inscripcion.fechaFinal = fechaFinal;
      }
      // Para el tipo semana
      if(this.precioSeleccionado.tipoDuracion == 2){
      let dias: number = this.precioSeleccionado.duracion * 7;
      let fechaFinal = new Date(this.inscripcion.fecha.getFullYear(),this.inscripcion.fecha.getMonth(),this.inscripcion.fecha.getDate() + dias);
      this.inscripcion.fechaFinal = fechaFinal;
      }

      // Para el tipo quincena
      if(this.precioSeleccionado.tipoDuracion == 3){
      let dias: number = this.precioSeleccionado.duracion * 15;
      let fechaFinal = new Date(this.inscripcion.fecha.getFullYear(),this.inscripcion.fecha.getMonth(),this.inscripcion.fecha.getDate() + dias);
      this.inscripcion.fechaFinal = fechaFinal;
      }

      // Para el tipo mes
      if(this.precioSeleccionado.tipoDuracion == 4){
      let anio:number = this.inscripcion.fecha.getFullYear();
      let meses = this.precioSeleccionado.duracion + this.inscripcion.fecha.getMonth();
      let dia: number = this.inscripcion.fecha.getDate();
      let fechaFinal = new Date(anio,meses,dia);
      this.inscripcion.fechaFinal = fechaFinal;
      }

      // Para el tipo año
      if(this.precioSeleccionado.tipoDuracion == 5){
      let anio:number = this.inscripcion.fecha.getFullYear() + this.precioSeleccionado.duracion;
      let meses = this.inscripcion.fecha.getMonth();
      let dia: number = this.inscripcion.fecha.getDate();
      let fechaFinal = new Date(anio,meses,dia);
      this.inscripcion.fechaFinal = fechaFinal;
      }
    }
    else{
      this.precioSeleccionado = new Precio();
      this.inscripcion.precios = null;
      this.inscripcion.fecha = null;
      this.inscripcion.fechaFinal = null;
      this.inscripcion.subtotal = 0;
      this.inscripcion.igv = 0;
      this.inscripcion.total = 0;
    }
  }
}

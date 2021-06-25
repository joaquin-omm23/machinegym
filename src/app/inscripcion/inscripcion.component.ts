import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Cliente } from '../models/cliente';
import { Inscripcion } from '../models/inscripcion';
import { Precio } from '../models/precio';

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
  
  constructor(private db: AngularFirestore) { }

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
    console.log(this.inscripcion);
  }

  seleccionarPrecio(id: string){
    this.precioSeleccionado = this.precios.find(x=> x.id == id)
    this.inscripcion.precios = this.precioSeleccionado.ref;
  }
}

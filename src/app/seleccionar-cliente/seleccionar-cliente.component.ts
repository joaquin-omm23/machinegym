import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Cliente } from '../models/cliente';

@Component({
  selector: 'app-seleccionar-cliente',
  templateUrl: './seleccionar-cliente.component.html',
  styleUrls: ['./seleccionar-cliente.component.scss']
})
export class SeleccionarClienteComponent implements OnInit {
  clientes: Cliente[] = new Array<Cliente>();
  constructor(private db: AngularFirestore) { }

  ngOnInit() {
    this.db.collection<any>('clientes').get().subscribe((resultados)=>{
      this.clientes.length = 0
      resultados.docs.forEach((item)=>{
        let cliente: Cliente = item.data();
        cliente.id = item.id;
        cliente.ref = item.ref;
        cliente.visible = false;
        this.clientes.push(cliente);
      })
    })
  }
  
  buscarClientes(nombre: string){
    console.log(nombre)
  }


}

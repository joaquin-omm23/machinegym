import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Cliente } from '../models/cliente';

@Component({
  selector: 'app-listado-clientes',
  templateUrl: './listado-clientes.component.html',
  styleUrls: ['./listado-clientes.component.scss'],
})
export class ListadoClientesComponent implements OnInit {
  clientes: Cliente[] = new Array<Cliente>();
  constructor(private db: AngularFirestore) { }

  ngOnInit(){

    /*this.db.collection('clientes').valueChanges().subscribe((resultado)=>{
      this.clientes = resultado;
      console.log(resultado);
    })*/
    
    this.db.collection('clientes').get().subscribe((resultado)=>{
      console.log(resultado.docs)
      this.clientes.length = 0;
      resultado.docs.forEach((item)=>{
        let cliente: any = item.data()
        cliente.id = item.id;
        cliente.ref = item.ref;
        this.clientes.push(cliente);
      })

    })

  }
}

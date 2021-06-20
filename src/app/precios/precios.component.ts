import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MensajeService } from '../services/mensaje.service';

@Component({
  selector: 'app-precios',
  templateUrl: './precios.component.html',
  styleUrls: ['./precios.component.scss']
})
export class PreciosComponent implements OnInit {
  formularioPrecio: FormGroup;
  precios: any[] = new Array<any>();
  constructor(
    private fb: FormBuilder, 
    private db:AngularFirestore,
    private msj: MensajeService
    ) { }

  ngOnInit(): void {
    this.formularioPrecio = this.fb.group({
      nombre: ['', Validators.required],
      costo: ['', Validators.required],
      duracion: ['',Validators.required],
      tipoDuracion: ['',Validators.required]
    })

    this.db.collection('precios').get().subscribe((resultado)=>{
      resultado.docs.forEach((dato)=>{
        let precio: any = dato.data();
        precio.id = dato.id;
        precio.ref = dato.ref;
        this.precios.push(precio)
      });
    })


  }

  agregarPrecio(){
    this.db.collection('precios').add(this.formularioPrecio.value).then(()=>{
      this.msj.mensajeCorrecto('Agregado', 'Se agrego correctamente');
      this.formularioPrecio.reset()
    }).catch(()=>{
      this.msj.mensajeError('Error', 'ocurrio un error')
    })
  }

}

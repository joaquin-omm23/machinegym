import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Precio } from '../models/precio';
import { MensajeService } from '../services/mensaje.service';

@Component({
  selector: 'app-precios',
  templateUrl: './precios.component.html',
  styleUrls: ['./precios.component.scss']
})
export class PreciosComponent implements OnInit {
  formularioPrecio: FormGroup;
  precios: Precio[] = new Array<Precio>();
  esEditable: boolean = false;
  id: string;

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

    this.mostrarPrecios();

  }

  //mostrar Precios en la lista
  mostrarPrecios(){
    this.db.collection<Precio>('precios').get().subscribe((resultado)=>{
      this.precios.length = 0;
      resultado.docs.forEach((dato)=>{
        let precio = dato.data() as Precio;
        precio.id = dato.id;
        precio.ref = dato.ref;
        this.precios.push(precio)
      });
    })
  }

  //agregar Precio
  agregarPrecio(){
    this.db.collection<Precio>('precios').add(this.formularioPrecio.value).then(()=>{
      this.msj.mensajeCorrecto('Agregado', 'Se agrego correctamente');
      this.formularioPrecio.reset()
      this.mostrarPrecios();
    }).catch(()=>{
      this.msj.mensajeError('Error', 'ocurrio un error')
    })
  }

  //linea del precio a editar
  editarUnidad(precio: Precio){
    this.esEditable = true;
    this.formularioPrecio.setValue({
      nombre: precio.nombre,
      costo: precio.costo,
      duracion: precio.duracion,
      tipoDuracion: precio.tipoDuracion
    })

    this.id = precio.id;
  }

  editarPrecio(){
    this.db.doc('precios/' + this.id).update(this.formularioPrecio.value).then(()=>{
      this.msj.mensajeCorrecto('Editado', 'Se editó correctamente');
      this.formularioPrecio.reset();
      this.esEditable = false;
      this.mostrarPrecios();
    }).catch(()=>{
      this.msj.mensajeError('Error', 'ocurrio un error imprevisto')
    })
  }

}

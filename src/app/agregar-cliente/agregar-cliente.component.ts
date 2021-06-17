import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MensajeService } from '../services/mensaje.service';
@Component({
  selector: 'app-agregar-cliente',
  templateUrl: './agregar-cliente.component.html',
  styleUrls: ['./agregar-cliente.component.scss'],
})
export class AgregarClienteComponent implements OnInit {
  formularioCliente: FormGroup;
  porcentajeSubida: number = 0;
  urlImagen: string = '';
  esEditable: boolean = false;
  id: string;

  constructor(
    private fb: FormBuilder,
    private storage: AngularFireStorage,
    private col: AngularFirestore,
    private activeRoute: ActivatedRoute,
    private msj: MensajeService
  ) {}

  ngOnInit() {

    this.formularioCliente = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', Validators.compose([Validators.required, Validators.email])],
      cedula: [''],
      fechaNacimiento: ['', Validators.required],
      telefono: [''],
      imgUrl: ['', Validators.required],
    })

    
    this.id = this.activeRoute.snapshot.params.ClienteID
    if(this.id != undefined){
      this.esEditable = true;
      this.col.doc<any>('clientes'+'/' + this.id).valueChanges().subscribe((cliente)=>{

        this.formularioCliente.setValue({
          nombre: cliente.nombre,
          apellido: cliente.apellido,
          correo: cliente.correo,
          fechaNacimiento: new Date(cliente.fechaNacimiento.seconds * 1000).toISOString().substring(0,10),
          telefono: cliente.telefono,
          cedula: cliente.cedula,
          imgUrl: ''
        })
  
        this.urlImagen = cliente.imgUrl;
  
      });
    }
  }

  //agregando cliente
  agregar() {
    this.formularioCliente.value.imgUrl = this.urlImagen;
    this.formularioCliente.value.fechaNacimiento = new Date(
      this.formularioCliente.value.fechaNacimiento
    );
    console.log(this.formularioCliente.value);
    this.col
      .collection('clientes')
      .add(this.formularioCliente.value)
      .then((termino) => {
        this.msj.mensajeCorrecto('Agregado','Se agrego correctamente');
      });
  }

  //editar cliente
  editar(){
    this.formularioCliente.value.imgUrl = this.urlImagen;
    this.formularioCliente.value.fechaNacimiento = new Date(
      this.formularioCliente.value.fechaNacimiento
    );
    this.col.doc('clientes/' + this.id).update(this.formularioCliente.value).
    then(()=>{
      this.msj.mensajeCorrecto('Editado','Se edito satisfactoriamente');
    }).catch(()=>{
      this.msj.mensajeError('Error','Se encontro un error durante la actualizacion');
    })
  }

  // subir foto de perfil
  subirImagen(evento: any) {
    if (evento.target.files.length > 0) {
      let nombre = new Date().getTime().toString();
      let archivo = evento.target.files[0];

      let extension = archivo.name
        .toString()
        .substring(archivo.name.toString().lastIndexOf('.'));

      let ruta = 'clientes/' + nombre + extension;
      const referencia = this.storage.ref(ruta);
      const tarea = referencia.put(archivo);
      tarea.then((objeto) => {
        referencia.getDownloadURL().subscribe((url) => {
          this.urlImagen = url;
        });
      });

      tarea.percentageChanges().subscribe((porcentaje) => {
        this.porcentajeSubida = parseInt(porcentaje.toString());
      });
    }
  }
}

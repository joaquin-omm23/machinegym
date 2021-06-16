import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregar-cliente',
  templateUrl: './agregar-cliente.component.html',
  styleUrls: ['./agregar-cliente.component.scss'],
})
export class AgregarClienteComponent implements OnInit {
  formularioCliente: FormGroup;
  porcentajeSubida: number = 0;
  urlImagen: string = '';

  constructor(
    private fb: FormBuilder,
    private storage: AngularFireStorage,
    private col: AngularFirestore
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
    });
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
        console.log('Registro creado');
      });
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

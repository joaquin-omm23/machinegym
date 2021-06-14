import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.scss'],
})
export class EncabezadoComponent implements OnInit {
  usuario: firebase.User | null;
  constructor(private auth: AngularFireAuth) {}

  ngOnInit(): void {}

  logout() {
    this.auth.signOut();
  }
}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { EncabezadoComponent } from './encabezado/encabezado.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ListadoClientesComponent } from './listado-clientes/listado-clientes.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { AgregarClienteComponent } from './agregar-cliente/agregar-cliente.component';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { MensajeService } from './services/mensaje.service';
import { PreciosComponent } from './precios/precios.component';
import { InscripcionComponent } from './inscripcion/inscripcion.component';
import { SeleccionarClienteComponent } from './seleccionar-cliente/seleccionar-cliente.component';
import { ListadoInscripcionesComponent } from './listado-inscripciones/listado-inscripciones.component';
import { InicioComponent } from './inicio/inicio.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EncabezadoComponent,
    ListadoClientesComponent,
    AgregarClienteComponent,
    PreciosComponent,
    InscripcionComponent,
    SeleccionarClienteComponent,
    ListadoInscripcionesComponent,
    InicioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AccordionModule.forRoot(),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSpinnerModule,
    AngularFireStorageModule,
    ProgressbarModule.forRoot(),
    BsDropdownModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [
    AngularFireModule,
    AngularFirestore,
    MensajeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { AgregarClienteComponent } from './agregar-cliente/agregar-cliente.component';
import { InscripcionComponent } from './inscripcion/inscripcion.component';
import { ListadoClientesComponent } from './listado-clientes/listado-clientes.component';
import { ListadoInscripcionesComponent } from './listado-inscripciones/listado-inscripciones.component';
import { PreciosComponent } from './precios/precios.component';

const routes: Routes = [
  {
    path:'', redirectTo: 'inicio', pathMatch:'full'
  },
  {
    path: 'inicio', component: InicioComponent
  },
  {
    path: 'inscripcion', component: InscripcionComponent
  },
  {
    path: 'listado-clientes', component: ListadoClientesComponent
  },
  {
    path: 'agregar-clientes', component: AgregarClienteComponent
  },
  {
    path: 'agregar-clientes/:ClienteID', component: AgregarClienteComponent
  },
  {
    path: 'precios', component: PreciosComponent
  },
  {
    path:'listado-inscripciones', component: ListadoInscripcionesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

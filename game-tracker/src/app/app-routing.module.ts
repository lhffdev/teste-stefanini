import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaJogosComponent } from './lista-jogos/lista-jogos.component';


const routes: Routes = [
  { path: '', redirectTo: 'lista-de-jogos', pathMatch: 'full' },
  { path: 'lista-de-jogos', component: ListaJogosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

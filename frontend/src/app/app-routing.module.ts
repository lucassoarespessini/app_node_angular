import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProdutoListagemComponent } from './components/produto-listagem/produto-listagem.component';
import { ProdutoCadastroComponent } from './components/produto-cadastro/produto-cadastro.component';
import { ProdutoDetalhesComponent } from './components/produto-detalhes/produto-detalhes.component';
import { ProdutoEditarComponent } from './components/produto-editar/produto-editar.component';
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'produto-listagem' },
  { path: 'produto-listagem', component: ProdutoListagemComponent },
  { path: 'produto-cadastro', component: ProdutoCadastroComponent },
  { path: 'produto-detalhes/:id', component: ProdutoDetalhesComponent },
  { path: 'produto-editar/:id', component: ProdutoEditarComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
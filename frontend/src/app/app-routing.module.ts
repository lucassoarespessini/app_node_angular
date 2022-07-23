import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersListComponent } from './components/users-list/users-list.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { ProdutoListagemComponent } from './components/produto-listagem/produto-listagem.component';
import { ProdutoCadastroComponent } from './components/produto-cadastro/produto-cadastro.component';
import { ProdutoDetalhesComponent } from './components/produto-detalhes/produto-detalhes.component';
import { ProdutoEditarComponent } from './components/produto-editar/produto-editar.component';
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'add-user' },
  { path: 'users-list', component: UsersListComponent },
  { path: 'add-user', component: AddUserComponent },
  { path: 'edit-user/:id', component: UserDetailComponent },
  { path: 'file-upload', component: FileUploadComponent },
  { path: 'produto-listagem', component: ProdutoListagemComponent },
  { path: 'produto-cadastro', component: ProdutoCadastroComponent },
  { path: 'produto-detalhes', component: ProdutoDetalhesComponent },
  { path: 'produto-editar/:id', component: ProdutoEditarComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
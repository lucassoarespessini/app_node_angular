import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { ProdutoListagemComponent } from './components/produto-listagem/produto-listagem.component';
import { ProdutoCadastroComponent } from './components/produto-cadastro/produto-cadastro.component';
import { ProdutoDetalhesComponent } from './components/produto-detalhes/produto-detalhes.component';
import { ProdutoEditarComponent } from './components/produto-editar/produto-editar.component';
import { ProdutoTabelaComponent } from './components/produto-tabela/produto-tabela.component';

@NgModule({
  declarations: [
    AppComponent,
    ProdutoListagemComponent,
    ProdutoCadastroComponent,
    ProdutoDetalhesComponent,
    ProdutoEditarComponent,
    ProdutoTabelaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

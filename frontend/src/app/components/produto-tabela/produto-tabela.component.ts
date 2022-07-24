import { Component, OnInit } from '@angular/core';
import { CrudService } from './../../service/crud.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-produto-tabela',
  templateUrl: './produto-tabela.component.html',
  styleUrls: ['./produto-tabela.component.css']
})
export class ProdutoTabelaComponent implements OnInit {

  Produtos: any = [];
  REST_API: string = 'http://' + environment.LOCAL_HOST + ':' + environment.LOCAL_PORT;
  constructor(private crudService: CrudService) { }
  ngOnInit(): void {
    this.crudService.GetProdutos().subscribe(res => {
      console.log(res)
      this.Produtos = res;
    });
  }
  delete(id: any, i: any) {
    console.log(id);
    if (window.confirm('Do you want to go ahead?')) {
      this.crudService.deleteProduto(id).subscribe((res) => {
        this.Produtos.data.splice(i, 1);
      })
    }
  }

}

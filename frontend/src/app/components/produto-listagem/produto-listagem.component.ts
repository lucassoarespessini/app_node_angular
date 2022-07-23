import { Component, OnInit } from '@angular/core';
import { CrudService } from './../../service/crud.service';

@Component({
  selector: 'app-produto-listagem',
  templateUrl: './produto-listagem.component.html',
  styleUrls: ['./produto-listagem.component.css']
})
export class ProdutoListagemComponent implements OnInit {

  Produtos:any = [];
  constructor(private crudService: CrudService) { }
  ngOnInit(): void {
    this.crudService.GetProdutos().subscribe(res => {
      console.log(res)
      this.Produtos =res;
    });    
  }
  delete(id:any, i:any) {
    console.log(id);
    if(window.confirm('Do you want to go ahead?')) {
      this.crudService.deleteProduto(id).subscribe((res) => {
        this.Produtos.splice(i, 1);
      })
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { CrudService } from './../../service/crud.service';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-produto-detalhes',
  templateUrl: './produto-detalhes.component.html',
  styleUrls: ['./produto-detalhes.component.css']
})
export class ProdutoDetalhesComponent implements OnInit {

  getId: any;
  Produto:any = [];
  constructor(
    private crudService: CrudService,
    private activatedRoute: ActivatedRoute,
    ) { }
  ngOnInit(): void {
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');
    this.crudService.GetProduto(this.getId).subscribe(res => {
      this.Produto =res;
    
  });
}

}

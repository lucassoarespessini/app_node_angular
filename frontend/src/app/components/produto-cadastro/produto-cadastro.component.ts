import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from './../../service/crud.service';
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-produto-cadastro',
  templateUrl: './produto-cadastro.component.html',
  styleUrls: ['./produto-cadastro.component.css']
})
export class ProdutoCadastroComponent implements OnInit {

  produtoForm: FormGroup;
  
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private crudService: CrudService
  ) { 
    this.produtoForm = this.formBuilder.group({
      nome: [''],
      imagem: [''],
      descricao: [''],
      estoque: ['0'],
      status: [false],
      preco: ['0.00']
    })
  }
  ngOnInit() { }
  onSubmit(): any {
    this.crudService.AddProduto(this.produtoForm.value)
    .subscribe(() => {
        console.log('Produto added successfully!')
        this.ngZone.run(() => this.router.navigateByUrl('/produto-listagem'))
      }, (err) => {
        console.log(err);
    });
  }

}

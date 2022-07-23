import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from './../../service/crud.service';
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-produto-editar',
  templateUrl: './produto-editar.component.html',
  styleUrls: ['./produto-editar.component.css']
})
export class ProdutoEditarComponent implements OnInit {
  getId: any;
  updateForm: FormGroup;
  
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private crudService: CrudService
  ) {
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');
    this.crudService.GetProduto(this.getId).subscribe(res => {
      this.updateForm.setValue({
        nome: res['data']['nome'],
        imagem: res['data']['imagem'],
        descricao: res['data']['descricao'],
        estoque: res['data']['estoque'],
        status: res['data']['status'],
        preco: res['data']['preco']
      });
    });
    this.updateForm = this.formBuilder.group({
      nome: [''],
      imagem: [''],
      descricao: [''],
      estoque: ['0'],
      status: [false],
      preco: ['0.00']
    })
  }
  ngOnInit() { }
  onUpdate(): any {
    this.crudService.updateProduto(this.getId, this.updateForm.value)
    .subscribe(() => {
        console.log('Produto updated successfully!')
        this.ngZone.run(() => this.router.navigateByUrl('/produto-listagem'))
      }, (err) => {
        console.log(err);
    });
  }

}

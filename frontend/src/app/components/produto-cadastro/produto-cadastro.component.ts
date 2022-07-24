import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from './../../service/crud.service';
import { FormGroup, FormBuilder } from "@angular/forms";
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-produto-cadastro',
  templateUrl: './produto-cadastro.component.html',
  styleUrls: ['./produto-cadastro.component.css']
})
export class ProdutoCadastroComponent implements OnInit {

  produtoForm: FormGroup;
  fileName = '';
  REST_API: string = 'http://' + environment.LOCAL_HOST + ':' + environment.LOCAL_PORT;


  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private crudService: CrudService,
    private http: HttpClient
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
  onFileSelected(event: any) {

    const file: File = event.target.files[0];

    if (file) {

      this.fileName = file.name;

      const formData = new FormData();

      formData.append("thumbnail", file);

      const upload$ = this.http.post(`${this.REST_API}/upload`, formData);

      upload$.subscribe();
    }
  }
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

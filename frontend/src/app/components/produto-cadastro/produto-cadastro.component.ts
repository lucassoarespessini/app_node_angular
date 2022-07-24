import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from './../../service/crud.service';
import { FormGroup, FormBuilder } from "@angular/forms";
import { HttpClientModule, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';



@Component({
  selector: 'app-produto-cadastro',
  templateUrl: './produto-cadastro.component.html',
  styleUrls: ['./produto-cadastro.component.css']
})
export class ProdutoCadastroComponent implements OnInit {

  produtoForm: FormGroup;
  fileName: any = '';
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

      console.log(file)

      const formData = new FormData();

      formData.append("file", file);
      formData.append("file_name", this.fileName);

      const upload$ = this.http.post(`${this.REST_API}/upload`, formData).pipe(map((res: any) => {
        return res || {}
      }),
        catchError(this.handleError)
      );

      upload$.subscribe(res => {
        this.fileName = res['data'];
      });

    }
  }
  onSubmit(): any {
    this.produtoForm.value.imagem = this.fileName;
    this.crudService.AddProduto(this.produtoForm.value)
      .subscribe(() => {
        console.log('Produto added successfully!')
        this.ngZone.run(() => this.router.navigateByUrl('/produto-listagem'))
      }, (err) => {
        console.log(err);
      });
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Handle client error
      errorMessage = error.error.message;
    } else {
      // Handle server error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}

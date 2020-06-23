import { environment as env } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemVendaService {
  // injeção de dependência: em vez de criarmos manualmente
  // as dependências necessárias, o próprio Angular
  // as cria e  INJETA o objeto já instanciado
  // como  parâmetro do construtor
  constructor(private http: HttpClient) { }

  private apiUri : string = env.apiBaseUri + 'item-venda'

  listar() {
    return this.http.get(this.apiUri).toPromise()
  }

  excluir(id: string){
    return this.http.request('DELETE', this.apiUri,
     {body: {_id: id}}).toPromise()
  }

  novo(body : any){
    return this.http.post(this.apiUri, body).toPromise()
  }

  atualizar(body : any){
    return this.http.put(this.apiUri, body).toPromise()
  }

  obterUm(id: string){
    return this.http.get(this.apiUri + '/' + id ).toPromise()
  }
}


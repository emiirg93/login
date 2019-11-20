import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { map } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url:string = "https://identitytoolkit.googleapis.com/v1/accounts:"
  private apiKey:string = "AIzaSyA91wD6b-VMGH-mmYb5zZV3LJJcISsEDMI"

  //signUp?key=[API_KEY] registrarse
  //signInWithPassword?key=[API_KEY] logearse
  
  token:string;

  constructor(private http:HttpClient) {
    this.leerToken();
   }

  logout(){}

  login(usuario:UsuarioModel){
    const authData={
      email: usuario.email,
      password:usuario.password,
      returnSecureToken:true
    }

    return this.http
    .post(`${this.url}signInWithPassword?key=${this.apiKey}`,authData)
    .pipe(
      map( resp => {
        this.guardarToken(resp['idToken']);
        return resp;
      })
    );

  }

  registrarse(usuario:UsuarioModel){
    const authData={
      email: usuario.email,
      password:usuario.password,
      returnSecureToken:true
    }

    return this.http
    .post(`${this.url}signUp?key=${this.apiKey}`,authData)
    .pipe(
      map( resp => {
        this.guardarToken(resp['idToken']);
        return resp;
      })
    );
  }


  private guardarToken(token:string){
    this.token = token;
    localStorage.setItem('token',token);
  }

  leerToken(){
    if(localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
    }else{
      this.token = '';
    }

    return this.token;
  }
}

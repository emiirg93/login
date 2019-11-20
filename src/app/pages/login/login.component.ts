import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario:UsuarioModel;

  constructor(private service:AuthService, private router:Router) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
  }

  onSubmit(f:NgForm){
    if(f.invalid){
      return;
    }

    Swal.fire({
      title: 'Espere por favor',
      allowOutsideClick: false,
      icon: 'info',
    })
    Swal.showLoading();

    this.service.login(this.usuario)
    .subscribe(data =>{
      console.log(data);
      Swal.close();
      this.router.navigateByUrl('/home');

    }, err =>{
      console.log(err.error.error.message);

      Swal.fire({
        title:'Error al autenticar',
        text: err.error.error.message ,
        icon: 'error',
      })
    })
  }

}

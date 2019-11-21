import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario:UsuarioModel;
  recordar:boolean = false;

  constructor(private service:AuthService, private router:Router) { }

  ngOnInit() { 
    this.usuario= new UsuarioModel();
  }

  onSubmit( f:NgForm){

    if(f.invalid){
      return;
    }

    Swal.fire({
      title: 'Espere por favor',
      allowOutsideClick: false,
      icon: 'info',
    })
    Swal.showLoading();

    this.service.registrarse(this.usuario)
    .subscribe(data =>{
      console.log(data);
      Swal.close()

      if(this.recordar){
        localStorage.setItem('email',this.usuario.email);
      }

      this.router.navigateByUrl('/home');

    }, err => {
      console.log(err.error.error.message);

      Swal.fire({
        title: 'Email Ya Registrado',
        text: err.error.error.message,
        allowOutsideClick: false,
        icon: 'error',
      })
    })
  }


}

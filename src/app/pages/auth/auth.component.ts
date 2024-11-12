import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IAuth } from 'src/app/interfaces/auth';
import { IUser } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  registerForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  hasAccount: boolean = true;
  returnUrl: string = '';

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.returnUrl =
      this.route.snapshot.queryParams['returnUrl'.toString()] || '/';
  }

  login() {
    const body: IAuth = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    this.authService.login(body).subscribe(
      (resp: any) => {
        localStorage.setItem('token', resp.token);
        this.router.navigate([this.returnUrl]);
      },
      (err) => {
        console.log(err.error.error);
        let message = JSON.stringify(err.error.error);

        Swal.fire({
          title: 'Error!',
          text: `${message}`,
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      }
    );
  }

  changeForm() {
    this.hasAccount = !this.hasAccount;
  }
  register() {
    const body: IUser = {
      name: this.registerForm.value.name,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
    };

    this.authService.register(body).subscribe(
      (resp: any) => {
        Swal.fire({
          title: 'Usuario creado exitosamente!',
          text: 'El usuario ha sido creado, ya puedes iniciar sesión',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        }).then((result) => {
          if (result.isConfirmed) {
            this.changeForm();
          }
        });
      },
      (err) => {
        Swal.fire({
          title: 'Error!',
          text: `${err.error.error}`,
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      }
    );
  }
}

import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  correo_electronico = '';
  contrasena = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    this.auth.login({
      correo_electronico: this.correo_electronico,
      contrasena: this.contrasena
    }).subscribe({
      next: (res: any) => {
        localStorage.setItem('api_token', res.api_token);
        this.router.navigate(['/']); // redirige a la página principal
      },
      error: (err) => {
        this.error = 'Credenciales incorrectas.';
      }
    });
  }
}

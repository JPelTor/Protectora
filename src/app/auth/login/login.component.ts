import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [CommonModule, FormsModule, RouterModule],
})
export class LoginComponent {
  correo_electronico: string = '';
  contrasena: string = '';
  errorMessage = '';
  
  constructor(private authService: AuthService, private router: Router) {}
  
  login(): void {
    this.authService.login(this.correo_electronico, this.contrasena).subscribe({
      next: () => {
        this.router.navigate(['/animales']);
      },
      error: () => {
        this.errorMessage = 'Correo electrónico o contraseña incorrectos.';
      }
    });
  }
};
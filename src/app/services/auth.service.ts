// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://proyectoprotectora-production.up.railway.app/api';
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient, private router: Router) { }

  private hasToken(): boolean {
    return !!localStorage.getItem('api_token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('api_token');
  }

  login(correo_electronico: string, contrasena: string): Observable<any> {
    return this.http.post<{ api_token: string, usuario: any }>(`${this.apiUrl}/login`, { correo_electronico: correo_electronico, contrasena: contrasena })
      .pipe(
        tap(res => {
          localStorage.setItem('api_token', res.api_token);
          localStorage.setItem('usuario', JSON.stringify(res.usuario));
          this.loggedIn.next(true);
        })
      );
  }

  logout() {
    const token = this.getToken();

    if (token) {
      this.http.post(`${this.apiUrl}/logout`, { api_token: token }).subscribe({
        next: () => {
          localStorage.removeItem('api_token');
          localStorage.removeItem('usuario');
          this.loggedIn.next(false);
          this.router.navigate(['/login']);
        },
        error: err => {
          console.error('Error al cerrar sesión', err);
          localStorage.removeItem('api_token'); // Por seguridad, lo eliminamos igual
          this.router.navigate(['/login']);
        }
      });
    } else {
      this.router.navigate(['/login']);
    }
  }

  getToken(): string | null {
    return localStorage.getItem('api_token');
  }

  getUsuario() {
    const usuario = localStorage.getItem('usuario');
    return usuario ? JSON.parse(usuario) : null;
  }
}

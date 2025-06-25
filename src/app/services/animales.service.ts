import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

export interface Animal {
  id_animal: number;
  nombre: string;
  tipo: string;
  edad?: number;
  sexo: 'M' | 'F';
  descripcion?: string;
  estado_adopcion: 'disponible' | 'adoptado' | 'en_proceso';
  foto?: string;
  fecha_ingreso: string;
  id_adoptante?: number | null;
}

@Injectable({
  providedIn: 'root'
})
export class AnimalesService {
  private apiUrl = 'https://proyectoprotectora-production.up.railway.app/api/animals';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders() {
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.authService.getToken()}`
      })
    };
  }

  getAnimales(): Observable<Animal[]> {
    return this.http.get<Animal[]>(this.apiUrl);
  }

  getAnimal(id: number): Observable<Animal> {
    return this.http.get<Animal>(`${this.apiUrl}/${id}`/*, this.getHeaders()*/);
  }

  createAnimal(data: Partial<Animal>): Observable<Animal> {
    return this.http.post<Animal>(this.apiUrl, data, this.getHeaders());
  }

  updateAnimal(id: number, data: Partial<Animal>): Observable<Animal> {
    return this.http.put<Animal>(`${this.apiUrl}/${id}`, data, this.getHeaders());
  }

  deleteAnimal(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, this.getHeaders());
  }
}

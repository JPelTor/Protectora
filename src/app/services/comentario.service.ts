import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ComentarioService {
  private apiUrl = 'https://proyectoprotectora-production.up.railway.app/api/comentarios';

  constructor(private http: HttpClient) {}

  getComentarios(filtro: { id_animal?: number; id_evento?: number; id_noticia?: number }): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { params: filtro });
  }

  crearComentario(comentario: any): Observable<any> {
    const api_token= localStorage.getItem('api_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${api_token}`
    });

    return this.http.post(this.apiUrl, comentario, { headers });
  }
}

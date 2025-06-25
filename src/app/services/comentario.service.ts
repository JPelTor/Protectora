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

  crearComentario(comentario: any, api_token: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${api_token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post(this.apiUrl, comentario, { headers });
  }
}

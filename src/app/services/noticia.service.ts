import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Noticia {
  id_noticia: number;
  fecha: string;
  lugar: string;
  titular: string;
  asunto: string;
  contenido_resumido: string;
  contenido_completo: string;
  imagen: string;
}

@Injectable({
  providedIn: 'root',
})
export class NoticiaService {
  private apiUrl = 'https://proyectoprotectora-production.up.railway.app/api/noticias';

  constructor(private http: HttpClient) {}

  getNoticias(): Observable<Noticia[]> {
    return this.http.get<Noticia[]>(this.apiUrl);
  }

  getNoticia(id: number): Observable<Noticia> {
    return this.http.get<Noticia>(`${this.apiUrl}/${id}`);
  }
}

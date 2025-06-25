import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimalesService, Animal } from '../../../services/animales.service';
import { ComentarioService } from '../../../services/comentario.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-animales-detail',
  templateUrl: './animales-detail.component.html',
  imports: [RouterModule, CommonModule, FormsModule]
})
export class AnimalesDetailComponent implements OnInit {
  animal?: Animal;
  error = '';
  comentarios: any[] = [];
  nuevoComentario: string = '';
  usuarioLogueado: boolean = false;
  token: string = '';
  usuarioId?: number;

  constructor(
    private route: ActivatedRoute,
    private animalesService: AnimalesService,
    private comentarioService: ComentarioService
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.token = localStorage.getItem('api_token') || '';
    this.usuarioLogueado = !!this.token;

    const usuarioString = localStorage.getItem('usuario');
    if (usuarioString) {
      const usuarioObj = JSON.parse(usuarioString);
      this.usuarioId = usuarioObj.id_usuario;
    }

    this.animalesService.getAnimal(id).subscribe({
      next: (data) => {
        this.animal = data;
        this.cargarComentarios(data.id_animal);
      },
      error: () => (this.error = 'No se pudo cargar el detalle del animal'),
    });
  }

  cargarComentarios(id_animal: number) {
    this.comentarioService.getComentarios({ id_animal }).subscribe({
      next: (data) => (this.comentarios = data),
      error: () => console.error('Error al cargar comentarios'),
    });
  }

  enviarComentario() {
    if (!this.nuevoComentario.trim() || !this.animal || !this.usuarioId) return;

    const comentario = {
      id_usuario: this.usuarioId,
      id_animal: this.animal.id_animal,
      texto: this.nuevoComentario,
      fecha_comentario: new Date().toISOString().slice(0, 19).replace('T', ' ')
    };

    this.comentarioService.crearComentario(comentario, this.token).subscribe({
      next: () => {
        this.nuevoComentario = '';
        this.cargarComentarios(this.animal!.id_animal);
      },
      error: () => alert('Error al enviar el comentario.'),
    });
  }
}

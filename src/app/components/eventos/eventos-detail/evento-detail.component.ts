// src/app/pages/eventos/evento-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventoService, Evento } from '../../../services/evento.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-evento-detail',
  templateUrl: './evento-detail.component.html',
  imports: [CommonModule, RouterModule]
})
export class EventoDetailComponent implements OnInit {
  evento!: Evento;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private eventoService: EventoService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.eventoService.getEvento(id).subscribe({
      next: (data) => this.evento = data,
      error: () => this.error = 'No se pudo cargar el evento.'
    });
  }
}

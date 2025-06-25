// src/app/pages/eventos/eventos-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventoService, Evento } from '../../../services/evento.service';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-eventos-list',
  templateUrl: './eventos-list.component.html',
  imports: [CommonModule, RouterModule]
})
export class EventosListComponent implements OnInit {
  eventos: Evento[] = [];
  error = '';

  constructor(private eventoService: EventoService) {}

  ngOnInit(): void {
    this.eventoService.getEventos().subscribe({
      next: (data) => this.eventos = data,
      error: () => this.error = 'Error al cargar los eventos'
    });
  }
}

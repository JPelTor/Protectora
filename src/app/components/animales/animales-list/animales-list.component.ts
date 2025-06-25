import { Component, OnInit } from '@angular/core';
import { AnimalesService, Animal } from '../../../services/animales.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-animales-list',
  templateUrl: './animales-list.component.html',
  imports: [RouterModule,CommonModule]
})
export class AnimalesListComponent implements OnInit {
  animales: Animal[] = [];
  error = '';

  constructor(private animalesService: AnimalesService) {}

  ngOnInit(): void {
    this.animalesService.getAnimales().subscribe({
      next: (data) => this.animales = data,
      error: () => this.error = 'No se pudo cargar la lista de animales'
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NoticiaService, Noticia } from '../../../services/noticia.service';

@Component({
  standalone: true,
  selector: 'app-noticias-list',
  templateUrl: './noticias-list.component.html',
  imports: [CommonModule, RouterModule],
})
export class NoticiasListComponent implements OnInit {
  noticias: Noticia[] = [];

  constructor(private noticiaService: NoticiaService) {}

  ngOnInit(): void {
    this.noticiaService.getNoticias().subscribe((data) => {
      this.noticias = data.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
    });
  }
}

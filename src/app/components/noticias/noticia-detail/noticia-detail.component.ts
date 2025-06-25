// src/app/components/noticia-detail/noticia-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NoticiaService, Noticia } from '../../../services/noticia.service';

@Component({
    standalone: true,
    selector: 'app-noticia-detail',
    templateUrl: './noticia-detail.component.html',
    imports: [CommonModule, RouterModule],
})
export class NoticiaDetailComponent implements OnInit {
    noticia?: Noticia;
    error = '';

    constructor(private route: ActivatedRoute, private noticiaService: NoticiaService) { }

    ngOnInit(): void {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.noticiaService.getNoticia(id).subscribe({
            next: (data) => (this.noticia = data),
            error: () => (this.error = 'No se pudo cargar la noticia.'),
        });
    }
}

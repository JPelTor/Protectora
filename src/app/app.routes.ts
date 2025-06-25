import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { AnimalesListComponent } from './components/animales/animales-list/animales-list.component';
import { AnimalesDetailComponent } from './components/animales/animales-detail/animales-detail.component';
import { EventosListComponent } from './components/eventos/eventos-list/eventos-list.component';
import { EventoDetailComponent } from './components/eventos/eventos-detail/evento-detail.component';
import { NoticiasListComponent } from './components/noticias/noticias-list/noticias-list.component';
import { NoticiaDetailComponent } from './components/noticias/noticia-detail/noticia-detail.component';
import { ContactoComponent } from './components/contacto/contacto.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', component: HomeComponent },
    { path: 'animales', component: AnimalesListComponent},
    { path: 'animales/:id', component: AnimalesDetailComponent/*, canActivate: [AuthGuard]*/ },
    { path: 'eventos', component: EventosListComponent },
    { path: 'eventos/:id', component: EventoDetailComponent },
    { path: 'noticias', component: NoticiasListComponent },
    { path: 'noticias/:id', component: NoticiaDetailComponent },
    { path: 'contacto', component: ContactoComponent}
  ];


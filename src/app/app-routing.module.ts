import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { AnimalesListComponent } from './components/animales/animales-list/animales-list.component';
import { AnimalesDetailComponent } from './components/animales/animales-detail/animales-detail.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', component: HomeComponent },
    { path: 'animales', component: AnimalesListComponent },
    { path: 'animales/:id', component: AnimalesDetailComponent, canActivate: [AuthGuard] },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}

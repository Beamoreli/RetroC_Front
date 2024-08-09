import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard'; 
import { AdminGuard } from './guards/admin.guard'; 
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SecretComponent } from './components/secret/secret.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AllGamesComponent } from './components/all-games/all-games.component';
import { RegisterComponent } from './components/register/register.component';
import { BannerComponent } from './components/banner/banner.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { RodapeComponent } from './components/rodape/rodape.component';



const routes: Routes = [
  { path: '', component: BannerComponent},
  { path: 'home', component: HomeComponent },
  { path: 'navbar', component: NavBarComponent },
  { path: 'rodape', component: RodapeComponent },
  { path: 'login', component: LoginComponent},
  { path: 'games', component: AllGamesComponent, canActivate: [AuthGuard] },
  { path: 'user', component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: 'secret', component: SecretComponent, canActivate: [AdminGuard] },
  { path: 'register', component: RegisterComponent},
  { path: '**', redirectTo: '' } // Rota de fallback para a página inicial

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

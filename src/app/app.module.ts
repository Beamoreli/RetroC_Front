import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AllGamesComponent } from './components/all-games/all-games.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { SecretComponent } from './components/secret/secret.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NavBarComponent } from './components/nav-bar/nav-bar.component'
import { NgOptimizedImage } from '@angular/common';
import { BannerComponent } from './components/banner/banner.component'
import { AuthService } from './services/auth.service';
import { RodapeComponent } from './components/rodape/rodape.component';
import { RegisterComponent } from './components/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminGuard } from './guards/admin.guard';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    AllGamesComponent,
    UserProfileComponent,
    SecretComponent,
    NavBarComponent,
    BannerComponent,
    RodapeComponent,
    RegisterComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    NgOptimizedImage,
    ReactiveFormsModule,
    RouterModule,

    StoreModule.forRoot({}, {})
  ],
  providers: [
    provideAnimationsAsync(),
    AuthService, AdminGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  constructor(private router: Router, private authService: AuthService, private cdr: ChangeDetectorRef) {}

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  login(): void {
    this.router.navigate(['/login']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/banner']).then(() => {
      this.cdr.detectChanges();
    });
  }
}

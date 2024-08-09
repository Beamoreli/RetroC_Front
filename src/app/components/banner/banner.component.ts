import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent {
  constructor(private AuthService: AuthService) {}

  isLoggedIn(): boolean {
    return this.AuthService.isLoggedIn();
  }

}

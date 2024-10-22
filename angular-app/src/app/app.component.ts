import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { NgIf, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgIf],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-app';

  constructor(public authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout();
  }

  ngOnInit() {
    this.authService.loadToken();
    if (this.authService.getToken()==null || this.authService.isTokenExpired()){
      this.router.navigate(['/login']);
    }

  }
}

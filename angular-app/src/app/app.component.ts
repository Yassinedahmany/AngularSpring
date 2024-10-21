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

  constructor(public authService: AuthService, private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {
    // Check if running in the browser
    if (isPlatformBrowser(this.platformId)) {
      const loggedUser = localStorage.getItem('loggedUser');
      const isLoggedIn = localStorage.getItem('isLoggedIn');

      // Navigate to login if not logged in
      if (!loggedUser || isLoggedIn === "false") {
        this.router.navigate(['login']);
      }else {
        authService.setLoggedUserLS(loggedUser);
      }
    }
  }

  logout() {
    this.authService.logout();
  }
}

import { Component } from '@angular/core';
import {UserModel} from '../models/user.model';
import {FormsModule} from '@angular/forms';
import {ProductService} from '../services/product.service';
import {AuthService} from '../services/auth.service';
import {Router,} from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  error : number = 0;
  user = new UserModel();
  constructor(private authService: AuthService,private router : Router) {}
  onLoggedin(){

    this.authService.login(this.user).subscribe({
      next : (data)=>{
        let jwtToken = data.headers.get("Authorization")!;
        this.authService.saveToken(jwtToken);
        this.router.navigate(['/']);
      },
      error : (error : any) =>{
        this.error = error;
      }
    })

    //console.log(this.user);
    //let isValidUser : boolean = this.authService.signIn(this.user);
    //if (isValidUser)
      //this.router.navigate(['products-list']);
    //else
      //this.error = 1;
      //alert('User authentication failed!!!');
  }
}

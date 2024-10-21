import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';
import {HttpClient} from '@angular/common/http';
import {Route, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  users: UserModel[] = [
    { username: "admin", password: "123", roles: ['ADMIN', 'CREATE'] },
    { username: "cashier", password: "123", roles: ['CASHIER', 'CREATE'] },
    { username: "accountant", password: "123", roles: ['USER'] },
  ];

  public loggedUser!: string | undefined;
  public isLoggedIn: boolean = false;
  public roles!: string[] | undefined;

  constructor(private router: Router) { }

  // Correct method name and placement
  signIn(user: UserModel): boolean {
    let validUser: boolean = false;
    this.users.forEach(u => {
      if (user.username === u.username && user.password === u.password) {
        validUser = true;
        this.loggedUser = u.username;
        this.isLoggedIn = true;
        this.roles = u.roles;
        localStorage.setItem('loggedUser',String(this.loggedUser));
        localStorage.setItem('isLoggedIn',String(this.isLoggedIn));
      }
    });
    return validUser;
  }

 isCreate(){
    if (!this.roles)
      return false;
    return (this.roles.indexOf('CREATE') > -1);
 }
  isAdmin(){
    if (!this.roles)
      return false;
    return (this.roles.indexOf('ADMIN') > -1);
  }

  logout(){
    this.loggedUser = undefined!;
    this.isLoggedIn = false;
    this.roles = undefined;
    localStorage.removeItem('loggedUser');
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['login']);
  }

  setLoggedUserLS(login : string){
    this.loggedUser = login;
    this.isLoggedIn = true;
    this.getRoles(login);
  }

  getRoles(username : string){
    this.users.forEach(u => {
      if (u.username === username){
        this.roles = u.roles!;
      }
    })
  }

}

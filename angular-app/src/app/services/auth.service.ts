import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';
import {HttpClient} from '@angular/common/http';
import {Route, Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //users: UserModel[] = [
    //{ username: "admin", password: "123", roles: ['ADMIN', 'CREATE'] },
    //{ username: "cashier", password: "123", roles: ['CASHIER', 'CREATE'] },
    //{ username: "accountant", password: "123", roles: ['USER'] },
  //];

  private helper=new JwtHelperService();
  token! : string;

  public loggedUser!: string | undefined;
  public isLoggedIn: boolean = false;
  public roles!: string[] | undefined;

  constructor(private router: Router,private httpClient:HttpClient) { }

  login(user : UserModel) {
    return this.httpClient.post<UserModel>('http://localhost:8080/login',user,{observe:'response'});
  }

  saveToken(jwt : string){
    localStorage.setItem('jwt', jwt)
    this.token=jwt;
    this.isLoggedIn = true;
    this.decoderJWT();
  }

  decoderJWT(){
    if (this.token != undefined) {
      const decodedToken = this.helper.decodeToken(this.token);
      this.roles = decodedToken.roles;
      this.loggedUser = decodedToken.sub;
    }
  }

  // Correct method name and placement
  //signIn(user: UserModel): boolean {
    //let validUser: boolean = false;
    //this.users.forEach(u => {
      //if (user.username === u.username && user.password === u.password) {
        //validUser = true;
        //this.loggedUser = u.username;
        //this.isLoggedIn = true;
        //this.roles = u.roles;
        //localStorage.setItem('loggedUser',String(this.loggedUser));
        //localStorage.setItem('isLoggedIn',String(this.isLoggedIn));
      //}
    //});
    //return validUser;
  //}

 isCreate(){
    if (!this.roles)
      return false;
    return (this.roles.indexOf('CREATE') > -1);
 }

 getToken(){
    return this.token;
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
    this.token = undefined!;
    localStorage.removeItem('jwt');
    //localStorage.removeItem('isLoggedIn');
    this.router.navigate(['login']);
  }

  setLoggedUserLS(login : string){
    this.loggedUser = login;
    this.isLoggedIn = true;
    //this.getRoles(login);
  }

  loadToken(){
    this.token = localStorage.getItem("jwt")!;
    this.decoderJWT();
  }

  isTokenExpired(){
    return this.helper.isTokenExpired(this.token);
  }

  //getRoles(username : string){
    //this.users.forEach(u => {
      //if (u.username === username){
        //this.roles = u.roles!;
      //}
    //})
  //}

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { UsersDataService } from '../users-data.service';

export class Credentials {
  #name!:string;
  #username!: string;
  #password!: string;

  get name(): string {
    return this.#name;
  }
  set name(name: string) {
    this.#name = name;
  }
  get username(): string {
    return this.#username;
  }
  set username(username: string) {
    this.#username = username;
  }
  get password(): string {
    return this.#password;
  }
  set password(password: string) {
    this.#password = password;
  }

  constructor(username: string, password: string){
    this.#username = username;
    this.#password = password;
  }

  ToJSON(){
    return {
      name: this.name,
      username: this.username,
      password: this.password
    }
  }

  fillFromFormGroup(form: FormGroup): void{
    this.name = form.value.name;
    this.username = form.value.username;
    this.password = form.value.password;
  }

  fillFromNgForm(form: NgForm): void{
    this.username = form.value.username;
    this.password = form.value.password;
  }

  reset(): void{
    this.username = "";
    this.password = "";
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  get isLoggedIn(): boolean {
    return this._authenticationService.isLoggedIn;
  }

  name!:string;
  user: Credentials = new Credentials("", "");
  
  @ViewChild("loginForm") //field inject from form
  loginForm!: NgForm;

  constructor(private _usersService:UsersDataService, private _authenticationService:AuthenticationService) { }

  ngOnInit(): void {
    this.name = this._authenticationService.name;
  
    setTimeout(() => {
      if(this.loginForm){
        this.loginForm.setValue(this.user.ToJSON());
      }
    }, 0);

  }

  onLogin(){
    //onst user:Credentials = new Credentials();
    this.user.fillFromNgForm(this.loginForm);

    this._usersService.login(this.user).subscribe({
      next: (result) => {
        //this.isLoggedIn = true;
        this._authenticationService.token = result.token;
      },
      error: () => {},
      complete: () => {}
    });
  }

  reset(){
    this.user.reset();
  }

  removeToken(){
    localStorage.removeItem("token");
  }

  onLogout(){
    //this.isLoggedIn = false;

    //this.name = "";
    this.removeToken();
    this.user.reset();
  }
}

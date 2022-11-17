import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
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

  // constructor(username: string, password: string){
  //   this.#username = username;
  //   this.#password = password;
  // }

  constructor(){

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
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  user: Credentials = new Credentials();
  
  @ViewChild("loginForm") //field inject from form
  loginForm!: NgForm;

  constructor(private _usersService:UsersDataService) { }

  ngOnInit(): void {

    setTimeout(() => {
      this.loginForm.setValue(this.user.ToJSON());
    }, 0);

  }

  onLogin(){
    //console.log(loginForm.value);
    const user:Credentials = new Credentials();
    user.fillFromNgForm(this.loginForm);
    this._usersService.login(user).subscribe({
      next: (result) => {
        
      },
      error: () => {},
      complete: () => {}
    });
  }
}

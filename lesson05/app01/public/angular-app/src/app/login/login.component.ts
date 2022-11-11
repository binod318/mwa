import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

class Credentials {
  #username!: string;
  #password!: string;

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
      username: this.username,
      password: this.password
    }
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  user: Credentials = new Credentials("Name", "pass");
  
  @ViewChild("loginForm") //field inject from form
  loginForm!: NgForm;

  constructor() { }

  ngOnInit(): void {

    setTimeout(() => {
      this.loginForm.setValue(this.user.ToJSON());
    }, 0);

  }

  onLogin(loginForm: NgForm){
    console.log(loginForm.value);
  }
}

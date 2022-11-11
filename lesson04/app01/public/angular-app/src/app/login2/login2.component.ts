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
  selector: 'app-login2',
  templateUrl: './login2.component.html',
  styleUrls: ['./login2.component.css']
})
export class Login2Component implements OnInit {

  user:Credentials = new Credentials('admin', 'admin');

  //field injection from form
  @ViewChild('loginForm')
  loginForm!:NgForm;

  constructor() { }

  ngOnInit(): void {
    //set form value after loading is complete
    setTimeout(()=>{
      this.loginForm.setValue(this.user.ToJSON()); //needed to do ToJSON because property of the class is private(encapsulated)
    }, 0);
  }

  login(): void {
    console.log(this.loginForm.value);
  }
}

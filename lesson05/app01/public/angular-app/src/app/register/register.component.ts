import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Credentials } from '../login/login.component';
import { UsersDataService } from '../users-data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  hasSuccess:boolean = false;
  hasError:boolean = false;
  successMessage!:string;
  errorMessage!:string;

  registrationForm!: FormGroup;
  
  constructor(private _formBuilder: FormBuilder, private _usersService: UsersDataService, private _router:Router) { 
    this.registrationForm = this._formBuilder.group({
      name: "",
      username: "",
      password: "",
      passwordRepeat: ""
    })
  }

  ngOnInit(): void {
    // this.registrationForm = new FormGroup({
    //   name: new FormControl("Jack"),
    //   username: new FormControl(),
    //   password: new FormControl(),
    //   passwordRepeat: new FormControl()
    // })

  }

  onSubmit(): void{
    const user: Credentials = new Credentials();
    user.fillFromFormGroup(this.registrationForm);

    this._usersService.addUser(user).subscribe({
      next: () => {
        this.hasSuccess = true;
        this.hasError = false;
        this.successMessage = "Registration successful."
      },
      error: () => {
        this.hasSuccess = false;
        this.hasError = true;
        this.errorMessage = "Registration error!"
      },
      complete: () => {
        setTimeout(() => {
          this._router.navigate([""])
        }, 2000); 
      }
    })
  }

}

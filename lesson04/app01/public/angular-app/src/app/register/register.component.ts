import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registrationForm!:FormGroup;

  //why builder is used in constructor and FormGroup on ngInit
  constructor(private _formBuilder: FormBuilder) { 
    // this.registrationForm = this._formBuilder.group
    // ({
    //   name: "",
    //   username: "",
    //   password: "",
    //   confirmpassword: ""
    // });
  }

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      name: new FormControl(),
      username: new FormControl(),
      password: new FormControl(),
      confirmpassword: new FormControl()
    })
  }

  onSubmit(form: FormGroup){
    console.log(form);
  }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registrationForm!: FormGroup;
  
  constructor(private _formBuilder: FormBuilder) { 
    this.registrationForm = this._formBuilder.group({
      name: "Jill",
      username: "jill",
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

  onSubmit(form: FormGroup): void{
    console.log(form);
    
  }

}

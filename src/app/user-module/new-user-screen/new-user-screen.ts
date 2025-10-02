import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-new-user-screen',
  imports: [ReactiveFormsModule],
  standalone: true,
  templateUrl: './new-user-screen.html',
  styleUrl: './new-user-screen.css'
})

export class NewUserScreen {
  loginForm: FormGroup;
  nameErrorMessage: string;
  emailErrorMessage: string;
  passwordErrorMessage: string;
 

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(3)]],
      email: ["", [Validators.required, Validators.minLength(9)]],
      password: ["", [Validators.required, Validators.minLength(4)]],
      
      

    });
    this.nameErrorMessage = "";
    this.emailErrorMessage = "";
    this.passwordErrorMessage = "";
  }

  async onEnterClick() {
    this.nameErrorMessage = "";
    this.emailErrorMessage = "";
    this.passwordErrorMessage = "";

    const name = this.loginForm.value.name;
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    if (name === "") {
      this.nameErrorMessage = "O campo de nome é obrigatório";
      return;
    }


    if (email === "") {
      this.emailErrorMessage = "O campo de e-mail é obrigatório";
      return;
    }

    if (password === "") {
      this.passwordErrorMessage = "O campo de senha é obrigatório";
      return;
    }

    if (name.length <3 ) {
      this.nameErrorMessage = "o nome deve conter no minimo 3 caracteres!";
      return;
    }

    if (password.length <8 ) {
      this.passwordErrorMessage = "A senha deve conter no minimo 8 caracteres!";
      return;
    }

    if (email.length <9 ) {
      this.emailErrorMessage = "o email deve conter no minimo 9 caracteres!";
      return;

    }

    if(!email.includes("@") || !email.includes(".")) {
      this.emailErrorMessage = "o email deve conter . e @ !";
      return;
    }



    let response = await fetch("https://senai-gpt-api.azurewebsites.net/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password
      })
    });

    if (response.status >= 200 && response.status <= 299) {
      window.location.href = "login";
    
  }
}}

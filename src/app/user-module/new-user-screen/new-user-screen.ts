import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-new-user-screen',
  imports: [ReactiveFormsModule],
  standalone: true,
  templateUrl: './new-user-screen.html',
  styleUrl: './new-user-screen.css'
})

export class NewUserModule {
  loginForm: FormGroup;
  emailErrorMessage: string;
  passwordErrorMessage: string;
 

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.minLength(9)]],
      password: ["", [Validators.required, Validators.minLength(4)]],
      
      

    });

    this.emailErrorMessage = "";
    this.passwordErrorMessage = "";
  }

  async onEnterClick() {
    this.emailErrorMessage = "";
    this.passwordErrorMessage = "";

    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;


    if (email === "") {
      this.emailErrorMessage = "O campo de e-mail é obrigatório";
      return;
    }

    if (password === "") {
      this.passwordErrorMessage = "O campo de senha é obrigatório";
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



    // Envia os dados para a API
    let response = await fetch("https://senai-gpt-api.azurewebsites.net/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    });
  }
}

import { Component } from '@angular/core';
import { ChangeDetectorRef, } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login-screen',
  imports: [ReactiveFormsModule],
  templateUrl: './login-screen.html',
  styleUrl: './login-screen.css'
})
export class LoginScreen {

  loginForm: FormGroup;

  emailErrorMessage: string;
  passwordErrorMessage: string;
  successStatusMessage: string;
  errorStatusMessage: string;
  darkMode: boolean = false;

  constructor(private fb: FormBuilder, private cd: ChangeDetectorRef) {
    // Quando a tela iniciar.

    // Inicia o formulário.
    // Cria o campo obrigatório de email.
    // Cria o campo obrigatório de senha.
    this.loginForm = this.fb.group({
      email: ["", [Validators.required]],
      password: ["", [Validators.required]]
    });

    // Inicia com uma string vazia
    this.emailErrorMessage = "";
    this.passwordErrorMessage = "";
    this.successStatusMessage = "";
    this.errorStatusMessage = "";

  }

  ngOnInit() {

    let darkModeLocalStorage = localStorage.getItem("darkMode");

    if (darkModeLocalStorage = "true"){
      this.darkMode = true;
      document.body.classList.toggle("dark-mode", this.darkMode);
    }
  }


  async onLoginClick() {

    this.emailErrorMessage = "";
    this.passwordErrorMessage = "";
    this.successStatusMessage = "";
    this.errorStatusMessage = "";

    console.log("Email", this.loginForm.value.email);
    console.log("Password", this.loginForm.value.password);

    if (this.loginForm.value.email == "") {

      // alert("Preencha o e-mail.");
      this.emailErrorMessage = "O campo de e-mail é obrigatório.";
      return;

    }

    if (this.loginForm.value.password == "") {

      this.passwordErrorMessage = "O campo de senha é obrigatório.";
      return;

    }

    let response = await fetch("http://api.senai-notes.work.gd:8080/api/auth", {
      method: "POST", // Enviar,
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        email: this.loginForm.value.email,
        senha: this.loginForm.value.password
      })
    });

    console.log("STATUS CODE", response.status);

    // Com base no status, verifique se as credenciais estão corretas e avise o usuário do resultado.

    if (response.status >= 200 && response.status <= 299) {

      this.successStatusMessage = "Login realizado com sucesso!";

      let json = await response.json();

      console.log("JSON", json);

      let meuToken = json.accessToken;
      let userId = json.user.id;

      localStorage.setItem("meuToken", meuToken);
      localStorage.setItem("meuId", userId);

      window.location.href = "notes-screen";

    } else {

      this.errorStatusMessage = "Credenciais incorretas.";

    }

    this.cd.detectChanges(); // Forçar uma atualização da tela.

  }

  ligarDesligarDarkMode() {
  
    this.darkMode = !this.darkMode;
    
    document.body.classList.toggle("dark-mode", this.darkMode);

    localStorage.setItem("darkMode", this.darkMode.toString())
    
  
  }
  
  

}


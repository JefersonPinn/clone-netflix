declare var google: any;
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  private router = inject(Router);

  ngOnInit(): void {
    this.checkExistingLogin();
    this.initializeGoogleLogin();
  }

  // Verifica se já existe um login válido
  private checkExistingLogin(): void {
    const storedUser = localStorage.getItem("loggedInUser");
    
    if (storedUser) {
      try {
        const payload = JSON.parse(storedUser);
        const isTokenValid = this.isTokenValid(payload.exp);

        if (isTokenValid) {
          this.router.navigate(['browse']);
        } else {
          localStorage.removeItem("loggedInUser");
        }
      } catch (error) {
        console.error('Erro ao verificar login:', error);
        localStorage.removeItem("loggedInUser");
      }
    }
  }

  // Valida a expiração do token (timestamp em segundos)
  private isTokenValid(expirationTime: number): boolean {
    const currentTime = Math.floor(Date.now() / 1000);
    return currentTime < expirationTime;
  }

  // Inicializa o botão do Google
  private initializeGoogleLogin(): void {
    google.accounts.id.initialize({
      client_id: '',
      callback: (resp: any) => this.handleLogin(resp)
    });

    this.renderGoogleButton();
  }

  // Renderiza o botão
  private renderGoogleButton(): void {
    const buttonContainer = document.getElementById("google-btn");
    
    if (buttonContainer) {
      google.accounts.id.renderButton(buttonContainer, {
        theme: "filled_black",
        size: "large",
        shape: "rectangle",
        width: 300,
      });
    }
  }

  // Decodifica o token JWT com tratamento de erros
  private decodeJWT(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(atob(base64));
    } catch (error) {
      console.error('Erro ao decodificar token:', error);
      return null;
    }
  }

  // Manipula o login
  handleLogin(response: any): void {
    if (response?.credential) {
      const payload = this.decodeJWT(response.credential);
      
      if (payload) {
        // Armazena no localStorage para persistência
        localStorage.setItem("loggedInUser", JSON.stringify(payload));
        this.router.navigate(['browse']);
      }
    }
  }

  signOut(): void {
    localStorage.removeItem("loggedInUser");
    this.router.navigate(['/']);
  }
}

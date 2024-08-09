import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private AuthService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const credentials = {
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('senha')?.value 
      };
  
      this.AuthService.login(credentials).subscribe(
        (response: any) => {
          // resposta contém o token
          if (response.token) {
            localStorage.setItem('token', response.token); // Armazena o token no localStorage
            this.router.navigate(['/home']); 
          } else {
            this.errorMessage = 'Login falhou. Por favor, tente novamente.';
          }
        },
        error => {
          console.error('Erro no login:', error);
          this.errorMessage = 'Email ou senha inválidos';
        }
      );
    } else {
      this.errorMessage = 'Por favor, preencha todos os campos corretamente.';
    }
  }
}  

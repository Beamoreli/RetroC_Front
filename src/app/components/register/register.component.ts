import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private AuthService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      nome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmarSenha: ['', [Validators.required]]
    }, { validator: this.checkPasswords });
  }

  checkPasswords(group: FormGroup) {
    const senha = group.get('senha')?.value;
    const confirmarSenha = group.get('confirmarSenha')?.value;
    return senha === confirmarSenha ? null : { notSame: true };
  }

  onSubmit(): void {
  if (this.registerForm.valid) {
    const formData = {
      name: this.registerForm.get('nome')?.value,
      email: this.registerForm.get('email')?.value,
      password: this.registerForm.get('senha')?.value
    };

    this.AuthService.register(formData).subscribe(
      () => {
        this.router.navigate(['/login']);
      },
      error => {
        this.errorMessage = 'Erro ao registrar o usuário: ' + (error.error?.message || error.message || 'Erro desconhecido');
        console.error('Erro no registro:', error);
      }
    );
  }
}

  
}

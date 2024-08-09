import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userId!: number;
  user!: Usuario;
  selectedPhoto?: File;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = params['id'];
      this.userService.getUserById(this.userId).subscribe(user => {
        this.user = user;
      });
    });
  }

  updateUser(): void {
    if (this.user.novaSenha) {
      this.userService.updateUserPassword(this.userId, this.user.novaSenha).subscribe(() => {
        console.log('Senha atualizada com sucesso.');
        this.user.novaSenha = ''; // Limpar campo de nova senha após sucesso
      });
    }

    this.userService.updateUser(this.user).subscribe(updatedUser => {
      this.user = updatedUser;
      console.log('Usuário atualizado com sucesso:', updatedUser);
    });
  }

  removeFromFavorites(gameId: number): void {
    this.userService.removeFromFavorites(this.userId, gameId).subscribe(() => {
      this.user.favoritos = this.user.favoritos.filter(game => game.id !== gameId);
      console.log('Jogo removido dos favoritos.');
    });
  }

  handlePhotoUpload(event: any): void {
    const file = event.target.files[0];
    if (file) {
      console.log('Arquivo selecionado:', file.name);
      this.selectedPhoto = file;
    }
  }

  uploadPhoto(): void {
    if (this.selectedPhoto) {
      this.userService.uploadUserPhoto(this.userId, this.selectedPhoto).subscribe(response => {
        console.log('Foto do usuário atualizada com sucesso:', response);
        this.user.foto = response.url; // Atualizar o URL da foto após o upload
      }, error => {
        console.error('Erro ao fazer upload da foto:', error);
      });
    } else {
      console.warn('Nenhuma foto selecionada.');
    }
  }
}

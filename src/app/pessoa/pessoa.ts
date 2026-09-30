import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  validarNome,
  validarCpf,
  validarRg,
  validarEmail,
  validarTexto
} from './pessoa.validacao';

@Component({
  selector: 'app-pessoa',
  imports: [FormsModule],
  templateUrl: './pessoa.html',
  styleUrl: './pessoa.css'
})
export class Pessoa {

  pessoa = {
    nome: '',
    cpf: '',
    rg: '',
    motherName: '',
    fatherName: '',
    paisOrigem: '',
    ufOrigem: '',
    cidadeOrigem: '',
    curso: '',
    email: ''
  };

  cadastrados: any[] = [];

  tocados: { [campo: string]: boolean } = {};

  erros: { [campo: string]: string | null } = {};

  marcarTocado(campo: string): void {
    this.tocados[campo] = true;

    this.validarCampo(campo);
  }

  validarCampo(campo: string): void {

    switch (campo) {

      case 'nome':
        this.erros.nome = validarNome(this.pessoa.nome);
        break;

      case 'cpf':
        this.erros.cpf = validarCpf(this.pessoa.cpf);
        break;

      case 'rg':
        this.erros.rg = validarRg(this.pessoa.rg);
        break;

      case 'motherName':
        this.erros.motherName =
          validarTexto(this.pessoa.motherName, 'O nome da mãe');
        break;

      case 'fatherName':
        this.erros.fatherName =
          validarTexto(this.pessoa.fatherName, 'O nome do pai');
        break;

      case 'paisOrigem':
        this.erros.paisOrigem =
          validarTexto(this.pessoa.paisOrigem, 'O país de origem');
        break;

      case 'ufOrigem':
        this.erros.ufOrigem =
          validarTexto(this.pessoa.ufOrigem, 'O estado de origem');
        break;

      case 'cidadeOrigem':
        this.erros.cidadeOrigem =
          validarTexto(this.pessoa.cidadeOrigem, 'A cidade de origem');
        break;

      case 'curso':
        this.erros.curso =
          validarTexto(this.pessoa.curso, 'O curso');
        break;

      case 'email':
        this.erros.email = validarEmail(this.pessoa.email);
        break;
    }
  }

  deveMostrarErro(campo: string): boolean {
    return !!this.tocados[campo] && !!this.erros[campo];
  }

  get formularioInvalido(): boolean {
    return Object.values(this.erros).some(erro => erro !== null);
  }

  salvar(): void {

    // Valida todos os campos
    Object.keys(this.pessoa).forEach(campo => {
      this.tocados[campo] = true;
      this.validarCampo(campo);
    });

    // Não salva se houver erro
    if (this.formularioInvalido) {
      return;
    }

    this.cadastrados = [
      ...this.cadastrados,
      { ...this.pessoa }
    ];

    console.log('Pessoa cadastrada:', this.pessoa);

    this.limpar();
  }

  limpar(): void {

    this.pessoa = {
      nome: '',
      cpf: '',
      rg: '',
      motherName: '',
      fatherName: '',
      paisOrigem: '',
      ufOrigem: '',
      cidadeOrigem: '',
      curso: '',
      email: ''
    };

    this.tocados = {};
    this.erros = {};
  }
}

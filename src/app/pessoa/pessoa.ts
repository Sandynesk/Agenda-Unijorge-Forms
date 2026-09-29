import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

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

  // Guarda quais campos o usuário já visitou
  tocados: { [campo: string]: boolean } = {};

  marcarTocado(campo: string): void {
    this.tocados[campo] = true;
  }

  deveMostrarErro(campo: string): boolean {
    return this.tocados[campo] === true && this.temErro(campo);
  }

  temErro(campo: string): boolean {

    const valor = this.pessoa[campo as keyof typeof this.pessoa];

    // Campos obrigatórios
    if (!valor || String(valor).trim() === '') {
      return true;
    }

    switch (campo) {

      case 'nome':
      case 'motherName':
      case 'fatherName':
      case 'paisOrigem':
      case 'ufOrigem':
      case 'cidadeOrigem':
      case 'curso':
        return String(valor).trim().length < 3;

      case 'cpf': {
        const cpf = String(valor).replace(/\D/g, '');

        // CPF precisa ter exatamente 11 números
        return cpf.length !== 11;
      }

      case 'rg': {
        const rg = String(valor).replace(/\D/g, '');

        // RG entre 7 e 10 números
        return rg.length < 7 || rg.length > 10;
      }

      case 'email': {
        const email = String(valor).trim();

        const emailValido =
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

        return !emailValido;
      }

      default:
        return false;
    }
  }

  mensagem(campo: string): string {

    const valor = this.pessoa[campo as keyof typeof this.pessoa];

    if (!valor || String(valor).trim() === '') {
      return 'Este campo é obrigatório.';
    }

    switch (campo) {

      case 'nome':
        if (String(valor).trim().length < 3) {
          return 'Digite pelo menos 3 caracteres.';
        }
        break;

      case 'motherName':
        if (String(valor).trim().length < 3) {
          return 'Digite o nome completo da mãe.';
        }
        break;

      case 'fatherName':
        if (String(valor).trim().length < 3) {
          return 'Digite o nome completo do pai.';
        }
        break;

      case 'paisOrigem':
        if (String(valor).trim().length < 3) {
          return 'Digite um país válido.';
        }
        break;

      case 'ufOrigem':
        if (String(valor).trim().length < 3) {
          return 'Digite o estado de origem.';
        }
        break;

      case 'cidadeOrigem':
        if (String(valor).trim().length < 3) {
          return 'Digite a cidade de origem.';
        }
        break;

      case 'curso':
        if (String(valor).trim().length < 3) {
          return 'Digite o curso.';
        }
        break;

      case 'cpf': {
        const cpf = String(valor).replace(/\D/g, '');

        if (cpf.length !== 11) {
          return 'O CPF deve possuir 11 números.';
        }

        break;
      }

      case 'rg': {
        const rg = String(valor).replace(/\D/g, '');

        if (rg.length < 7 || rg.length > 10) {
          return 'O RG deve possuir entre 7 e 10 números.';
        }

        break;
      }

      case 'email': {
        const emailValido =
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(valor));

        if (!emailValido) {
          return 'Digite um e-mail válido.';
        }

        break;
      }
    }

    return 'Campo inválido.';
  }

  get formularioInvalido(): boolean {
    return Object.keys(this.pessoa).some(campo =>
      this.temErro(campo)
    );
  }

  salvar(): void {

    
    Object.keys(this.pessoa).forEach(campo => {
      this.marcarTocado(campo);
    });

    
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
  }
}
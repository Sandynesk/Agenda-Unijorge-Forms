export function validarNome(nome: string): string | null {
  if (!nome.trim()) {
    return 'O nome é obrigatório.';
  }

  if (nome.trim().length < 3) {
    return 'Digite pelo menos 3 caracteres.';
  }

  return null;
}

export function validarCpf(cpf: string): string | null {
  if (!cpf.trim()) {
    return 'O CPF é obrigatório.';
  }

  const numeros = cpf.replace(/\D/g, '');

  if (numeros.length !== 11) {
    return 'O CPF deve possuir 11 números.';
  }

  return null;
}

export function validarRg(rg: string): string | null {
  if (!rg.trim()) {
    return 'O RG é obrigatório.';
  }

  const numeros = rg.replace(/\D/g, '');

  if (numeros.length < 7 || numeros.length > 10) {
    return 'O RG deve possuir entre 7 e 10 números.';
  }

  return null;
}

export function validarTexto(
  valor: string,
  nomeCampo: string
): string | null {
  if (!valor.trim()) {
    return `${nomeCampo} é obrigatório.`;
  }

  if (valor.trim().length < 3) {
    return `${nomeCampo} deve possuir pelo menos 3 caracteres.`;
  }

  return null;
}

export function validarEmail(email: string): string | null {
  if (!email.trim()) {
    return 'O e-mail é obrigatório.';
  }

  const valido =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!valido) {
    return 'Digite um e-mail válido.';
  }

  return null;
}

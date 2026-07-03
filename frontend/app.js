const API_URL = 'http://localhost:3000';
 
const formCadastro = document.getElementById('formCadastro');
 
if (formCadastro) {
  formCadastro.addEventListener('submit', async function (event) {
    event.preventDefault();
 
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('emailCadastro').value;
    const senha = document.getElementById('senhaCadastro').value;
 
    const resposta = await fetch(`${API_URL}/usuarios`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nome, email, senha }),
    });
 
    const dados = await resposta.json();
 
    document.getElementById('mensagemCadastro').textContent =
      dados.mensagem || 'Erro ao cadastrar usuário.';
 
    formCadastro.reset();
  });
}
 
const formLogin = document.getElementById('formLogin');
 
if (formLogin) {
  formLogin.addEventListener('submit', async function (event) {
    event.preventDefault();
 
    const email = document.getElementById('emailLogin').value;
    const senha = document.getElementById('senhaLogin').value;
 
    const resposta = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, senha }),
    });
 
    const dados = await resposta.json();
 
    if (resposta.ok) {
      document.getElementById('mensagemLogin').textContent = dados.mensagem;
 
      document.getElementById('areaToken').style.display = 'block';
      document.getElementById('token').textContent = dados.access_token;
      document.getElementById('linkPerfil').style.display = 'block';
    } else {
      document.getElementById('mensagemLogin').textContent =
        dados.message || 'Erro ao realizar login.';
 
      document.getElementById('areaToken').style.display = 'none';
      document.getElementById('linkPerfil').style.display = 'none';
    }
 
    formLogin.reset();
  });
}
const paginaPerfil = document.getElementById('paginaPerfil');
 
if (paginaPerfil) {

  const campoToken = document.getElementById('campoToken');
  const botaoValidar = document.getElementById('botaoValidar');
  const mensagemPerfil = document.getElementById('mensagemPerfil');
  const dadosUsuario = document.getElementById('dadosUsuario');
 
  botaoValidar.addEventListener('click', async function () {

    const token = campoToken.value;
 
    if (!token) {

      mensagemPerfil.textContent = 'Informe um token para acessar.';
      dadosUsuario.style.display = 'none';
      return;

    }
 
    const resposta = await fetch(`${API_URL}/auth/privada`, {

      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },

    });
 
    const dados = await resposta.json();
    if (resposta.ok) {
      mensagemPerfil.textContent = dados.mensagem;
      document.getElementById('idUsuario').textContent =
        dados.usuario?.sub || dados.usuario?.id || 'Não informado';
      document.getElementById('emailUsuario').textContent =
        dados.usuario?.email || 'Não informado';
      dadosUsuario.style.display = 'block';
    } else {
      mensagemPerfil.textContent = dados.message || 'Acesso negado.';
      dadosUsuario.style.display = 'none';
    }

  });

}
 
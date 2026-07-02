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
    } else {
      document.getElementById('mensagemLogin').textContent =
        dados.message || 'Erro ao realizar login.';
 
      document.getElementById('areaToken').style.display = 'none';
    }
 
    formLogin.reset();
  });
}
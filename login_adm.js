const email = document.getElementById('email');
const senha = document.getElementById('senha');
const entrar = document.getElementById('entrar');
const formulario = document.querySelector('.formulario');

function validarCampos() {
  const emailValido = email.value.trim() !== '';
  const senhaValida = senha.value.trim() !== '';
  entrar.disabled = !(emailValido && senhaValida);
}

email.addEventListener('input', validarCampos);
senha.addEventListener('input', validarCampos);

formulario.addEventListener('submit', function(e) {
  e.preventDefault();
  localStorage.setItem('email', email.value);
  window.location.href = 'listaParceiros.html';
});

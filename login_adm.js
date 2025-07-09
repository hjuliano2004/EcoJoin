const email = document.getElementById('email');
const senha = document.getElementById('senha');
const entrar = document.getElementById('entrar');
const formulario = document.querySelector('.formulario');

function validarCampos() {
  const emailValido = email.value;
  const senhaValida = senha.value;

  if(emailValido && senhaValida){
    return true;
  }else{
    return false
  }

  
 /** entrar.disabled = !(emailValido && senhaValida); */
}

/*
email.addEventListener('input', validarCampos());
senha.addEventListener('input', validarCampos());
*/

formulario.addEventListener('submit', function(e) {

  e.preventDefault();

    if(validarCampos()){
      localStorage.setItem('email', email.value);
       window.location.href = "listaParceiros.html";
    }

    /**entrar.disabled = !(emailValido && senhaValida); */
});
const email = document.getElementById('email');
const senha = document.getElementById('senha');
const entrar = document.getElementById('entrar');
const formulario = document.querySelector('.formulario');

function validarCampos(){
  if(email.value && senha.value){
    return true;
  }else{
    return false
  }
}

formulario.addEventListener('submit', function(e) {

  e.preventDefault();

    if(validarCampos()){
      localStorage.setItem('email', email.value);
      window.location.href = "listaParceiros.html";
    }
});
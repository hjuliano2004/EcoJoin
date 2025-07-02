let enviar = document.getElementById("enviar");
let form = document.getElementById("cadastraParceiro");

let nomeParceiro = document.getElementById("nomeParceiro");
let tipoParceiro = document.getElementById("tipoParceiro");
let responsavel = document.getElementById("responsavel");
let telefone = document.getElementById("telefone");
let email = document.getElementById("email");
let bairro = document.getElementById("bairro");
let rua = document.getElementById("rua");
let numero = document.getElementById("numero");

let papel = document.getElementById("papel");
let vidro = document.getElementById("vidro");
let oleoCozinha = document.getElementById("oleoCozinha");
let eletronico = document.getElementById("eletronico");
let outros = document.getElementById("plastico");
let plastico = document.getElementById("plastico");
let metal = document.getElementById("metal");
let pilhaBateria = document.getElementById("pilhaBateria");
let roupas = document.getElementById("roupas");


form.addEventListener("submit", async function(event){
    event.preventDefault();

    let post = await postar();

    console.log(post, "vazio");
    if(post.ok){
        window.alert("Dados enviados com sucesso!");
    }

});

async function postar(){

    const url = "https://6860899b8e74864084437167.mockapi.io/jmt-futurodev/api/parceiros";

try{
    const resposta = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(dados())
    });

    return resposta;

}catch(erro){
    window.alert("houve algum erro, verifique o formulario novamente")
    return {ok: false};
}
}


function dados(){
    return {
  "nomeParceiro": nomeParceiro.value,
  "tipoParceiro": tipoParceiro.value,
  "responsavelParceiro": responsavel.value,
  "telResponsavel": telefone.value,
  "emailResponsavel": email.value,
  "rua": rua.value,
  "numero": numero.value,
  "bairro": bairro.value,
  "papel": papel.checked,
  "plastico": plastico.checked,
  "vidro": vidro.checked,
  "metal": metal.checked,
  "oleoCozinha": oleoCozinha.checked,
  "pilhaBateria": pilhaBateria.checked,
  "eletronico": eletronico.checked,
  "roupa": roupas.checked,
  "outros": outros.checked
}
}
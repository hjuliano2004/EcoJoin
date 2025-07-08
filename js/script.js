/*
═══════════════════════════════════════════════════════════
🔴 JAVASCRIPT - PARCEIROS SUSTENTÁVEIS
═══════════════════════════════════════════════════════════
*/

// URL da API de parceiros
const API_URL = 'https://6860899b8e74864084437167.mockapi.io/jmt-futurodev/api/parceiros';

// Variáveis globais
let todosParceiros = [];
let parceirosFiltrados = [];

// Função para mostrar loading
function mostrarLoading() {
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = `
        <div class="loading">
            <div class="spinner"></div>
            <p>Carregando parceiros...</p>
        </div>
    `;
}

// Função para mostrar erro
function mostrarErro(erro) {
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = `
        <div class="error">
            <h3>❌ Erro ao carregar parceiros</h3>
            <p>${erro.message || erro}</p>
        </div>
    `;
}

// Função para obter avatar e classe do tipoParceiro de parceiro
function obterAvatarInfo(parceiro) {
    // Verificar se o campo tipoParceiro existe e não é undefined
    if (!parceiro.tipoParceiro) {
        console.warn('Campo tipoParceiro não encontrado para o parceiro:', parceiro);
        return { avatar: '?', classe: 'ecoponto' };
    }
    
    const tipoLower = parceiro.tipoParceiro.toLowerCase();
    
    if (tipoLower.includes('ecoponto')) {
        return { avatar: 'E', classe: 'ecoponto' };
    } else if (tipoLower.includes('cooperativa')) {
        return { avatar: 'C', classe: 'cooperativa' };
    } else if (tipoLower.includes('pev')) {
        return { avatar: 'P', classe: 'pev' };
    }
    
    // Se não encontrar nenhum tipoParceiro conhecido, usar o primeiro caractere do nome
    return { avatar: parceiro.nomeParceiro ? parceiro.nomeParceiro.charAt(0).toUpperCase() : '?', classe: 'ecoponto' };
}

// Função para formatar data
function formatarData(dataString) {
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR');
}

// Função para renderizar os parceiros
function renderizarParceiros(parceiros) {
    const resultado = document.getElementById('resultado');
    
    if (parceiros.length === 0) {
        resultado.innerHTML = `
            <div class="no-results">
                <div class="no-results-icon">🔍</div>
                <h3>Nenhum parceiro encontrado</h3>
                <p>Tente pesquisar com outros termos</p>
            </div>
        `;
        return;
    }

    let html = `
        <div class="results-info">
            📊 Encontrados ${parceiros.length} parceiro(s)
        </div>
        <div class="parceiros-grid">
    `;

    parceiros.forEach(parceiro => {
        const avatarInfo = obterAvatarInfo(parceiro);
        
        const dataFormatada = formatarData(parceiro.dataCriacao);
        
        html += `
            <div class="parceiro-card ${avatarInfo.classe}" onclick="verDetalhes('${parceiro.id}')">
                <div class="card-header">
                    <div class="avatar ${avatarInfo.classe}">
                        ${avatarInfo.avatar}
                    </div>
                    <h3 class="parceiro-nome">${parceiro.nomeParceiro || 'Nome não informado'}</h3>
                </div>
                <div class="parceiro-info">
                    <div class="info-item">
                        <span class="info-icon">📍</span>
                        <span class="parceiro-bairro">${parceiro.bairro || 'Bairro não informado'}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-icon">📅</span>
                        <span class="parceiro-data">Cadastrado em: ${dataFormatada}</span>
                    </div>
                </div>
            </div>
        `;
    });

    html += '</div>';
    resultado.innerHTML = html;
}

// Função para buscar todos os parceiros
async function buscarParceiros() {
    mostrarLoading();
    
    try {
        console.log('🔍 Buscando parceiros...');
        
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        
        const parceiros = await response.json();
        
        console.log('✅ Parceiros recebidos:', parceiros);
        
        // Vamos verificar a estrutura dos dados
        if (parceiros.length > 0) {
            console.log('📋 Estrutura do primeiro parceiro:', parceiros[0]);
            console.log('🔍 Campos disponíveis:', Object.keys(parceiros[0]));
        }
        
        // Armazenar dados globalmente
        todosParceiros = parceiros;
        parceirosFiltrados = parceiros;
        
        renderizarParceiros(parceiros);
        
    } catch (error) {
        console.error('❌ Erro ao buscar parceiros:', error);
        mostrarErro(error);
    }
}

// Função para pesquisar parceiros
function pesquisarParceiros() {
    const termoPesquisa = document.getElementById('searchInput').value.toLowerCase().trim();
    
    if (termoPesquisa === '') {
        // Se não há termo de pesquisa, mostrar todos
        parceirosFiltrados = todosParceiros;
    } else {
        // Filtrar por nome OU bairro (com verificação se os campos existem)
        parceirosFiltrados = todosParceiros.filter(parceiro => {
            const nome = parceiro.nomeParceiro || '';
            const bairro = parceiro.bairro || '';
            
            return nome.toLowerCase().includes(termoPesquisa) ||
                   bairro.toLowerCase().includes(termoPesquisa);
        });
    }
    
    renderizarParceiros(parceirosFiltrados);
}

// Função para detectar Enter no input
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        pesquisarParceiros();
    }
}

// Função para limpar pesquisa
function limparPesquisa() {
    document.getElementById('searchInput').value = '';
    parceirosFiltrados = todosParceiros;
    renderizarParceiros(parceirosFiltrados);
}

// Inicializando a aplicação
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Aplicação iniciada');
    buscarParceiros();
});



/**parte de ação mostrar detalhes */

let listaMateriais = document.getElementById("listaMateriais");
let avatarVisual = document.getElementById("avatarVisual");

let telefone = document.getElementById("telefone");
let rua = document.getElementById("rua");
let bairro = document.getElementById("bairro");
let parceiro = document.getElementById("parceiro");
let dataCadastro = document.getElementById("dataCadastro");
let email = document.getElementById("email");
let detalhes = document.getElementById("detalhes");

function getTodosParceiros(){
    return todosParceiros;
}


 // Função para ver detalhes do parceiro
function verDetalhes(id) {

    for(let i=0;i<getTodosParceiros().length;i++){
        if(getTodosParceiros()[i].id == id){
            detalhes.style.display = "block";
            renderizarDetalhes(getTodosParceiros()[i]);
        }
    }
}

document.addEventListener("mousedown", function(event){
    if(detalhes.style.display === "block" && !detalhes.contains(event.target)){
        console.log(event.target)
        detalhes.style.display = "none";
    }
});


 

async function renderizarDetalhes(entidade){

    console.log(entidade);

    descricoes(entidade);

    decideLogo(entidade);

    listaMateriais.innerHTML = "";//é necessário limpar antes de colocar uma nova lista
    listaMateriais.appendChild(converteLista(listarCheck(entidade)));
}

function descricoes(entidade){

    const nada = "não informado";

    if(entidade.telResponsavel){
        telefone.innerText = entidade.telResponsavel;
    }else{telefone.innerText = nada}


    if(entidade.emailResponsavel){
        email.innerText = entidade.emailResponsavel;
    }else{email.innerText = nada}
    

    if(entidade.responsavelParceiro){
        responsavel.innerText = entidade.responsavelParceiro
    }else{responsavel.innerText = nada}

    if(entidade.nomeParceiro){
        parceiro.innerText = entidade.nomeParceiro;
    }else{parceiro.innerText = nada}


    if(entidade.bairro){
        bairro.innerText = `Bairro: ${entidade.bairro}`;
    }else{bairro.innerText = `Bairro: ${nada}`;}
    
    if(entidade.rua){
        rua.innerHTML = `Rua: ${entidade.rua} N&deg${entidade.numero}`;
    }else{rua.innerText = `Rua: ${nada}`;}
    

    dataCadastro.innerText = defineData(entidade.dataCriacao);
}

function defineData(data){

    let array = data.split("");
    let horario = "";

    for(let i=11;i<19;i++){
        horario = `${horario}${array[i]}`;
    }

    return `${formatarData(data)} ${horario}`;
}

function decideLogo(entidade){//escolhe a logo que representa o vinculo da empresa

    switch (entidade.tipoParceiro.toUpperCase()) {
        case "COO":
        avatarVisual.src ="./logos/ecologicalCooperative.jpeg"; 
            break;
        case "ECO":
        avatarVisual.src = "./logos/ecopontos.jpeg";
            break;
        case "PEV":
        avatarVisual.src ="./logos/collection.jpeg";
    }

}


function converteLista(lista){//converte lista recebida em tags "li" e retorna lista ul

    let ul = document.createElement("ul");

    for(let i=0;i<lista.length;i++){
        let li = document.createElement("li");
        li.innerText = lista[i];
        li.classList.add("material");

        ul.appendChild(li);
    }

    return ul;

}

function listarCheck(entidade){//cria lista de material pemitido
    let lista = [];
    let resposta = [];

    lista.push({valor: entidade.papel, nome: "papel"});
    lista.push({valor: entidade.plastico, nome: "plastico"});
    lista.push({valor: entidade.vidro, nome: "vidro"});
    lista.push({valor: entidade.metal, nome: "metal"});
    lista.push({valor: entidade.oleoCozinha, nome: "oleo de cozinha"});
    lista.push({valor: entidade.pilhaBateria, nome: "pilhas e baterias"});
    lista.push({valor: entidade.eletronico, nome: "eletronicos"});
    lista.push({valor: entidade.roupa, nome: "roupas"});
    lista.push({valor: entidade.outros, nome: "outros..."});

    for(let i=0;i<lista.length;i++){
        if(lista[i].valor){
            resposta.push(lista[i].nome);
        }
    }

    return resposta;
}
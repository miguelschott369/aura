const perfis = [
	{
    id: 1,
    nome: "Arquiteto(a) intergaláctico",
    categoria: "Construção",
    descricao: "Transforma problemas em soluções.",
    recomendacao: "Assumir o comando de reparos estruturais e manutenção dos módulos principais da nave e habitats em solo alienígena.",
    imagem: "arquiteto.jpg",
	},
 	{
    id: 2,
    nome: "médico Explorador",
    categoria: "cura",
    descricao: "ajuda quando precisam de você e mesmo quando não precisam.",
    recomendacao: "Liderar equipes de coleta de amostras biológicas e varredura de anomalias atmosféricas e minerais no planeta desconhecido.",
    imagem: "médico.jpg",
	},
	{
    id: 3,
    nome: "aventureiro de Campo",
    categoria: "Exploração",
    descricao: "Gosta de descobrir lugares, experimentar alternativas e lidar com situações novas.",
    recomendacao: "Comandar missões de reconhecimento de terreno externo, mapeamento de rotas seguras e avistamento de pontos críticos de superfície.",
    imagem: "aventureiro.jpg",
	},
	{
    id: 4,
    nome: "professor(a) espacial",
    categoria: "Planejamento",
    descricao: "Gosta de organizar informações, coordenar pessoas e decidir os próximos passos.",
    recomendacao: "Integrar o núcleo central de comando tático da Missão Aura, gerenciando cronogramas, suprimentos e tomadas de decisão sob pressão.",
    imagem: "professora.jpg",
	}
];
// Função para calcular a idade considerando se o aniversário já ocorreu no ano atual
function calcularIdade(dataNascStr) {
    const hoje = new Date();
    const nascimento = new Date(dataNascStr);

    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mesAtual = hoje.getMonth();
    const diaAtual = hoje.getDate();
    const mesNasc = nascimento.getMonth();
    const diaNasc = nascimento.getDate();

    if (mesAtual < mesNasc || (mesAtual === mesNasc && diaAtual < diaNasc)) {
        idade--;
    }
    return idade;
}
 
// Submissão do formulário com validações completas
document.getElementById('btn-enviar').addEventListener('click', function(e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const dataNascStr = document.getElementById('dataNascimento').value;

    if (!nome || !dataNascStr) {
        alert('Por favor, preencha todos os campos do formulário.');
        return;
    }

// Validação estrita para impedir o uso de datas futuras
const dataNasc = new Date(dataNascStr);
const hoje = new Date();
hoje.setHours(0, 0, 0, 0);

if (dataNasc > hoje) {
    alert('Erro temporal: A data de nascimento não pode estar no futuro!');
    return;
}

// Cálculo da idade
const idadeCalculada = calcularIdade(dataNascStr);

// Captura das respostas das 4 perguntas
const p1 = parseInt(document.querySelector('input[name="p1"]:checked').value);
const p2 = parseInt(document.querySelector('input[name="p2"]:checked').value);
const p3 = parseInt(document.querySelector('input[name="p3"]:checked').value);
const p4 = parseInt(document.querySelector('input[name="p4"]:checked').value);

// Contagem de pontuação por perfil
const pontuacoes = { 1: 0, 2: 0, 3: 0, 4: 0 };
[p1, p2, p3, p4].forEach(resp => {
    pontuacoes[resp]++;
});
   
// Identificação de resultado com tratamento de empates via condicionais
let maiorPontuacao = -1;
let perfilVencedorId = 1;
let empate = false;

for (let id in pontuacoes) {
  if (pontuacoes[id] > maiorPontuacao) {
    maiorPontuacao = pontuacoes[id];
    perfilVencedorId = parseInt(id);
    empate = false; // Reseta se encontrar uma pontuação estritamente maior
  } else if (pontuacoes[id] === maiorPontuacao) {
    // Critério de desempate determinístico mantendo robustez
    empate = true;
  }
}

// Exibe o alerta se ocorreu empate durante a verificação
if (empate) {
  alert("O usuário possui dois perfis, mas este perfil que escolhemos combina mais com ele.");
}

// Localiza os dados no array de objetos
const perfilEscolhido = perfis.find(p => p.id === perfilVencedorId);
// Preenchimento dos resultados na tela
document.getElementById('Nome').textContent = nome;
document.getElementById('dataNascimentoResult').textContent = idadeCalculada;
document.getElementById('resCategoria').textContent = perfilEscolhido.categoria;
document.getElementById('resNomePerfil').textContent = perfilEscolhido.nome;
document.getElementById('resDescricao').textContent = perfilEscolhido.descricao;
document.getElementById('resEmpate').textContent = empate;
document.getElementById('profileImageContainer').src = "img/"+perfilEscolhido.imagem;

 // Esconde o formulário de perguntas
  document.getElementById('conteudo-principal').style.visibility = 'hidden';
  
  // Mostra a tela de resultados
  document.getElementById('resultContainer').style.visibility = 'visible';
  window.scrollTo({ top: 0, behavior: 'smooth' });

});
document.getElementById('btn-refazer').addEventListener('click', function() {
  document.getElementById('conteudo-principal').style.visibility = 'visible';
  document.getElementById('resultContainer').style.visibility = 'hidden';
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
/*
document.getElementById('btn-enviar').addEventListener('click', function() {

  // Esconde o formulário de perguntas
  document.getElementById('conteudo-principal').style.display = 'none';
  
  // Mostra a tela de resultados
  document.getElementById('resultContainer').style.display = 'block';
});

// Transição visual entre telas
document.getElementById('btn-Refazer').classList.add('hidden');
document.getElementById('btn-Refazer').classList.remove('hidden');
window.scrollTo({ top: 0, behavior: 'smooth' });
});
// Evento para refazer o teste ("-refaça-")
document.getElementById('btnRefazer').addEventListener('click', function() {
    document.getElementById('btnRefazer').reset();
    document.getElementById('btn-Refazer').classList.add('hidden');
    document.getElementById('btnRefazer').classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
// Quando o usuário clica em "-refaça-"
document.getElementById('btn-refazer').addEventListener('click', function() {
  // Esconde a tela de resultados
  document.getElementById('btn-Refazer').style.display = 'none';
  
  // Mostra o formulário de perguntas novamente
  document.getElementById('conteudo-principal').style.display = 'block';

  // (Opcional) Limpa os campos do formulário se desejar
});
*/
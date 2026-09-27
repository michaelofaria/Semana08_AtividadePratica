// B.1 - BASE DE FILMES (JSON)

const catalogo = [

    {
        id: 1,
        titulo: "PANTERA NEGRA",
        tipo: "filme",
        ano: 2016,
        generos: ["ação", "ficção científica", "aventura"],
        nota: 10,
        assistido: true
    },

    {
        id: 2,
        titulo: "WANDAVISION",
        tipo: "serie",
        ano: 2021,
        generos: ["sitcom", "ação", "romance", "comédia"],
        nota: 10,
        assistido: true
    },

    {
        id: 3,
        titulo: "DOUTOR ESTRANHO",
        tipo: "filme",
        ano: 2016,
        generos: ["fantasia", "drama", "ação", "aventura"],
        nota: 9.5,
        assistido: true
    },

    {
        id: 4,
        titulo: "HOMEM-ARANHA: SEM VOLTA PARA CASA",
        tipo: "filme",
        ano: 2021,
        generos: ["nostalgia", "emoção", "aventura", "ação"],
        nota: 0,
        assistido: false
    },

    {
        id: 5,
        titulo: "CAVALEIRO DA LUA",
        tipo: "serie",
        ano: 2022,
        generos: ["ação", "mistério", "aventura", "drama"],
        nota: 0,
        assistido: false
    },

    {
        id: 6,
        titulo: "GUARDIÕES DA GALÁXIA",
        tipo: "filme",
        ano: 2014,
        generos: ["diversão", "ação", "aventura", "comédia"],
        nota: 8,
        assistido: true
    }

];
// B.2 - ACESSO E LEITURA DOS DADOS

console.log(catalogo);

// Título do primeiro item
console.log("Título do primeiro item:", catalogo[0].titulo);

// Ano do último item
console.log("Ano do último item:", catalogo[catalogo.length - 1].ano);

// Segundo gênero do terceiro item
if (catalogo[2].generos.length >= 2) {
    console.log(
        "Segundo gênero do terceiro item:",
        catalogo[2].generos[1]
    );
} else {
    console.log("O terceiro item não possui um segundo gênero.");
}

// B.3.A - LISTAGEM COM forEach

console.log("===== LISTA DE TÍTULOS =====");

catalogo.forEach(function(item) {
    console.log(`- [${item.tipo}] ${item.titulo} (${item.ano})`);
});

// B.3.B - TRANSFORMAÇÃO COM map


const titulosEmCaixaAlta = catalogo.map(function(item) {
    return item.titulo.toUpperCase();
});

console.log("===== TÍTULOS EM CAIXA ALTA =====");
console.log(titulosEmCaixaAlta);

// B.3.C - SELEÇÃO COM filter

const naoAssistidos = catalogo.filter(function(item) {
    return item.assistido === false;
});

console.log("===== ITENS NÃO ASSISTIDOS =====");
console.log(naoAssistidos);

console.log(
    "Quantidade de itens não assistidos:",
    naoAssistidos.length
);

// B.3.D - BUSCA COM find


const primeiroNotaAlta = catalogo.find(function(item) {
    return item.nota >= 9;
});

if (primeiroNotaAlta) {
    console.log("===== PRIMEIRO ITEM COM NOTA >= 9 =====");
    console.log("Título:", primeiroNotaAlta.titulo);
    console.log("Nota:", primeiroNotaAlta.nota);
} else {
    console.log("Nenhum item possui nota maior ou igual a 9.");
}

// B.3.E - AGREGAÇÃO COM reduce

const somaNotas = catalogo.reduce((acumulador, item) => {
    return acumulador + item.nota;
}, 0);

const mediaGeral = somaNotas / catalogo.length;

const resultadoAssistidos = catalogo.reduce((acumulador, item) => {

    if (item.assistido) {
        acumulador.soma += item.nota;
        acumulador.quantidade++;
    }

    return acumulador;

}, {
    soma: 0,
    quantidade: 0
});

const mediaAssistidos =
    resultadoAssistidos.soma / resultadoAssistidos.quantidade;

console.log("===== MÉDIAS =====");
console.log("Média geral:", mediaGeral.toFixed(2));
console.log("Média dos assistidos:", mediaAssistidos.toFixed(2));

// B.3.E - QUANTIDADES

const quantidadePorTipo = catalogo.reduce((acumulador, item) => {
    if (item.tipo === "filme") {
        acumulador.filmes++;
    } else if (item.tipo === "serie") {
        acumulador.series++;
    }

    return acumulador;
}, {
    filmes: 0,
    series: 0
});

console.log("===== QUANTIDADE POR TIPO =====");
console.log(quantidadePorTipo);

// B.3.F - RESUMO

const existeAntesDe2000 = catalogo.some(function(item) {
    return item.ano < 2000;
});

const todosTemGenero = catalogo.every(function(item) {
    return item.generos.length >= 1;
});

console.log("===== CHECAGENS =====");
console.log(
    "Existe algum item com ano anterior a 2000?",
    existeAntesDe2000
);

console.log(
    "Todos os itens possuem pelo menos 1 gênero?",
    todosTemGenero
);

// B.4 - SAÍDA NA TELA (DOM)


// Cria uma cópia do catálogo para o ranking
const ranking = [...catalogo];

ranking.sort(function(a, b) {
    return b.nota - a.nota;
});

// Seleciona a div onde o resumo será exibido
const output = document.getElementById("output");

// Cria o conteúdo do ranking
const rankingHTML = ranking
    .slice(0, 3)
    .map(function(item) {
        return `<li>${item.titulo} - Nota: ${item.nota}</li>`;
    })
    .join("");

// Exibe o resumo na página
output.innerHTML = `
    <h2>Resumo do Catálogo</h2>

    <p><strong>Total de itens:</strong> ${catalogo.length}</p>

    <p><strong>Filmes:</strong> ${quantidadePorTipo.filmes}</p>

    <p><strong>Séries:</strong> ${quantidadePorTipo.series}</p>

    <p><strong>Não assistidos:</strong> ${naoAssistidos.length}</p>

    <p><strong>Média geral:</strong> ${mediaGeral.toFixed(2)}</p>

    <h3>Top 3 - Maiores notas</h3>

    <ol>
        ${rankingHTML}
    </ol>
`;
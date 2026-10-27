
const parametros = new URLSearchParams(window.location.search);

const produto = parametros.get("produto");
const precoRecebido = Number(parametros.get("preco"));

const nomeProduto = document.getElementById("nomeProduto");
const precoProduto = document.getElementById("precoProduto");
const quantidade = document.getElementById("quantidade");
const valorTotal = document.getElementById("valorTotal");
const formulario = document.getElementById("formEncomenda");
const mensagem = document.getElementById("mensagem");

const produtosValidos = {
    "Queijo temperado": 45.00,
    "Geleia de amora": 26.00,
    "Mel artesanal": 20.00,
    "Biscoito de goiabada": 15.00,
    "Vinho artesanal": 75.00,
    "Vela religiosa": 48.00,
    "Hidratante artesanal": 43.90,
    "Pimenta defumada": 54.90
};

const preco = produtosValidos[produto];

function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// Confere se o produto recebido existe na lista.
if (produto && preco !== undefined &&
    precoRecebido === preco) {

    nomeProduto.textContent = produto;
    precoProduto.textContent = formatarMoeda(preco);

    atualizarTotal();

} else {
    nomeProduto.textContent = "Produto não encontrado";
    precoProduto.textContent = "Indisponível";
    valorTotal.textContent = "Indisponível";

    formulario.querySelector("button[type='submit']").disabled = true;
    formulario.querySelector("button[type='submit']").textContent =
        "Produto indisponível";
}

function atualizarTotal() {
    if (preco === undefined) return;

    let qtd = Number(quantidade.value);

    if (!Number.isFinite(qtd) || qtd < 1) {
        qtd = 1;
    }

    valorTotal.textContent = formatarMoeda(preco * qtd);
}

quantidade.addEventListener("input", atualizarTotal);

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    if (preco === undefined || precoRecebido !== preco) {
        mensagem.textContent = "Selecione um produto válido.";
        return;
    }

    if (!formulario.checkValidity()) {
        formulario.reportValidity();
        return;
    }

    const qtd = Number(quantidade.value);

    if (!Number.isInteger(qtd) || qtd < 1 || qtd > 99) {
        quantidade.setCustomValidity(
            "Escolha uma quantidade entre 1 e 99."
        );
        quantidade.reportValidity();
        quantidade.setCustomValidity("");
        return;
    }

    const nome = document.getElementById("nome").value.trim();

    mensagem.textContent =
        "Solicitação preenchida com sucesso, " + nome +
        "! Seu pedido é de " + qtd + " unidade(s) de " +
        produto + ", totalizando " +
        formatarMoeda(preco * qtd) + ".";
});

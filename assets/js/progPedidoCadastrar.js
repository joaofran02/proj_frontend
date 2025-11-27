const btnLogout = document.getElementById('btnLogout')
const btnClear = document.getElementById('btnClear')
const btn = document.getElementById('btn')

let resProdutos = document.getElementById('produtos')



btnLogout.addEventListener('click', () =>{
    
    sessionStorage.clear()
    location.href = '../index.html' 
})

btnClear.addEventListener('click', () =>{

    localStorage.clear('carrinho')
    location.reload()
})

window.addEventListener('DOMContentLoaded', () =>{

    let resNomeUser = document.getElementById('resNomeUser')
    let resTipo = document.getElementById('resTipo')

    const nomeUser = sessionStorage.getItem('nome')
    const tipo = sessionStorage.getItem('tipo')

    resNomeUser.innerHTML = nomeUser
    resTipo.innerHTML = tipo

    const token = sessionStorage.getItem('token')
    fetch(`http://localhost:3000/produto`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    .then(resp => resp.json())
    .then(dados =>{

        resProdutos.innerHTML = ''
        resProdutos.innerHTML = `<table cellpadding="8" border="1">${gerarTabela(dados)}</table>`
        resProdutos.style.textAlign = 'center'
    })
})

function gerarTabela(dados){

    // Busca o carrinho do sessionStorage
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    if (carrinho.length === 0) {

        return '<tbody><tr><td colspan="5">Seu carrinho está vazio.</td></tr></tbody>';
    }

    let tabela = ''
    tabela += 
    `
    <thead>
        <tr>
            <th>Nome</th>
            <th>Preço Unit.</th>
            <th>Quantidade</th> 
            <th>Subtotal</th>   
        </tr>
    </thead>
    `

    tabela += '<tbody>'

    // 2. Agora percorremos o CARRINHO, e não todos os produtos do banco
    carrinho.forEach(item => {

        // Calculamos o total daquele item (Preço * Qtd)
        let subtotal = item.preco * item.qtd;
        tabela += 
        `
        <tr>
            <td class="stack-sans-text-textWhite">${item.nome}</td>
            <td class="stack-sans-text-textWhite">R$ ${item.preco}</td>
            <td class="stack-sans-text-textWhite">${item.qtd}</td>
            <td class="stack-sans-text-textWhite">R$ ${subtotal.toFixed(2)}</td>
        </tr>
        `;
    });
    
    tabela += '</tbody>';
    return tabela;
}

const btnLogout = document.getElementById('btnLogout')
let resProdutos = document.getElementById('produtos')
let produtos = []

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

        produtos.innerHTML = ''
        dados.forEach(dad =>{
            
            produtos.push(dad)
            if(dad.ativo === true){

                produtos.innerHTML += 
                `
                <article class="produto">

                    <figure>

                        <img src="${dad.imagem_url}">
                        <p class="stack-sans-text-textWhite">Nome: ${dad.nome}<br>Descrição: ${dad.descricao}<br>Modelo: ${dad.modelo}<br>Preço: ${dad.preco}<br></p>

                    </figure>
                    <div class="controle-produto">

                        <input type="number" min="1" value="1" id="qtd-${dad.codProduto}">
                        <button onclick="add(${dad.codProduto})">Adicionar</button>

                    </div>
                </article>
                `
            }
        })
    })
})
function add(id){

    let qtd = parseInt(document.getElementById(`qtd-${id}`).value)
    let produto = produtos.find(p => p.id === id)
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || []

    // Adiciona item
    carrinho.push({
        id: produto.id,
        nome: produto.nome,
        qtd: qtd,
        preco: produto.preco
    })

    localStorage.setItem('carrinho', JSON.stringify(carrinho))
    alert("Produto adicionado ao carrinho!")
}

btnLogout.addEventListener('click', () =>{
    
    sessionStorage.clear()
    location.href = '../index.html' 
})


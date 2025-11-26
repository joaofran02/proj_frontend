const btn = document.getElementById('btn')
let res = document.getElementById('res')

btn.addEventListener('click', (e) =>{
    e.preventDefault()

    let codProduto = document.getElementById('codProduto').value
    let nome = document.getElementById('nome').value
    let descricao = document.getElementById('descricao').value
    let modelo = document.getElementById('modelo').value
    let preco = document.getElementById('preco').value
    let imagem_url = document.getElementById('imagem_url').value
    let ativo = document.getElementById('ativo').value


    const valores = {
        nome: nome,
        descricao: descricao,
        modelo: modelo,
        preco: preco,
        imagem_url: imagem_url,
        ativo: ativo
    }

    console.log(valores)

    // --------------------------------------------- ATUALIZAR PARCIAL --------------------------------------------
    if(!nome || !descricao || !modelo || !preco || !imagem_url || !ativo){

        console.log('Realizando PATCH')
        fetch(`http://localhost:3000/produto/:${codProduto}`, {
            method: 'PATCH',
            headers: {

                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },  
            body: JSON.stringify(valores)
        })
        .then(resp => resp.json())
        .then(dados =>{
    
            console.log(dados)
            res.innerHTML = ''
            res.innerHTML += dados.message
            res.style.textAlign = 'center'
        })
        .catch((err) =>{
    
            console.error('Erro ao atualizar parcialmente: ', err)
            res.innerHTML = 'Erro ao atualizar parcialmente: ' + err
            res.style.color = 'red'
            res.style.textAlign = 'center'
        }) 
    // -------------------------------------------- ATUALIZAR COMPLETO --------------------------------------------
    }else if(!nome || !descricao || !modelo || !preco || !ativo){

        console.log('Realizando PUT')
        fetch(`http://localhost:3000/produto/:${codProduto}`, {
            method: 'PUT',
            headers: {

                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },  
            body: JSON.stringify(valores)
        })
        .then(resp => resp.json())
        .then(dados =>{
    
            console.log(dados)
            res.innerHTML = ''
            res.innerHTML += dados.message
            res.style.textAlign = 'center'
        })
        .catch((err) =>{
    
            console.error('Erro ao atualizar completamente: ', err)
            res.innerHTML = 'Erro ao atualizar completamente: ' + err
            res.style.color = 'red'
            res.style.textAlign = 'center'
        })
    }
})
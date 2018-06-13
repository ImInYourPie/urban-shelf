window.onload = function(){
    //1. INSERIR NOME DO UTILIZADOR NA NAVBAR E NO CABEÇALHO
    let requisitionsHeader = document.getElementById("requisitionsHeader")
    let navbarDropdown = document.getElementById("navbarDropdown")

    requisitionsHeader.innerHTML = navbarDropdown.innerText+requisitionsHeader.innerHTML //ATUALIZAR TITULO DA TABELA COM O NOME DO UTILIZADOR

    //2. ALIMENTAR TABELA COM OS LIVROS ATUALMENTE REQUISITADOS PELO USER
    let tblRequisitions = document.getElementById("tblRequisitions")
    

    for(let i=0; i<arrayRequisitions.length;i++){
        if(arrayRequisitions[i]._userId == checkLoginStorage()){ //REFERENCIAR USER ATUAL
            tblRequisitions.getElementsByTagName("tbody")[0].innerHTML +=  "<tr>" +
            "<td>" + arrayRequisitions[i]._requisitionId + "</td>" +
            "<td>" + arrayLivros[arrayLivros.indexOf(arrayRequisitions[i]._bookId)]._title + "</td>" + //RETORNAR TITULO DO LIVRO COM O ID CORRESPONDENTE
            "<td>" + arrayRequisitions[i]._requisitionDate + "</td>" + 
            "<td>" + arrayRequisitions[i]._maxReturnDate + "</td>" + 
            "<td>" + arrayRequisitions[i]._fine + "</td>" + 
            '<td><button id="'+arrayRequisitions[i]._requisitionId+'" type="button" class="btn btn-primary" data-toggle="modal" data-target="#bookReturnModal"> Devolver/ Pagar</button></td>' //BOTÃO PARA DEVOLVER LIVRO/ PAGAR MULTA ////////////////////////
            +"</tr>"
        } 
    }
    
    //3. ATUALIZAR CONTADOR DE LIVROS REQUISITADOS
    let currentRequisitions = document.getElementById("currentRequisitions")
    let tblRequisitionsBookCount = tblRequisitions.getElementsByTagName("tbody")[0].getElementsByTagName("tr").length
    console.log(tblRequisitionsBookCount)
   

    currentRequisitions.innerHTML = currentRequisitions.innerHTML.replace('X', tblRequisitionsBookCount)

    //4. BOTÃO ENTREGA DE LIVRO

    //5. ESCOLHER BIBLIOTECA ONDE ENTREGAR O LIVRO

    //6. ATUALIZAR INFO DO LIVRO DEVOLVIDO

    //7. ATUALIZAR TABELA DE REQUISIÇÕES

    //8. ATUALIZAR CONTADOR DE LIVROS REQUISITADOS
    
}

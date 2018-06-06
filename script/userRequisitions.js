window.onload = function(){
    //1. INSERIR NOME DO UTILIZADOR NA NAVBAR E NO CABEÇALHO
    let requisitionsHeader = document.getElementById("requisitionsHeader")
    let navbarDropdown = document.getElementById("navbarDropdown")

    requisitionsHeader.innerHTML = navbarDropdown.innerText+requisitionsHeader.innerHTML

    //2. ALIMENTAR TABELA COM OS LIVROS ATUALMENTE REQUISITADOS PELO USER

    //3. ATUALIZAR CONTADOR DE LIVROS REQUISITADOS
    let tblRequisitions = document.getElementById("tblRequisitions")
    let currentRequisitions = document.getElementById("currentRequisitions")

    currentRequisitions.innerText.replace("X", tblRequisitions.getAttribute("rowspan") )//INCOMPLETO

    //4. BOTÃO ENTREGA DE LIVRO

    //5. ESCOLHER BIBLIOTECA ONDE ENTREGAR O LIVRO

    //6. ATUALIZAR INFO DO LIVRO DEVOLVIDO

    //7. ATUALIZAR TABELA DE REQUISIÇÕES

    //8. ATUALIZAR CONTADOR DE LIVROS REQUISITADOS
}

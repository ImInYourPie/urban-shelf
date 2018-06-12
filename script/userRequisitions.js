window.onload = function(){
    //1. INSERIR NOME DO UTILIZADOR NA NAVBAR E NO CABEÇALHO
    let requisitionsHeader = document.getElementById("requisitionsHeader")
    let navbarDropdown = document.getElementById("navbarDropdown")

    requisitionsHeader.innerHTML = navbarDropdown.innerText+requisitionsHeader.innerHTML //ATUALIZAR TITULO DA TABELA COM O NOME DO UTILIZADOR

    //2. ALIMENTAR TABELA COM OS LIVROS ATUALMENTE REQUISITADOS PELO USER
    let tblRequisitions = document.getElementById("tblRequisitions")

    for(let i=0; i<arrayRequisitions.length;i++){
        if(arrayRequisitions[i]._userId == ){ //FALTA REFERENCIAR USER ATUAL //////////////////////////////////////
            tblRequisitions.getElementsByTagName("tbody")[0].innerHTML +=  "<tr>" +
            "<td>" + arrayRequisitions[i]._requisitionId + "</td>" +
            "<td>" + arrayRequisitions[i]._books + "</td>" +
            "<td>" + arrayRequisitions[i]._requisitiondDate + "</td>" + //POR DEFINIR NA CLASSE REQUISITION /////////////////////////////////////////
            "<td>" + arrayRequisitions[i]._returnDate + "</td>" + //POR DEFINIR //////////////////////////////////////////////
            "<td>" + arrayRequisitions[i]._multa + "</td>" + //POR DEFINIR ///////////////////////////////////////////////
            '<td><button id="tblBtn'+i+'" type="button" class="btn btn-primary" data-toggle="modal" data-target="#bookReturnModal"> Devolver/ Pagar</button></td>' //BOTÃO PARA DEVOLVER LIVRO/ PAGAR MULTA ////////////////////////
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

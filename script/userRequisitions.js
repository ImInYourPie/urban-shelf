window.onload = function(){
    
    loginUser(); //EFETUAR LOGIN SE ESTE ESTIVER EM MEMÓRIA
    getStoredRequisitions();

    //1. INSERIR NOME DO UTILIZADOR NA NAVBAR E NO CABEÇALHO
    let requisitionsHeader = document.getElementById("requisitionsHeader")
    let navbarDropdown = document.getElementById("navbarDropdown")

    requisitionsHeader.innerHTML = navbarDropdown.innerText+requisitionsHeader.innerHTML //ATUALIZAR TITULO DA TABELA COM O NOME DO UTILIZADOR

    //2. ALIMENTAR TABELA COM OS LIVROS ATUALMENTE REQUISITADOS PELO USER
    let tblRequisitions = document.getElementById("tblRequisitions")
    
    let daysLeft = ""

    for(let i=0; i<arrayRequisitions.length;i++){
        if(arrayRequisitions[i]._userId == login.id){ //REFERENCIAR USER ATUAL
            //2.1 CALCULAR DIAS ATÉ A ENTREGA/ PASSADOS DESDE A DATA ESTABLECIDA PARA ENTREGA
            if(new Date().getTime()< arrayRequisitions[i]._requisitionDateFull+(1000*3600*24*30)){
                dateDifference = arrayRequisitions[i]._requisitionDateFull+(1000*3600*24*30) - new Date().getTime()
                console.log(dateDifference)
                daysLeft = (dateDifference/(1000*3600*24)).toFixed() +" dias até entrega"
            }
            else{
                dateDifference = new Date().getTime() - arrayRequisitions[i]._requisitionDateFull+(1000*3600*24*30)
                daysLeft = (dateDifference/(1000*3600*24)).toFixed()  +" dias em atraso"
            }
            //2.2 CALCULAR MULTAS
            if((new Date().getTime() - arrayRequisitions[i]._requisitionDateFull)/(1000*3600*24)>= 30){
                arrayRequisitions[i]._fine = ((new Date().getTime() - arrayRequisitions[i]._requisitionDateFull)/(1000*3600*24)).toFixed(2)+"€"
            }
            else{
                arrayRequisitions[i]._fine = "-"
            }

            tblRequisitions.getElementsByTagName("tbody")[0].innerHTML +=  "<tr>" +
            "<td>" + arrayRequisitions[i]._requisitionId + "</td>" +
            "<td>" + arrayLivros[arrayLivros.indexOf(arrayLivros[i])]._title + "</td>" + //RETORNAR TITULO DO LIVRO COM O ID CORRESPONDENTE
            "<td>" + arrayRequisitions[i]._requisitionDate + "</td>" + 
            "<td>" + daysLeft + "</td>" +  //NECESSÁRIO ALTERAR PARA MOSTRAR DIAS ATÉ A ENTREGA / DIAS PASSADOS DA ENTREGA
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

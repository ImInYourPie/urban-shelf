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
    let displayFine

    for(let i=0; i<arrayRequisitions.length;i++){
        if(arrayRequisitions[i]._userId == login.id){ //REFERENCIAR USER ATUAL
            //2.1 CALCULAR DIAS ATÉ A ENTREGA/ PASSADOS DESDE A DATA ESTABLECIDA PARA ENTREGA
            if(new Date().getTime()< arrayRequisitions[i]._requisitionDateFull+(1000*3600*24*30)){
                dateDifference = arrayRequisitions[i]._requisitionDateFull+(1000*3600*24*30) - new Date().getTime()
                console.log(dateDifference)
                daysLeft = (dateDifference/(1000*3600*24)).toFixed() +" dias até entrega"
            }
            else{
                dateDifference = new Date().getTime() - arrayRequisitions[i]._requisitionDateFull-(1000*3600*24*30)
                daysLeft = (dateDifference/(1000*3600*24)).toFixed()  +" dias em atraso"
            }
            //2.2 CALCULAR MULTAS
            if((new Date().getTime() - arrayRequisitions[i]._requisitionDateFull)/(1000*3600*24)>= 30){
                arrayRequisitions[i]._fine = ((new Date().getTime() - arrayRequisitions[i]._requisitionDateFull-(1000*3600*24*30))/(1000*3600*24)).toFixed(2)+"€"
                displayFine = arrayRequisitions[i]._fine
                localStorage.requisitionStorage = JSON.stringify(arrayRequisitions)
                getStoredRequisitions()
            }
            else{
                displayFine = "-"
            }
            console.log(arrayRequisitions[i]._requisitionId)
            
            let tblBookTitle
            for (let j = 0; j<arrayLivros.length;j++){
                if(arrayRequisitions[i]._bookId == arrayLivros[j]._bookId){
                    tblBookTitle = arrayLivros[j]._title
                }

            }

            tblRequisitions.getElementsByTagName("tbody")[0].innerHTML +=  "<tr>" +
            "<td>" + arrayRequisitions[i]._requisitionId + "</td>" +
            "<td class='title'>" + tblBookTitle + "</td>" + //RETORNAR TITULO DO LIVRO COM O ID CORRESPONDENTE
            "<td class='reqDate'>" + arrayRequisitions[i]._requisitionDate + "</td>" + 
            "<td class='daysLeft'>" + daysLeft + "</td>" +  //NECESSÁRIO ALTERAR PARA MOSTRAR DIAS ATÉ A ENTREGA / DIAS PASSADOS DA ENTREGA
            "<td class='fine'>" + displayFine + "</td>" + 
            '<td><button id="'+tblRequisitions.getElementsByTagName("tbody")[0].getElementsByTagName("tr").length+'" type="button" class="btn btn-primary" style="width: 140px;" data-toggle="modal" data-target="#bookReturnModal"> Devolver/ Pagar</button></td>' //BOTÃO PARA DEVOLVER LIVRO/ PAGAR MULTA ////////////////////////
            +"</tr>"
        } 
    }
    
    //3. ATUALIZAR CONTADOR DE LIVROS REQUISITADOS
    let currentRequisitions = document.getElementById("currentRequisitions")
    let tblRequisitionsBookCount = tblRequisitions.getElementsByTagName("tbody")[0].getElementsByTagName("tr").length
    console.log(tblRequisitionsBookCount)
   

    currentRequisitions.innerHTML = currentRequisitions.innerHTML.replace('X', tblRequisitionsBookCount)

    //4. BOTÃO ENTREGA DE LIVRO/ PAGAMENTO DE MULTA
        //ADICIONAR EVENT LISTENER A TDS OS BOTÕES
        for(let i=0; i<tblRequisitionsBookCount;i++){
            document.getElementById(i).addEventListener("click", function(){
                document.getElementById("modalTitle").innerHTML = "Título"
                document.getElementById("modalRequisitionDate").innerHTML = "Data de requisição: "
                document.getElementById("modalDaysLeft").innerHTML = "Dias até entrega: "
                document.getElementById("modalFine").innerHTML = "Multa a pagar: "

                document.getElementById("modalTitle").innerHTML = tblRequisitions.getElementsByTagName("tbody")[0].getElementsByTagName("tr")[i].getElementsByClassName("title")[0].innerHTML
                document.getElementById("modalRequisitionDate").innerHTML += ""+tblRequisitions.getElementsByTagName("tbody")[0].getElementsByTagName("tr")[i].getElementsByClassName("reqDate")[0].innerHTML
                document.getElementById("modalDaysLeft").innerHTML += ""+tblRequisitions.getElementsByTagName("tbody")[0].getElementsByTagName("tr")[i].getElementsByClassName("daysLeft")[0].innerHTML
                document.getElementById("modalFine").innerHTML += ""+tblRequisitions.getElementsByTagName("tbody")[0].getElementsByTagName("tr")[i].getElementsByClassName("fine")[0].innerHTML
            })
        }
    //5. ESCOLHER BIBLIOTECA ONDE ENTREGAR O LIVRO
     //5.1 ALIMENTAR O SELECT DA MODAL COM AS BIBLIOTECAS QUE NÃO SE ENCONTRAM CHEIAS
     let tblBibliotecaSelect = document.getElementById("tblBibliotecaSelect")

     //INCOMPLETO /////////////////////////////
     for(let i=0; i<arrayBibliotecas.length;i++){
         if(arrayBibliotecas[i].length < arrayBibliotecas[i]._capacity){
            tblBibliotecaSelect.innerHTML += "<option value='"+arrayBibliotecas[i]._libraryId+"'>"+arrayBibliotecas[i]._adress+"</option>"
         }
     }

    //6. ATUALIZAR INFO DO LIVRO DEVOLVIDO

    //7. ATUALIZAR TABELA DE REQUISIÇÕES

    //8. ATUALIZAR CONTADOR DE LIVROS REQUISITADOS
    
}

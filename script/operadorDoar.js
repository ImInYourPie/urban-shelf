window.onload = function(){
    refreshStoredBooks();

    //1. CRIAR REFERÊNCIAS AOS VARIOS ELEMENTOS
    
    
    let formDoarLivro = document.getElementById("formDoarLivro");
    let tblBooks = document.getElementById("tblBooks");
   
    //2. DEFINIR DATA MAXIMA  DE LANÇAMENTO E DOAÇÃO POSSIVEL 
    let dataAtual = new Date()
    let dd = dataAtual.getDate()
    let mm = dataAtual.getMonth()+1
    let yyyy= dataAtual.getFullYear()

    let new_dataAtual=""
    if(mm >=10 && dd>=10){  
        new_dataAtual = yyyy.toString()+"-"+mm.toString()+"-"+dd.toString()

    }
    else if(mm <10 && dd>=10){
        new_dataAtual = yyyy.toString()+"-0"+mm.toString()+"-"+dd.toString()

    }
    else if(mm <10 && dd<10){
        new_dataAtual = yyyy.toString()+"-0"+mm.toString()+"-0"+dd.toString()

    }

    doarLivroDataLançamento.setAttribute("max", new_dataAtual)
    doarLivroDataDonation.setAttribute("max", new_dataAtual)

    //3. ALIMENTAR OPÇOES DE GENERO
    for (var i = 0; i < arrayCategorias.length; i++) {
       
        doarLivroGenero.innerHTML += "<option value='"+arrayCategorias[i]._categoryId+"'>"+arrayCategorias[i]._nameCategory+"</option>"
        
    }

    //4. ALIMENTAR OPÇOES DE TAGS
    for (var i = 0; i < arrayTags.length; i++) {
        doarLivroTags.innerHTML += "<option value='"+arrayTags[i]._tagId+"'>"+arrayTags[i]._nameTag+"</option>"
        
    }

    // ALIMENTAR OPÇÔES BIBLIOTECA
    for (var i = 0; i < arrayBibliotecas.length; i++) {
        doarLivroBiblioteca.innerHTML += "<option value='"+arrayBibliotecas[i]._libraryId+"'>"+arrayBibliotecas[i]._adress+"</option>"
        
    }


    //5. VERIFICAÇOES
    formDoarLivro.addEventListener("submit", function(event){
        event.preventDefault();
        // VARIABEIS
        let doarLivroTitulo = document.getElementById("doarLivroTitulo")
        let doarLivroCapa = document.getElementById("doarLivroCapa")
        let doarLivroDescription = document.getElementById("doarLivroDescription")
        let doarLivroAutores = document.getElementById("doarLivroAutores")
        let doarLivroDataLançamento = document.getElementById("doarLivroDataLançamento")
        let doarLivroGenero = document.getElementById("doarLivroGenero")
        let doarLivroTags = document.getElementById("doarLivroTags")
        let doarLivroEditora = document.getElementById("doarLivroEditora")
        let doarLivroPaginas = document.getElementById("doarLivroPaginas")
        let doarLivroEstado = document.getElementById("doarLivroEstado")
        let doarLivroDoador = document.getElementById("doarLivroDoador")
        let doarLivroDataDonation = document.getElementById("doarLivroDataDonation")
        let doarLivroBiblioteca = document.getElementById("doarLivroBiblioteca")

        let errorMsg = "";
        let donerName = "Anónimo";
        let count = 0;

        // CHECK IF HAS DONER NAME
        if(doarLivroDoador.value != ""){
            donerName = doarLivroDoador.value;
        }

        // CHECK IF LIBRARY ALREADY AT MAX CAPACITY
        for (let i = 0; i < arrayLivros.length; i++) {
            if (arrayLivros[i]._libraryId == doarLivroBiblioteca.value){
                count++;
            }
        }
        for (let i = 0; i < arrayBibliotecas.length; i++) {
            if (doarLivroBiblioteca.value == arrayBibliotecas[i]._libraryId) {
                if (count >= arrayBibliotecas[i]._capacity) {
                    errorMsg = "A biblioteca já se encontra na sua capacidade máxima!";
                }
            }
        }
           
        
        


        //6. CRIAR NOVO OBJETO "LIVRO" E ADICIONAR AO ARRAY
        if(errorMsg == ""){
                let newBook = new Book(doarLivroTitulo.value,
                    doarLivroCapa.value,
                    doarLivroAutores.value,
                    doarLivroDescription.value,
                    doarLivroDataLançamento.value,
                    doarLivroGenero.value,
                    doarLivroTags.value,
                    doarLivroEditora.value,
                    doarLivroPaginas.value,
                    doarLivroEstado.value,
                    donerName,
                    doarLivroDataDonation.value,
                    doarLivroBiblioteca.value,
                    0,
                    "")

            arrayLivros.push(newBook);

            // STORE IN LOCAL STORAGE
            localStorage.bookStorage = JSON.stringify(arrayLivros);
            getStoredBooks();
        }
        else{
            alert(errorMsg);
        }
        


    })

    
}
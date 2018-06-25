window.onload = function () {
    loginUser();
    allowLogout();

    refreshStoredBooks();

    //1. CRIAR REFERÊNCIAS AOS VARIOS ELEMENTOS


    let formDoarLivro = document.getElementById("formDoarLivro");
    let tblBooks = document.getElementById("tblBooks");

    //2. DEFINIR DATA MAXIMA  DE LANÇAMENTO E DOAÇÃO POSSIVEL 
    let dataAtual = new Date()
    let dd = dataAtual.getDate()
    let mm = dataAtual.getMonth() + 1
    let yyyy = dataAtual.getFullYear()

    let new_dataAtual = ""
    if (mm >= 10 && dd >= 10) {
        new_dataAtual = yyyy.toString() + "-" + mm.toString() + "-" + dd.toString()

    }
    else if (mm < 10 && dd >= 10) {
        new_dataAtual = yyyy.toString() + "-0" + mm.toString() + "-" + dd.toString()

    }
    else if (mm < 10 && dd < 10) {
        new_dataAtual = yyyy.toString() + "-0" + mm.toString() + "-0" + dd.toString()

    }

    doarLivroDataLançamento.setAttribute("max", new_dataAtual)
    let doarLivroDataDonation = new_dataAtual

    //3. ALIMENTAR OPÇOES DE GENERO
    for (var i = 0; i < arrayCategorias.length; i++) {

        doarLivroGenero.innerHTML += "<option value='" + arrayCategorias[i]._categoryId + "'>" + arrayCategorias[i]._nameCategory + "</option>"

    }

    //4. ALIMENTAR OPÇOES DE TAGS
    for (var i = 0; i < arrayTags.length; i++) {
        doarLivroTags.innerHTML += "<option value='" + arrayTags[i]._tagId + "'>" + arrayTags[i]._nameTag + "</option>"

    }



    // ALIMENTAR OPÇÔES BIBLIOTECA
    for (var i = 0; i < arrayBibliotecas.length; i++) {
        doarLivroBiblioteca.innerHTML += "<option value='" + arrayBibliotecas[i]._libraryId + "'>" + arrayBibliotecas[i]._adress + "</option>"

    }

    //5. PREVIEW DA CAPA
    let btnCapaPreview = document.getElementById("btnCapaPreview")
    let urlCapaPreview = document.getElementById("urlCapaPreview")
    btnCapaPreview.addEventListener("click", function () {
        urlCapaPreview.setAttribute("src", document.getElementById("doarLivroCapa").value)

    })
    //6. VERIFICAÇOES
    formDoarLivro.addEventListener("submit", function (event) {
        event.preventDefault();
        // VARIAVEIS
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
        let doarLivroBiblioteca = document.getElementById("doarLivroBiblioteca")

        let errorMsg = "";
        let donerName = "Anónimo";
        let count = 0;

        // CHECK IF HAS DONER NAME
        if (doarLivroDoador.value != "") {
            donerName = doarLivroDoador.value;
        }

        // CHECK IF LIBRARY ALREADY AT MAX CAPACITY
        for (let i = 0; i < arrayLivros.length; i++) {
            if (arrayLivros[i]._libraryId == doarLivroBiblioteca.value) {
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


        //AGRUPAR TODAS AS TAGS DO SELECT
        let selectTags = []
        for (let i = 0; i < doarLivroTags.getElementsByTagName("option").length; i++) {
            if (doarLivroTags.getElementsByTagName("option")[i].selected) {
                selectTags.push(doarLivroTags.getElementsByTagName("option")[i].value)
            }
        }


        //7. CRIAR NOVO OBJETO "LIVRO" E ADICIONAR AO ARRAY
        if (errorMsg == "") {
            let newBook = new Book(doarLivroTitulo.value,
                doarLivroCapa.value,
                doarLivroAutores.value,
                doarLivroDescription.value,
                doarLivroDataLançamento.value,
                doarLivroGenero.value,
                selectTags,
                doarLivroEditora.value,
                doarLivroPaginas.value,
                doarLivroEstado.value,
                donerName,
                doarLivroDataDonation,
                doarLivroBiblioteca.value,
                [0],
                [])

            arrayLivros.push(newBook);
            // STORE IN LOCAL STORAGE
            localStorage.bookStorage = JSON.stringify(arrayLivros);
            refreshStoredBooks();
            event.preventDefault();
            formDoarLivro.reset()
        }
        else {
            alert(errorMsg);
        }



    })


}
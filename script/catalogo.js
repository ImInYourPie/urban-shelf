window.onload = function () {
    // INITIATE FUNCTIONS 
    loginUser();
    allowLogout();
    getStoredBooks();
    getStoredBibliotecas();
    getStoredCategorias();
    getStoredRequisitions();
    showUserNotifications();
    
    
    // VARS
    let fullBooksCount;
    if (parseInt(arrayLivros.length % 12) == 0) {
        fullBooksCount = parseInt(arrayLivros.length / 12);
    }
    else{
        fullBooksCount = parseInt(arrayLivros.length / 12) + 1;
    }
    let currentBooksCount = 1;
    let startingCount = 0;
    let finishCount = 11;
    let arrayFilteredBooks = [];
    let filteredStartingCount = 0;
    let paginationDiv = document.getElementById("paginationDiv");
    let clearBtn = document.getElementById("clearBtn");
    let displayNumberOfPages = document.getElementById("displayNumberOfPages");
    displayNumberOfPages.innerHTML = currentBooksCount + " de " + fullBooksCount;

    // CALL FEED BOOKS
    feedBooks(startingCount, finishCount, arrayLivros);


    // FILTER FUNCTIONS
    let categoryFilterForm = document.getElementById("categoryFilterForm");
    let categoryFilter = document.getElementById("categoryFilter");
    let lirbraryFilterForm = document.getElementById("libraryFilterForm");
    let libraryFilter = document.getElementById("libraryFilter");
    let sortingFilter = document.getElementById("sortingFilter");
    let sortingForm = document.getElementById("sortingForm");






    // TODO FILTERS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // ADD OPTIONS TO SELECTS
    // CATEGORY SELECT
    categoryFilter.innerHTML += "<option value='' disabled selected>Filtrar</option>";
    for (let i = 0; i < arrayCategorias.length; i++) {
        categoryFilter.innerHTML += "<option value='" + arrayCategorias[i]._categoryId + "'>" + arrayCategorias[i]._nameCategory + "</option>";
        
    }

    // LIBRARY SELECT
    libraryFilter.innerHTML += "<option value='' disabled selected>Filtrar</option>";
    for (let i = 0; i < arrayBibliotecas.length; i++) {
        libraryFilter.innerHTML += "<option value='" + arrayBibliotecas[i]._libraryId + "'>" + arrayBibliotecas[i]._adress + "</option>";
        
    }

    // LIBRARY SELECT
    sortingFilter.innerHTML += "<option value='' disabled selected>Ordenar por</option>";
    
        

    // EVENT LISTENER FOR SEARCH BAR
    let searchForm = document.getElementById("searchForm");
    searchForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // VARS
        let searchBar = document.getElementById("searchBar");
        
        // FUNCTIONS
        searchBookItems(searchBar.value);
        feedBooks(filteredStartingCount, arrayFilteredBooks.length, arrayFilteredBooks);
        console.log(paginationDiv)
        paginationDiv.style.display = "none";
        searchForm.style.display = "none";
        clearBtn.style.display = "block";

    })
   

    // CLEAR BTN EVENT
    clearBtn.addEventListener("click", function (event) {
        event.preventDefault();
        window.location = "catalog.html";
    })


    // SEARCH BAR
    function searchBookItems(input) {
        input = searchBar.value.toUpperCase();
        // LOOP TO CHECK 
        for (i = 0; i < arrayLivros.length; i++) {
            if ((arrayLivros[i]._title.toUpperCase().indexOf(input) > -1) || (arrayLivros[i]._autor.toUpperCase().indexOf(input) > -1)) {
                    arrayFilteredBooks.push(arrayLivros[i]);
            }
        }
    }



    // BUTTONS FOR "PAGINATION"
    let previousPageBtn = document.getElementById("previousPageBtn");
    let nextPageBtn = document.getElementById("nextPageBtn");

    // EVENT LISTENER PREVIOUS
    previousPageBtn.addEventListener("click", function (event) {
        event.preventDefault();

        // CONDITION CHECK 
        if(startingCount != 0 ){
            startingCount -= 12;
            finishCount -= 12;
            currentBooksCount--;
            feedBooks(startingCount, finishCount, arrayLivros);
            displayNumberOfPages.innerHTML = currentBooksCount + " de " + fullBooksCount;
        }
        else{
            feedBooks(startingCount, finishCount, arrayLivros);
        }
    })

    // EVENT LISTENER PREVIOUS
    nextPageBtn.addEventListener("click", function (event) {
        event.preventDefault();

        if (finishCount < arrayLivros.length -1) {
            startingCount += 12;
            finishCount += 12;
            currentBooksCount++;
            feedBooks(startingCount, finishCount, arrayLivros);
            displayNumberOfPages.innerHTML = currentBooksCount + " de " + fullBooksCount;
        }
        else{
            feedBooks(startingCount, finishCount, arrayLivros);
        }

    })


}
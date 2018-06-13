window.onload = function () {
    // INITIATE FUNCTIONS 
    loginUser();
    allowLogout();
    getStoredBooks();
    
    
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

        if (finishCount >= arrayLivros.length) {
            feedBooks(startingCount, finishCount, arrayLivros);
        }
        else{
            startingCount += 12;
            finishCount += 12;
            currentBooksCount++;
            feedBooks(startingCount, finishCount, arrayLivros);
            displayNumberOfPages.innerHTML = currentBooksCount + " de " + fullBooksCount;
        }

    })


}
window.onload = function () {
    // INITIATE FUNCTIONS 
    loginUser();
    allowLogout();
    // getStoredBooks();
    
    // VARS
    let startingCount = 0;
    let finishCount = 11;
    let arrayFilteredBooks = [];
    let filteredStartingCount = 0;
    let filteredFinishCount = arrayFilteredBooks.length;
    let paginationDiv = document.getElementById("paginationDiv");
    let clearBtn = document.getElementById("clearBtn");

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
        feedBooks(filteredStartingCount, filteredFinishCount, arrayFilteredBooks);
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
}
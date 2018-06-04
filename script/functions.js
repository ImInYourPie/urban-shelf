// GET STORED BOOKS
function refreshStoredBooks() {
    getStoredBooks();
    refreshTableBooks();
}



function getStoredBooks() {
    if(localStorage.bookStorage){
        arrayLivros = JSON.parse(localStorage.bookStorage);
    }
}




// ARRAYTAGS GET LOCAL STORAGE
function refreshStoredTags() {
    getStoredTags();
    refreshTableTags();
}

function getStoredTags() {
    if (localStorage.tagStorage){
        arrayTags = JSON.parse(localStorage.tagStorage);
    }
}




// ARRAYCATEGORIAS GET LOCAL STORAGE
function refreshStoredCategorias() {
    getStoredCategorias();
    refreshTableCategorias();
}

function getStoredCategorias() {
    if (localStorage.categoriaStorage){
        arrayCategorias = JSON.parse(localStorage.categoriaStorage);
    }
}




// ARRAYBIBLIOTECAS GET LOCAL STORAGE
function refreshStoredBibliotecas() {
    getStoredBibliotecas();
    refreshTableBibliotecas();
    addMapMarkers();

}
function getStoredBibliotecas() {
    if (localStorage.bibliotecaStorage){
        arrayBibliotecas = JSON.parse(localStorage.bibliotecaStorage);
    }
}




// ARRAYUSERS GET LOCAL STORAGE
function refreshStoredUsers() {
    getStoredUsers();
    refreshTableUsers();
}

function getStoredUsers(){
    if (localStorage.userStorage){
        arrayUsers = JSON.parse(localStorage.userStorage);
    }
}







// DISPLAY MAP MARKERS ONLY
function displayMapMarkes() {
    if (localStorage.bibliotecaStorage){
        arrayBibliotecas = JSON.parse(localStorage.bibliotecaStorage);
        addMapMarkers();
    }
}

// ADDMAPMARKERS FUNCTION
function addMapMarkers() {
    var icon = {
        url: "images/map-marker-alt.png", // url
        scaledSize: new google.maps.Size(70, 50), // scaled size
    };
    for (let i = 0; i < arrayBibliotecas.length; i++) {
        let marker = new google.maps.Marker({
           position: {lat: parseFloat(arrayBibliotecas[i]._coordenatesLat), lng: parseFloat(arrayBibliotecas[i]._coordenatesLong)},
           map: map,
           title: arrayBibliotecas[i]._adress,
           icon: icon
        })
        
    }
}














// REFRESHTABLE TAGS FUNCTION
function refreshTableBooks() {
    let strHtml = "";
    strHtml = "<thead class='thead'><tr>" +
    "<th class='w-30'>Capa</th>" +
    "<th class='w-50'>Título</th>" +
    "<th class='w-20'>ID Biblioteca</th>" +
    "<th class='w-20'>ID Livro</th>" +
    "<th class='w-20'></th>" +
    "</tr>" + 
    "</thead><tbody>"

    for (var i = 0; i < arrayLivros.length; i++) {
        strHtml += "<tr>" +
        "<td><img class='bookCover' src='" + arrayLivros[i]._cover + "' alt='capa'></td>" +
        "<td>" + arrayLivros[i]._title + "</td>" +
        "<td>" + arrayLivros[i]._libraryId + "</td>" +
        "<td>" + arrayLivros[i]._bookId + "</td>" +
        "<td>" +
            "<a id='" + arrayLivros[i]._bookId + "' class='editBtn' data-toggle='modal' data-target='#editModal'><i class='fas fa-edit'></i></a> " +
            "<a id='" + arrayLivros[i]._bookId + "' class='removeBook'><i class='fas fa-trash-alt'></i></a> " +
        "</td>" + 
        "</tr>"
    }
    strHtml += "</tbody>";

    tblBooks.innerHTML = strHtml;

     // GET REMOVE LINKS FROM TABLE
     let tdRemove = document.getElementsByClassName("removeBook");
     let editBtn = document.getElementsByClassName("editBtn");

     // ADD LISTENER TO EACH REMOVE ITEM
     for (let i = 0; i < tdRemove.length; i++) {
         tdRemove[i].addEventListener("click", function() {
             let isConfirmed = confirm("Está prestes a eliminar o livro!");
             // ON CLICK TARGET REMOVE FROM TABLE
             if(isConfirmed){
                let bookId = tdRemove[i].getAttribute("id");
                removeBook(bookId);
                refreshStoredBooks();
             }
         })        
     }

     // ADD LISTENER TO EACH EDIT ITEM
     for (let i = 0; i < editBtn.length; i++) {
        editBtn[i].addEventListener("click", function() {
            // ON CLICK TARGET FILL MODAL WITH VALUES
            let bookId = editBtn[i].getAttribute("id");
            document.getElementById("editBookCondition").value = arrayLivros[i]._condition;
            document.getElementById("editBookCondition").focus();
            editBook(bookId);
            refreshStoredBooks();
        })        
    }
     
 }

 // REMOVE BOOK
 function removeBook(id) {
     for (let i = 0; i < arrayLivros.length; i++) {
         if(arrayLivros[i]._bookId == id) {
             arrayLivros.splice(i, 1)
             localStorage.bookStorage = JSON.stringify(arrayLivros);
         }                  
     }
}

// EDIT BOOK
function editBook(id) {
    let editBookForm = document.getElementById("editBookForm");
    editBookForm.addEventListener("submit", function (event){
        // GET VALUE FROM MODAL
        let bookCondition = document.getElementById("editBookCondition");

        // CHANGE VALUE
        for (let i = 0; i < arrayLivros.length; i++) {
            if(arrayLivros[i]._bookId == id){
                arrayLivros[i]._condition = bookCondition.value;
                localStorage.bookStorage = JSON.stringify(arrayLivros);
            }
        }
    })
}














// REFRESHTABLE TAGS FUNCTION
function refreshTableTags() {
    let strHtml = "";
    strHtml = "<thead class='thead'><tr>" +
    "<th class='w-30'>Tag</th>" +
    "<th class='w-50'>ID</th>" +
    "<th class='w-20'></th>" +
    "</tr>" + 
    "</thead><tbody>"

    for (var i = 0; i < arrayTags.length; i++) {
        strHtml += "<tr>" +
        "<td>" + arrayTags[i]._nameTag + "</td>" +
        "<td>" + arrayTags[i]._tagId + "</td>" +
        "<td>" +
            "<a id='" + arrayTags[i]._tagId + "' class='editBtn' data-toggle='modal' data-target='#editModal'><i class='fas fa-edit'></i></a> " +
            "<a id='" + arrayTags[i]._tagId + "' class='removeTag'><i class='fas fa-trash-alt'></i></a> " +
        "</td>" + 
        "</tr>"
    }
    strHtml += "</tbody>";

    tblTags.innerHTML = strHtml;

     // GET REMOVE LINKS FROM TABLE
     let tdRemove = document.getElementsByClassName("removeTag");
     let editBtn = document.getElementsByClassName("editBtn");

     // ADD LISTENER TO EACH REMOVE ITEM
     for (let i = 0; i < tdRemove.length; i++) {
         tdRemove[i].addEventListener("click", function() {
             let isConfirmed = confirm("Está prestes a eliminar a tag!");
             // ON CLICK TARGET REMOVE FROM TABLE
             if(isConfirmed){
                let tagId = tdRemove[i].getAttribute("id");
                removeTag(tagId);
                refreshStoredTags();
             }
         })        
     }

     // ADD LISTENER TO EACH EDIT ITEM
     for (let i = 0; i < editBtn.length; i++) {
        editBtn[i].addEventListener("click", function() {
            // ON CLICK TARGET FILL MODAL WITH VALUES
            let tagId = editBtn[i].getAttribute("id");
            document.getElementById("editTagName").value = arrayTags[i]._nameTag;
            document.getElementById("editTagName").focus();
            editTag(tagId);
            refreshStoredTags();
        })        
    }
     
 }

 // REMOVE TAG
 function removeTag(id) {
     for (let i = 0; i < arrayTags.length; i++) {
         if(arrayTags[i]._tagId == id) {
             arrayTags.splice(i, 1)
             localStorage.tagStorage = JSON.stringify(arrayTags);
         }                  
     }
}

// EDIT TAG
function editTag(id) {
    let editTagForm = document.getElementById("editTagForm");
    editTagForm.addEventListener("submit", function (event){
        // GET VALUE FROM MODAL
        let tagName = document.getElementById("editTagName");

        // CHANGE VALUE
        for (let i = 0; i < arrayTags.length; i++) {
            if(arrayTags[i]._tagId == id){
                arrayTags[i]._nameTag = tagName.value;
                localStorage.tagStorage = JSON.stringify(arrayTags);
            }
        }
    })
}


















// REFRESHTABLE CATEGORIAS FUNCTION
function refreshTableCategorias() {
    let strHtml = "";
    strHtml = "<thead class='thead'><tr>" +
    "<th class='w-30'>Categoria</th>" +
    "<th class='w-50'>ID</th>" +
    "<th class='w-20'></th>" +
    "</tr>" + 
    "</thead><tbody>"

    for (var i = 0; i < arrayCategorias.length; i++) {
        strHtml += "<tr>" +
        "<td>" + arrayCategorias[i]._nameCategory + "</td>" +
        "<td>" + arrayCategorias[i]._categoryId + "</td>" +
        "<td>" +
            "<a id='" + arrayCategorias[i]._categoryId + "' class='editBtn' data-toggle='modal' data-target='#editModal'><i class='fas fa-edit'></i></a> " +
            "<a id='" + arrayCategorias[i]._categoryId + "' class='removeCategoria'><i class='fas fa-trash-alt'></i></a> " +
        "</td>" + 
        "</tr>"
    }
    strHtml += "</tbody>";

    tblCategorias.innerHTML = strHtml;

     // GET REMOVE LINKS FROM TABLE
     let tdRemove = document.getElementsByClassName("removeCategoria");
     let editBtn = document.getElementsByClassName("editBtn");

     // ADD LISTENER TO EACH REMOVE ITEM
     for (let i = 0; i < tdRemove.length; i++) {
         tdRemove[i].addEventListener("click", function() {
            let isConfirmed = confirm("Está prestes a eliminar a categoria!");
             // ON CLICK TARGET REMOVE FROM TABLE
             if(isConfirmed){
                let categoryId = tdRemove[i].getAttribute("id");
                removeCategoria(categoryId);
                refreshStoredCategorias();
             }
         })        
     }

     // TOGGLE EDIT MODAL CATEGORIAS
     for (let i = 0; i < editBtn.length; i++) {
        editBtn[i].addEventListener("click", function() {
            // ON CLICK TARGET FILL MODAL WITH VALUES
            let categoryId = editBtn[i].getAttribute("id");
            document.getElementById("editCategoriaName").value = arrayCategorias[i]._nameCategory;
            document.getElementById("editCategoriaName").focus();
            editCategory(categoryId);
            refreshStoredCategorias();
        })        
    }
     
 }

 // REMOVE CATEGORIA
 function removeCategoria(id) {
     for (let i = 0; i < arrayCategorias.length; i++) {
         if(arrayCategorias[i]._categoryId == id) {
             arrayCategorias.splice(i, 1);
             localStorage.categoriaStorage = JSON.stringify(arrayCategorias);
         }                  
     }

}

// EDIT CATEGORIA
function editCategoria(id) {
    let editCategoriaForm = document.getElementById("editCategoriaForm");
    editCategoriaForm.addEventListener("submit", function (event){
        // GET VALUE FROM MODAL
        let editCategoriaName = document.getElementById("editCategoriaName");

        // CHANGE VALUE
        for (let i = 0; i < arrayCategorias.length; i++) {
            if(arrayCategorias[i]._categoryId == id){
                arrayCategorias[i]._nameCategory = editCategoriaName.value;
                localStorage.categoriaStorage = JSON.stringify(arrayCategorias);
            }
        }
    })
}













// REFRESHTABLE BIBLIOTECAS FUNCTION
function refreshTableBibliotecas() {
    let strHtml = "";
    strHtml = "<thead class='thead'><tr>" +
    "<th class='w-30'>Localização</th>" +
    "<th class='w-30'>Morada</th>" +
    "<th class='w-30'>Coordenadas</th>" +
    "<th class='w-20'>Capacidade</th>" +
    "<th class='w-20'>ID</th>" +
    "<th class='w-20'></th>" +
    "</tr>" + 
    "</thead><tbody>"

    for (var i = 0; i < arrayBibliotecas.length; i++) {
        strHtml += "<tr>" +
        "<td>" + arrayBibliotecas[i]._location + "</td>" +
        "<td>" + arrayBibliotecas[i]._adress + "</td>" +
        "<td>" + arrayBibliotecas[i]._coordenatesLat + "; " + arrayBibliotecas[i]._coordenatesLong + "</td>" +
        "<td>" + arrayBibliotecas[i]._capacity + "</td>" +
        "<td>" + arrayBibliotecas[i]._libraryId + "</td>" +
        "<td>" +
            "<a id='" + arrayBibliotecas[i]._libraryId + "' class='editBtn' data-toggle='modal' data-target='#editModal'><i class='fas fa-edit'></i></a> " +
            "<a id='" + arrayBibliotecas[i]._libraryId + "' class='removeBiblioteca'><i class='fas fa-trash-alt'></i></a> " +
        "</td>" + 
        "</tr>"
    }
    strHtml += "</tbody>";
    tblBibliotecas.innerHTML = strHtml;

    // GET REMOVE LINKS FROM TABLE
    let tdRemove = document.getElementsByClassName("removeBiblioteca");
    let editBtn = document.getElementsByClassName("editBtn");

    // ADD LISTENER TO EACH REMOVE ITEM
    for (let i = 0; i < tdRemove.length; i++) {
        tdRemove[i].addEventListener("click", function() {
            let isConfirmed = confirm("Está prestes a eliminar a biblioteca!");
            // ON CLICK TARGET REMOVE FROM TABLE
            if(isConfirmed){
                let bibliotecaId = tdRemove[i].getAttribute("id");
                removeBiblioteca(bibliotecaId);
                refreshStoredBibliotecas();
            }
        })        
    }

    // ADD LISTENER TO EACH EDIT ITEM
    for (let i = 0; i < editBtn.length; i++) {
        editBtn[i].addEventListener("click", function() {
            // ON CLICK TARGET FILL MODAL WITH VALUES
            let bibliotecaId = editBtn[i].getAttribute("id");
            document.getElementById("editLocation").value = arrayBibliotecas[i]._location;
            document.getElementById("editAdress").value = arrayBibliotecas[i]._adress;
            document.getElementById("editCapacity").value = arrayBibliotecas[i]._capacity;
            document.getElementById("editLat").value = arrayBibliotecas[i]._coordenatesLat;
            document.getElementById("editLong").value = arrayBibliotecas[i]._coordenatesLong;
            editBiblioteca(bibliotecaId);
            refreshStoredBibliotecas();
        })        
    }
}

// REMOVE BIBLIOTECA
function removeBiblioteca(id) {
    for (let i = 0; i < arrayBibliotecas.length; i++) {
        if(arrayBibliotecas[i]._libraryId == id) {
            arrayBibliotecas.splice(i, 1)
            localStorage.bibliotecaStorage = JSON.stringify(arrayBibliotecas);
        }                  
    }
}

// EDIT BIBLIOTECA
function editBiblioteca(id) {
    let editBibliotecaForm = document.getElementById("editBibliotecaForm");
    editBibliotecaForm.addEventListener("submit", function (event){
        // GET VALUE FROM MODAL
        let editLocation = document.getElementById("editLocation");
        let editAdress = document.getElementById("editAdress");
        let editCapacity = document.getElementById("editCapacity");
        let editLat = document.getElementById("editLat");
        let editLong = document.getElementById("editLong");

        // CHANGE VALUE
        for (let i = 0; i < arrayBibliotecas.length; i++) {
            if(arrayBibliotecas[i]._libraryId == id){
                arrayBibliotecas[i]._location = editLocation.value;
                arrayBibliotecas[i]._adress = editAdress.value;
                arrayBibliotecas[i]._capacity = editCapacity.value;
                arrayBibliotecas[i]._coordenatesLat = editLat.value;
                arrayBibliotecas[i]._coordenatesLong = editLong.value;
                localStorage.bibliotecaStorage = JSON.stringify(arrayBibliotecas);
            }
        }
    })
}















// REFRESHTABLE USERS FUNCTION
function refreshTableUsers() {
    let strHtml = "";
    strHtml = "<thead class='thead'><tr>" +
    "<th class='w-30'>Username</th>" +
    "<th class='w-30'>Email</th>" +
    "<th class='w-20'>Tipo de Utilizador</th>" +
    "<th class='w-30'>ID</th>" +
    "<th class='w-20'></th>" +
    "</tr>" + 
    "</thead><tbody>"

    for (var i = 0; i < arrayUsers.length; i++) {
        strHtml += "<tr>" +
        "<td>" + arrayUsers[i]._username + "</td>" +
        "<td>" + arrayUsers[i]._email + "</td>" +
        "<td>" + arrayUsers[i]._userType + "</td>" +
        "<td>" + arrayUsers[i]._userId + "</td>" +
        "<td>" +
            "<a id='" + arrayUsers[i]._userId + "' class='removeCategoria'><i class='fas fa-trash-alt'></i></a> " +
        "</td>" + 
        "</tr>"
    }
    strHtml += "</tbody>";

    tblUsers.innerHTML = strHtml;

     // GET REMOVE LINKS FROM TABLE
     let tdRemove = document.getElementsByClassName("removeCategoria");

     // ADD LISTENER TO EACH ITEM
     for (let i = 0; i < tdRemove.length; i++) {
         tdRemove[i].addEventListener("click", function() {
            let isConfirmed = confirm("Está prestes a eliminar o utilizador!");
             // ON CLICK TARGET REMOVE FROM TABLE
             if(isConfirmed){
                let userId = tdRemove[i].getAttribute("id");
                removeUser(userId);
                refreshStoredUsers();
             }
         })        
     }
 }

 // REMOVE USER
function removeUser(id) {
    for (let i = 0; i < arrayUsers.length; i++) {
        if(arrayUsers[i]._userId == id) {
            arrayUsers.splice(i, 1)
            localStorage.userStorage = JSON.stringify(arrayUsers);
        }                  
    }
}







// REFRESH TOP BOOKS
function refreshTop() {
}



// LOGIN USER

// CHECK STORAGE FOR USER
function checkLoginStorage() {
    if (localStorage.loginStorage) {
        login = JSON.parse(localStorage.loginStorage);
    }
}

function loginUser() {
    checkLoginStorage();
    console.log("d")
    if(login != undefined){
        if (login.typeUser == 0) {
            console.log("s")
            loadAdminPage();
        }
        if (login.typeUser == 1) {
            loadOperatorPage();
        }
        if (login.typeUser == 2) {
            loadUserPage();
        }
    }
}


// LOGOUT FUNCTION
function logoutUser() {
    document.getElementById("logoutButton").addEventListener("click", function (event) {
        event.preventDefault();
        if (localStorage.loginStorage) {
            localStorage.removeItem("loginStorage");
            window.location = "home.html"; 
        }
    })
}









// LOAD USERTYPES HTML PAGES 

function loadUserPage() {
    // ALTERAR NAVBAR
    if (document.getElementById("navLogin")) {
        document.getElementById("navLogin").style.display = "none";
    }
    if (document.getElementById("navRegister")) {
        document.getElementById("navRegister").style.display = "none";
    }
    navDropdownUser.style.display = "block";
    operadorDropdownPanel.style.display = "none";
    adminDropdownPanel.style.display = "none";
    if (navCatalog.hasAttribute("data-toggle")) {
        navCatalog.removeAttribute("data-toggle", "data-target");
        navCatalog.setAttribute("href",  "catalog.html");
    }
    if (navBibliotecas.hasAttribute("data-toggle")) {
        navBibliotecas.removeAttribute("data-toggle", "data-target");
        navBibliotecas.setAttribute("href",  "bibliotecas.html");
    }
    navbarDropdown.innerHTML = "<img src='" + login.photo + "' id='userPhoto' class='img img-fluid'></img>" + login.userName;

}

function loadAdminPage() {
    console.log("ls")
    if (document.getElementById("navLogin")) {
        document.getElementById("navLogin").style.display = "none";
    }
    if (document.getElementById("navRegister")) {
        document.getElementById("navRegister").style.display = "none";
    }
    navDropdownUser.style.display = "block";
    operadorDropdownPanel.style.display = "none";
    adminDropdownPanel.style.display = "block";
    if (navCatalog.hasAttribute("data-toggle")) {
        navCatalog.removeAttribute("data-toggle", "data-target");
        navCatalog.setAttribute("href",  "catalog.html");
    }
    if (navBibliotecas.hasAttribute("data-toggle")){
        navBibliotecas.removeAttribute("data-toggle", "data-target");
        navBibliotecas.setAttribute("href",  "bibliotecas.html");
    }
    navbarDropdown.innerHTML = "<img src='" + login.photo + "' id='userPhoto' class='img-circle'></img>" + login.userName;
    console.log("ssssss")

}

function loadOperatorPage() {
    // ALTERAR NAVBAR
    if (document.getElementById("navLogin")) {
        document.getElementById("navLogin").style.display = "none";
    }
    if (document.getElementById("navRegister")) {
        document.getElementById("navRegister").style.display = "none";
    }
    navDropdownUser.style.display = "block";
    operadorDropdownPanel.display = "block";
    adminDropdownPanel.display = "none";
    if (navCatalog.hasAttribute("data-toggle")) {
        navCatalog.removeAttribute("data-toggle", "data-target");
        navCatalog.setAttribute("href",  "catalog.html");
    }
    if (navBibliotecas.hasAttribute("data-toggle")) {
        navBibliotecas.removeAttribute("data-toggle", "data-target");
        navBibliotecas.setAttribute("href",  "bibliotecas.html");
    }
    navbarDropdown.innerHTML = "<i id='userIcon' class='fas fa-user-circle'></i>" + login.userName;

}





// LOAD BOOKS
// LOAD TOP
// function loadTopBooks() {
//     let topLivros = [];
//     arrayLivros.sort(a,b => {
        
//     });
// 
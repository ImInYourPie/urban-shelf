// // TEST SCRIPT
// function testBooks() {
    
//     let newBook1 = new Book("EU SOU MELO","images/bookCoverNotAvailable.jpg", "El Melo", "FALA SOBRE O MELO", "2018-01-08", 7, [2,3], "EU MESMO",
//     30, 1, "MELO", "2018-01-30", 2, [15, 75], "");
    
// let newBook2 = new Book("EU SOU MELO","images/bookCoverNotAvailable.jpg", "El Melo", "FALA SOBRE O MELO", "2018-01-08", 7, [2,3], "EU MESMO",
// 30, 1, "MELO", "2018-01-30", 2, [15, 75], "");

// let newBook3 = new Book("EU SOU MELO","images/bookCoverNotAvailable.jpg", "El Melo", "FALA SOBRE O MELO", "2018-01-08", 7, [2,3], "EU MESMO",
//     30, 1, "MELO", "2018-01-30", 2, [20, 30], "");
    
// let newBook4 = new Book("EU SOU MELO","images/bookCoverNotAvailable.jpg", "El Melo", "FALA SOBRE O MELO", "2018-01-08", 7, [2,3], "EU MESMO",
// 30, 1, "MELO", "2018-01-30", 2, [15, 75], "");

// let newBook5 = new Book("EU SOU MELO","images/bookCoverNotAvailable.jpg", "El Melo", "FALA SOBRE O MELO", "2018-01-08", 7, [2,3], "EU MESMO",
//     30, 1, "MELO", "2018-01-30", 2, [10, 60], "");
    
// let newBook6 = new Book("EU SOU MELO","images/bookCoverNotAvailable.jpg", "El Melo", "FALA SOBRE O MELO", "2018-01-08", 7, [2,3], "EU MESMO",
// 30, 1, "MELO", "2018-01-30", 2, [15, 75], "");

// let newBook7 = new Book("EU SOU MELO","images/bookCoverNotAvailable.jpg", "El Melo", "FALA SOBRE O MELO", "2018-01-08", 7, [2,3], "EU MESMO",
//     30, 1, "MELO", "2018-01-30", 2, [15, 5], "");


// arrayLivros.push(newBook1, newBook2, newBook3, newBook4, newBook5, newBook6, newBook7)
// localStorage.bookStorage = JSON.stringify(arrayLivros);
// getStoredBooks();
// }

















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
        scaledSize: new google.maps.Size(70, 55), // scaled size
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
    "<th class='w-20'>Estado</th>" +
    "<th class='w-20'>ID Biblioteca</th>" +
    "<th class='w-20'>ID Livro</th>" +
    "<th class='w-20'></th>" +
    "</tr>" + 
    "</thead><tbody>"

    for (var i = 0; i < arrayLivros.length; i++) {
        strHtml += "<tr>" +
        "<td><img class='bookCover' src='" + arrayLivros[i]._cover + "' alt='capa'></td>" +
        "<td>" + arrayLivros[i]._title + "</td>" +
        "<td>" + arrayLivros[i]._condition + "</td>" +
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
            document.getElementById("editEstado").value = arrayLivros[i]._condition;
            document.getElementById("editEstado").focus();
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
        let bookCondition = document.getElementById("editEstado");

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
            editCategoria(categoryId);
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
function allowLogout() {
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
    // VARS
    let navLogin = document.getElementById("navLogin");
    let navRegister = document.getElementById("navRegister");
    let navLogout = document.getElementById("navLogout");
    let navDropdownUserPage = document.getElementById("dropdownUserPage");
    let adminDropdownPanel = document.getElementById("adminDropdownPanel");
    let operadorDropdownPanel = document.getElementById("operadorDropdownPanel");
    let navCatalog = document.getElementById("navCatalog");
    let navBibliotecas = document.getElementById("navBibliotecas");
    let navbarDropdown = document.getElementById("navbarDropdown");
    let infoDiv = document.getElementById("infoDiv");
    let welcomeJumbotron = document.getElementById("welcomeJumbotron");
    let whereDiv = document.getElementById("whereDiv");

    if (navLogin) {
        navLogin.style.display = "none";
    }
    if (navRegister) {
        navRegister.style.display = "none";
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
    if (login.photo) {
        navbarDropdown.innerHTML = "<img src='" + login.photo + "' id='userPhoto' class='img img-fluid'></img>" + login.userName;
    }
    else{
        navbarDropdown.innerHTML = "<img src='images/userIcon(white).png' id='userPhoto' class='img img-fluid'></img>" + login.userName;
    }
    if(welcomeJumbotron){
        welcomeJumbotron.style.display = "none";
    }
    if(infoDiv){
        infoDiv.style.display = "none";
    }
    if(whereDiv){
        whereDiv.style.display = "none";
    }


}

function loadAdminPage() {
    // VARS
    let navLogin = document.getElementById("navLogin");
    let navRegister = document.getElementById("navRegister");
    let navLogout = document.getElementById("navLogout");
    let navDropdownUserPage = document.getElementById("dropdownUserPage");
    let adminDropdownPanel = document.getElementById("adminDropdownPanel");
    let operadorDropdownPanel = document.getElementById("operadorDropdownPanel");
    let navCatalog = document.getElementById("navCatalog");
    let navBibliotecas = document.getElementById("navBibliotecas");
    let navbarDropdown = document.getElementById("navbarDropdown");
    let infoDiv = document.getElementById("infoDiv");
    let welcomeJumbotron = document.getElementById("welcomeJumbotron");
    let whereDiv = document.getElementById("whereDiv");

    if (navLogin) {
        navLogin.style.display = "none";
    }
    if (navRegister) {
        navRegister.style.display = "none";
    }
    navDropdownUser.style.display = "block";
    operadorDropdownPanel.style.display = "none";
    adminDropdownPanel.style.display = "block";
    if (navCatalog) {
    if (navCatalog.hasAttribute("data-toggle")) {
        navCatalog.removeAttribute("data-toggle", "data-target");
        navCatalog.setAttribute("href",  "catalog.html");
    }
}
if (navBibliotecas) {
    if (navBibliotecas.hasAttribute("data-toggle")){
        navBibliotecas.removeAttribute("data-toggle", "data-target");
        navBibliotecas.setAttribute("href",  "bibliotecas.html");
    }
}
    if (login.photo) {
        navbarDropdown.innerHTML = "<img src='" + login.photo + "' id='userPhoto' class='img img-fluid'></img>" + login.userName;
    }
    else{
        navbarDropdown.innerHTML =  "<img src='images/userIcon(white).png' id='userPhoto' class='img img-fluid'></img>" + login.userName;
    }
    if(welcomeJumbotron){
        welcomeJumbotron.style.display = "none";
    }
    if(infoDiv){
        infoDiv.style.display = "none";
    }
    if(whereDiv){
        whereDiv.style.display = "none";
    }

}

function loadOperatorPage() {
    // VARS
    let navLogin = document.getElementById("navLogin");
    let navRegister = document.getElementById("navRegister");
    let navLogout = document.getElementById("navLogout");
    let navDropdownUserPage = document.getElementById("dropdownUserPage");
    let adminDropdownPanel = document.getElementById("adminDropdownPanel");
    let operadorDropdownPanel = document.getElementById("operadorDropdownPanel");
    let navCatalog = document.getElementById("navCatalog");
    let navBibliotecas = document.getElementById("navBibliotecas");
    let navbarDropdown = document.getElementById("navbarDropdown");
    let infoDiv = document.getElementById("infoDiv");
    let welcomeJumbotron = document.getElementById("welcomeJumbotron");
    let whereDiv = document.getElementById("whereDiv");

    if (navLogin) {
        navLogin.style.display = "none";
    }
    if (navRegister) {
        navRegister.style.display = "none";
    }

    navDropdownUser.style.display = "block";
    operadorDropdownPanel.style.display = "block";
    adminDropdownPanel.style.display = "none";
    if(navCatalog){
        if (navCatalog.hasAttribute("data-toggle")) {
            navCatalog.removeAttribute("data-toggle", "data-target");
            navCatalog.setAttribute("href",  "catalog.html");
        }
    }
    
    if(navBibliotecas){
        if (navBibliotecas.hasAttribute("data-toggle")) {
            navBibliotecas.removeAttribute("data-toggle", "data-target");
            navBibliotecas.setAttribute("href",  "bibliotecas.html");
        }
    }
    if (login.photo) {
        navbarDropdown.innerHTML = "<img src='" + login.photo + "' id='userPhoto' class='img img-fluid'></img>" + login.userName;
    }
    else{
        navbarDropdown.innerHTML = "<img src='images/userIcon(white).png' id='userPhoto' class='img img-fluid'></img>" + login.userName;
    }
    if(welcomeJumbotron){
        welcomeJumbotron.style.display = "none";
    }
    if(infoDiv){
        infoDiv.style.display = "none";
    }
    if(whereDiv){
        whereDiv.style.display = "none";
    }

}




// LOAD TOP BOOKS
function loadTopBooks() {
    sortByScoreDown();
    let strHtmlCard = "";
    strHtmlCard += `<div class="row row-fluid">` 
    let count = 0;
    for (var i = 0; i < 6; i++) {

        strHtmlCard += "<div class='col-md-2 mb-5'>" +
                "<div id='" + arrayLivros[i]._bookId + "' class='bookItem card'>";
                
                if (arrayLivros[i]._cover) {
                    strHtmlCard += "<img class='card-img-top' src='" + arrayLivros[i]._cover + "' alt='image cap'>";
                }
                else{
                    strHtmlCard += "<img class='card-img-top' src='images/bookCoverNotAvailable.jpg' alt='image cap'>";
                }

                strHtmlCard += "<div class='card-body flex-column'>" +
                "<h5 class='titles card-title'>" + arrayLivros[i]._title + "</h5>" +
                "<p class='authors card-text'>" + arrayLivros[i]._autor + "</p>" +
                "</div>" +
                "<div class='card-footer align-center'>" + "<p class='score card-text'>" + starRating(arrayLivros[i]._scores) + "</p>" + 
                "</div>" +     
                "</div>" +  
            "</div>" 

    }
    strHtmlCard += "</div>"
    let topBooksDiv = document.getElementById("topBooksDiv");
    topBooksDiv.innerHTML = strHtmlCard;

    

}



// LOAD RECENT BOOKS
function loadRecentBooks() {
    sortByDonationDateDown();
    let strHtmlCard = "";
    strHtmlCard += `<div class="row row-fluid">` 
    let count = 0;
    for (var i = 0; i < 6; i++) {

        strHtmlCard += "<div class='col-md-2 mb-5'>" +
                "<div id='" + arrayLivros[i]._bookId + "' class='bookItem card'>";
                
                if (arrayLivros[i]._cover) {
                    strHtmlCard += "<img class='card-img-top' src='" + arrayLivros[i]._cover + "' alt='image cap'>";
                }
                else{
                    strHtmlCard += "<img class='card-img-top' src='images/bookCoverNotAvailable.jpg' alt='image cap'>";
                }

                strHtmlCard += "<div class='card-body flex-column'>" +
                "<h5 class='titles card-title'>" + arrayLivros[i]._title + "</h5>" +
                "<p class='authors card-text'>" + arrayLivros[i]._autor + "</p>" +
                "</div>" +
                "<div class='card-footer align-center'>" + "<p class='score card-text'>" + starRating(arrayLivros[i]._scores) + "</p>" + 
                "</div>" +     
                "</div>" +  
            "</div>" 

    }
    strHtmlCard += "</div>"
    let recentBooksDiv = document.getElementById("recentBooksDiv");
    recentBooksDiv.innerHTML = strHtmlCard;

    // ADD EVENT LISTENER TO TRIGGER BOOK PAGE WITH TARGET BOOK CONTENT
    let bookItem = document.getElementsByClassName("bookItem");
    for (let i = 0; i < bookItem.length; i++) {
        bookItem[i].addEventListener("click", function() {
            // GET ID VALUE
            let bookItemId = bookItem[i].getAttribute("id");
            
            setStorageValuesBook(bookItemId);
            getBookPageValues();
            window.location = "bookPage.html"
            
        })        
    }
    
}


// SOME FUNCTION
function setStorageValuesBook(id) {
    
    for (let i = 0; i < arrayLivros.length; i++) {
        if (id == arrayLivros[i]._bookId) {
            localStorage.bookPageValues = JSON.stringify(arrayLivros[i]);
        }
    }
}

function getBookPageValues() {
    if (localStorage.bookPageValues) {
        pageBookValues = JSON.parse(localStorage.bookPageValues);
    }
}




// SORT BOOKS
// SORT BY SCORE BY MOST SCORED
function sortByScoreDown() {
    arrayLivros.sort((a, b) => b._score - a._score);
    console.log(arrayLivros);
}

// SORT BY RELEASE DATE BY MOST RECENT
function sortByReleaseDateDown(){
    arrayLivros.sort((a, b) => b._releaseDate - a._releaseDate);
}

// SORT BY SCORE BY LEAST SCORED
function sortByScoreUp() {
    arrayLivros.sort((a, b) => a._score - b._score);
}

// SORT BY RELEASE DATE BY OLDEST
function sortByReleaseDateUp(){
    arrayLivros.sort((a, b) => a._releaseDate - b._releaseDate);
}

// SORT BY DONATION DATE BY MOST RECENT
function sortByDonationDateDown(){
    arrayLivros.sort((a, b) => b._donationDate > a._donationDate);
}

// SORT BY DONATION DATE BY OLDEST | DONT KNOW IF NEEDED
function sortByDonationDateUp(){
    arrayLivros.sort((a, b) => a._donationDate > b._donationDate);
}






// FEED BOOKS TO CATALOG CONTAINER
function feedBooks(startArrayLivros, endArrayLivros, someArrayLivros) {
    let strHtmlCard = "";
    let count = 0;
    
    for (var i = startArrayLivros; i < endArrayLivros + 1; i++) {
        if (i < someArrayLivros.length) {
            if (count == 0) {
                strHtmlCard += `<div class="row row-fluid mb-5">`   
            }
            
                 strHtmlCard += "<div class='col-md-2 mb-5'>" +
                "<div id='" + arrayLivros[i]._bookId + "' class='bookItem card'>";
                
                if (arrayLivros[i]._cover) {
                    strHtmlCard += "<img class='card-img-top' src='" + arrayLivros[i]._cover + "' alt='image cap'>";
                }
                else{
                    strHtmlCard += "<img class='card-img-top' src='images/bookCoverNotAvailable.jpg' alt='image cap'>";
                }

                strHtmlCard += "<div class='card-body flex-column'>" +
                "<h5 class='titles card-title'>" + arrayLivros[i]._title + "</h5>" +
                "<p class='authors card-text'>" + arrayLivros[i]._autor + "</p>" +
                "</div>" +
                "<div class='card-footer align-center'>" + "<p class='score card-text'>" + starRating(arrayLivros[i]._scores) + "</p>" + 
                "</div>" +     
                "</div>" +      
                "</div>" 
    
                count++;
                console.log(i, count, someArrayLivros.length);

                
                if (count == 6 || i == someArrayLivros.length - 1 ) {
                    strHtmlCard += "</div>";
                    count = 0;
                    console.log("xxx")
                } 
                console.log(someArrayLivros[i]._fullScore)
        }

    
    }
           

    let contentBooks = document.getElementById("contentBooks");
    contentBooks.innerHTML = strHtmlCard;

    // ADD EVENT LISTENER TO TRIGGER BOOK PAGE WITH TARGET BOOK CONTENT
    let bookItem = document.getElementsByClassName("bookItem");
    for (let i = 0; i < bookItem.length; i++) {
        bookItem[i].addEventListener("click", function() {
            // GET ID VALUE
            let bookItemId = bookItem[i].getAttribute("id");
            
            setStorageValuesBook(bookItemId);
            getBookPageValues();
            window.location = "bookPage.html"
            
        })        
    }
}


// STAR RATING
function starRating(givenScores) {

    // CALCULATE SCORE(){
    console.log(givenScores)
    let total = givenScores.length;
    let summedScore = givenScores.reduce((total, add) => total + add);
    let score = summedScore / total;


    
    console.log(score)
    let strScore = "";
    if(score >= 85){
        strScore = "<span class='fa fa-star checked'></span>" +
        "<span class='fa fa-star checked'></span>" +
        "<span class='fa fa-star checked'></span>" +
        "<span class='fa fa-star checked'></span>" +
        "<span class='fa fa-star checked'></span>"
    }
    if((score >= 70) && (score < 85)){
        strScore = "<span class='fa fa-star checked'></span>" +
        "<span class='fa fa-star checked'></span>" +
        "<span class='fa fa-star checked'></span>" +
        "<span class='fa fa-star checked'></span>" +
        "<span class='fa fa-star'></span>"
    }
    if((score >= 40) && (score < 70)){
        strScore = "<span class='fa fa-star checked'></span>" +
        "<span class='fa fa-star checked'></span>" +
        "<span class='fa fa-star checked'></span>" +
        "<span class='fa fa-star'></span>" +
        "<span class='fa fa-star'></span>"
    }
    if((score >= 20) && (score < 40)){
        strScore = "<span class='fa fa-star checked'></span>" +
        "<span class='fa fa-star checked'></span>" +
        "<span class='fa fa-star'></span>" +
        "<span class='fa fa-star'></span>" +
        "<span class='fa fa-star'></span>"
    }
    if((score < 20) && (score != 0)){
        strScore = "<span class='fa fa-star checked'></span>" +
        "<span class='fa fa-star'></span>" +
        "<span class='fa fa-star'></span>" +
        "<span class='fa fa-star'></span>" +
        "<span class='fa fa-star'></span>"
    }
    if(score == 0){
        strScore = "<span class='fa fa-star'></span>" +
        "<span class='fa fa-star'></span>" +
        "<span class='fa fa-star'></span>" +
        "<span class='fa fa-star'></span>" +
        "<span class='fa fa-star'></span>"
    }

    return strScore;
}





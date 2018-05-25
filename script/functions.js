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
function getStoredCategorias() {
    if (localStorage.categoriaStorage){
        arrayCategorias = JSON.parse(localStorage.categoriaStorage);
        refreshTableCategorias();
    }
}




// ARRAYBIBLIOTECAS GET LOCAL STORAGE
function getStoredBibliotecas() {
    if (localStorage.bibliotecaStorage){
        arrayBibliotecas = JSON.parse(localStorage.bibliotecaStorage);
        refreshTableBibliotecas();
        addMapMarkers();
    }
}




// ARRAYUSERS GET LOCAL STORAGE
function getStoredUsers(){
    if (localStorage.userStorage){
        arrayUsers = JSON.parse(localStorage.userStorage);
        refreshTableUsers();
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
    for (let i = 0; i < arrayBibliotecas.length; i++) {
        let marker = new google.maps.Marker({
           position: {lat: parseInt(arrayBibliotecas[i]._coordenatesLat), lng: parseInt(arrayBibliotecas[i]._coordenatesLong)},
           map: map,
           title: arrayBibliotecas[i]._adress
        })
        
    }
}

















// REFRESHTABLE TAGS FUNCTION
function refreshTableTags() {
    let strHtml = "";
    strHtml = "<thead class='thead-dark'><tr>" +
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
    strHtml = "<thead class='thead-dark'><tr>" +
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
                getStoredCategorias();
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
            getStoredCategorias();
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
    strHtml = "<thead class='thead-dark'><tr>" +
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
                getStoredBibliotecas();
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
            getStoredBibliotecas();
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
    strHtml = "<thead class='thead-dark'><tr>" +
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
                getStoredUsers();
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








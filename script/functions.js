// ARRAYTAGS GET LOCAL STORAGE
function getStoredTags() {
    if (localStorage.tagStorage){
        arrayTags = JSON.parse(localStorage.tagStorage);
        refreshTableTags();
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


// ADDMAPMARKERS FUNCTION
function addMapMarkers() {
    for (let i = 0; i < arrayBibliotecas.length; i++) {
        let marker = new google.maps.Marker({
            position: {lat: parseInt(arrayBibliotecas[i]._coordenatesLat), lng: parseInt(arrayBibliotecas[i]._coordenatesLong)},
            map: map,
            title: arrayBibliotecas[i]._adress,
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
            "<a id='" + arrayTags[i]._tagId + "' class='edit'><i class='fas fa-edit'></i></a> " +
            "<a id='" + arrayTags[i]._tagId + "' class='removeTag'><i class='fas fa-trash-alt'></i></a> " +
        "</td>" + 
        "</tr>"
    }
    strHtml += "</tbody>";

    tblTags.innerHTML = strHtml;

     // GET REMOVE LINKS FROM TABLE
     let tdRemove = document.getElementsByClassName("removeTag");

     // ADD LISTENER TO EACH ITEM
     for (let i = 0; i < tdRemove.length; i++) {
         tdRemove[i].addEventListener("click", function() {
             let isConfirmed = confirm("Está prestes a eliminar a tag!");
             // ON CLICK TARGET REMOVE FROM TABLE
             if(isConfirmed){
                let tagId = tdRemove[i].getAttribute("id");
                removeTag(tagId);
                getStoredTags();
             }
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
            "<a id='" + arrayCategorias[i]._categoryId + "' class='edit'><i class='fas fa-edit'></i></a> " +
            "<a id='" + arrayCategorias[i]._categoryId + "' class='removeCategoria'><i class='fas fa-trash-alt'></i></a> " +
        "</td>" + 
        "</tr>"
    }
    strHtml += "</tbody>";

    tblCategorias.innerHTML = strHtml;

     // GET REMOVE LINKS FROM TABLE
     let tdRemove = document.getElementsByClassName("removeCategoria");

     // ADD LISTENER TO EACH ITEM
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

// REFRESHTABLE TAGS FUNCTION
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
            "<a id='" + arrayBibliotecas[i]._libraryId + "' class='edit'><i class='fas fa-edit'></i></a> " +
            "<a id='" + arrayBibliotecas[i]._libraryId + "' class='removeBiblioteca'><i class='fas fa-trash-alt'></i></a> " +
        "</td>" + 
        "</tr>"
    }
    strHtml += "</tbody>";

    tblBibliotecas.innerHTML = strHtml;

     // GET REMOVE LINKS FROM TABLE
     let tdRemove = document.getElementsByClassName("removeBiblioteca");

     // ADD LISTENER TO EACH ITEM
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

     
 }

 // REMOVE Biblioteca
 function removeBiblioteca(id) {
     for (let i = 0; i < arrayBibliotecas.length; i++) {
         if(arrayBibliotecas[i]._libraryId == id) {
             arrayBibliotecas.splice(i, 1)
             localStorage.bibliotecaStorage = JSON.stringify(arrayBibliotecas);
         }                  
     }

}






// ARRAYTAGS GET LOCAL STORAGE
function getStoredTags() {
    if (localStorage.tagStorage){
        arrayTags = JSON.parse(localStorage.tagStorage);
        refreshTableTags();
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
             // ON CLICK TARGET REMOVE FROM TABLE
             let tagId = tdRemove[i].getAttribute("id");
             removeTag(tagId);
             getStoredTags();
             
         })        
     }

     
 }

 // REMOVE TAG
 function removeTag(id) {
     for (let i = 0; i < arrayTags.length; i++) {
         if(arrayTags[i]._tagId == id) {
             arrayTags.splice(i, 1)
             localStorage.tagStorage = JSON.stringify(arrayTags)
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
        "<td>" + arrayCategorias[i].nameCategory + "</td>" +
        "<td>" + arrayCategorias[i].categoryId + "</td>" +
        "<td>" +
            "<a id='" + arrayCategorias[i].categoryId + "' class='removeCategoria'><i class='fas fa-trash-alt'></i></a> " +
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
             // ON CLICK TARGET REMOVE FROM TABLE
             let categoryId = tdRemove[i].getAttribute("id");
             removeCategoria(categoryId);
             refreshTableCategorias();
         })        
     }

     
 }

 // REMOVE TAG
 function removeCategoria(id) {
     for (let i = 0; i < arrayCategorias.length; i++) {
         if(arrayCategorias[i].categoryId == id) {
             arrayCategorias.splice(i, 1)
         }                  
     }

}


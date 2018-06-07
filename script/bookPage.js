window.onload = function () {
    // INITIATE FUNCTIONS
    getStoredBooks();
    loginUser();
    allowLogout();
    feedBookInfo();

    // FUNCTION TO REPLACE VALUES IN BOOK PAGE
    function feedBookInfo() {
    getBookPageValues();

    // BOOK VALUES VARS
    let bookPageBookCover = document.getElementById("bookPageBookCover");
    let bookScore = document.getElementById("bookScore");
    let bookTitle = document.getElementById("bookTitle");
    let bookCondition = document.getElementById("bookCondition");
    let bookAuthors = document.getElementById("bookAuthors");
    let bookReleaseDate = document.getElementById("bookReleaseDate");
    let bookPublisher = document.getElementById("bookPublisher");
    let bookPagesNumber = document.getElementById("bookPagesNumber");
    let bookDonationDate = document.getElementById("bookDonationDate");
    let bookCategory = document.getElementById("bookCategory");
    let bookTags = document.getElementById("bookTags");
    let bookSynopsis = document.getElementById("bookSynopsis");
    let bookId = document.getElementById("bookId");
    let requisitionButton = document.getElementById("requisitionButton");
     
    
    bookPageBookCover.src = pageBookValues._cover;
    bookScore.innerHTML = starRating(pageBookValues._score);
    bookTitle.innerHTML = pageBookValues._title;
    bookCondition.innerHTML = "Estado: " + pageBookValues._condition;
    bookAuthors.innerHTML = "de " + pageBookValues._autor;
    bookReleaseDate.innerHTML = "em " + pageBookValues._releaseDate;
    bookPublisher.innerHTML = pageBookValues._publisher;
    bookPagesNumber.innerHTML = "Nº Páginas: " + pageBookValues._numberPages;
    bookDonationDate.innerHTML = "Doado em: " + pageBookValues._donationDate;
    for (let i = 0; i < arrayCategorias.length; i++) {
        if (arrayCategorias[i]._categoryId == pageBookValues._category) {
            bookCategory.innerHTML = arrayCategorias[i]._nameCategory;
        }
    }
    bookTags.innerHTML = "Tags: " + getTagNames();


    bookSynopsis.innerHTML = pageBookValues._synopsis;
    bookId.innerHTML = "ID do Livro: " + pageBookValues._bookId;
    
         
}



// SCORE INPUT EVENTS
let inputScore = document.getElementById("inputScore");
let previewScore = document.getElementById("previewScore");


// KEYUP EVENT
inputScore.addEventListener("keyup",function(event) {
    changePreviewRating();
    event.preventDefault();
})

//FOCUSOUT EVENT
inputScore.addEventListener("focusout",function(event) {
    changePreviewRating();
    event.preventDefault();
})






// FUNCTION CHANGE PREVIEW SCORE FROM INPUT VALUE
function changePreviewRating() {
    previewScore.innerHTML = starRating(inputScore.value);
    console.log("iGetToHere")
}


// GET TAG NAMES FROM ID
function getTagNames() {
    let strHtml = "";
    for (let i = 0; i < arrayTags.length; i++) {
        for (let j = 0; j < pageBookValues._tags.length; j++) {
            if (arrayTags[i]._tagId == pageBookValues._tags[j]) {
                strHtml += arrayTags[i]._nameTag;
            }
            
        }
    }
    return strHtml;
}
}
window.onload = function () {
    // INITIATE FUNCTIONS
    getStoredBooks();
    loginUser();
    allowLogout();
    feedBookInfo();
    getStoredComments();

    let commentSection = document.getElementById("commentSection");
    commentSection = feedCommentSection();

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
    if (pageBookValues._scores.length != 1) {
        bookScore.innerHTML = starRating(pageBookValues._scores);
    }
    else{
        bookScore.innerHTML = "<span class='fa fa-star'></span>" +
                "<span class='fa fa-star'></span>" +
                "<span class='fa fa-star'></span>" +
                "<span class='fa fa-star'></span>" +
                "<span class='fa fa-star'></span>"
    }
    bookTitle.innerHTML = pageBookValues._title;
    bookCondition.innerHTML = "Estado: " + pageBookValues._condition;
    bookAuthors.innerHTML = "de " + pageBookValues._autor;
    bookReleaseDate.innerHTML = "em " + pageBookValues._releaseDate;
    bookPublisher.innerHTML = pageBookValues._publisher;
    bookPagesNumber.innerHTML = "Nº Páginas: " + pageBookValues._numberPages;
    bookDonationDate.innerHTML = "Doado em: " + pageBookValues._donationDate;
    for (let i = 0; i < arrayCategorias.length; i++) {
        if (arrayCategorias[i]._categoryId == pageBookValues._category) {
            bookCategory.innerHTML = "Categoria: " + arrayCategorias[i]._nameCategory;
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
    previewScore.innerHTML = changePreviewRating(inputScore.value);
    event.preventDefault();
})

//FOCUSOUT EVENT
inputScore.addEventListener("focusout",function(event) {
    previewScore.innerHTML = changePreviewRating(inputScore.value);
    event.preventDefault();
})






// FUNCTION CHANGE PREVIEW SCORE FROM INPUT VALUE
function changePreviewRating(score) {

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




// GET TAG NAMES FROM ID
function getTagNames() {
    let strHtml = "";
    for (let i = 0; i < arrayTags.length; i++) {
        for (let j = 0; j < pageBookValues._tags.length; j++) {
            if (arrayTags[i]._tagId == pageBookValues._tags[j]) {
                strHtml += " " + arrayTags[i]._nameTag ;
            }
            
        }
    }
    return strHtml;
}


// DISPLAY COMMENTS FUNCTION
function feedCommentSection() {
    let strHtml = "";
    for (let i = 0; i < arrayComments.length; i++) {
        if (pageBookValues._bookId == arrayComments[i]._bookId) {
            strHtml += "<div class='row row-fluid'>" +
                    "<div class='col-md-2'>";
        
        for (let j = 0; j < arrayUsers.length; j++) {
            if (arrayUsers[j]._userId == arrayComments[i]._userId) {
                if (arrayUsers[j]._photo = ""){
                    strHtml += "<img class='userCommentImg img img-fluid' alt='' src='" + arrayUsers[j]._photo + "'/><p>" + arrayUsers[j]._username + "</p>";
                }
                else{
                    strHtml += "<img class='userCommentImg img img-fluid' alt='' src='images/userIcon(white).png'/><p>" + arrayUsers[j]._username + "</p>";
                }
            }
        }

        strHtml += "</div>" +
                "<div class='col-md-10'>"
                "<p>" + arrayComments[i]._txtComment + "</p>" +
                "</div>" +
                "</div>";

        
        }
    }

    return strHtml;
}



// ADD COMMENT
let commentForm = document.getElementById("commentForm");
commentForm.addEventListener("submit", function(event){
    event.preventDefault();

    // VARS
    let inputComment = document.getElementById("inputComment");
    
    // CREATE NEW COMMENT
    let newComment = new Comment(inputComment.value, login._id, pageBookValues._bookId);
    arrayComments.push(newComment);
    localStorage.commentStorage = JSON.stringify(arrayComments);
    getStoredComments();

    // PUSH SCORE TO SCORES PROPERTY
    for (let i = 0; i < arrayLivros.length; i++) {
        if (pageBookValues._bookId == arrayLivros[i]._bookId) {
            arrayLivros[i]._scores.push(parseInt(inputScore.value));
            localStorage.bookStorage = JSON.stringify(arrayLivros);
            getStoredBooks();
        }
        
    }

    window.location.replace = "bookPage.html";
})



}


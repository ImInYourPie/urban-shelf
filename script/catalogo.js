window.onload = function () {
    loginUser();
    logoutUser();
    getStoredBooks();
    feedBooks();
    



    // // FEED SIDENAV FILTER MENU WITH OPTIONS
    // let dropdownCategory = document.getElementById("dropdownCategory");
    // for (var i = 0; i < arrayCategorias.length; i++) {
       
    //     dropdownCategory.innerHTML += "<a href='#'>" + arrayCategorias[i]._nameCategory + "</a>";
        
    // }

    // let dropdownBiblioteca = document.getElementById("dropdownBiblioteca");
    // for (var i = 0; i < arrayBibliotecas.length; i++) {
       
    //     dropdownBiblioteca.innerHTML += "<a href='#'>" + arrayBibliotecas[i]._adress + "</a>";
        
    // }

    // // EVENT FOR DROPWDOWN FILTER MENU ITEMS
    // let dropdown = document.getElementsByClassName("dropdown-btn");

    // for (let i = 0; i < dropdown.length; i++) {
    //     dropdown[i].addEventListener("click", function() {
    //         this.classList.toggle("active");
            
    //         let dropdownContent = this.nextElementSibling;
            
    //         if (dropdownContent.style.display === "block") {
    //             dropdownContent.style.display = "none";
    //         } else {
    //             dropdownContent.style.display = "block";
            
    //         }
    //     });
    // }

    // // BUTTON SHOW FILTER MENU
    // let openFilterMenuBtn = document.getElementById("openFilterMenuBtn");
    // openFilterMenuBtn.addEventListener("click", function (event) {
    //     event.preventDefault();
    //     // document.getElementById("contentDiv").style.marginLeft = "25%";
    //     // document.getElementById("sidenav").style.width = "25%";
    //     document.getElementById("sidenav").style.display = "block";
    //     document.getElementById("openFilterMenuBtn").style.display = 'none';
    //   })

    // // BUTTON HIDE FILTER MENU
    // let closeFilterBtn = document.getElementById("closeFilterBtn");
    // closeFilterBtn.addEventListener("click", function (event){
    //     event.preventDefault();
    //     document.getElementById("contentDiv").style.marginLeft = "0%";
    //     document.getElementById("sidenav").style.display = "none";
    //     document.getElementById("openFilterMenuBtn").style.display = "block";
    //   })
}
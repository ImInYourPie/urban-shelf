
window.onload = function (){

    // VARIABLES
    let navLogin = document.getElementById("navLogin");
    let navRegister = document.getElementById("navRegister");
    // let navHi = document.getElementById("navHi");
    // let navLogout = document.getElementById("navLogout");
    let formLogin = document.getElementById("formLogin");
    
    // TEST
    let newTag1 = new Tag("aventura");
    arrayTags.push(newTag1)
    console.log(newTag1.nameTag)
    refreshTable();
    
    
    
    // LOCAL STORAGE
    
    
    // // ESCONDER OPÇOES AUTENTICAÇAO
    // navHi.style.display = "none";
    // navLogout.style.display = "none";
    
    // // LOGIN SUBMIT
    // formLogin.addEventListener("submit", function(event){
    //     event.preventDefault();
    
    //     // 1.VARIABLES
    //     let inputUsernameLogin = document.getElementById("loginUsername").value;
    //     let inputPasswordLogin = document.getElementById("inputPassword").value;
    //     // 2.VERIFICAR SE UTILIZADOR EXISTE
    //     let userExists = false;
    //     let userName = "";
    //     let id = "";
    //     let typeUser = 0;
    //     for (let i = 0; i < arrayUsers.length; i++) {
    //         if (arrayUsers[i].email == inputUsernameLogin && arrayUsers[i].password == inputPasswordLogin) {
    //             userExists = true;
    //             id = arrayUsers[i].userId;
    //             userName = arrayUsers[i].username;
    //             typeUser = arrayUsers[i].userType;
    //         }
    //     }
    //     // 3.SE EXISTE; AUTENTICAR UTILIZADOR
    //     if(userExists == true){
    //         // FECHAR MODAL
    //         $("#loginModal").modal("hide");
    //         // ALTERAR NAVBAR
    //         navLogin.style.display = "none";
    //         navRegister.style.display = "none";
    //         navLogout.style.display = "block";
    //         navHi.innerHTML = "<a id='" + id + "' class='nav-link' href='#'>Olá, " +
    //         userName + "</a>";
    //         navHi.style.display = "block";
    //     } else{
    //         alert("Dados de autenticação inválidos!");
    //     }
        
    //     // CHECK USERTYPE 
    //     switch (typeUser) {
    //         case 0: 
    //             loadAdminPage();
    //             break;
    //         case 1:
    //             loadUserPage();
    //             break;
    //         case 2:
    //             loadOperatorPage();
    //             break;
    
    //         default:
    //             break;
    //     }
    // })
    }
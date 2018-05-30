
window.onload = function (){

    // VARIABLES
    let navLogin = document.getElementById("navLogin");
    let navRegister = document.getElementById("navRegister");
    let navLogout = document.getElementById("navLogout");
    let formLogin = document.getElementById("formLogin");
    let formRegister = document.getElementById("formRegister");
    
    // TEST
    
    
    
    
    // LOCAL STORAGE
    
    
    // // ESCONDER OPÇOES AUTENTICAÇAO
    navDropdownUser.style.display = "none";
    
    // LOGIN SUBMIT
    formLogin.addEventListener("submit", function(event){
        event.preventDefault();
    
        // 1.VARIABLES
        let inputEmailLogin = document.getElementById("loginEmail").value;
        let inputPasswordLogin = document.getElementById("loginPassword").value;

        // 2.VERIFICAR SE UTILIZADOR EXISTE
        let userExists = false;
        let userName = "";
        let id = "";
        let typeUser = 0;
        for (let i = 0; i < arrayUsers.length; i++) {
            if (arrayUsers[i]._email == inputEmailLogin && arrayUsers[i]._password == inputPasswordLogin) {
                userExists = true;
                id = arrayUsers[i]._userId;
                userName = arrayUsers[i]._username;
                typeUser = arrayUsers[i]._userType;
            }
        }
        // 3.SE EXISTE; AUTENTICAR UTILIZADOR
        if(userExists == true){
            // CHECK USERTYPE 
            switch (typeUser) {
                case 0: 
                    loadAdminPage();
                    break;
                case 1:
                    loadOperatorPage();
                    break;
                case 2:
                    loadUserPage();
                    break;
            
                default:
                   break;
            }
        } else{
            alert("Dados de autenticação inválidos!");
        }
        
    })
    }
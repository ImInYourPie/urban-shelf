window.onload = function(){
    // VARIABLES
    let addUser = document.getElementById("addUser");

    // ADD USER ECENT
    addUser.addEventListener("submit", function(event){
        // 1. GET VALUES FROM DOCUMENT AND DECLARE VARIABLES
        let adminUsername = document.getElementById("adminUsername");
        let adminPassword = document.getElementById("adminPassword");
        let adminPassConfirm = document.getElementById("adminPassConfirm");
        let adminUserEmail = document.getElementById("adminUserEmail");
        let adminUserType = document.getElementById("adminUserType");
        let erroMsg = "";

        // 2. CHECK IF USER Exists BY EMAIL
        for (let i = 0; i < arrayUsers.length; i++) {
            if(adminUserEmail.value == arrayUsers[i]._email){
                errorMsg = "Esse e-mail já se encontra registado!";
            }
        }

        // 3. CHECK IF PASSWORDS MATCH
        if(adminPassword.value != adminPassConfirm.value){
            errorMsg += "As passwords não coincidem!";
        }

        // 4. VALIDATE IF NO ERRORS; ELSE DISPLAY ERRORMSG
    })

}
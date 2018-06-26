window.onload = function () {
    getStoredBooks();
    getStoredTags();
    getStoredCategorias();
    getStoredRequisitions();
    getStoredBibliotecas();
    getStoredUsers();
    



    // TEST
    if (arrayTags.length == 0) {
        testTags();
    }

    if (arrayCategorias.length == 0) {
        testCategorias();
    }

    if (arrayBibliotecas.length == 0) {
        testBibliotecas();
    }

    if (arrayLivros.length == 0) {
        testBooks();
    }

    if (arrayUsers.length == 0) {
        testUsers();
    }



    // HIDE DROPDOWN IF LOGINSTORAGE == FALSE
    let navDropdownUser = document.getElementById("navDropdownUser");
    if (localStorage.loginStorage != true) {
        navDropdownUser.style.display = "none";
    }

    document.getElementById("topBooksDiv").style.pointerEvents = "none";
    document.getElementById("recentBooksDiv").style.pointerEvents = "none";
    // LOGGIN USER IF LOCALSTORAGE.LOGGINSTORAGE == TRUE
    loginUser();
    



    // CALL LOGOUT FUNCTION
    allowLogout();
    console.log(login)

    // ADD BOOKS TO TOP AND RECENT
    loadTopBooks();
    loadRecentBooks();

    if (login != undefined) {
        showUserNotifications();
    }


    // VARIABLES
    let formLogin = document.getElementById("formLogin");
    let formRegister = document.getElementById("formRegister");


    // TEST

    // let newBook1 = ()



    // LOGIN SUBMIT
    formLogin.addEventListener("submit", function (event) {
        event.preventDefault();

        // 1.VARIABLES
        let inputEmailLogin = document.getElementById("loginEmail");
        let inputPasswordLogin = document.getElementById("loginPassword");

        // 2.VERIFICAR SE UTILIZADOR EXISTE
        let userExists = false;
        let userName = "";
        let id;
        let typeUser;
        let photo;
        for (let i = 0; i < arrayUsers.length; i++) {
            if (arrayUsers[i]._email == inputEmailLogin.value && arrayUsers[i]._password == inputPasswordLogin.value) {
                userExists = true;
                id = arrayUsers[i]._userId;
                userName = arrayUsers[i]._username;
                typeUser = arrayUsers[i]._userType;
                photo = arrayUsers[i]._photo;
            }
        }

        let logedUser = {
            id: id,
            userName: userName,
            typeUser: typeUser,
            photo: photo
        }

        // 3.SE EXISTE; AUTENTICAR UTILIZADOR
        if (userExists) {
            localStorage.loginStorage = JSON.stringify(logedUser);
            loginUser();
            // checkLogginStorage();
            $('#loginModal').modal('hide');
            showUserNotifications();

        } else {
            inputEmailLogin.setAttribute("class", "form-control col-md-12 is-invalid");
            inputPasswordLogin.setAttribute("class", "form-control col-md-12 is-invalid");
            let loginError = document.getElementById("loginError");
            loginError.style.color = "red";
            loginError.innerHTML = "Credenciais incorretas! Verifique o e-mail ou password.";
        }
    })




    // REGISTER SUBMIT
    formRegister.addEventListener("submit", function (event) {
        event.preventDefault();
        // 1. GET VARIABLES
        let inputUsername = document.getElementById("inputUsername");
        let inputPassword = document.getElementById("inputPassword");
        let inputPassConfirm = document.getElementById("inputPassConfirm");
        let inputEmail = document.getElementById("inputEmail");
        let inputUrlPhoto = document.getElementById("inputUrlPhoto");
        let errorPassword = false;
        let messageEmail = "Este e-mail já se encontra registado!";
        let messagePassword = "As passwords não coincidem!";
        let emailExists = false;

        // 2. CHECK IF EMAIL IS ALREADY REGISTERED
        for (let i = 0; i < arrayUsers.length; i++) {
            if (inputEmail.value == arrayUsers[i]._email) {
                emailExists = true;
            }
        }

        // 3. CHECK IF PASSWORDS MATCH
        if (inputPassConfirm.value != inputPassword.value) {
            errorPassword = true;
        }

        // 4. CHECK FOR ERRORS, IF NONE; CREATE NEW USER AND PUSH TO ARRAYUSERS, THEN SAVE IN LOCAL STORAGE
        if (emailExists) {
            document.getElementById("messageEmail").style.color = "red";
            document.getElementById("messageEmail").innerHTML = messageEmail;
            inputEmail.setAttribute("class", "form-control is-invalid"); inputEmail.setAttribute("class", "form-control is-invalid");
        }
        else {
            document.getElementById("messageEmail").innerHTML = "";
            inputEmail.setAttribute("class", "form-control");
        }
        if (errorPassword) {
            document.getElementById("messagePassword").style.color = "red";
            document.getElementById("messagePassword").innerHTML = messagePassword;
            inputPassword.setAttribute("class", "form-control is-invalid");
            inputPassConfirm.setAttribute("class", "form-control is-invalid");
        }
        else {
            document.getElementById("messagePassword").innerHTML = "";
            inputPassword.setAttribute("class", "form-control");
            inputPassConfirm.setAttribute("class", "form-control");
        }

        if (errorPassword == false && emailExists == false) {
            let newUser = new User(inputUsername.value, inputPassword.value, inputEmail.value, "", inputUrlPhoto.value, 2);
            arrayUsers.push(newUser);

            // STORE USER
            localStorage.userStorage = JSON.stringify(arrayUsers);
            $("#registerModal").modal("hide");
            $("#sucessModal").modal("show");
        }


    })


    // CLOSE SUCCESS MODAL EVENT
    let closeSuccessModal = document.getElementById("closeSuccessModal");
    closeSuccessModal.addEventListener("click", function (event) {
        event.preventDefault();
        $("#sucessModal").modal("hide");
        $("#loginModal").modal("show");
    })


}
// Id array
let ids = [];

class User{
    constructor(username, password, email, userType){
    this.username = username;
    this.password = password;
    this.email = email;
    this.userType = userType;
    this._userId = User.generateId();
    }

    
    // name property
    set name(newName){
        this._name = newName;
    }
    get name(){
        return this._name;
    }

    // password property
    set password(newPassword){
        this._password = newPassword;
    }
    get password(){
        return this._password;
    }

    // email property
    set email(newEmail){
        this._email = newEmail;
    }
    get email(){
        return this._email;
    }

    // userType property
    set userType(newUserType){
        this._userType = newUserType;
    }
    get userType(){
        return this._userType;
    }

    // userId property
    get userId(){
        return this._userId;
    }

    // GEAR UM NUMERO ENTRE 1 E 10 E MULTIPLICA-O POR 65536(EM HEXADECIMAL)
    // COVERTE-O EM STRING NA BASE 16(HEXADECIMAL)
    // CRIA UMA SUBSTRING DE FORMA A TIRAR O PRIMEIRO ELEMENTO QUE É SEMPRE 1
    // RETORNA EM FORMA DE XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
    // INSPIRADO NOS CÓDIGOS DE ATIVAÇAO DE PRODUTOS/ JOGOS DE COMPUTADOR E ESTUDO SOBRE O ASSUNTO
    static generateId(){
        function rand() {
            return Math.floor(( Math.random() + 1) * 0x10000).toString(16).substring(1);
        }
        return rand() + rand() + '-' + rand() + '-' + rand() + '-' + rand() + '-' + rand() + rand() + rand();
    }

}

// SUBCLASS UTILIZADOR



window.onload = function () {
    // TEST
     let user1 = new User("Miguel","lala", "miguel@gmail.com", 1);
     console.log(user1.userId);
     console.log(Math.floor(( Math.random() + 1) * 0x10000).toString(16));

}

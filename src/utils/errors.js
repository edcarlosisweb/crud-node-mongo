module.exports = {
    
    AlreadyUser(){
        return { error: "user already exists" }
    },

    RegistrationFailed(){
        return { error: "registration failed" }
    },

    LoginFailed(){
        return { error: "login failed" }
    },

    TokenFailed(){
        return { error: "no token provided" }
    },

    InvalidToken(){
        return { error: "invalid token" }
    },

    InvalidUserOrPassword(){
        return { error: "invalid user or password" }
    },

    EmailRequired(){
        return { error: "e-mail required" }
    },

    CreateProjectFailed(){
        return { error: "error create new project" }
    },

    ListError(){
        return { error: "error to return list" }
    },

    FindError(){
        return { error: "error to find record" }
    },

    UpdateError(){
        return { error: "error to update record" }
    },

    DeleteError(){
        return { error: "error to delete record" }
    }

}
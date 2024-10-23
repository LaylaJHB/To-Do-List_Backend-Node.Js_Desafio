export class CustomError extends Error {
    constructor(public statusCode:number, public message:string) {
        super(message)
    }
}


export class InvalidName extends CustomError{ 
    constructor(){
        super(400, "O nome precisa ser fornecido")
    }
}

export class InvalidEmail extends CustomError{ 
    constructor(){
        super(400, "O e-mail precisa ser fornecido")
    }
}

export class InvalidPassword extends CustomError{ 
    constructor(){
        super(400, "Digite uma senha válida com no mínimo 6 caracteres")
    }
}

export class ErrorType extends CustomError{ 
    constructor(){
        super(422, "Preencha o 'type' com os tipos de postagem 'normal' ou 'event'")
    }
}

export class Unaunthorized extends CustomError{
    constructor() {
    super(401, "Usuário não autorizado.")
    }
}
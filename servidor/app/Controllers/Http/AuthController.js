'use strict'

const User = use("App/Models/User");

class AuthController {
    /* criar usuário */
    async register({ request }){
        const data = request.only(["username", "email", "password"]);

        const user = await User.create(data);

        return user;
    }

    /* fazer login */
    async authenticate({ request, auth}){
        const { email, password } = request.all();
        const retorno = {};
        let token;
        if(token = await auth.attempt(email, password)) {
            const user = await User.findBy('email', email)
            retorno.token = token.token
            retorno.user = user.username;
            retorno.id = user.id;
        } else {
            retorno.data = "Email ou senha Incorretos";
        }
        return retorno;
    }
}

module.exports = AuthController

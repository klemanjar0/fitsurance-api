const AuthService = require('../services/user')

class AuthController {
    async register(req, res) {
        try {
            res.status(200).json(await AuthService.register(req.body));
        }
        catch(e) {

            res.status(422).json(e);
        }
    }

    async login(req, res) {
        try {
            const result = await AuthService.login(req.body);
            res.status(200).json(result);
        }
        catch(e) {
            console.log(e);
            res.status(422).json(e);
        }
    }

    async me(req, res) {
        try{
            const result = await AuthService.me(req.user.id);
            res.status(200).json(result);
        }
        catch(e) {
            console.log(e);
            res.status(401);
        }
    }

    async deleteme(req, res) {
        try{
            const result = await AuthService.deleteme(req.user.id);
            res.status(200).json(result);
        }
        catch(e) {
            console.log(e);
            res.status(401);
        }
    }
    async deleteOne(req, res) {
        try{
            const result = await AuthService.deleteOne(req.params.id);
            console.log(result)
            res.status(200).json(result);
        }
        catch(e) {
            console.log(e);
            res.status(401);
        }
    }
    async getAll(req, res) {
        try{
            const result = await AuthService.getAllUsers();
            console.log(result)
            res.status(200).json(result);
        }
        catch(e) {
            console.log(e);
            res.status(401);
        }
    }
}

module.exports = new AuthController();

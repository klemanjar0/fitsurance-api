const CardService = require('../services/card')


class CardController {
    async create(req, res) {
        console.log(req.body);
        try {
            res.status(200).json(await CardService.createCard(req.body));
        }
        catch(e) {

            res.status(422).json(e);
        }
    }

    async get(req, res) {
        try {
            const result = await CardService.getCard(req.body.id); // use id in body to get correct value (not card! just id)
            res.status(200).json(result);
            console.log(result);
        }
        catch(e) {
            console.log(e);

            console.log("----------");
            console.log(e);

            console.log("---------");


            res.status(422).json(e);
        }
    }

    async delete(req, res) {
        try{
            const result = await CardService.deleteCard(req.body.id); // use body.id in body to get correct value (not card! just id)
            res.status(200).json(result);
        }
        catch(e) {
            console.log(e);
            res.status(401);
        }
    }
}

module.exports = new CardController();

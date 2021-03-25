const CardService = require('../services/measure')


class MeasureController {
    async create(req, res) {
        console.log(req.body);
        try {
            res.status(200).json(await CardService.createMeasure(req.body));
        }
        catch(e) {
            console.log(e);
            res.status(422).json(e);
        }
    }

    async get(req, res) {
        try {
            const result = await CardService.getMeasure(req.body.id); // use id in body to get correct value (not card! just id)
            res.status(200).json(result);
            console.log(result);
        }
        catch(e) {
            console.log(e);
            res.status(422).json(e);
        }
    }

    async delete(req, res) {
        try{
            const result = await CardService.deleteMeasure(req.body.id); // use body.id in body to get correct value (not card! just id)
            res.status(200).json(result);
        }
        catch(e) {
            console.log(e);
            res.status(401);
        }
    }
    async deleteAll(req, res) {
        try{
            const result = await CardService.deleteAllUserMeasures(req.body.id); // use body.id in body to get correct value (not card! just id)
            res.status(200).json(result);
        }
        catch(e) {
            console.log(e);
            res.status(401);
        }
    }
    async fillRandom(req, res) {
        console.log(req.body);
        try {
            res.status(200).json(await CardService.fillUserWithMeasures(req.body.id, req.body.measureCount,req.body.min, req.body.max));
        }
        catch(e) {
            console.log(e);
            res.status(422).json(e);
        }
    }
}

module.exports = new MeasureController();

const LogicService = require('../services/logic')

class UserController {
    async heartEstimate(req, res) {
        console.log(req.body);
        try {
            res.status(200).json(await LogicService.getHeartRateEstimation(req.params.id));
        }
        catch(e) {
            res.status(422).json(e);
        }
    }
    async sleepEstimate(req, res) {
        console.log(req.body);
        try {
            res.status(200).json(await LogicService.getSleepEstimation(req.params.id));
        }
        catch(e) {
            res.status(422).json(e);
        }
    }
}

module.exports = new UserController();

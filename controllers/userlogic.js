const LogicService = require('../services/logic')

class UserController {
    async heartEstimate(req, res) {
        console.log(req.body);
        try {
            res.status(200).json(await LogicService.getHeartRateEstimation(req.body.id));
        }
        catch(e) {
            res.status(422).json(e);
        }
    }

}

module.exports = new UserController();

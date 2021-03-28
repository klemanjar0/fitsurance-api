const { User, Measure } = require('../models');
const Estimation = require('../controllers/estimations');

class LogicService {
    async getHeartRateEstimation(id){
        const errors = [];
        if(!id) {
            errors.push({
                field: "id",
                messages: "Empty user ID."
            })
            throw errors;
        }
        else{
            const user = await User.findOne({
                where: {
                    id: id
                }
            });
            if(!user) {
                errors.push({
                    field: 'user',
                    message: 'User with declarated ID does not exist.'
                })
            }
        }
        if(errors.length !== 0) throw errors;

        const measures = await Measure.findAll({
            where: {
                userId: id
            }
        });

        const values = measures.map(measure => measure.heart_rate);
        const mark = Estimation.Exp(
            Estimation.StandardDeviation(values)
        );

        const result = 10 - (mark%10);

        return {
            mark: mark,
            result: `${result} | 10`,
            values : values
        };
    }
    async getStepsEstimation(id){

    }
    async getSleepEstimation(id){
        const errors = [];
        if(!id) {
            errors.push({
                field: "id",
                messages: "Empty user ID."
            })
            throw errors;
        }
        else{
            const user = await User.findOne({
                where: {
                    id: id
                }
            });
            if(!user) {
                errors.push({
                    field: 'user',
                    message: 'User with declarated ID does not exist.'
                })
            }
        }
        if(errors.length !== 0) throw errors;

        const measures = await Measure.findAll({
            where: {
                userId: id
            }
        });

        const res = Estimation.sleepDayCount(measures);

        return { sleep : res };
    }
    async getRate(id){

    }

}

module.exports = new LogicService();

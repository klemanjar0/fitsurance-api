const { User, Measure } = require('../models');
const Estimation = require('../controllers/estimations');

const Disc = 1.5;

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

        const result = 10 - (mark%10) +1;
        const dis = mark * Disc;
        return {
            mark: mark,
            discount : dis,
            result: result,
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

        const values = Estimation.sleepDayCount(measures);

        const valuesJSON = Estimation.sleepDayCountJSON(measures);

        let mark = Estimation.Exp(Estimation.StandardDeviation(values));

        const avg = Estimation.Average(values);

        switch (avg){
            case avg >= 480: {mark*=1; break;}
            case avg < 480 && avg >= 420: {mark*=0.95; break;}
            case avg < 420 && avg >= 360: {mark*=0.9; break;}
            case avg < 360 && avg >= 300: {mark*=0.85; break;}
            case avg < 300: {mark*=0.8; break;}
        }

        const result = 10 - (mark%10) +1;
        const dis = mark * Disc;
        return {
            mark: mark,
            average : avg,
            discount : dis,
            result: result,
            values : valuesJSON
        };
    }
    async getRate(id){

    }

}

module.exports = new LogicService();

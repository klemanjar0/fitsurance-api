const { User, Measure } = require('../models');
const Rand = require('../controllers/randomGenerator');

class MeasureService {
    async createMeasure(data) {

        const errors = [];

        if(!data) {
            errors.push({
                field: "data",
                messages: "Empty data."
            })
            throw errors;
        }

        const { heart_rate, minutes_slept, steps, ekg_rating, date_measure, userId } = data;

        if(!heart_rate) {
            errors.push({
                field: 'heart_rate',
                message: 'Empty heart rate.'
            });
        }

        if(!minutes_slept) {
            errors.push({
                field: 'minutes_slept',
                message: 'Empty sleep time.'
            });
        }

        if(!steps) {
            errors.push({
                field: 'steps',
                message: 'Empty steps count.'
            });
        }
        if(!ekg_rating) {
            errors.push({
                field: 'ekg_rating',
                message: 'Empty EKG estimation.'
            });
        }
        if(!date_measure) {
            errors.push({
                field: 'date_measure',
                message: 'Empty date.'
            });
        }

        if(!userId) {
            errors.push({
                field: 'userId',
                message: 'User is not defined.'
            });

        }
        else{
            const user = await User.findOne({
                where: {
                    id: userId
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

        const measure = await Measure.create({
            heart_rate,
            minutes_slept,
            steps,
            ekg_rating,
            date_measure,
            userId
        });

        return {
            operation: "create",
            status: "success",
            object: measure
        };
    }


    async getMeasure(id) {
        const measure = await Measure.findByPk(id);
        return {
            id: measure.id,
            heart_rate : measure.heart_rate,
            minutes_slept : measure.minutes_slept,
            steps : measure.steps,
            ekg_rating : measure.ekg_rating,
            date_measure : measure.date_measure,
            userId : measure.userId
        }
    }

    async deleteMeasure(id) {
        const measure = await Measure.findByPk(id);
        await Measure.destroy({where : {id : measure.id}}).then(()=>{
            console.log({
                operation: 'destroy',
                status : 'success',
                object : measure
            });
        }).catch((e)=>{
            console.group("Delete Measure Errors")
            console.log(e)
            console.groupEnd()
        });
    }

    async deleteAllUserMeasures(id) {
        const user = await User.findByPk(id);
        await Measure.destroy({where : {userId : user.id}}).then(()=>{
            console.log({
                operation: 'destroy all user measures',
                status : 'success'
            });
        }).catch((e)=>{
            console.group("Delete Measure Errors")
            console.log(e)
            console.groupEnd()
        });
        return { userId: user.id, operation : "deleteAllUserMeasures",status : "success"};
    }

    async fillUserWithMeasures(id, measureCount, min, max) { // use { "id": "0", "count" : "0" } req body
        const errors = [];
        if(!id) {
            errors.push({
                field: 'id',
                message: 'Empty ID.'
            });
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
        for(let i = 0; i < measureCount; i++){
            const measure = await Measure.create({
                heart_rate: Rand.getRandomIntInclusive(min,max),
                minutes_slept : Rand.getRandomIntInclusive(0,20),
                steps : Rand.getRandomIntInclusive(0, 3000),
                ekg_rating : Rand.getRandomArbitrary(5, 10),
                date_measure : new Date(Date.now() - 4000000*i),
                userId : id
            }).then(() =>{
                console.log({
                    operation: 'create measure',
                    status : 'success',
                });
            });
        }
        return { status : "success"};
    }
}

module.exports = new MeasureService();

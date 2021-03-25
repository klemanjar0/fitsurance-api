const { User, Card } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const secret = require('../security/key').tokenKey;


class CardService {
    async createCard(data) {

        console.group("Card Creation");
        console.log(data);
        console.groupEnd();

        const errors = [];

        if(!data) {
            errors.push({
                field: "data",
                messages: "Empty data."
            })
            throw errors;
        }

        const { name, hospital, description, date_start, date_expire, userId } = data;

        if(!name) {
            errors.push({
                field: 'name',
                message: 'Empty name.'
            });
        }
        else if(name.length < 3){
            errors.push({
                field: 'name',
                message: 'Name should contain at least 3 characters.'
            });
        }

        if(!hospital) {
            errors.push({
                field: 'hospital',
                message: 'Empty hospital definition.'
            });
        }

        if(!date_start) {
            errors.push({
                field: 'date_start',
                message: 'Empty treatment start date.'
            });
        }
        if(!date_expire) {
            errors.push({
                field: 'date_expire',
                message: 'Empty treatment end date.'
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

        const card = await Card.create({
            name,
            hospital,
            description,
            date_start,
            date_expire,
            userId
        });

        return {
            operation: "create",
            status: "success",
            object: card
        };
    }


    async getCard(id) {
        const card = await Card.findByPk(id);
        return {
            id: card.id,
            name: card.name,
            hospital: card.hospital,
            description: card.description,
            date_start: card.date_start,
            date_expire: card.date_expire,
        }
    }

    async deleteCard(id) {
        const card = await Card.findByPk(id);
        await Card.destroy({where : {id : card.id}}).then(()=>{
            console.log({
                operation: 'destroy',
                status : 'success',
                object : card
            });
        }).catch((e)=>{
            console.group("Delete Card Errors")
            console.log(e)
            console.groupEnd()
        });
    }
}

module.exports = new CardService();

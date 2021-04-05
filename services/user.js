const { User } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const secret = require('../security/key').tokenKey;

const validEmail = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
const validPassword = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$/;
const validPhone = /^\+?(\d{1,3})?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d\d\d$/;

class AuthService {
    async register(data) {
        const errors = [];
        console.log(data);
        if(!data) {
            errors.push({
                field: "data",
                messages: "Empty data."
            })
            throw errors;
        }

        const { email, password, name, firstname, lastname, phone, description, sex, birthday, image } = data;

        if(email) {
            if(!validEmail.test(email)) {
                errors.push({
                    field: 'email',
                    message: 'Incorrect email.'
                });
            }
            else {
                const user = await User.findOne({
                    where: {
                        email
                    }
                });
                if(user) {
                    errors.push({
                        field: 'email',
                        message: 'That email already exists.'
                    })
                }
            }
        }
        else{
            errors.push({
                field: 'email',
                message: 'Empty email.'
            });
        }

        if(password) {
            if(!validPassword.test(password)) {
                errors.push({
                    field: 'password',
                    message: 'Password should contain at least 1 digit, 1 capital letter and 1 small letter.'
                })
            }
        }
        else {
            errors.push({
                field: 'password',
                message: 'Empty password.'
            });
        }

        if(!firstname) {
            errors.push({
                field: 'firstname',
                message: 'Empty first name'
            });
        }
        else if(firstname.length < 3){
            errors.push({
                field: 'firstname',
                message: 'First name should contain at least 3 characters.'
            });
        }

        if(!lastname) {
            errors.push({
                field: 'lastname',
                message: 'Empty last name'
            });
        }
        else if(lastname.length < 3){
            errors.push({
                field: 'lastname',
                message: 'Last name should contain at least 3 characters.'
            });
        }

        if(!name) {
            errors.push({
                field: 'name',
                message: 'Empty name'
            });
        }
        else if(name.length < 3) {
            errors.push({
                field: 'name',
                message: 'Name should contain at least 3 characters.'
            });
        }
        else {
            const user = await User.findOne({
                where: {
                    name
                }
            });
            if(user) {
                errors.push({
                    field: 'name',
                    message: 'That name already exists.'
                })
            }
        }

        if(phone) {
            if(!validPhone.test(phone)) {
                errors.push({
                    field: 'phone',
                    messages: 'Phone have incorrect format.'
                })
            }
        }

        if(errors.length !== 0) throw errors;

        const user = await User.create({
            email,
            password,
            name,
            firstname,
            lastname,
            phone,
            description,
            sex,
            birthday,
            image
        });

        const payload = {
            id: user.id
        };

        const token = await jwt.sign(payload, secret);

        return {
            token: `Bearer ${token}`,
            user: user
        };
    }

    async login(data){
        const errors = [];

        if(!data) {
            errors.push({
                field: "data",
                messages: "Empty data."
            })
            throw errors;
        }

        const { email, password } = data;

        if(!email){
            errors.push({
                field: 'email',
                message: 'Empty email.'
            });
        }

        if(!password){
            errors.push({
                field: 'password',
                message: 'Empty password.'
            })
        }

        if(errors.length !== 0) throw errors;

        const user = await User.findOne({
            where: {
                email
            }
        });

        if(!user){
            errors.push({
                field:"password",
                message:"Wrong email or password"
            });

            throw errors;
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            errors.push({
                field:"password",
                message:"Wrong email or password"
            });

            throw errors;
        }

        const payload = {
            id: user.id
        };

        const token = await jwt.sign(payload, secret);

        return {
            token: `Bearer ${token}`,
            user: {...user.dataValues}
        };
    }

    async me(id) {
        const user = await User.findByPk(id);
        return {
            id: user.id,
            email: user.email,
            name: user.name,
            firstname: user.firstname,
            lastname: user.lastname,
            phone: user.phone,
            description: user.description,
            sex: user.sex,
            birthday: user.birthday,
            image: user.image
        }
    }

    async deleteme(id) {
        const user = await User.findByPk(id);
        await User.destroy({where : {id : user.id}}).then(()=>{
            console.log({
                id: user.id,
                email: user.email,
                operation: 'destroy',
                status : 'success'
            });
        }).catch((e)=>{
            console.log(e);
        });
    }
}

module.exports = new AuthService();

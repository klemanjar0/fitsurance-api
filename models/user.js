const DataTypes = require('sequelize');
const { Sequelize } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize) => {
    const User = sequelize.define("user", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            unique: true,
            allowNull: false,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        sex: {
            type: DataTypes.STRING
        },
        birthday: {
            type: DataTypes.DATE
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        hooks: {
            beforeCreate: async (user) => {
                user.password = await bcrypt.hash(user.password, await bcrypt.genSalt(10));
            }
        }
    });

    User.associate = (models) => {
        User.hasMany(models.Card, {
            onUpdate: "cascade",
            onDelete: "cascade"
        });
        User.hasMany(models.Measure, {
            onUpdate: "cascade",
            onDelete: "cascade"
        });
        User.hasOne(models.RecordToken, {
            onUpdate: "cascade",
            onDelete: "cascade"
        });
    };
    return User
}

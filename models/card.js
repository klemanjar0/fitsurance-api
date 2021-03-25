const DataTypes = require('sequelize');
const { Sequelize } = require('sequelize');

module.exports = (sequelize) => {
    const Card = sequelize.define("card", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            unique: true,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        hospital: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        date_start: {
            type: DataTypes.DATE
        },
        date_expire: {
            type: DataTypes.DATE
        }
    });

    Card.associate = (models) => {
        Card.hasMany(models.Record, {
            onUpdate: "cascade",
            onDelete: "cascade"
        });
        Card.belongsTo(models.User);
    };

    return Card;
}

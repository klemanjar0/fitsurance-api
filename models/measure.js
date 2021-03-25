const DataTypes = require('sequelize');
const { Sequelize } = require('sequelize');

module.exports = (sequelize) => {
    const Measure = sequelize.define("measure", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            unique: true,
            allowNull: false,
            primaryKey: true
        },
        heart_rate: {
            type: DataTypes.INTEGER
        },
        minutes_slept: {
            type: DataTypes.INTEGER
        },
        steps: {
            type: DataTypes.INTEGER
        },
        ekg_rating: {
            type: DataTypes.DOUBLE
        },
        date_measure: {
            type: DataTypes.DATE
        }
    });

    Measure.associate = (models) => {
        Measure.belongsTo(models.User);
    };

    return Measure;
}

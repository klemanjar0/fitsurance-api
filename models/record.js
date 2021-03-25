const DataTypes = require('sequelize');
const { Sequelize } = require('sequelize');

module.exports = (sequelize) => {
    const Record = sequelize.define("record", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            unique: true,
            allowNull: false,
            primaryKey: true
        },
        type: {
            type: DataTypes.INTEGER
        },
        name: {
            type: DataTypes.INTEGER
        },
        description: {
            type: DataTypes.INTEGER
        },
        date: {
            type: DataTypes.DATE
        },
        duration: {
            type: DataTypes.DATE
        }
    });

    Record.associate = (models) => {
        Record.belongsTo(models.Card);
    };

    return Record;
}

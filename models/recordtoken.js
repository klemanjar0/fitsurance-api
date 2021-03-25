const DataTypes = require('sequelize');
const { Sequelize } = require('sequelize');

module.exports = (sequelize) => {
    const RecordToken = sequelize.define("recordtoken", {
        token: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            primaryKey: true
        }
    });

    RecordToken.associate = (models) => {
        RecordToken.belongsTo(models.User);
    };

    return RecordToken;
}

const { Sequelize } = require("sequelize");

const conf = require('../config.json')

const sequelize = new Sequelize(
    conf.DatabaseSettings.DatabaseName,
    conf.DatabaseSettings.DatabaseLogin,
    conf.DatabaseSettings.DatabasePassword, {
    dialect: "mysql",
    host: conf.DatabaseSettings.DatabaseHost
});

try {
    sequelize.authenticate().then(
        () => {
            console.log('Connection has been established successfully.');
            sequelize.sync({ force: false })
                .then(function(err) {
                    console.log('The database is connected and stable.');
                }, function (err) {
                    console.log('An error occurred while creating the table:', err);
                });
        }
    );
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

const models = {
    sequelize,
    User: require('./User')(sequelize),
    Card: require('./Card')(sequelize),
    Measure: require('./Measure')(sequelize),
    Record: require('./Record')(sequelize),
    RecordToken: require('./RecordToken')(sequelize)
}

Object.keys(models).forEach((modelName) => {
    if("associate" in models[modelName]){
        models[modelName].associate(models);
    }
});

module.exports = models;

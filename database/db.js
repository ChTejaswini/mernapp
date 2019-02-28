const Sequelize = require("sequelize")
const db = {};
const sequelize = new Sequelize("nodejs_login1", "root", "Lakshmi@6892", {
  host: "localhost",
  dialect: "mysql",
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});
sequelize.authenticate().then(()=>{
  console.log('Connection has established successfully');
})
.catch(err =>{
  console.error('Unable to connect to the databse:',err);
});
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
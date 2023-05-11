const db = require("../utils/database");
const {DataTypes} = require("sequelize");
const Todos = db.define("todos",{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    description: {
        type:   DataTypes.STRING,
        allowNull:  false,
    },
    completed: {
        type: DataTypes.STRING(3),
        allowNull: false,
    },
    created_by: {
        type: DataTypes.STRING,
        allowNull: false
    },
    responsible_person: {
        type: DataTypes.STRING,
        allowNull: false
    } 
}, {
    timestamps: false,
});

module.exports = Todos;
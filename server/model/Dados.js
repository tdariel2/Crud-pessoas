const Sequelize = require("sequelize")
//interação com dados do banco
const db = require ("../banco/banco.js")
module.exports = db.sequelize.define(
    "dadosPessoas",{
        id: 
        {
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        nome: 
        {
            type:Sequelize.STRING
        },
        email:
        {
            type:Sequelize.STRING
        },
        endereco:
        {
            type:Sequelize.STRING
        },
        sexo: 
        {
            type:Sequelize.CHAR
        },
        ativo:
        {
            type:Sequelize.BOOLEAN
        }
    },
    {
        timestamps:false
    }
)
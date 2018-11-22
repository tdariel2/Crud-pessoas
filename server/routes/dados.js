var express = require ("express")
var router = express.Router()
const DadoP = require("../model/Dados.js")
//pegar todos dados
router.get("/dados", (req,res) => {
    DadoP.findAll()
    .then(dados => {
        res.json(dados)
    })
    .catch(err => {
        res.send("Deu erro " + err)
    })
})
//adicionar dados com insert
router.post("/dados",(req,res) => {
    if(!req.body.nome){
        res.status(400)
        res.json({
            error:"Dados invalidos"
        })
    }else{
        DadoP.create(req.body)
        .then(() => {
            res.send("Dados adicionado")
        })
        .catch(err => {
            res.send("Deu erro: "+ err)
        })
    }

})
router.delete("/dados/:id", (req, res) => {
    DadoP.destroy({
        where:{
            id: req.params.id
        }
    })
    .then(() => {
        res.send("Dados deletado")
    })
    .catch(err => {
        res.send("não foi possivel:" + err)
    })
})
router.put("/dados/:id", (req, res) => {
    if(!req.body.nome) {
        res.status(400)
        res.json({
            error: "Bad Data"
        })
    }else{
        DadoP.update(
            {
                nome: req.body.nome,
                email: req.body.email,
                endereco: req.body.endereco,
                sexo: req.body.sexo,
                ativo: req.body.ativo
            },
            {where: {id: req.params.id} }
        )
        .then (() => {
            res.send("dados alterados")
        })
        .error(err => res.send(err))
    }
})
module.exports = router

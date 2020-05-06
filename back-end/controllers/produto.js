const Produto = require('../models/Produto');

const controller = {} //Objeto Vazio

controller.novo = async (req,res) => {
    try {
        await Produto.create(req.body);
        //http Status 201: Created
        res.status(201).send(req.body);
    }
    catch(erro) {
        console.log(erro);
        //HTTP 500: Internal Server Error
        res.status(500).send(erro);
    }
}

controller.listar = async (req, res) =>{
    
    if(Object.keys(req.query).length > 0){
     busca(req,res);
    } else{   
        try{
            //find(), sem parâmetros, retorna todas
            const lista = await Produto.find().populate('fornecedor');
            res.send(lista) //HTTP 200 implícito

        }
        catch(erro) {
            console.log(erro);
            res.status(500).send(erro);
        }
    }
}
controller.obterUm = async (req, res) =>{
    try{
        //find(), sem parâmetros, retorna todas
        const id = req.params.id
        const obj = await Produto.findById(id);
        if(obj){ //obj foi encontrado
            res.send(obj)// HTTP 200 implícito
        }else{
            res.status(404).end();
        }
    }
    catch(erro){
        console.log(erro);
        res.status(500).send(erro);
    }
}
controller.atualizar = async (req,res) =>{
    try{
        const id = req.body._id;
        const obj = await Produto.findByIdAndUpdate(id, req.body);
        if(obj){ //obj encontrado e atualizado
            //HTTP 204: No content
            res.status(204).end();
        }else{
            res.status(404).end();
        }
    }
    catch(erro){
        console.log(erro);
        res.status(500).send(erro);
    }
}
controller.excluir = async (req,res) =>{
    try{
        const id = req.body._id;
        const obj = await Produto.findByIdAndDelete(id);
        if(obj){
            res.status(204).end();
        }else{
            res.status(404).end();
        }
    }
    catch(erro){
        console.log(erro);
        res.status(500).send(erro);
    }
}

async function busca(req, res){
    let criterio = {};

    const atrib = Object.keys(req.query)[0];
    const valor = Object.values(req.query)[0];

    criterio[atrib] = { $regex: valor, $options: 'i'};

    console.log("Critério: ");
    console.log(criterio);

    try{
        const lista = await Produto.find(criterio);
        res.send(lista);
    }
    catch(erro){
        console.log(erro);
        res.status(500).send(erro);
    }
}
module.exports = controller;
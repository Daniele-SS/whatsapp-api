/************************************************************************************
 * Objetivo: Arquivo responsável pela criação da API do projeto de WhatsApp
 * Data: 08/04/2026
 * Autora: Daniele Silva Santos
 * Versão: 1.0
 ************************************************************************************/

//Import das depedências para criar a API
const express   = require ('express')
const cors      = require ('cors')

const app = express() //Criando um objeto para manipular o express

//Conjunto de permissões a serem aplicadas no cors da API
const corsOptions = {
    origin: ['*'], 
    methods: 'GET', 
    allowedHeaders: ['Content-type', 'Autorization'] //São permissões de cabeçalho do cors
}

app.use(cors(corsOptions)) //Configura as permissões da API através do cors

const listaDeContatos = require ('./modulo/functions')

app.get('/v1/whatsapp/dados', function(request, response){
    let todasAsConversas = listaDeContatos.getDados()

    if(todasAsConversas) {
        response.status(200)
        response.json(todasAsConversas)
        } else {
            response.status(404)
            response.json({"message": "Nenhum dado encontrado."})
        }
})


app.get('/v1/whatsapp/dados/conta/profile/usuario', function(request, response){
    let profile         = request.query.nick
    let dadosProfile    = listaDeContatos.getContaProfile(profile)

    if(dadosProfile) {
        response.status(200)
        response.json(dadosProfile)
        } else {
            response.status(404)
            response.json({"message": "Nenhum dado encontrado."})
        }
})


app.get('/v1/whatsapp/dados/contato/pessoal/usuario/:numero', function(request, response){
    let contatosPessoais = request.params.numero
    let dadosPessoaisDoContato = listaDeContatos.getContatosPessoais(contatosPessoais)

    if(dadosPessoaisDoContato) {
        response.status(200)
        response.json(dadosPessoaisDoContato)
        } else {
            response.status(404)
            response.json({"message": "Nenhum dado encontrado."})
        }
})


app.get('/v1/whatsapp/dados/all/mensagens/usuario/:contato', function(request, response){
    let usuarioEmissor = request.params.contato
    let usuarioDestinatario = request.query
    let messages = listaDeContatos.getAllMessages(usuarioEmissor, usuarioDestinatario)

    if(messages) {
        response.status(200)
        response.json(messages)
        } else {
            response.status(404)
            response.json({"message": "Nenhum dado encontrado."})
        }
})


app.get('/v1/whatsapp/dados/usuario/contato', function(request, response){
    
})


app.get('/v1/whatsapp/dados/help', function(request, response){
    
})


app.listen(8080, function(){
    console.log('API funcionando e aguardando novas requisições ...')
})
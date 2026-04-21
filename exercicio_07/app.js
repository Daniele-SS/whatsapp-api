/********************************************************************************
 * Objetivo: Arquivo responsável pela criação da API do projeto de WhatsApp
 * Data: 08/04/2026
 * Autora: Daniele Silva Santos
 * Versão: 1.0
 ********************************************************************************/

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


app.get('/v1/whatsapp/dados/usuario/:numero', function(request, response){
    let numero  = request.params.numero
    let contato = request.query.contato

    let todasMensagens =  listaDeContatos.getConversaUsuario(numero,contato)

    if(todasMensagens) {
        response.status(200)
        response.json(todasMensagens)
        } else {
            response.status(404)
            response.json({"message": "Nenhum dado encontrado."})
        }
})


app.get('/v1/whatsapp/pesquisa/:numero', function(request, response){
    let numero  = request.params.numero
    let palavra = request.query.palavra

    let mensagemEcontrada =  listaDeContatos.getConversaSelecionada(numero, palavra)

    if(mensagemEcontrada) {
        response.status(200)
        response.json(mensagemEcontrada)
        } else {
            response.status(404)
            response.json({"message": "Nenhum dado encontrado."})
        }
})


app.get('/v1/whatsapp/help', function(request, response){
    let docAPI = {
        "API-description": "API para simular conversas do WhatsApp",
        "Date": "2026-04-20",
        "Developer": "Daniele Silva Santos",
        "Version": "1.0",
        "Endpoints": [
            {   "id": 1,
                "rota": "/v1/whatsapp/dados",
                "description": "Retorna a lista de todos os usuários, contatos e conversas trocadas",
            },
            {   "id": 2,
                "rota": "/v1/whatsapp/dados/conta/profile/usuario",
                "description": "Retorna todos os dados da conta profile do usuário que podem ser alterados"
            },
            {   "id": 3,
                "rota": "/v1/whatsapp/dados/contato/pessoal/usuario/11987876567",
                "description": "Retorna apenas os dados pessoais de cada contato do usuário filtrando pelo número de telefone"
            },
            {   "id": 4,
                "rota": "/v1/whatsapp/dados/all/mensagens/usuario/11955577796",
                "description": "Retorna todas as mensagens trocadas de uma conta de usuário filtrando pelo número de telefone"
            },
            {   "id": 5,
                "rota": "/v1/whatsapp/dados/usuario/11987876567?contato=Max Kellerman",
                "description": "Retorna uma determinada conversa filtrando pelo número de telefone do usuário e o nome do contato"
            },
            {   "id": 6,
                "rota": "/v1/whatsapp/pesquisa/11955577796/?palavra=design",
                "description": "Retorna a mensagen trocada entre um usuário e um contato com base em uma palavra-chave"
            }
        ]
    }

    response.status(200)
    response.json(docAPI)
})


app.listen(8080, function(){
    console.log('API funcionando e aguardando novas requisições ...')
})
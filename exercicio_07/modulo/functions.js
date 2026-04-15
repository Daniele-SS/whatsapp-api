/**************************************************************
 * Objetivo: Obter uma lista de contatos para a criação da API
 * Autora: Daniele Silva Santos
 * Data: 08/04/2026
 * Versão: 1.0
 **************************************************************/

const listaDeContatos = require ('./contatos.js')

const getDados = function() {
    return listaDeContatos.contatos['whats-users']
}

function getContaProfile() {
    let nicknameDosUsuarios = []

    listaDeContatos.contatos['whats-users'].forEach(function(dadosDoUsuario){
        nicknameDosUsuarios.push({
        nome: dadosDoUsuario.account,
        nick: dadosDoUsuario.nickname,
        dataCriacao: dadosDoUsuario['created-since'],
        imagem: dadosDoUsuario['profile-image'],
        numero: dadosDoUsuario.number,
        cor: dadosDoUsuario.background
        })
    })

    return nicknameDosUsuarios
}

function getContatosPessoais(numero) {
    let contatosPessoais = false

    listaDeContatos.contatos['whats-users'].forEach(function(dadosPessoaisDoUsuario) {
        if(Number(dadosPessoaisDoUsuario.number) == Number(numero)) {
            contatosPessoais = {
                nome: dadosPessoaisDoUsuario.account,
                numero: dadosPessoaisDoUsuario.number,
                contatos: []
            }
            
            dadosPessoaisDoUsuario.contacts.forEach(function(contato){
                contatosPessoais.contatos.push({
                    nome: contato.name,
                    foto: contato.image,
                    descricao: contato.description
                })
            })
        }
    })

    return contatosPessoais
}

function getAllMessages(contato) {
    let all = []

    listaDeContatos.contatos['whats-users'].forEach(function(conversa){
        if(Number(conversa.number) == Number(contato)){

            conversa.contacts.forEach(function(message){
                let contatoAtual = {
                    nome: message.name,
                    mensagens: []
                }

                message.messages.forEach(function(conversa){
                    contatoAtual.mensagens.push({
                        emissor: conversa.sender,
                        mensagem: conversa.content,
                        hora: conversa.time
                    })
                })

                all.push(contatoAtual)
            })
        }
    })

    return all
}

function getConversaUsuario() {

}

// console.log(getAllMessages("11987876567"))

module.exports = { 
    getDados,
    getContaProfile,
    getContatosPessoais,
    getAllMessages,
    getConversaUsuario
}

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

function getConversaUsuario(usuario, contato) {
    let conversas = {}
    let bola = false 

    listaDeContatos.contatos['whats-users'].forEach(function(messages){
        if(Number(messages.number) == Number(usuario)) {
            
            messages.contacts.forEach(function(contac){
                if(contac.name.toLowerCase() == contato.toLowerCase()) {
                    conversas.name = contac.name
                    conversas.mensagem = contac.messages

                    bola = true
                } 
            })
        }
    })

    if(bola) {
        return conversas
    } else {
        return false
    }
}

function getConversaSelecionada(numero, pesquisa) {
    let selecionaConversa = {}
    let vetor = [] 
    let retornoFalso = false 

    listaDeContatos.contatos['whats-users'].forEach(function(usuario){
        if(Number(usuario.number) == Number(numero) ) {

            usuario.contacts.forEach(function(contato){
                
                contato.messages.forEach(function(mensagem){

                    if(mensagem.content.toUpperCase().includes(pesquisa.toUpperCase())) {
                        vetor.push({
                            nome: contato.name,
                            numero: contato.number,
                            mensagens: contato.messages,
                        })

                        retornoFalso = true
                    }
                })
            })
        }
    })

    if(retornoFalso) {
        return selecionaConversa.conversas = vetor
    } else {
        return false
    }
}

// console.log(getAllMessages("11987876567"))
// console.log(getConversaUsuario("11955577796", "Franklin Silva"))
// console.log(getConversaSelecionada('11955577796', 'como'))

module.exports = { 
    getDados,
    getContaProfile,
    getContatosPessoais,
    getAllMessages,
    getConversaUsuario,
    getConversaSelecionada
}

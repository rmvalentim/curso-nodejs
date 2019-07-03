const Sequelize = require('sequelize');
const sequelize = new Sequelize('sistemadecadastro', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

const Postagem = sequelize.define('postagens', {
    titulo: {
        type: Sequelize.STRING
    },
    conteudo: {
        type: Sequelize.TEXT
    }
});

const Usuario = sequelize.define('usuarios', {
    nome: {
        type: Sequelize.STRING
    },
    sobrenome: {
        type: Sequelize.STRING
    },
    idade: {
        type: Sequelize.INTEGER
    },
    email: {
        type: Sequelize.STRING
    }
});

// CRIA AS TABELAS (Executar uma só vez)
// Usuario.sync({force:true});
// Usuario.sync({force:true});

// CRIA UMA POSTAGEM NO BANCO
// Postagem.create({
//     titulo: "Primeiro Post",
//     conteudo: "Este é realmente o primeiro post do blog!"
// });

//CRIA UM USUARIO NO BANCO

// Usuario.create({
//     nome: "Admin",
//     sobrenome: "da Silva",
//     idade: 27,
//     email: "admin@admin.com"
// });
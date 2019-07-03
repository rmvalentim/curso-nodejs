const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const Post = require('./models/Post');

// Template Engine
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Body Parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Rotas

app.get('/', (req, res) => {
    Post.findAll({order: [['id', 'DESC']]}).then((posts) => {
        res.render('home', {posts : posts});
    });    
});

app.get('/cad', (req, res) => {
    res.render('formulario');
});

app.post('/add', (req, res) => {    
    Post.create({
        titulo: req.body.titulo,
        conteudo: req.body.conteudo
    }).then(()=>{
        res.redirect('/');
    }).catch((err) => {
        res.send('Erro ao cadastrar Post.')
    });
});

app.post('/editar/:id', (req, res) => {
    Post.update({
        titulo: req.body.titulo,
        conteudo: req.body.conteudo
    },
    {
        where: {'id': req.params.id}
    }
    ).then(() => {
        res.redirect('/');
    }).catch((err) => {
        res.send('Erro ao editar Post.')
    })
});

app.get('/deletar/:id', (req, res) => {
    Post.destroy({where: {'id': req.params.id}})
        .then( res.redirect('/') )
        .catch( res.send('Esta postagem não existe'));
});

app.get('/editar/:id', (req, res) => {
    Post.findByPk(req.params.id)
        .then((post) => {
            res.render('editar', {
                id: req.params.id,
                titulo: post.titulo,
                conteudo: post.conteudo
            });
        })
        .catch(() => {
            res.send('Post não encontrado!');
        });    
});

// Inicia a aplicacao
app.listen(3000, () => {
    console.log('Server listen on port 3000.');
});
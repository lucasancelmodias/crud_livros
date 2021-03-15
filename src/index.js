const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const port = 3000;
app.set('port', port);
let contador = 0;
let livros = [];
app.get("/livros",(req, res) =>{
    res.send(livros);
});

app.post('/livros',(req, res)=>{
const livro = req.body;

livros.push({id: contador+=1, 
    titulo:livro.titulo, 
    descricao:livro.descricao, 
    edicao: livro.edicao, 
    autor:livro.autor, 
    ISBN: livro.ISBN});

res.status(201).json(livros);
});

app.put('/livro/:id',(req, res)=>{
    const id = req.params.id;
    var livroIndex = null;
    const livro = req.body;
    const msg = 'Livro não encontrado.'
    for (let index = 0; index < livros.length; index++) {
        if(livros[index].id == id){
            livroIndex = index;
        }
    }
    console.log(livroIndex);
    if(livroIndex != null){
        livros[livroIndex].titulo = livro.titulo;
        livros[livroIndex].descricao = livro.descricao;
        livros[livroIndex].edicao = livro.edicao;
        livros[livroIndex].autor = livro.autor;
        livros[livroIndex].ISBN = livro.ISBN;
        res.status(200).json(livros[livroIndex]);
    }else{
        res.status(404).json(msg);
    }
});

app.delete('/livro/:id', (req, res)=>{
    const id = req.params.id;
    var livroIndex = null;
    var msg = 'Não foi encontrado um livro para excluir';
    for (let index = 0; index < livros.length; index++) {
        if(livros[index].id == id){
            livroIndex = index;
            console.log(livroIndex);
        }
    }
    console.log(livros[livroIndex]);
    if(livroIndex != null){
        livros.splice(livroIndex, 1);
        res.status(200).json(livros);
    }else{
        res.status(404).json(msg);
    }
});

const server = http.createServer(app);
server.listen(3000);
// const bodyParser = require("body-parser");
const express = require("express");

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let posts = [];

const server = express();
// to enable parsing of json bodies for post requests
server.use(express.json());

// TODO: your code to handle requests

let id = 1

server.post("/posts", function(req, res) {
    let { author, title, contents } = req.body;
    if(!author || !title || !contents){
        res.status(STATUS_USER_ERROR).json( {error: "No se recibieron los parámetros necesarios para crear el Post"})
    }
    else{
        const post = {id:id++, author, title, contents};
        posts.push(post);
        res
            .status(200)
            .json(post)

    }
})

server.post("/posts/author/:author", (req, res) => {
    const { title, contents} = req.body;
    const {author} = req.params;

    if(!title || !contents) {
        res
            .status(STATUS_USER_ERROR)
            .json({error: "No se recibieron los parámetros necesarios para crear el Post"})
    }
    else {
        
        const post = {id:id++, author, title, contents};
        posts.push(post);
        res
            .status(200)
            .json(post)
    }
})

server.get("/posts", (req, res) => {
    const {term} = req.query;
    if(term){
        res
            .status(200)
            .json(posts.filter(p => p.title.includes(term) === true || p.contents.includes(term) === true))
    }
    else{
        res
            .status(200)
            .json(posts)
    }
    
})

server.get("/posts/:author", (req, res) => {
    const { author } = req.params;

    let authorPosts = posts.filter(p => p.author === author)

    if(authorPosts.length){
        res
            .status(200)
            .json(authorPosts)
    }
    else{
        res
            .status(STATUS_USER_ERROR)
            .json({error: "No existe ningun post del autor indicado"})
    }
})

server.get("/posts/:author/:title", (req, res) => {
    const { author, title } = req.params;

    let authorTitle = posts.filter(p => p.author===author && p.title=== title)

    if(authorTitle.length){
        res
            .status(200)
            .json(authorTitle)
    } else {
        res
            .status(STATUS_USER_ERROR)
            .json({error: "No existe ningun post con dicho titulo y autor indicado"})
    }

})

server.put("/posts", (req, res) => {
    const {id, title, contents} = req.body;

    if(!id || !title || !contents){
        res
            .status(STATUS_USER_ERROR)
            .json({error: "No se recibieron los parámetros necesarios para modificar el Post"})
    }

    let postId = posts.filter(p => p.id === id)

    if(postId.length){
        postId[0].title = title;
        postId[0].contents = contents;

        res
            .status(200)
            .json(postId[0])
    } else {
        res
        .status(STATUS_USER_ERROR)
        .json({error: "No se encunetra los parámetros necesarios para modificar el Post"})
    }
})

server.delete("/posts", (req, res) => {
    const {id} = req.body;

    const post = posts.find(p => p.id === parseInt(id))

    if(!id || !post){
        res.status(STATUS_USER_ERROR).json({error: "Mensaje de error"})
    }
    else{
        
        posts = posts.filter(p => p.id !== id);

        res.status(200).json({ success: true })
    }

})


server.delete("/author", (req, res) => {
    const { author } = req.body

    const post = posts.find(p => p.author===author)

    if(!author || !post){
        res.status(STATUS_USER_ERROR).json({"error": "No existe el autor indicado"})
    }
    else{
        let deleteAuthor = posts.filter(p => p.author===author)
        posts = posts.filter(p => p.author!==author)
        res.status(200).json(deleteAuthor)
    }
})
module.exports = { posts, server };

const express = require("express");
const app = express();
const Joi = require('joi');
app.use(express.json());
var movieList = [
    {   id:1,genre:'Comedy',movie:'Rush Hour'},
    {   id:2,genre:'Comedy',movie:'Dumb and Dumber'} ,
    {   id:3,genre:'Action',movie:'Rambo' },
    {   id:4,genre:'Action',movie:'The Expendables'}
];
//Create    
app.post('/api/genres',(req,res)=>{
    const {error} = validate(req.body);
    if(error)   return res.status(400).send(error.details[0].message);
    
    const movieEntry = {
        id:movieList.length+1,
        genre:req.body.genre,
        movie:req.body.movie

    };
    movieList.push(movieEntry);
    res.send(movieEntry);
});
//ReadAll
app.get('/api/genres',(req,res) => {
    res.send(movieList);
});

//ReadOne
app.get('/api/genres/:id',(req,res) => {
    const movieEntry = movieList.find(mdb => mdb.id === parseInt(req.params.id));
    if(!movieEntry) return res.status(404).send("There is no movie entry with the given ID");
    res.send(movieEntry);
});
//Update
app.put('/api/genres/:id',(req,res) => {

    const movieEntry = movieList.find(mdb => mdb.id === parseInt(req.params.id));
    if(!movieEntry) return res.status(404).send("There is no movie entry with the given ID");

    const {error} = validate(req.body);
    if(error)   return res.status(400).send(error.details[0].message);
    
    movieEntry.genre = req.body.genre;
    movieEntry.movie = req.body.movie;
    res.send(movieEntry);

});
//Delete
app.delete('/api/genres/:id',(req,res) =>{
    const movieEntry = movieList.find(mdb => mdb.id === parseInt(req.params.id));
    if(!movieEntry) return res.status(404).send("There is no movie entry with the given ID");
    
    const index = movieList.indexOf(movieEntry);
    movieList.splice(index,1);

    res.send(movieEntry);
    
});

function validate(obj){
    const schema = [ 
        {  genre:Joi.string().min(1).required() ,movie:Joi.string().min(1).required()  }
    ];
     
    return Joi.validate(obj,schema);
}




const port = process.env.port || 3000;
app.listen(port,() => {
    console.log(`Listening on port ${port}`);
});

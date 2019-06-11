const express = require('express');
const router = express.Router();

var movieList = [
    {   id:1,genre:'Comedy',movie:'Rush Hour'},
    {   id:2,genre:'Comedy',movie:'Dumb and Dumber'} ,
    {   id:3,genre:'Action',movie:'Rambo' },
    {   id:4,genre:'Action',movie:'The Expendables'}
];
//Create    
router.post('/',(req,res)=>{
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
router.get('/',(req,res) => {
    res.send(movieList);
});

//ReadOne
router.get('/:id',(req,res) => {
    const movieEntry = movieList.find(mdb => mdb.id === parseInt(req.params.id));
    if(!movieEntry) return res.status(404).send("There is no movie entry with the given ID");
    res.send(movieEntry);
});
//Update
router.put('/:id',(req,res) => {

    const movieEntry = movieList.find(mdb => mdb.id === parseInt(req.params.id));
    if(!movieEntry) return res.status(404).send("There is no movie entry with the given ID");

    const {error} = validate(req.body);
    if(error)   return res.status(400).send(error.details[0].message);
    
    movieEntry.genre = req.body.genre;
    movieEntry.movie = req.body.movie;
    res.send(movieEntry);

});
//Delete
router.delete('/:id',(req,res) =>{
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

module.exports = router ;
'use strict';
const express = require('express');

const app = express()
const bodyParser = require('body-parser');
require('dotenv').config();
const port = process.env.PORT


const axios=require("axios");

let api_key="668baa4bb128a32b82fe0c15b21dd699&language=en-US&query=The&page=2"
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
/*let url = "postgres://essa:0000@localhost:5432/movie";*/
//app.use(express.json());
//let DATABASE_URL=process.env.DATABASE_URL
const { Client } = require('pg');
//const client = new Client(DATABASE_URL);
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});
//routs
app.get("/",handleHome)
app.put("/update/:id", handleUPDATEid)
app.delete("/DELETE/:id", handleDELETEid)
app.get("/getMovie/:id", handlegetMovieid)
app.post('/addMovie', postHandler);
app.get('/getMovies', getHandler);
app.use(handleError);
//functions
//http:localhost:3000/postRcipes
function postHandler(req, res) {
    console.log(req.body);
   
    // let title = req.body.title;
    // let time = req.body.time;
    // let summary = req.body.summary;
    // let image = req.body.image;

    let {title,overview,poster_path} = req.body; //destructuring


   let sql = `INSERT INTO table_movie(title,overview,poster_path) VALUES($1, $2, $3) RETURNING *;`; 
   let values = [title,overview,poster_path];
   
    client.query(sql, values).then((result) => {
        console.log(result);
        return res.status(201).json(result.rows);

    }).catch((err) => {
        handleError(err, req, res);
    })

}
//http:localhost:3000/getData
function getHandler(req, res) {
    let sql = `SELECT * FROM table_movie ;`;
    client.query(sql).then((result)=>{
        console.log(result);
        res.json(result.rows);
    }).catch((err) => {
         handleError(err, req, res);
    })
 }

 function handleError(error,req,res){
     res.status(500).send(error)
 }



const Data=require("./Movie Data/data.json");
/*const res = require('express/lib/response');
const req = require('express/lib/request');*/
function handleHome(req,res){
 let data=[]
 Data.data.forEach(element =>{

    let newData=new showData(element.title,element.poster_path,element.overview)
    data.push(newData)
 })
 res.json(data)
 
}
function showData(title,poster_path,overview){
    this.title=title
    this.poster_path=poster_path
    this.overview=overview

}

app.get("/favorite", handlefavorite)

function handlefavorite(req,res){

  res.send('Welcome to Favorite Page')
}



app.get("/search", handlesearch)

function handlesearch(req,res){
//name=The Batman
//console.log(req.query)
//res.send("search is done")
let searchName=req.query.name
let url=`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${searchName}&page=1`
axios.get(url)
.then(result=>{
  console.log(result.data.results)
  res.json(result.data.results)
})
.catch()
}






app.get("/trending", handletrending)
function handletrending(req,res){
  let link ="https://api.themoviedb.org/3/trending/all/week?api_key=37ddc7081e348bf246a42f3be2b3dfd0&language=en-US"
axios.get(link)
.then(data=>{
 console.log(data.data.results)
 // res.send("API give me the data")
let trending=data.data.results.map((c)=>{
  return new showTrending(c.id,c.title,c.release_date,c.poster_path,c.overview)
})
res.json(trending)



}
  
)
.catch((error =>{
  console.log(error)
  res.send("error in getting data from API")

}))
}
function showTrending(id,title,release_date,poster_path,overview){
  this.id=id
  this.title=title
  this.poster_path=poster_path
  this.overview=overview
  this.release_date=release_date



}

//new

app.get("/overview", handleoverview)
function handleoverview(req,res){
  let link ="https://api.themoviedb.org/3/trending/all/week?api_key=37ddc7081e348bf246a42f3be2b3dfd0&language=en-US"
axios.get(link)
.then(data=>{
 console.log(data.data.results)
 // res.send("API give me the data")
let Overview=data.data.results.map((c)=>{
  return new showOverview(c.title,c.overview)
})
res.json(Overview)



}
  
)
.catch((error =>{
  console.log(error)
  res.send("error in getting data from API")

}))
}
function showOverview(title,overview){
  
  this.title=title
  
  this.overview=overview
  



}












function handleErorr(req,res){
  res.status(404).send("The Rote is not exist")




}













app.get("*", handleErorr)


app.use(function (error, req, res, next) {
  res.status(500).json(handleError500());
});

function handleError500() {
  return {
    status: 500,
    responseText: "Sorry, something went wrong",
  };
}
function showOriginalLanguage(title,original_language){
  
  this.title=title
  this.original_language=original_language
  
  



}




//task14


function handlegetMovieid(req,res){
  
  let id = req.params.id;
  
    let sql = `SELECT * FROM table_movie WHERE id =${id} ;`;
    client.query(sql).then((result)=>{
        console.log(result);
        res.json(result.rows);
    }).catch((err) => {
         handleError(err, req, res);
    })
 }
function handleUPDATEid(req,res){
  console.log("AM I ALIVE?");
  // let id = req.params.id;
  // let title = req.body.title;
  // let overview = req.body.overview;
  // let poster_path=req.body.poster_path;
  // let sql = `UPDATE table_movie SET title =$1 , overview =$2 , poster_path=$3 WHERE id = ${id} RETURNING *`;
  // let values = [title, overview,poster_path];
  // client.query(sql, values).then(result => {
  //     console.log(result.rows[0]);
  //     res.json(result.rows[0]);
  // }).catch()
  let id = req.params.id;
  let title = req.body.title;
  let overview = req.body.overview;
  let poster_path = req.body.poster_path;
  let sql = `UPDATE table_movie SET title=$1 , overview=$2, poster_path=$3  WHERE id =${id} RETURNING *`;
  let values = [title, overview, poster_path];
  client
    .query(sql, values)
    .then((result) => {
      console.log(result.rows[0]);
      res.json(result.rows[0]);
    })
    .catch((err) => res.send("error"));
}
function handleDELETEid(req,res){
  let id = req.params.id;
    let sql = `DELETE FROM table_movie WHERE id =${id} RETURNING *`;
    client.query(sql).then(result => {
        console.log(result.rows[0]);
        res.status(204).json([]);
    }).catch(err => {
        console.log(err);
    })
}







 
client.connect().then(() => {
    
  app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
  })
})

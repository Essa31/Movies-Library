'use strict';
const express = require('express');

const app = express()
const cors=require("cors")
app.use(cors())

const port = 3000
const axios=require("axios").default



app.get("/",handleHome)
const Data=require("./Movie Data/data.json");
/*const res = require('express/lib/response');
const req = require('express/lib/request');*/
function handleHome(req,res){
 let result=[]
 Data.data.forEach(element =>{

    let newData=new showData(element.title,element.poster_path,element.overview)
    result.push(newData)
 })
 res.json(result)
 
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









 

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

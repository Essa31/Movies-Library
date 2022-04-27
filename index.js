'use strict';
const express = require('express');

const app = express()
const port = 3000


//app.METHOD(PATH, HANDLER)
app.get("/",handleHome)
const Data=require("./Movie Data/data.json")
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

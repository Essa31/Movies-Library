'use strict';
const express = require('express');

const app = express()

const port = 3000
const axios=require("axios").default


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



app.get("/trending", handlefavorite)
function handlefavorite(req,res){
  let link ="https://api.themoviedb.org/3/trending/all/week?api_key=37ddc7081e348bf246a42f3be2b3dfd0&language=en-US"
axios.get(link)
.then(data=>{
  console.log(data)
  res.send("API give me the data")
}
  
)
.catch((error =>{
  console.log(error)
  res.send("error in getting data from API")

}))
}





app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

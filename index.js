'use strict';
const express = require('express');

const app = express()

const port = 3000
const axios=require("axios").default
let api_key="668baa4bb128a32b82fe0c15b21dd699&language=en-US&query=The&page=2"

app.get("/",handleHome)
const Data=require("./Movie Data/data.json")
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










//new
//original_language
app.get("/original_language", handleOriginalLanguage)
function handleOriginalLanguage(req,res){
  let link ="https://api.themoviedb.org/3/trending/all/week?api_key=37ddc7081e348bf246a42f3be2b3dfd0&language=en-US"
axios.get(link)
.then(data=>{
 console.log(data.data.results)
 // res.send("API give me the data")
let OriginalLanguage=data.data.results.map((c)=>{
  return new showOriginalLanguage(c.title,c.original_language)
})
res.json(OriginalLanguage)



}
  
)
.catch((error =>{
  console.log(error)
  res.send("error in getting data from API")

}))
}
function showOriginalLanguage(title,original_language){
  
  this.title=title
  this.original_language=original_language
  
  



}




//original_language



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

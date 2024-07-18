import { getSheetFromData } from "./main.js"; 
import express from "express";


const app = express()
const port = 2000

app.get('/', (req, res) => {
  res.send('server running')
})

app.post('/customerd',(req,res) =>{
 try{
    const reqs = req    ;
    console.log(reqs)
 }catch(e){
    console.log(e)
 }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

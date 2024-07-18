import { getSheetFromData } from "./main.js"; 
import express from "express";
import bodyParser from  'body-parser';


const app = express()
const port = 2000

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())


app.get('/', (req, res) => {
  res.send('server running')
})

app.post('/customerd',(req,res) =>{
 try{
    const reqs = req.body;
    console.log(reqs)
 }catch(e){
    console.log(e)
 }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

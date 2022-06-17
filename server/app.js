
import path from 'path';
import express from 'express'
import fetch from 'node-fetch'
import cors from 'cors'
import 'dotenv/config';
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
const port = process.env.PORT || 3000

 
const app = express()

app.use(cors())
app.use(express.static(path.join(__dirname, '../client/dist')));
app.set('port', port);


app.get('/search', async(req, res) => {
    const searchTerm = encodeURIComponent(req.query.searchTerm);
    const page = req.query.page;
    if(!searchTerm) return res.json({error: "you have to send search term"})
    const uri = `https://api.unsplash.com/search/photos?client_id=${process.env.ACCESS_KEY}&query=${searchTerm}
        ${Number.isFinite(+page) ? `&page=${page}` : ""}`;
    try{
        const response = await fetch(uri);
        const data = await response.json();
        const images = data.results;
        res.json(images)
    } catch(e){
        res.json({error: e.message})
    }
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
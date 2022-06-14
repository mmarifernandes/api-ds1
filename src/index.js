const express = require("express");
const axios = require('axios');
const { buscaPostNaAPI } = require("./tvmaze/detail-post");
const { showDetails } = require("./tvmaze/showdetails");
const { showSeasons } = require("./tvmaze/seasons");
const { showImages } = require("./tvmaze/images");
const { AllShows } = require("./tvmaze/allshows");

const app = express();


app.set('view engine', 'ejs');
app.set('views', './src/view');

app.use(express.static('public'));
app.use(express.urlencoded({
    extended: true,
}));

app.post('/detalhar', async (req, res) => {
    const { ShowName } = req.body;
    const resultado = await buscaPostNaAPI(ShowName);
    console.log({resultado})
    const total = resultado.length;
    // console.log(total)

    if (resultado) {
        return res.render( 'detalhar', { show: resultado, total: total });
    }
    return res.send("ooops, id nao encontrado");
})

app.get('/home', async (req, res) => {
    const resultado = await AllShows();


    // if (resultado) {
        return res.render( 'home', { todos: resultado });
    // }
    // return res.send("ooops, id nao encontrado");
})


app.get('/showdetail/:id', async (req, res) => {
    const { id } = req.params;
    const resultado = await showDetails(id);
    const seasons = await showSeasons(id);
    const images = await showImages(id);

    console.log(resultado)
    const total = seasons.length;
    console.log(images.length)

    if (resultado) {
        return res.render('showdetail', {
            show: resultado,
            total: total,
            images: images
        });
    }
    return res.send("ooops, id nao encontrado");
})

app.get('/', async (req, res) => {
res.redirect('/home');
    // // https://swapi.dev/api/films/NUMERO

    // // const numero = Math.floor(1 + Math.random() * 6);
    // const urlBusca = `https://api.tvmaze.com/search/shows?q=${req.query.show}`; 

    // try {
    //     const responseApi = await axios.get(urlBusca);

    //     res.send({
    //         // numero,
    //         urlBusca,
    //         statusBusca: responseApi.status,
    //         dataBusca: responseApi.data
    //     });
    // } catch (error) {
    //     console.log({error})
    //     if (error.response.status == 404)
    //         res.send('NAO FOI POSSIVEL LOCALIZAR O RECURSO NA API');
    //     else
    //         res.send('ERRO DESCONHECIDO...');
    // }
    
});


const PORT = process.env.PORT;
console.log({
    PORT
});
app.listen(PORT, () => console.log(`Server iniciado na porta ${PORT}`));


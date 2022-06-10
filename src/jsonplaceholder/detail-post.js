const axios = require('axios');

const buscaPostNaAPI = async (showname) => {
    //MONTAR A URL DE CONSULTA
    const URL = `https://api.tvmaze.com/search/shows?q=${showname}`
    
    //CHAMADA HTTP
    try {
        const resposta = await axios.get(URL);

        //RETORNAR
        return resposta.data;
    } catch (error) {
        console.log({ error });
        return null;
    }
}

module.exports = { buscaPostNaAPI };
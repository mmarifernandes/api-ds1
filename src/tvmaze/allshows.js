const axios = require('axios');

const AllShows = async (showname) => {
    //MONTAR A URL DE CONSULTA
    const URL = 'https://api.tvmaze.com/shows';
    
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

module.exports = { AllShows };
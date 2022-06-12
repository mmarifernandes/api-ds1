const axios = require('axios');

const showImages = async (id) => {
    //MONTAR A URL DE CONSULTA
    const URL = `https://api.tvmaze.com/shows/${id}/images`;

    //CHAMADA HTTP
    try {
        const resposta = await axios.get(URL);

        //RETORNAR
        return resposta.data;
    } catch (error) {
        console.log({
            error
        });
        return null;
    }
}

module.exports = {
    showImages
};


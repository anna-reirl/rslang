import 'bootstrap';
const axios = require('axios');

const getWord = async(pageNumber, levelNumber) => {
    try {
        const response = await axios.get(`https://afternoon-falls-25894.herokuapp.com/words?group=${pageNumber - 1}&page=${levelNumber - 1}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            /*   body: JSON.stringify(user), */
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export default getWord;

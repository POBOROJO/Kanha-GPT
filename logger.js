import axios from 'axios'

const logger = async (message) => {
    try {
        const response = await axios.post('http://localhost:4000/krishna', {
            message
        });
        return response;
    } catch (error) {
        console.log(error);
    }
}

logger();

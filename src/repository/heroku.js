const axios = require('axios');

/**
 * get spells from keroku  repository
 * @param type type of spell
 * @param light spell's light
 * @returns list of spells
 */
async function getSpells(type) {
    try {
      const response = await axios.get('https://wizard-world-api.herokuapp.com/Spells?Type='+type);

      if(response.status != 200){
        return {
            status: 'error',
            message: response.error
          }
      }

      return response.data
    } catch (e) {
      console.error(e);
      return {
        status: 'error',
        message: e.error
      }
    }
};

module.exports = getSpells

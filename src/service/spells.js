const getSpellsHerokuRepo =  require('../repository/heroku.js');
const { isValidSpellName } =  require('../controller/validations.js');

/**
 * get spells based on type and light
 * @param type type of spell
 * @param light spell's light
 * @returns list of spells
 */
async function getSpells(type, light){
    var spells = await getSpellsHerokuRepo(type)

    if(typeof light !== 'undefined' && light !== null){
        spells = spells.filter( spell => 
            spell.light.toLowerCase() == light.toLowerCase()
          );
    }
    return spells;
};

/**
 * set new spell with validations
 * @param spells spell list
 * @param newSpell spell parameters
 * @returns list of spells
 */
function setSpells(spells, newSpell){
    const validSpellNameResponse = isValidSpellName(spells, newSpell.name)
    if(validSpellNameResponse.status == 'error'){
        return validSpellNameResponse
    }

    spells.push(newSpell)

    return spells;
};

module.exports = { getSpells, setSpells }

let allIn = (body, target) => target.every(v => v in body);

/**
 * check if query params are both enough and valid
 * @param queryParam query params
 * @returns OK status if it complies with min requirements
 */
function isValidGetParams(queryParam){
    if(queryParam === null){
        return {
            status: 'error',
            message: 'type parameter not found'
        }
    }

    if(!("type" in queryParam)){
        return {
            status: 'error',
            message: 'type parameter not found'
        }
    }

    var spellTypes = ['none', 'charm', 'conjuration', 'spell', 'transfiguration', 'healingspell', 'darkcharm', 'jinx', 'curse', 'magicaltransportation', 'hex', 'counterspell', 'darkarts', 'counterjinx', 'countercharm', 'untransfiguration', 'bindingmagicalcontract', 'Vanishment']
    if(!spellTypes.includes(queryParam.type.toLowerCase())){
        return {
            status: 'error',
            message: `type value '${queryParam.type}' not allow. Allow values are: ${spellTypes.toString()}`
        }
    }

    return {
        status: 'OK'
    };
};

/**
 * check if query params are both enough and valid
 * @param body body params to insert
 * @returns OK status if it complies with min requirements
 */
function isValidPostBody(body){
    if(body === null){
        return {
            status: 'error',
            message: 'parameters not found'
        }
    }

    var minParams = ['id', 'name', 'incantation', 'effect', 'canBeVerbal', 'type', 'light']    
    if(!allIn(body, minParams)){
        return {
            status: 'error',
            message: `one or more parameters not found. Check minimum body parameters: : ${minParams.toString()}`
        }
    }

    if(typeof body.canBeVerbal !== 'boolean'){
        return {
            status: 'error',
            message: `canBeVerbal parameter must be true or false (boolean) but it's ${typeof body.canBeVerbal}`
        }
    }    

    var lightOptions = ['blue', 'red']
    if(!lightOptions.includes(body.light.toLowerCase())){
        return {
            status: 'error',
            message: `light value '${body.light}' not allow. Allow values are: ${lightOptions.toString()}`
        }
    }

    return {
        status: 'OK'
    };
};

/**
 * check if it's spell name
 * @param spells spell list
 * @param name spell name
 * @returns OK status if it complies
 */
function isValidSpellName(spells, name){
    if(typeof name !== 'undefined' && name !== null){
        spells = spells.filter( spell => 
            spell.name.toLowerCase() == name.toLowerCase()
        );

        if(spells.length > 0){
            return {
                status: 'error',
                message: `name value '${name}' already exists`
            }
        }
    }

    return {
        status: 'OK'
    };
};

module.exports = { isValidGetParams, isValidPostBody, isValidSpellName }

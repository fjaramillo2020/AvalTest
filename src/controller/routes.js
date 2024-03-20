const { Router } = require('express');
const router = Router();
const { isValidGetParams, isValidPostBody } =  require('./validations.js');
const { getSpells, setSpells } =  require('../service/spells.js');

router.get('/', async (req, res) => {    
    try {
        const queryParam = req.query
        
        const validParamsResponse = isValidGetParams(queryParam)
        if(validParamsResponse.status == 'error'){
            res.status(404).json(validParamsResponse);
            return;
        }

        var spells = await getSpells(queryParam.type, queryParam.light)

        res.status(200).json(spells);
    } catch (e) {
        console.error(e);
        console.trace(JSON.stringify(req.headers));
        console.trace(req.body);
    }
})

router.post('/', async (req, res) => {    
    try {
        const validBodyResponse = isValidPostBody(req.body)
        if(validBodyResponse.status == 'error'){
            res.status(403).json(validBodyResponse);
            return;
        }

        var spells = await getSpells(req.body.type, req.body.light)

        var setSpellsResponse = setSpells(spells, req.body)
        if(setSpellsResponse.status === 'error'){
            res.status(403).json(setSpellsResponse);
            return;
        }

        res.status(200).json(setSpellsResponse);
    } catch (e) {
        console.error(e);
        console.trace(JSON.stringify(req.headers));
        console.trace(req.body);
    }
})

module.exports = router;

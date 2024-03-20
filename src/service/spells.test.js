const { getSpells, setSpells } = require('../service/spells.js');
const { isValidSpellName } = require('../controller/validations.js');
const getSpellsHerokuRepo = require('../repository/heroku.js');

jest.mock('../repository/heroku.js');
jest.mock('../controller/validations.js');

describe('Spells Service Tests', () => {
  test('getSpells with type and light filter', async () => {
    const mockSpells = [{ name: 'Spell1', light: 'blue' }, { name: 'Spell2', light: 'red' }];
    getSpellsHerokuRepo.mockResolvedValue(mockSpells);

    const type = 'spellType';
    const light = 'blue';
    const result = await getSpells(type, light);

    expect(result).toEqual([{ name: 'Spell1', light: 'blue' }]);
  });

  test('setSpells with valid new spell', () => {
    const mockSpells = [{ name: 'Spell1' }, { name: 'Spell2' }];
    const newSpell = { name: 'NewSpell' };
    isValidSpellName.mockReturnValue({ status: 'OK' });

    const result = setSpells(mockSpells, newSpell);

    expect(result).toContainEqual(newSpell);
  });

  test('setSpells with invalid new spell name', () => {
    const mockSpells = [{ name: 'Spell1' }, { name: 'Spell2' }];
    const newSpell = { name: 'Spell1' };
    isValidSpellName.mockReturnValue({ status: 'error', message: 'Name already exists' });

    const result = setSpells(mockSpells, newSpell);

    expect(result).not.toContainEqual(newSpell);
  });
});

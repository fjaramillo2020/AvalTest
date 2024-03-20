const axios = require('axios');
const getSpellsHerokuRepo = require('../repository/heroku.js');

jest.mock('axios');

describe('getSpells Tests', () => {
  test('getSpells with successful response', async () => {
    const mockSpells = [{ name: 'Spell1' }, { name: 'Spell2' }];
    axios.get.mockResolvedValue({ status: 200, data: mockSpells });

    const type = 'spellType';
    const result = await getSpellsHerokuRepo(type);

    expect(result).toEqual(mockSpells);
  });

  test('getSpells with unsuccessful response', async () => {
    const errorMessage = 'Error fetching spells';
    axios.get.mockResolvedValue({ status: 404, error: errorMessage });

    const type = 'spellType';
    const result = await getSpellsHerokuRepo(type);

    expect(result).toEqual({
      status: 'error',
      message: errorMessage
    });
  });

  test('getSpells handles network error', async () => {
    const errorMessage = 'Network error';
    axios.get.mockRejectedValue(new Error(errorMessage));

    const type = 'spellType';
    const result = await getSpellsHerokuRepo(type);

    expect(result).toEqual({
      status: 'error',
      message: errorMessage
    });
  });

  test('getSpells logs error to console', async () => {
    const errorMessage = 'Error fetching spells';
    axios.get.mockRejectedValue(new Error(errorMessage));

    console.error = jest.fn(); // Mock console.error to track calls

    const type = 'spellType';
    await getSpellsHerokuRepo(type);

    expect(console.error).toHaveBeenCalledWith(new Error(errorMessage));
  });
});

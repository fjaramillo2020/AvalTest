const { isValidGetParams, isValidPostBody, isValidSpellName } = require('./validations.js');

describe('Validation Tests', () => {
  test('isValidGetParams with valid query parameters', () => {
    const validQueryParam = { type: 'spell', light: 'blue' };
    const result = isValidGetParams(validQueryParam);

    expect(result.status).toBe('OK');
  });

  test('isValidGetParams with invalid type parameter', () => {
    const invalidQueryParam = { type: 'invalid', light: 'red' };
    const result = isValidGetParams(invalidQueryParam);

    expect(result.status).toBe('error');
    expect(result.message).toContain('type value');
  });

  test('isValidPostBody with valid body parameters', () => {
    const validBody = {
      id: 1,
      name: 'Spell Name',
      incantation: 'Incantation',
      effect: 'Effect',
      canBeVerbal: true,
      type: 'spell',
      light: 'blue'
    };
    const result = isValidPostBody(validBody);

    expect(result.status).toBe('OK');
  });

  test('isValidPostBody with invalid canBeVerbal parameter', () => {
    const invalidBody = {
      id: 1,
      name: 'Spell Name',
      incantation: 'Incantation',
      effect: 'Effect',
      canBeVerbal: 'true', // Invalid type
      type: 'spell',
      light: 'blue'
    };
    const result = isValidPostBody(invalidBody);

    expect(result.status).toBe('error');
    expect(result.message).toContain('canBeVerbal parameter');
  });

  test('isValidPostBody with all required parameters and valid values', () => {
    const body = { id: '1', name: 'Spell1', incantation: 'Incantation', effect: 'Effect', canBeVerbal: true, type: 'spell', light: 'blue' };
    const result = isValidPostBody(body);

    expect(result).toEqual({
      status: 'OK'
    });
  });

  test('isValidSpellName with existing spell name', () => {
    const spells = [{ name: 'Spell1' }, { name: 'Spell2' }];
    const existingName = 'Spell1';
    const result = isValidSpellName(spells, existingName);

    expect(result.status).toBe('error');
    expect(result.message).toContain('already exists');
  });

  test('isValidSpellName with non-existing spell name', () => {
    const spells = [{ name: 'Spell1' }, { name: 'Spell2' }];
    const nonExistingName = 'NewSpell';
    const result = isValidSpellName(spells, nonExistingName);

    expect(result.status).toBe('OK');
  });
});

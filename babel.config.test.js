// Importa el archivo de configuración de Babel
const babelConfig = require('./babel.config.js');

describe('Babel Configuration Tests', () => {
  test('Babel presets are correctly configured', () => {
    const expectedPresets = [
      [
        '@babel/preset-env',
        {
          targets: {
            node: 'current',
          },
        },
      ],
    ];

    expect(babelConfig.presets).toEqual(expectedPresets);
  });
});

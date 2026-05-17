const test = require('node:test');
const assert = require('node:assert/strict');
const { calcularMateriais, consultarCep, limparCep } = require('../js/app.js');

test('calcula área, tijolos e margem de perda corretamente', () => {
  const resultado = calcularMateriais(5, 2.8);

  assert.equal(resultado.area, 14);
  assert.equal(resultado.tijolos, 255);
  assert.equal(resultado.tijolosComPerda, 281);
});

test('remove caracteres não numéricos do CEP', () => {
  assert.equal(limparCep('70040-900'), '70040900');
});

test('integração com ViaCEP usando mock da resposta externa', async () => {
  const fetchMock = async (url) => {
    assert.equal(url, 'https://viacep.com.br/ws/70040900/json/');

    return {
      ok: true,
      json: async () => ({
        cep: '70040-900',
        logradouro: 'Setor Bancário Sul',
        bairro: 'Asa Sul',
        localidade: 'Brasília',
        uf: 'DF'
      })
    };
  };

  const endereco = await consultarCep('70040-900', fetchMock);

  assert.equal(endereco.localidade, 'Brasília');
  assert.equal(endereco.uf, 'DF');
});

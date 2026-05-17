function limparCep(cep) {
  return String(cep || '').replace(/\D/g, '');
}

function calcularMateriais(largura, altura) {
  const larguraNumerica = Number(largura);
  const alturaNumerica = Number(altura);

  if (larguraNumerica <= 0 || alturaNumerica <= 0) {
    throw new Error('As medidas devem ser maiores que zero.');
  }

  const area = larguraNumerica * alturaNumerica;
  const tijolos = Math.ceil(area * 18.2);
  const tijolosComPerda = Math.ceil(tijolos * 1.1);

  return {
    area,
    tijolos,
    tijolosComPerda
  };
}

async function consultarCep(cep, fetchApi = fetch) {
  const cepLimpo = limparCep(cep);

  if (cepLimpo.length !== 8) {
    throw new Error('CEP inválido. Informe 8 números.');
  }

  const resposta = await fetchApi(`https://viacep.com.br/ws/${cepLimpo}/json/`);

  if (!resposta.ok) {
    throw new Error('Erro ao consultar a API ViaCEP.');
  }

  const dados = await resposta.json();

  if (dados.erro) {
    throw new Error('CEP não encontrado.');
  }

  return dados;
}

function formatarEndereco(dados) {
  return `
    <strong>Endereço encontrado pela API ViaCEP</strong><br><br>
    ${dados.logradouro || 'Logradouro não informado'}<br>
    ${dados.bairro || 'Bairro não informado'}<br>
    ${dados.localidade || 'Cidade não informada'} - ${dados.uf || 'UF não informada'}<br>
    CEP: ${dados.cep || 'Não informado'}
  `;
}

function atualizarResultados(resultado) {
  document.getElementById('areaResultado').textContent = `${resultado.area.toFixed(2)} m²`;
  document.getElementById('tijolosResultado').textContent = resultado.tijolos;
  document.getElementById('perdaResultado').textContent = resultado.tijolosComPerda;
}

function limparInterface() {
  document.getElementById('largura').value = '';
  document.getElementById('altura').value = '';
  document.getElementById('cep').value = '';
  document.getElementById('areaResultado').textContent = '0 m²';
  document.getElementById('tijolosResultado').textContent = '0';
  document.getElementById('perdaResultado').textContent = '0';
  document.getElementById('enderecoResultado').textContent = 'O endereço será exibido após a consulta do CEP na API ViaCEP.';
}

if (typeof document !== 'undefined') {
  const form = document.getElementById('obraForm');
  const limparBtn = document.getElementById('limparBtn');
  const enderecoResultado = document.getElementById('enderecoResultado');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const largura = document.getElementById('largura').value;
    const altura = document.getElementById('altura').value;
    const cep = document.getElementById('cep').value;

    try {
      const resultado = calcularMateriais(largura, altura);
      atualizarResultados(resultado);

      enderecoResultado.textContent = 'Consultando endereço na API ViaCEP...';
      const endereco = await consultarCep(cep);
      enderecoResultado.innerHTML = formatarEndereco(endereco);
    } catch (erro) {
      enderecoResultado.textContent = erro.message;
    }
  });

  limparBtn.addEventListener('click', limparInterface);
}

if (typeof module !== 'undefined') {
  module.exports = {
    limparCep,
    calcularMateriais,
    consultarCep,
    formatarEndereco
  };
}

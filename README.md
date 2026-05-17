# Calculadora Inteligente de Obras

**Link do Deploy:** coloque aqui o link publicado no GitHub Pages, Vercel ou Netlify.

## Visão geral

A Calculadora Inteligente de Obras é uma aplicação web simples, moderna e responsiva criada para apoiar o planejamento inicial de pequenas obras. O sistema calcula a área de uma parede, estima a quantidade de tijolos necessários e adiciona uma margem de perda de 10%.

Além disso, a aplicação consome a API pública ViaCEP para buscar automaticamente o endereço da obra a partir do CEP informado pelo usuário.

## Dor real atendida

Pequenos profissionais, estudantes, clientes e microempreendedores da construção podem ter dificuldade para estimar materiais de forma rápida e organizada. A aplicação ajuda a reduzir erros básicos de cálculo e centraliza informações iniciais da obra em uma interface simples.

## Funcionalidades

- Cálculo de área da parede.
- Estimativa de quantidade de tijolos.
- Cálculo com margem de perda de 10%.
- Consulta automática de endereço por CEP.
- Integração com API pública ViaCEP.
- Interface web moderna e responsiva.
- Teste automatizado de cálculo e integração mockada.
- Workflow de CI com GitHub Actions.

## API pública utilizada

A aplicação utiliza a API ViaCEP para consultar dados de endereço por CEP.

Exemplo de endpoint utilizado:

```text
https://viacep.com.br/ws/70040900/json/
```

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript
- ViaCEP API
- Node.js no GitHub Actions para execução dos testes
- GitHub Pages, Vercel ou Netlify para deploy

## Como executar localmente

Este projeto pode ser aberto diretamente com a extensão Live Server do VS Code.

Passos:

1. Abra a pasta do projeto no VS Code.
2. Abra o arquivo `index.html`.
3. Clique com o botão direito.
4. Selecione `Open with Live Server`.

## Como executar os testes

Os testes usam o recurso nativo de testes do Node.js.

```bash
node --test tests/integration.test.js
```

## Versionamento

Versão atual:

```text
v1.1.0
```

## Entrega intermediária

Esta etapa adiciona:

- Issue documentada no GitHub.
- Branch obrigatória `entrega-intermediaria`.
- Integração com API pública.
- Teste automatizado.
- Deploy público.
- Pull Request vinculado à Issue.

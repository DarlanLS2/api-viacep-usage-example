class CepFinder {
  async getCepInfos(cep) {
    let response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
    let data = await response.json(); 
    return data;
  }
}

class View {
  constructor(inputSelector, resultDivSelector, cepFinder) {
    this.cepInput = document.querySelector(inputSelector);
    this.resultDiv = document.querySelector(resultDivSelector);
    this.cepFinder = cepFinder;
  }

  formatCepData(data) {
    return `
      <hr>
      <h2>Detalhes:</h2>
      <p>Estado: ${data.estado}</p>
      <p>Cidade: ${data.localidade}</p>
      <p>Bairro: ${data.bairro}</p>
      <p>Rua: ${data.logradouro}</p>
    `;
  }

  async showCepDetails() {
    let data = await cepFinder.getCepInfos(this.cepInput.value);
    this.resultDiv.innerHTML = this.formatCepData(data)  
  }
}

const cepFinder = new CepFinder();
const view = new View("#cep", "#divResultado", cepFinder)

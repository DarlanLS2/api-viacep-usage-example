class CepFinder {
  async search(cep) {
    return this.fetchApiViaCep(cep)
  }

  async fetchApiViaCep(cep) {
    let response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
    return await response.json(); 
  }
}

class View {
  constructor(selectors, cepFinder) {
    this.cepInput = document.querySelector(selectors.cepInput);
    this.resultDiv = document.querySelector(selectors.resultDiv);
    this.cepFinder = cepFinder;
  }

  async showCepDetails() {
    this.insertInfosIntoDiv(await this.getCepInfos())
  }

  async getCepInfos() {
    return await this.cepFinder.search(this.cepInput.value);
  }

  insertInfosIntoDiv(cepInfos) {
    this.resultDiv.innerHTML = this.formatCepData(cepInfos)  
  }

  formatCepData(cepInfos) {
    return `
      <hr>
      <h2>Detalhes:</h2>
      <p>Estado: ${cepInfos.estado}</p>
      <p>Cidade: ${cepInfos.localidade}</p>
      <p>Bairro: ${cepInfos.bairro}</p>
      <p>Rua: ${cepInfos.logradouro}</p>
    `;
  }
}

const cepFinder = new CepFinder();

let selectors = {
  cepInput: "#cep",
  resultDiv: "#divResultado"
}

const view = new View(selectors, cepFinder)
